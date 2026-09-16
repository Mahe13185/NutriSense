import { NutrientInfo } from '@/types';

export const NUTRIENTS_DATA: NutrientInfo[] = [
  {
    id: 'iron',
    name: 'Iron (Fe)',
    tagline: 'Vital for hemoglobin synthesis, cellular oxygen delivery, and cognitive stamina.',
    category: 'mineral',
    icmrRda: {
      general: '19–29 mg/day (varies by age & biological sex)',
      men: '19 mg/day',
      women: '29 mg/day (increased during pregnancy to 27–40 mg/day)',
    },
    keyFunctions: [
      'Core component of hemoglobin which carries oxygen from lungs to body tissues',
      'Supports myoglobin for muscle oxygen storage during physical activity',
      'Essential for cellular energy production and immune system function',
      'Supports neurodevelopment and neurotransmitter synthesis',
    ],
    commonDeficiencyIndicators: [
      'Persistent tiredness and generalized weakness',
      'Pale or washed-out appearance of skin and conjunctiva',
      'Shortness of breath during mild exertion',
      'Cold hands and feet, brittle spoon-shaped nails (koilonychia)',
      'Difficulty maintaining concentration or cognitive alertness',
    ],
    topFoodSources: {
      vegetarian: [
        'Green Leafy Vegetables (Spinach, Amaranth, Drumstick/Moringa leaves, Fenugreek)',
        'Legumes & Pulses (Chickpeas, Rajma, Lentils, Sprouted Moong)',
        'Whole Grains & Millets (Finger millet/Ragi, Bajra, Foxtail millet)',
        'Jaggery, Garden cress seeds (Halim/Aliv), Black raisins, Sesame seeds',
      ],
      vegan: [
        'Moringa/Drumstick leaves, Sundried tomatoes, Pumpkin seeds, Tofu',
        'Soybeans, Lentils, Bajra, Halim seeds soaked with lemon water',
      ],
      nonVegetarian: [
        'Poultry, Liver, Mutton, Fish, Egg yolks (rich in highly bioavailable Heme iron)',
      ],
      fortified: [
        'Double Fortified Salt (DFS - Iron + Iodine)',
        'Iron-fortified breakfast cereals and fortified flour (FSSAI +F logo)',
      ],
    },
    absorptionEnhancers: [
      'Vitamin C (Amla, Guava, Lemon juice, Bell peppers, Tomatoes, Oranges)',
      'Germination/Sprouting of pulses (reduces phytates significantly)',
      'Fermentation of batters (Idli/Dosa fermentation increases bioavailable iron)',
    ],
    absorptionInhibitors: [
      'Tannins & Polyphenols in Tea/Coffee taken immediately before or after meals (wait at least 45–60 min)',
      'High Phytates in unsoaked grains/legumes (overnight soaking mitigates this)',
      'Excessive Calcium taken simultaneously with iron-rich plant meals',
    ],
    icmr2024Insights:
      'ICMR-NIN 2024 emphasizes consuming at least 100g of green leafy vegetables daily, incorporating germinated pulses, and pairing plant iron with local Vitamin C sources like Indian Gooseberry (Amla) or lemon to counter phytate inhibition.',
  },
  {
    id: 'vitamin_b12',
    name: 'Vitamin B12 (Cobalamin)',
    tagline: 'Crucial for nervous system integrity, DNA synthesis, and red blood cell maturation.',
    category: 'vitamin',
    icmrRda: {
      general: '2.2–2.5 mcg/day for adults',
      men: '2.5 mcg/day',
      women: '2.5 mcg/day (3.0 mcg/day in pregnancy & lactation)',
    },
    keyFunctions: [
      'Maintains the protective myelin sheath surrounding nerve fibers',
      'Essential cofactor for red blood cell formation in bone marrow',
      'Required for DNA replication and homocysteine metabolism',
      'Supports brain function, mood regulation, and cognitive sharpness',
    ],
    commonDeficiencyIndicators: [
      'Unexplained chronic fatigue and lightheadedness',
      'Tingling, numbness, or "pins and needles" in hands and feet (peripheral neuropathy)',
      'Sore, smooth red tongue (glossitis) or mouth ulcers',
      'Memory lapses, brain fog, and irritability',
      'Balance issues and muscular unsteadiness',
    ],
    topFoodSources: {
      vegetarian: [
        'Curd / Yogurt, Paneer (Cottage cheese), Fresh Milk, Buttermilk, Cheese',
      ],
      vegan: [
        'Fortified plant milks (Soy, Almond with B12)',
        'Fortified nutritional yeast',
        'Fortified breakfast cereals (Vegans must monitor and consider doctor-guided supplementation)',
      ],
      nonVegetarian: [
        'Eggs, Fish (Rohu, Hilsa, Salmon, Mackerel), Poultry, Meat',
      ],
      fortified: [
        'B12-fortified soy milk, almond milk, and fortified energy bars',
      ],
    },
    absorptionEnhancers: [
      'Adequate stomach acid production (hydrochloric acid and intrinsic factor)',
      'Regular distribution of dairy/fortified foods across daily meals',
    ],
    absorptionInhibitors: [
      'Long-term use of antacids/PPIs (which suppress stomach acid needed to release B12)',
      'Heavy alcohol consumption and gut malabsorption syndromes',
    ],
    icmr2024Insights:
      'Given the high prevalence of vegetarian diets in India, ICMR-NIN 2024 highlights that dairy foods are the primary natural source for vegetarians. Strict vegans are advised to consume fortified foods regularly or consult healthcare professionals for tailored supplementation.',
  },
  {
    id: 'vitamin_d',
    name: 'Vitamin D3 (Cholecalciferol)',
    tagline: 'The sunshine hormone essential for calcium absorption, bone density, and immune resilience.',
    category: 'vitamin',
    icmrRda: {
      general: '600–800 IU/day (15–20 mcg/day) under minimal sunlight',
      men: '600 IU/day (400–800 IU)',
      women: '600 IU/day',
      special: 'Up to 1000 IU/day for elderly or indoor workers',
    },
    keyFunctions: [
      'Facilitates active intestinal absorption of Calcium and Phosphorus',
      'Maintains bone mineralization and prevents rickets / osteomalacia',
      'Modulates innate and adaptive immune cell signaling',
      'Supports neuromuscular strength and reduces fall risks',
    ],
    commonDeficiencyIndicators: [
      'Persistent generalized bone ache and lower back pain',
      'Proximal muscle weakness and heaviness in legs when climbing stairs',
      'Frequent seasonal respiratory infections and slower wound healing',
      'Low mood, lethargy, and sleep disturbances',
    ],
    topFoodSources: {
      vegetarian: [
        'Fortified Milk & Dairy Products (marked with +F logo)',
        'Sun-exposed Wild Mushrooms',
      ],
      vegan: [
        'Fortified plant-based milks and fortified orange juice',
        'UV-irradiated mushrooms',
      ],
      nonVegetarian: [
        'Fatty Fish (Salmon, Sardines, Mackerel, Tuna), Egg Yolks, Cod liver oil',
      ],
      fortified: [
        'FSSAI +F Fortified Milk, Fortified Edible Vegetable Oils',
      ],
    },
    absorptionEnhancers: [
      'Sensible midday sun exposure (15–30 min between 11 AM – 2 PM with arms & face exposed)',
      'Consuming Vitamin D with dietary fats (Vitamin D is fat-soluble)',
    ],
    absorptionInhibitors: [
      'High melanin skin pigmentation requiring longer sun exposure',
      'Sunscreen usage (SPF 30+ reduces cutaneous synthesis by >95%)',
      'Exclusively indoor lifestyles and air pollution filtering UVB rays',
    ],
    icmr2024Insights:
      'Natural food sources of Vitamin D are very limited. ICMR-NIN 2024 strongly promotes daily sunlight exposure, consumption of FSSAI +F fortified milk and edible oils, and periodic medical screening for urban populations.',
  },
  {
    id: 'calcium',
    name: 'Calcium (Ca)',
    tagline: 'Fundamental structural block for bones, teeth, cardiac rhythm, and muscular contraction.',
    category: 'mineral',
    icmrRda: {
      general: '1000 mg/day for adult men & women',
      men: '1000 mg/day',
      women: '1000 mg/day (1200 mg/day during lactation & post-menopause)',
    },
    keyFunctions: [
      'Maintains skeletal rigidity and mineral reservoir for bone density',
      'Enables normal muscle contraction and neuromuscular transmission',
      'Essential for blood coagulation cascade',
      'Regulates normal blood pressure and vascular muscle tone',
    ],
    commonDeficiencyIndicators: [
      'Frequent muscle cramps, twitches, or spasms in calves and fingers',
      'Brittle, peeling fingernails and weak tooth enamel',
      'Numbness or tingling around the mouth and extremities',
      'Long-term risk of low bone mineral density (osteopenia/osteoporosis)',
    ],
    topFoodSources: {
      vegetarian: [
        'Milk, Curd/Yogurt, Paneer, Whey, Buttermilk',
        'Finger Millet (Ragi - highest calcium among cereals ~344mg/100g)',
        'Sesame seeds (Til - ~975mg/100g), Poppy seeds (Khus-khus)',
        'Green leafy vegetables (Curry leaves, Fenugreek, Moringa)',
      ],
      vegan: [
        'Ragi (Finger millet), White and Black Sesame seeds, Moringa leaves',
        'Calcium-set Tofu, Fortified Plant Milk, Fig (Anjeer), Almonds',
      ],
      nonVegetarian: [
        'Small bony fish (such as canned sardines, Anchovies / Nethili eaten with bones)',
      ],
      fortified: [
        'Calcium-fortified fruit juices and plant-based milk alternatives',
      ],
    },
    absorptionEnhancers: [
      'Adequate Vitamin D status (essential for active calcium transport)',
      'Lactose in dairy improves passive calcium absorption',
      'Spreading calcium intake throughout the day rather than one large dose',
    ],
    absorptionInhibitors: [
      'Oxalates in raw spinach, rhubarb, and beet greens (cooking reduces unbound oxalates)',
      'Excess sodium and excessive caffeine intake which increases urinary calcium excretion',
      'Unrefined high phytate bran eaten simultaneously without soaking',
    ],
    icmr2024Insights:
      'ICMR-NIN 2024 recommends consuming at least 300 ml of milk/dairy equivalents daily alongside traditional calcium powerhouses like Ragi (Finger Millet) and sesame seeds to achieve the 1000 mg/day target.',
  },
  {
    id: 'vitamin_a',
    name: 'Vitamin A (Retinol & Carotenoids)',
    tagline: 'Vital for ocular health, vision in dim light, epithelial barrier defense, and immunity.',
    category: 'vitamin',
    icmrRda: {
      general: '840–1000 mcg RE/day',
      men: '1000 mcg RE/day',
      women: '840 mcg RE/day (900 mcg in pregnancy, 1300 mcg in lactation)',
    },
    keyFunctions: [
      'Forms rhodopsin in retinal photoreceptors for dark adaptation and night vision',
      'Maintains integrity of mucosal linings in respiratory, GI, and urinary tracts',
      'Enhances antibody response and cell-mediated immunity',
      'Promotes cellular turnover and healthy skin architecture',
    ],
    commonDeficiencyIndicators: [
      'Difficulty seeing in low light or dusk (night blindness / nyctalopia)',
      'Dry, irritated eyes with feeling of grittiness (xerophthalmia)',
      'Frequent respiratory infections and slow healing skin lesions',
      'Dry, bumpy skin (follicular hyperkeratosis)',
    ],
    topFoodSources: {
      vegetarian: [
        'Orange/Yellow fruits and vegetables (Carrots, Ripe Papaya, Mango, Pumpkin, Sweet Potato)',
        'Dark Green Leafy Vegetables (Spinach, Amaranth, Drumstick/Moringa leaves, Methi)',
        'Full cream milk, Ghee, Butter, Paneer',
      ],
      vegan: [
        'Carrots, Pumpkin, Sweet potatoes, Papaya, Apricots, Moringa leaves, Red palm fruit',
      ],
      nonVegetarian: [
        'Egg yolks, Liver, Fish liver oils, Oily fish',
      ],
      fortified: [
        'FSSAI +F Fortified Milk and Fortified Edible Vegetable Oils',
      ],
    },
    absorptionEnhancers: [
      'Consuming beta-carotene rich vegetables with healthy fats (ghee, oil, nuts)',
      'Mild cooking or steaming (softens cell walls and liberates carotenoids)',
    ],
    absorptionInhibitors: [
      'Very low fat diets (<15g fat/day reduces provitamin A absorption)',
      'Severe Zinc deficiency (Zinc is needed for retinol-binding protein synthesis)',
    ],
    icmr2024Insights:
      'Plant-based provitamin A (beta-carotene) requires dietary fat for optimal conversion to active Retinol. ICMR-NIN recommends consuming deep orange and dark green vegetables regularly cooked with a measured amount of healthy fats.',
  },
  {
    id: 'folate',
    name: 'Folate / Vitamin B9',
    tagline: 'Essential for cell division, DNA synthesis, amino acid metabolism, and fetal development.',
    category: 'vitamin',
    icmrRda: {
      general: '220–300 mcg/day for adults',
      men: '300 mcg/day',
      women: '220 mcg/day (570 mcg/day in pregnancy, 330 mcg/day in lactation)',
    },
    keyFunctions: [
      'Critical for rapid cell division, tissue growth, and embryogenesis',
      'Works synergistically with Vitamin B12 to produce mature red blood cells',
      'Prevents neural tube defects (NTDs) during early fetal development',
      'Helps convert homocysteine to methionine, supporting cardiovascular wellness',
    ],
    commonDeficiencyIndicators: [
      'Fatigue, weakness, and shortness of breath (megaloblastic anemia)',
      'Mouth sores, swollen tongue, and altered taste sensations',
      'Cognitive sluggishness, irritability, and head heaviness',
      'Elevated plasma homocysteine levels',
    ],
    topFoodSources: {
      vegetarian: [
        'Dark Green Leafy Vegetables (Spinach, Mustard greens, Fenugreek/Methi, Mint, Coriander)',
        'Pulses & Legumes (Bengal gram, Green moong, Lentils, Black-eyed peas, Chickpeas)',
        'Peanuts, Sunflower seeds, Wheat germ, Fortified grain products',
      ],
      vegan: [
        'Sprouted legumes, Spinach, Asparagus, Avocado, Peanuts, Oranges, Fortified cereals',
      ],
      nonVegetarian: [
        'Eggs, Liver, Seafood, Poultry',
      ],
      fortified: [
        'Folate-fortified flours, rice, and breakfast cereals',
      ],
    },
    absorptionEnhancers: [
      'Fresh raw or lightly steamed greens (folate is heat and water sensitive)',
      'Adequate Vitamin C and B12 intake for metabolic harmony',
    ],
    absorptionInhibitors: [
      'Overcooking or boiling vegetables for prolonged periods in open vessels (up to 50–70% folate lost in water)',
      'Chronic alcohol consumption which impairs folate absorption and renal reabsorption',
    ],
    icmr2024Insights:
      'Folate is extremely heat-sensitive. ICMR-NIN 2024 recommends steaming vegetables instead of prolonged open boiling, consuming sprouted legumes, and ensuring women of reproductive age maintain adequate folate intake.',
  },
  {
    id: 'protein',
    name: 'Dietary Protein & Essential Amino Acids',
    tagline: 'The structural foundation for muscle mass, enzymatic reactions, antibodies, and cellular repair.',
    category: 'macronutrient',
    icmrRda: {
      general: '0.83–1.0 g per kg body weight/day (approx 54g for men, 46g for women)',
      men: '54 g/day (based on 65 kg reference adult)',
      women: '46 g/day (based on 55 kg reference adult, higher in pregnancy/lactation)',
    },
    keyFunctions: [
      'Maintains muscle protein synthesis, tissue repair, and structural integrity',
      'Catalyzes biochemical reactions as functional enzymes and peptide hormones',
      'Forms antibodies and immunoglobulins for pathogen defense',
      'Transports nutrients, oxygen, and electrolytes across cell membranes',
    ],
    commonDeficiencyIndicators: [
      'Loss of lean muscle tone and slow exercise recovery',
      'Thinning brittle hair, skin peeling, and weak split nails',
      'Persistent sugar cravings and frequent hunger pangs between meals',
      'Frequent infections and slow recovery from minor illnesses',
      'Fluid retention or mild edema in severe insufficiency',
    ],
    topFoodSources: {
      vegetarian: [
        'Pulses & Dals (Moong, Toor, Chana, Masoor, Urad)',
        'Soybeans, Edamame, Paneer, Greek Yogurt / Hung Curd, Milk',
        'Nuts & Seeds (Almonds, Peanuts, Walnuts, Pumpkin seeds, Chia seeds)',
        'Millets & Whole grains (Quinoa, Amaranth grain/Rajgira, Oats)',
      ],
      vegan: [
        'Tofu, Tempeh, Soy chunks (52% protein), Sprouted legumes, Hemp seeds, Spirulina, Lentils',
      ],
      nonVegetarian: [
        'Eggs (whole egg ~6g), Chicken breast, Fish (Rohu, Salmon), Lean meats',
      ],
      fortified: [
        'Fortified plant protein powders, high-protein flour blends',
      ],
    },
    absorptionEnhancers: [
      'Combining complementary plant proteins (Cereal + Pulse combination like Khichdi, Idli/Dosa to balance Lysine and Methionine)',
      'Proper cooking, pressure cooking, and fermentation to improve protein digestibility corrected amino acid score (PDCAAS)',
    ],
    absorptionInhibitors: [
      'Antinutritional factors (trypsin inhibitors in raw unboiled soybeans/legumes)',
      'Extremely high fiber consumed simultaneously without adequate hydration',
    ],
    icmr2024Insights:
      'ICMR-NIN 2024 highlights that plant-based Indian diets can easily achieve complete amino acid profiles by combining cereals and pulses in a 3:1 or 4:1 ratio (e.g. Rice + Dal, Roti + Dal) and including dairy or soy products.',
  },
];

export function getNutrientById(id: string): NutrientInfo | undefined {
  return NUTRIENTS_DATA.find((n) => n.id === id);
}
