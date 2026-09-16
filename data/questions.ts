import { DietaryPreference, FoodFrequency, SymptomFrequency } from '@/types';

export interface QuestionOption<T = string> {
  value: T;
  label: string;
  description?: string;
  badge?: string;
}

export const DIETARY_PREFERENCE_OPTIONS: QuestionOption<DietaryPreference>[] = [
  {
    value: 'vegetarian',
    label: 'Vegetarian (Lacto-Vegetarian)',
    description: 'Consumes plant foods and dairy products (milk, curd, paneer); no eggs, meat, or seafood.',
  },
  {
    value: 'ovo_vegetarian',
    label: 'Ovo-Vegetarian',
    description: 'Consumes plant foods and eggs; no dairy, meat, or seafood.',
  },
  {
    value: 'vegan',
    label: 'Vegan (Strict Plant-Based)',
    description: 'Consumes only plant-based foods; strictly no animal products (no dairy, eggs, meat, or honey).',
  },
  {
    value: 'pescatarian',
    label: 'Pescatarian',
    description: 'Consumes plant foods, dairy/eggs, and fish/seafood; no poultry or red meat.',
  },
  {
    value: 'non_vegetarian',
    label: 'Non-Vegetarian (Omnivore)',
    description: 'Consumes all food groups including poultry, meat, fish, eggs, dairy, and plants.',
  },
];

export const ACTIVITY_LEVEL_OPTIONS: QuestionOption[] = [
  {
    value: 'sedentary',
    label: 'Sedentary',
    description: 'Desk job, little to no structured physical exercise or strenuous activity.',
  },
  {
    value: 'lightly_active',
    label: 'Lightly Active',
    description: 'Light exercise / brisk walking 1–3 days per week.',
  },
  {
    value: 'moderately_active',
    label: 'Moderately Active',
    description: 'Moderate physical exercise / sports 3–5 days per week.',
  },
  {
    value: 'very_active',
    label: 'Very Active / Heavy Work',
    description: 'Hard daily training, sports, or manual physical labor.',
  },
];

export const FOOD_FREQUENCY_OPTIONS: QuestionOption<FoodFrequency>[] = [
  {
    value: 'daily',
    label: 'Daily (1+ times/day)',
    description: 'Core staple consumed every day',
  },
  {
    value: '4-6_per_week',
    label: '4–6 times / week',
    description: 'Frequently consumed across most days',
  },
  {
    value: '1-3_per_week',
    label: '1–3 times / week',
    description: 'Occasional consumption',
  },
  {
    value: 'rarely',
    label: 'Rarely',
    description: 'Less than once a week or once a month',
  },
  {
    value: 'never',
    label: 'Never',
    description: 'Do not consume this food group at all',
  },
];

export const SYMPTOM_FREQUENCY_OPTIONS: QuestionOption<SymptomFrequency>[] = [
  {
    value: 'frequently',
    label: 'Frequently / Persistent',
    description: 'Experienced on most days of the week',
  },
  {
    value: 'sometimes',
    label: 'Sometimes / Intermittent',
    description: 'Experienced once or twice a week',
  },
  {
    value: 'rarely',
    label: 'Rarely',
    description: 'Only on rare occasions',
  },
  {
    value: 'never',
    label: 'Never / No Noticeable Issue',
    description: 'Not experienced at all',
  },
];

export interface DietaryQuestionConfig {
  key: keyof import('@/types').DietaryHabits;
  title: string;
  subtitle: string;
  iconName: string;
  examples: string;
  relevance: string;
}

