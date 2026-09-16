import { GuidelineSection } from '@/types';

export const GUIDELINES_SECTIONS: GuidelineSection[] = [
  {
    id: 'icmr-nin-2024',
    title: 'ICMR – National Institute of Nutrition (ICMR-NIN) 2024 Guidelines',
    source: 'ICMR-NIN Dietary Guidelines for Indians (Released May 2024)',
    sourceUrl: 'https://www.nin.res.in/dietaryguidelines/',
    badge: 'Primary Indian Reference',
    summary:
      'The 2024 ICMR-NIN Dietary Guidelines provide an evidence-based framework for diverse Indian populations to prevent micronutrient deficiencies (hidden hunger) and chronic non-communicable diseases.',
    keyPoints: [
      'My Plate for the Day: Recommends sourcing 50–55% of daily energy from carbohydrates (minimizing refined cereals), 10–15% from protein, and 20–30% from healthy fats.',
      'Minimum Daily Green & Vegetable Target: Consume at least 400g of vegetables (including 100g of green leafy vegetables) and 100–150g of fresh whole fruits daily.',
      'Pulse & Legume Target: Consume at least 80–100g of pulses, legumes, or flesh foods daily to secure essential amino acids and minerals.',
      'Dairy & Milk Equivalents: Ensure 300ml of milk or equivalent dairy products (curd, paneer, buttermilk) daily for bioavailable calcium and Vitamin B12.',
      'Nutrient Bioavailability: Emphasizes traditional food processing techniques — overnight soaking of legumes, sprouting, and lactic fermentation — to reduce antinutrients like phytates and tannins.',
      'Sugar & Salt Caps: Restrict added sugar to < 20–25g/day (< 5% of total energy) and dietary salt (sodium chloride) to < 5g/day (< 2g sodium).',
    ],
    practicalTips: [
      'Pair plant-based iron meals (dal, leafy greens, ragi) with fresh lemon juice or amla (Vitamin C) to boost absorption by up to 300%.',
      'Avoid drinking strong tea or coffee within 45–60 minutes of main meals, as polyphenols inhibit iron and zinc absorption.',
      'Choose FSSAI (+F) certified fortified staples like Double Fortified Salt (DFS) and Vitamin A/D fortified milk/oil.',
    ],
  },
  {
    id: 'who-healthy-diet',
    title: 'World Health Organization (WHO) Healthy Diet Guidelines',
    source: 'WHO Healthy Diet Factsheet N°394 & Global Nutrition Reports',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet',
    badge: 'Supporting Global Reference',
    summary:
      'WHO guidelines emphasize balanced energy intake, dietary diversity across all food groups, and the eradication of micronutrient malnutrition through sustainable whole-food dietary patterns.',
    keyPoints: [
      'Eat at least 400 g (i.e. five portions) of fruit and vegetables per day, excluding potatoes, sweet potatoes, cassava, and other starchy roots.',
      'Fat Intake Optimization: Less than 30% of total energy intake should come from fats, favoring unsaturated fats (found in fish, avocado, nuts, seeds, and vegetable oils) over saturated fats and industrial trans-fats.',
      'Sodium & Potassium Balance: Less than 2g of sodium per day (equivalent to 5g salt) combined with high potassium from fresh fruits/vegetables to lower blood pressure and stroke risk.',
      'Free Sugars Limitation: Less than 10% of total energy intake from free sugars, with additional health benefits observed below 5%.',
    ],
    practicalTips: [
      'Include vegetables in all meals and eat fresh fruit and raw vegetables as snacks.',
      'Cook by steaming or boiling rather than deep-frying foods.',
      'Replace butter and lard with oils rich in polyunsaturated fats like olive, sunflower, and mustard oil.',
    ],
  },
];

