'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useTranslation } from '@/lib/language-context';
import { LanguageSelector } from '@/components/LanguageSelector';
import {
  Activity,
  BookOpen,
  Apple,
  Info,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  LayoutDashboard,
  User,
  LogOut,
  LogIn,
  UserPlus,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, signOut, loading } = useAuth();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    setMobileMenuOpen(false);
    router.push('/');
  };

  // Logged-out links
  const LOGGED_OUT_NAV = [
    { href: '/', labelKey: 'nav.home', icon: Activity },
    { href: '/guidelines', labelKey: 'nav.guidelines', icon: BookOpen },
    { href: '/foods', labelKey: 'nav.foods', icon: Apple },
    { href: '/about', labelKey: 'nav.about', icon: Info },
  ];

  // Logged-in links
  const LOGGED_IN_NAV = [
    { href: '/', labelKey: 'nav.home', icon: Activity },
    { href: '/assessment', labelKey: 'nav.assessment', icon: Sparkles },
    { href: '/guidelines', labelKey: 'nav.guidelines', icon: BookOpen },
    { href: '/foods', labelKey: 'nav.foods', icon: Apple },
    { href: '/dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard },
    { href: '/profile', labelKey: 'nav.profile', icon: User },
  ];

  const currentNav = user ? LOGGED_IN_NAV : LOGGED_OUT_NAV;
  const userName = profile?.name || user?.user_metadata?.name || user?.email?.split('@')[0];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                Nutri<span className="text-emerald-600">Sense</span>
              </span>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                {t('common.tagline')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {currentNav.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  {t(link.labelKey)}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA / User State + Language Selector */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSelector />

            {loading ? (
              <div className="w-20 h-8 bg-slate-100 animate-pulse rounded-xl" />
            ) : user ? (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="max-w-[120px] truncate">{userName || t('nav.dashboard')}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 text-xs font-semibold text-slate-600 transition-all"
                  title={t('nav.logout')}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t('nav.logout')}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition-all"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{t('nav.login')}</span>
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-xs shadow-emerald-600/20 hover:shadow-md transition-all active:scale-98"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{t('nav.signup')}</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger + Compact Language Selector */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSelector className="scale-95" />
            {!user && (
              <Link
                href="/login"
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200"
              >
                {t('nav.login')}
              </Link>
            )}
            {user && (
              <Link
                href="/dashboard"
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-600"
              >
                {t('nav.dashboard')}
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label={t('common.menu')}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          <div className="px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Navigation</span>
            {user && <span className="text-emerald-600 font-bold truncate max-w-[150px]">{userName}</span>}
          </div>

          {/* Language selector in mobile drawer */}
          <LanguageSelector variant="drawer" />

          {currentNav.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                {t(link.labelKey)}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200"
              >
                <LogOut className="w-4 h-4" />
                <span>{t('nav.logout')}</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{t('nav.login')}</span>
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{t('nav.signup')}</span>
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-500 px-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{t('common.badge')}</span>
          </div>
        </div>
      )}
    </header>
  );
}