export const DIETARY_QUESTIONS_CONFIG: DietaryQuestionConfig[] = [
  {
    key: 'fruits',
    title: 'Fresh Whole Fruits',
    subtitle: 'Seasonal whole fruits (e.g., Amla, Guava, Oranges, Apples, Papaya, Banana)',
    iconName: 'Apple',
    examples: 'Amla, Guava, Papaya, Mango, Oranges, Pomegranate, Banana, Berries',
    relevance: 'Provides Vitamin C, Provitamin A, bioflavonoids, fiber, and supports plant iron absorption.',
  },
  {
    key: 'vegetables',
    title: 'Vegetables (Other than leafy greens)',
    subtitle: 'Cooked or raw vegetables (e.g., Carrots, Gourds, Tomatoes, Bell peppers, Beans)',
    iconName: 'Carrot',
    examples: 'Carrot, Tomato, Pumpkin, Cucumber, Bottle gourd, Cauliflower, Capsicum',
    relevance: 'Essential for Carotenoids (Provitamin A), minerals, potassium, and antioxidants.',
  },
  {
    key: 'greenLeafy',
    title: 'Dark Green Leafy Vegetables (GLVs)',
    subtitle: 'Leafy greens (e.g., Palak/Spinach, Methi/Fenugreek, Moringa/Drumstick leaves, Amaranth)',
    iconName: 'Salad',
    examples: 'Palak (Spinach), Methi, Drumstick (Moringa) leaves, Amaranth (Cholai), Sarson',
    relevance: 'Crucial for Plant Iron, Folate (B9), Calcium, Vitamin A, and Vitamin K (ICMR recommends 100g/day).',
  },
  {
    key: 'pulsesLegumes',
    title: 'Pulses, Lentils & Legumes',
    subtitle: 'Dals, whole beans, chickpeas, sprouted moong, rajma, soybeans',
    iconName: 'Wheat',
    examples: 'Toor/Arhar dal, Moong, Chana/Chickpeas, Rajma, Soybeans, Black gram (Urad)',
    relevance: 'Primary source of plant protein, folate, non-heme iron, zinc, and dietary fiber in Indian diets.',
  },
  {
    key: 'dairyOrAlternatives',
    title: 'Milk, Curd, Paneer or Fortified Plant Milks',
    subtitle: 'Dairy products (or calcium/B12 fortified plant-based alternatives like soy/almond milk)',
    iconName: 'Milk',
    examples: 'Fresh cow/buffalo milk, Curd/Yogurt, Paneer, Buttermilk, Cheese, Fortified soy/almond milk',
    relevance: 'Key source of natural Vitamin B12, bioavailable Calcium, Riboflavin, and high-quality protein.',
  },
  {
    key: 'eggsMeatFish',
    title: 'Eggs, Poultry, Meat & Seafood',
    subtitle: 'Animal-source proteins (skip or select "Never" if vegetarian/vegan)',
    iconName: 'Beef',
    examples: 'Whole eggs, Chicken, Fish (Rohu, Sardines, Salmon, Mackerel), Mutton, Seafood',
    relevance: 'Highly bioavailable Heme iron, Vitamin B12, Vitamin D, complete protein with all essential amino acids.',
  },
  {
    key: 'nutsSeeds',
    title: 'Nuts, Oilseeds & Dry Fruits',
    subtitle: 'Almonds, Walnuts, Peanuts, Flaxseeds, Sesame (Til), Chia, Garden cress (Halim)',
    iconName: 'Nut',
    examples: 'Almonds, Walnuts, Peanuts, White/Black Sesame seeds, Pumpkin seeds, Halim, Flaxseeds',
    relevance: 'Rich in essential fatty acids, Calcium (Sesame), plant Iron (Halim), Protein, and micronutrients.',
  },
  {
    key: 'wholeGrainsMillets',
    title: 'Whole Grains & Traditional Millets',
    subtitle: 'Whole wheat, Brown rice, Ragi (Finger millet), Bajra (Pearl millet), Jowar, Oats',
    iconName: 'Wheat',
    examples: 'Ragi roti/mudde, Bajra bhakri, Jowar roti, Broken wheat (Dalia), Brown rice, Oats',
    relevance: 'Complex carbohydrates, high Calcium (Ragi ~344mg/100g), Iron (Bajra), Folate, and B-complex vitamins.',
  },
  {
    key: 'fortifiedFoods',
    title: 'Fortified Foods (FSSAI +F Certified)',
    subtitle: 'Double fortified salt (Iron+Iodine), +F fortified milk/oil, or fortified cereals',
    iconName: 'Sparkles',
    examples: 'Double fortified salt, FSSAI +F packaged milk (Vit A & D), +F fortified edible oils, fortified atta',
    relevance: 'Crucial modern vehicle for bridging population-wide Vitamin D, Vitamin A, and Iron intake gaps.',
  },
];

export interface SymptomQuestionConfig {
  key: keyof import('@/types').SymptomsLifestyle;
  title: string;
  subtitle: string;
  type: 'frequency' | 'sun' | 'tea' | 'sleep';
  indicators: string[];
  options?: QuestionOption<any>[];
}

