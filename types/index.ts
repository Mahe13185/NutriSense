export type Sex = 'female' | 'male' | 'other';

export type ActivityLevel = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';

export type DietaryPreference = 
  | 'vegetarian' 
  | 'vegan' 
  | 'lacto_vegetarian' 
  | 'ovo_vegetarian' 
  | 'non_vegetarian' 
  | 'pescatarian';

export type FoodFrequency = 'daily' | '4-6_per_week' | '1-3_per_week' | 'rarely' | 'never';

export type SymptomFrequency = 'frequently' | 'sometimes' | 'rarely' | 'never';

export interface UserBasicInfo {
  age: number | '';
  sex: Sex | '';
  heightCm: number | '';
  weightKg: number | '';
  activityLevel: ActivityLevel | '';
  dietaryPreference: DietaryPreference | '';
  isPregnantOrLactating?: boolean;
}

export interface DietaryHabits {
  fruits: FoodFrequency | '';
  vegetables: FoodFrequency | '';
  greenLeafy: FoodFrequency | '';
  pulsesLegumes: FoodFrequency | '';
  dairyOrAlternatives: FoodFrequency | '';
  eggsMeatFish: FoodFrequency | '';
  nutsSeeds: FoodFrequency | '';
  wholeGrainsMillets: FoodFrequency | '';
  fortifiedFoods: FoodFrequency | '';
}

export interface SymptomsLifestyle {
  frequentFatigue: SymptomFrequency | '';
  generalWeakness: SymptomFrequency | '';
  difficultyConcentrating: SymptomFrequency | '';
  paleAppearance: SymptomFrequency | '';
  muscleCrampsWeakness: SymptomFrequency | '';
  hairSkinChanges: SymptomFrequency | '';
  poorAppetite: SymptomFrequency | '';
  sunExposure: 'adequate_daily' | 'moderate_weekly' | 'minimal_rare' | '';
  teaCoffeeWithMeals: 'often' | 'sometimes' | 'rarely' | '';
  sleepQuality: 'good' | 'average' | 'poor' | '';
}

export interface AssessmentFormData {
  basicInfo: UserBasicInfo;
  dietaryHabits: DietaryHabits;
  symptomsLifestyle: SymptomsLifestyle;
}

export type RiskLevel = 'low' | 'moderate' | 'elevated';

export interface NutrientRiskAssessment {
  nutrientId: 'iron' | 'vitamin_b12' | 'vitamin_d' | 'calcium' | 'vitamin_a' | 'folate' | 'protein';
  name: string;
  category: 'mineral' | 'vitamin' | 'macronutrient';
  riskLevel: RiskLevel;
  riskScore: number; // 0 to 100
  adequacyScore: number; // 0 to 100 (100 = optimal estimated intake)
  statusLabel: string; // e.g. "Low Risk Indication", "Moderate Risk Indication", "Elevated Risk Indication"
  reasons: string[];
  dietaryFactors: string[];
  symptomIndicators: string[];
  foodRecommendations: string[];
  icmrRDA: string;
  awarenessTips: string[];
  absorptionTips?: string[];
}

export interface AssessmentResult {
  id: string;
  timestamp: string;
  formData: AssessmentFormData;
  overallDietaryScore: number; // 0-100
  overallRiskSummary: string;
  nutrients: NutrientRiskAssessment[];
  topRiskAreas: string[];
  lifestyleAdvice: string[];
  disclaimer: string;
}

export interface NutrientInfo {
  id: 'iron' | 'vitamin_b12' | 'vitamin_d' | 'calcium' | 'vitamin_a' | 'folate' | 'protein';
  name: string;
  tagline: string;
  category: 'mineral' | 'vitamin' | 'macronutrient';
  icmrRda: {
    general: string;
    men: string;
    women: string;
    special?: string;
  };
  keyFunctions: string[];
  commonDeficiencyIndicators: string[];
  topFoodSources: {
    vegetarian: string[];
    nonVegetarian?: string[];
    vegan?: string[];
    fortified?: string[];
  };
  absorptionEnhancers: string[];
  absorptionInhibitors: string[];
  icmr2024Insights: string;
}

export interface FoodItem {
  id: string;
  name: string;
  regionalNames?: string;
  category: 'grains' | 'pulses' | 'vegetables' | 'leafy_greens' | 'fruits' | 'dairy' | 'nuts_seeds' | 'animal_source' | 'fortified';
  dietType: 'vegan' | 'vegetarian' | 'non_vegetarian';
  richIn: ('iron' | 'vitamin_b12' | 'vitamin_d' | 'calcium' | 'vitamin_a' | 'folate' | 'protein')[];
  servingSize: string;
  approxNutrientContent: string;
  healthBenefits: string;
  icmrPrepTip: string;
  iconName: string;
}

export interface GuidelineSection {
  id: string;
  title: string;
  source: string;
  sourceUrl: string;
  badge: string;
  summary: string;
  keyPoints: string[];
  practicalTips: string[];
}