export const RDA_TABLE_DATA = [
  {
    nutrient: 'Iron (Fe)',
    men: '19 mg / day',
    women: '29 mg / day (27 mg in pregnancy)',
    icmrSource: 'ICMR-NIN 2024 / Nutrient Requirements for Indians',
    keyRole: 'Hemoglobin, cellular oxygenation, cognitive focus',
  },
  {
    nutrient: 'Vitamin B12',
    men: '2.5 mcg / day',
    women: '2.5 mcg / day (3.0 mcg in pregnancy/lactation)',
    icmrSource: 'ICMR-NIN 2024 / WHO Daily Micronutrients',
    keyRole: 'Nerve sheath integrity, RBC maturation, DNA synthesis',
  },
  {
    nutrient: 'Vitamin D3',
    men: '600 IU (15 mcg) / day',
    women: '600 IU (15 mcg) / day (800+ IU if elderly/indoor)',
    icmrSource: 'ICMR-NIN 2024 Guidelines',
    keyRole: 'Intestinal calcium uptake, bone mineralization, immunity',
  },
  {
    nutrient: 'Calcium (Ca)',
    men: '1000 mg / day',
    women: '1000 mg / day (1200 mg post-menopause/lactation)',
    icmrSource: 'ICMR-NIN 2024 Guidelines',
    keyRole: 'Bone density, neuromuscular transmission, muscle contraction',
  },
  {
    nutrient: 'Vitamin A',
    men: '1000 mcg RE / day',
    women: '840 mcg RE / day (900 mcg in pregnancy)',
    icmrSource: 'ICMR-NIN 2024 Guidelines',
    keyRole: 'Rhodopsin dark adaptation, mucosal epithelial barrier defense',
  },
  {
    nutrient: 'Folate (Vit B9)',
    men: '300 mcg / day',
    women: '220 mcg / day (570 mcg in pregnancy)',
    icmrSource: 'ICMR-NIN 2024 Guidelines',
    keyRole: 'Cell division, rapid tissue growth, neural tube protection',
  },
  {
    nutrient: 'Protein',
    men: '54 g / day (0.83 g/kg/day)',
    women: '46 g / day (0.83 g/kg/day, higher in pregnancy)',
    icmrSource: 'ICMR-NIN 2024 Guidelines',
    keyRole: 'Muscle mass maintenance, enzyme & antibody synthesis',
  },
];

export const WORKFLOW_STEPS = [
  {
    step: '1',
    title: 'User Profile & Context',
    description: 'Collects age, biological sex, anthropometrics (BMI calculation), physical activity level, and dietary preference (vegetarian, vegan, non-veg).',
    icon: 'User',
  },
  {
    step: '2',
    title: 'Food Group Frequency Mapping',
    description: 'Evaluates weekly consumption frequencies across 9 crucial food groups against ICMR-NIN recommended dietary frequencies.',
    icon: 'Utensils',
  },
  {
    step: '3',
    title: 'Self-Reported Lifestyle & Indicators',
    description: 'Screens for self-reported physical sensations (fatigue, cramps, skin changes) alongside lifestyle factors (sunlight, tea habits).',
    icon: 'Activity',
  },
  {
    step: '4',
    title: 'Rule-Based Pattern Synthesis',
    description: 'Cross-evaluates dietary intake deficits against reported indicator weights using transparent, academic prototype scoring algorithms.',
    icon: 'Cpu',
  },
  {
    step: '5',
    title: 'Nutritional Risk Indications',
    description: 'Generates non-diagnostic risk levels (Low, Moderate, Elevated) with human-readable rationale and ICMR-aligned whole-food recommendations.',
    icon: 'FileText',
  },
];

export const METHODOLOGY_LIMITATIONS = [
  {
    title: 'Strictly Non-Diagnostic Scope',
    description: 'NutriSense is an academic educational prototype developed to foster dietary awareness. It does NOT provide clinical diagnoses or replace professional laboratory blood work (such as serum ferritin, 25-OH Vitamin D, or serum B12 tests).',
  },
  {
    title: 'Self-Reported Data Reliance',
    description: 'Assessment accuracy is directly contingent upon the completeness and fidelity of user-entered answers regarding food frequency and physical indicators.',
  },
  {
    title: 'Non-Linear Biological Variations',
    description: 'Individual nutrient absorption is governed by genetics, gastrointestinal health, prescription medications, microbiome diversity, and underlying chronic conditions not accounted for in simple screening questionnaires.',
  },
  {
    title: 'Requirement for Healthcare Consultation',
    description: 'Any persistent or severe symptoms (such as chronic exhaustion, chest discomfort, severe dizziness, or neurological numbness) warrant immediate in-person evaluation by a qualified medical doctor or registered dietitian.',
  },
];
