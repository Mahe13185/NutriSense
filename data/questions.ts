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
    description: 'Plant foods and dairy (milk, curd, paneer). No eggs, meat, or fish.',
  },
  {
    value: 'ovo_vegetarian',
    label: 'Ovo-Vegetarian',
    description: 'Plant foods and eggs. No dairy, meat, or fish.',
  },
  {
    value: 'vegan',
    label: 'Vegan',
    description: 'Only plant foods. No dairy, eggs, meat, or animal products.',
  },
  {
    value: 'pescatarian',
    label: 'Pescatarian',
    description: 'Plant foods, dairy, eggs, and fish or seafood. No meat or poultry.',
  },
  {
    value: 'non_vegetarian',
    label: 'Non-Vegetarian',
    description: 'All food types, including meat, poultry, fish, eggs, and dairy.',
  },
];

export const ACTIVITY_LEVEL_OPTIONS: QuestionOption[] = [
  {
    value: 'sedentary',
    label: 'Sedentary',
    description: 'Mostly sitting during the day with little or no regular exercise (such as a desk job).',
  },
  {
    value: 'lightly_active',
    label: 'Lightly Active',
    description: 'Light daily movement or walking 1 to 3 days a week.',
  },
  {
    value: 'moderately_active',
    label: 'Moderately Active',
    description: 'Moderate exercise, sports, or brisk walking 3 to 5 days a week.',
  },
  {
    value: 'very_active',
    label: 'Very Active / Heavy Work',
    description: 'Heavy daily exercise, sports training, or physically demanding work.',
  },
];

export const FOOD_FREQUENCY_OPTIONS: QuestionOption<FoodFrequency>[] = [
  {
    value: 'daily',
    label: 'Daily',
    description: 'Every day',
  },
  {
    value: '4-6_per_week',
    label: '4–6 times / week',
    description: 'Most days',
  },
  {
    value: '1-3_per_week',
    label: '1–3 times / week',
    description: 'A few days',
  },
  {
    value: 'rarely',
    label: 'Rarely',
    description: 'Once in a while',
  },
  {
    value: 'never',
    label: 'Never',
    description: 'Do not eat this',
  },
];

export const SYMPTOM_FREQUENCY_OPTIONS: QuestionOption<SymptomFrequency>[] = [
  {
    value: 'frequently',
    label: 'Frequently',
    description: 'On most days',
  },
  {
    value: 'sometimes',
    label: 'Sometimes',
    description: '1 to 2 times a week',
  },
  {
    value: 'rarely',
    label: 'Rarely',
    description: 'Only once in a while',
  },
  {
    value: 'never',
    label: 'Never',
    description: 'Not experienced',
  },
];

export interface DietaryQuestionConfig {
  key: keyof import('@/types').DietaryHabits;
  title: string;
  name: string;
  question: string;
  subtitle: string;
  iconName: string;
  examples: string;
  relevance?: string;
}

