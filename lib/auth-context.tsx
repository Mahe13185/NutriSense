'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from './supabase';
import { UserProfile } from '@/types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  signUp: (name: string, email: string, password: string) => Promise<{ user: User | null; error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ profile: UserProfile | null; error: Error | null }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const configured = isSupabaseConfigured();

  // Fetch or initialize profile from profiles table
  const fetchProfile = useCallback(async (userId: string, userMetaName?: string): Promise<UserProfile | null> => {
    if (!configured) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile from Supabase:', error);
        return null;
      }

      if (data) {
        setProfile(data as UserProfile);
        return data as UserProfile;
      }

      // If no profile found, try creating one
      const newProfileData = {
        id: userId,
        name: userMetaName || 'NutriSense User',
      };
      const { data: inserted, error: insertError } = await supabase
        .from('profiles')
        .insert(newProfileData)
        .select()
        .single();

      if (insertError) {
        console.error('Error creating default profile:', insertError);
        return null;
      }

      setProfile(inserted as UserProfile);
      return inserted as UserProfile;
    } catch (err) {
      console.error('Unexpected error fetching/creating profile:', err);
      return null;
    }
  }, [configured]);

  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchProfile(user.id, user.user_metadata?.name);
    }
  }, [user, fetchProfile]);

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user.user_metadata?.name).finally(() => {
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        const currentUser = currentSession?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          await fetchProfile(currentUser.id, currentUser.user_metadata?.name);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [configured, fetchProfile]);

  // Sign Up
  const signUp = async (name: string, email: string, password: string) => {
    if (!configured) {
      return {
        user: null,
        error: new Error('Supabase credentials are not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.'),
      };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name.trim(),
            full_name: name.trim(),
          },
        },
      });

      if (error) {
        return { user: null, error: new Error(error.message) };
      }

      if (data.user) {
        setUser(data.user);
        // Ensure profile is created/retrieved
        await fetchProfile(data.user.id, name.trim());
      }

      return { user: data.user, error: null };
    } catch (err: any) {
      return { user: null, error: err instanceof Error ? err : new Error(String(err)) };
    }
  };

  // Sign In
  const signIn = async (email: string, password: string) => {
    if (!configured) {
      return {
        user: null,
        error: new Error('Supabase credentials are not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.'),
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { user: null, error: new Error(error.message) };
      }

      if (data.user) {
        setUser(data.user);
        setSession(data.session);
        await fetchProfile(data.user.id, data.user.user_metadata?.name);
      }

      return { user: data.user, error: null };
    } catch (err: any) {
      return { user: null, error: err instanceof Error ? err : new Error(String(err)) };
    }
  };

  // Sign Out
  const signOut = async () => {
    if (!configured) {
      setUser(null);
      setSession(null);
      setProfile(null);
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
      if (error) {
        return { error: new Error(error.message) };
      }
      return { error: null };
    } catch (err: any) {
      setUser(null);
      setSession(null);
      setProfile(null);
      return { error: err instanceof Error ? err : new Error(String(err)) };
    }
  };

  // Update Profile
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!configured || !user) {
      return {
        profile: null,
        error: new Error('User not authenticated or Supabase not configured.'),
      };
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        return { profile: null, error: new Error(error.message) };
      }

      setProfile(data as UserProfile);
      return { profile: data as UserProfile, error: null };
    } catch (err: any) {
      return { profile: null, error: err instanceof Error ? err : new Error(String(err)) };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        isConfigured: configured,
        signUp,
        signIn,
        signOut,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