export const SYMPTOM_QUESTIONS_CONFIG: SymptomQuestionConfig[] = [
  {
    key: 'frequentFatigue',
    title: 'Persistent Fatigue & Low Daytime Energy',
    subtitle: 'Feeling constantly drained or tired despite having adequate nighttime rest.',
    type: 'frequency',
    indicators: ['Iron', 'Vitamin B12', 'Folate', 'Vitamin D'],
  },
  {
    key: 'generalWeakness',
    title: 'Generalized Body Weakness / Heavy Limbs',
    subtitle: 'Lack of muscular strength or feeling physically exhausted quickly during daily chores.',
    type: 'frequency',
    indicators: ['Protein', 'Iron', 'Vitamin D', 'Calcium'],
  },
  {
    key: 'difficultyConcentrating',
    title: 'Cognitive Sluggishness / Brain Fog / Poor Focus',
    subtitle: 'Difficulty focusing at work/studies, mental fatigue, or mild memory lapses.',
    type: 'frequency',
    indicators: ['Iron', 'Vitamin B12', 'Folate'],
  },
  {
    key: 'paleAppearance',
    title: 'Pale Skin, Pale Conjunctiva, or Brittle Spoon Nails',
    subtitle: 'Washed-out skin complexion, pale inner eyelids, cold extremities, or brittle nails.',
    type: 'frequency',
    indicators: ['Iron', 'Vitamin B12', 'Folate'],
  },
  {
    key: 'muscleCrampsWeakness',
    title: 'Muscle Cramps, Calf Spasms, or Bone Aches',
    subtitle: 'Involuntary muscle twitches, leg cramps at night, or generalized dull bone/back ache.',
    type: 'frequency',
    indicators: ['Calcium', 'Vitamin D', 'Protein'],
  },
  {
    key: 'hairSkinChanges',
    title: 'Excessive Hair Thinning, Dry Flaky Skin, or Slow Wound Healing',
    subtitle: 'Unusual hair shedding, brittle peeling nails, dry rough skin patches, or slow healing minor cuts.',
    type: 'frequency',
    indicators: ['Protein', 'Vitamin A', 'Iron'],
  },
  {
    key: 'poorAppetite',
    title: 'Loss of Appetite or Altered Taste Sensation',
    subtitle: 'Reduced desire to eat or feeling full very quickly during main meals.',
    type: 'frequency',
    indicators: ['Iron', 'Folate', 'Protein'],
  },
  {
    key: 'sunExposure',
    title: 'Direct Midday Sunlight Exposure',
    subtitle: 'Time spent outdoors in direct sunlight without full sunscreen on arms/face (11 AM – 2 PM).',
    type: 'sun',
    indicators: ['Vitamin D'],
    options: [
      {
        value: 'adequate_daily',
        label: 'Adequate Daily (15–30+ mins midday sun)',
        description: 'Regular outdoor exposure during peak daylight hours.',
      },
      {
        value: 'moderate_weekly',
        label: 'Moderate (1–3 times / week for 10–15 mins)',
        description: 'Occasional outdoor time or morning-only walks.',
      },
      {
        value: 'minimal_rare',
        label: 'Minimal to None (Indoor lifestyle / full coverage)',
        description: 'Almost entirely indoors during midday, always in shade or full sunscreen/clothing.',
      },
    ],
  },
  {
    key: 'teaCoffeeWithMeals',
    title: 'Tea or Coffee Consumed With or Immediately After Meals',
    subtitle: 'Drinking strong chai, black tea, or coffee within 45 minutes of main lunch/dinner.',
    type: 'tea',
    indicators: ['Iron Absorption Inhibitor'],
    options: [
      {
        value: 'often',
        label: 'Often / Daily with meals',
        description: 'Tannins bind to plant iron and reduce absorption by up to 60–80%.',
      },
      {
        value: 'sometimes',
        label: 'Sometimes (1–3 times a week)',
        description: 'Occasional tea/coffee right after lunch or dinner.',
      },
      {
        value: 'rarely',
        label: 'Rarely or Never (Gap of 1+ hour kept)',
        description: 'Healthy practice ensuring unhindered mineral absorption.',
      },
    ],
  },
  {
    key: 'sleepQuality',
    title: 'Average Sleep Duration & Quality',
    subtitle: 'Restorative uninterrupted sleep per night.',
    type: 'sleep',
    indicators: ['General Recovery'],
    options: [
      {
        value: 'good',
        label: 'Good (7–8+ hours restful sleep)',
        description: 'Wake up refreshed with stable morning energy.',
      },
      {
        value: 'average',
        label: 'Average (6–7 hours, occasional disruptions)',
        description: 'Moderate sleep quality.',
      },
      {
        value: 'poor',
        label: 'Poor (< 6 hours or fragmented sleep)',
        description: 'Frequent sleep debt affecting recovery and metabolic balance.',
      },
    ],
  },
];