export const DIETARY_QUESTIONS_CONFIG: DietaryQuestionConfig[] = [
  {
    key: 'fruits',
    title: 'Fruits',
    name: 'Fruits',
    question: 'How often do you eat fruits?',
    subtitle: 'Fresh whole fruits in your regular meals or snacks.',
    iconName: 'Apple',
    examples: 'Apples, bananas, papaya, oranges, guava, and amla.',
  },
  {
    key: 'vegetables',
    title: 'Other Vegetables',
    name: 'Other Vegetables',
    question: 'How often do you eat other vegetables (besides leafy greens)?',
    subtitle: 'Cooked or raw vegetables consumed throughout the week.',
    iconName: 'Carrot',
    examples: 'Carrots, tomatoes, gourds, pumpkin, cauliflower, and capsicum.',
  },
  {
    key: 'greenLeafy',
    title: 'Green Leafy Vegetables',
    name: 'Green Leafy Vegetables',
    question: 'How often do you eat green leafy vegetables?',
    subtitle: 'Cooked greens, saag, or leafy additions to dals and curries.',
    iconName: 'Salad',
    examples: 'Palak (spinach), methi, drumstick (moringa) leaves, amaranth, and sarson.',
  },
  {
    key: 'pulsesLegumes',
    title: 'Dal, Beans & Pulses',
    name: 'Dal, Beans & Pulses',
    question: 'How often do you eat dal, beans, or lentils?',
    subtitle: 'Lentil soups, whole pulses, and legume dishes.',
    iconName: 'Wheat',
    examples: 'Toor dal, moong dal, chickpeas (chana), rajma, and sprouted beans.',
  },
  {
    key: 'dairyOrAlternatives',
    title: 'Milk & Dairy Alternatives',
    name: 'Milk & Dairy Alternatives',
    question: 'How often do you have milk, curd, or dairy alternatives?',
    subtitle: 'Dairy products or fortified plant-based milk drinks.',
    iconName: 'Milk',
    examples: 'Milk, curd (dahi), paneer, buttermilk (chaas), or fortified soy/almond milk.',
  },
  {
    key: 'eggsMeatFish',
    title: 'Eggs, Meat & Fish',
    name: 'Eggs, Meat & Fish',
    question: 'How often do you eat eggs, poultry, meat, or fish?',
    subtitle: 'Animal-source foods (automatically marked as Never for vegetarian/vegan diets).',
    iconName: 'Beef',
    examples: 'Eggs, chicken, fish, mutton, or other seafood.',
  },
  {
    key: 'nutsSeeds',
    title: 'Nuts & Seeds',
    name: 'Nuts & Seeds',
    question: 'How often do you eat nuts or seeds?',
    subtitle: 'Nuts, dry fruits, and edible seeds eaten raw or added to meals.',
    iconName: 'Nut',
    examples: 'Almonds, walnuts, peanuts, sesame seeds (til), and chia or flaxseeds.',
  },
  {
    key: 'wholeGrainsMillets',
    title: 'Whole Grains & Millets',
    name: 'Whole Grains & Millets',
    question: 'How often do you eat whole grains or traditional millets?',
    subtitle: 'Whole grain rotis, millets, and unrefined grains.',
    iconName: 'Wheat',
    examples: 'Ragi, bajra, jowar, whole wheat roti, brown rice, or oats.',
  },
  {
    key: 'fortifiedFoods',
    title: 'Fortified Foods',
    name: 'Fortified Foods',
    question: 'How often do you consume fortified foods?',
    subtitle: 'Common packaged staples enriched with essential vitamins and minerals.',
    iconName: 'Sparkles',
    examples: 'Double fortified salt (iron + iodine), and packaged milk or oil with added vitamins.',
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
    title: 'Do you often feel tired or low on energy?',
    subtitle: 'Feeling drained or lacking energy during normal daily activities.',
    type: 'frequency',
    indicators: ['Iron', 'Vitamin B12', 'Folate', 'Vitamin D'],
  },
  {
    key: 'generalWeakness',
    title: 'Do you often feel physically weak or get tired easily?',
    subtitle: 'Lack of physical muscle strength or tiring quickly during ordinary tasks.',
    type: 'frequency',
    indicators: ['Protein', 'Iron', 'Vitamin D', 'Calcium'],
  },
  {
    key: 'difficultyConcentrating',
    title: 'Do you often have trouble concentrating or remembering things?',
    subtitle: 'Mental fatigue, difficulty staying focused, or occasional memory lapses.',
    type: 'frequency',
    indicators: ['Iron', 'Vitamin B12', 'Folate'],
  },
  {
    key: 'paleAppearance',
    title: 'Have you noticed unusual paleness or brittle nails?',
    subtitle: 'Unusually pale skin, pale inner eyelids, or easily broken nails.',
    type: 'frequency',
    indicators: ['Iron', 'Vitamin B12', 'Folate'],
  },
  {
    key: 'muscleCrampsWeakness',
    title: 'Do you often experience muscle cramps or bone discomfort?',
    subtitle: 'Frequent calf cramps, muscle spasms, or dull body and joint aches.',
    type: 'frequency',
    indicators: ['Calcium', 'Vitamin D', 'Protein'],
  },
  {
    key: 'hairSkinChanges',
    title: 'Have you noticed unusual hair loss or dry skin?',
    subtitle: 'Noticeable hair shedding, dry or rough skin patches, or slow healing of small cuts.',
    type: 'frequency',
    indicators: ['Protein', 'Vitamin A', 'Iron'],
  },
  {
    key: 'poorAppetite',
    title: 'Do you often have a poor appetite or changes in your sense of taste?',
    subtitle: 'Reduced desire to eat or noticeable changes in how food tastes.',
    type: 'frequency',
    indicators: ['Iron', 'Folate', 'Protein'],
  },
  {
    key: 'sunExposure',
    title: 'How much time do you usually spend outdoors in daylight?',
    subtitle: 'Sunlight exposure helps your body naturally produce Vitamin D.',
    type: 'sun',
    indicators: ['Vitamin D'],
    options: [
      {
        value: 'adequate_daily',
        label: 'Daily (20+ minutes)',
        description: 'Regular time spent outdoors in daylight on most days.',
      },
      {
        value: 'moderate_weekly',
        label: 'A few times a week',
        description: 'Some time outdoors or occasional daylight exposure.',
      },
      {
        value: 'minimal_rare',
        label: 'Rarely or almost none',
        description: 'Mostly indoors during daylight hours.',
      },
    ],
  },
  {
    key: 'teaCoffeeWithMeals',
    title: 'How often do you drink tea or coffee with or immediately after meals?',
    subtitle: 'Drinking tea or coffee close to meals can reduce how well your body absorbs iron from food.',
    type: 'tea',
    indicators: ['Iron Absorption'],
    options: [
      {
        value: 'often',
        label: 'Often or daily with meals',
        description: 'Regularly drink tea or coffee during or right after meals.',
      },
      {
        value: 'sometimes',
        label: 'Sometimes',
        description: 'A few times a week with meals.',
      },
      {
        value: 'rarely',
        label: 'Rarely or never',
        description: 'Usually keep a gap of an hour or more from meals.',
      },
    ],
  },
  {
    key: 'sleepQuality',
    title: 'How many hours do you usually sleep each night?',
    subtitle: 'Adequate rest supports daily energy and overall recovery.',
    type: 'sleep',
    indicators: ['General Rest'],
    options: [
      {
        value: 'good',
        label: '7 to 9 hours',
        description: 'Adequate rest on most nights.',
      },
      {
        value: 'average',
        label: '6 to 7 hours',
        description: 'Moderate sleep duration.',
      },
      {
        value: 'poor',
        label: 'Less than 6 hours',
        description: 'Short or interrupted sleep.',
      },
    ],
  },
];
