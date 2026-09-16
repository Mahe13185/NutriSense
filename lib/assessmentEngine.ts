import {
  AssessmentFormData,
  AssessmentResult,
  NutrientRiskAssessment,
  RiskLevel,
  FoodFrequency,
  SymptomFrequency,
} from '@/types';

// Scoring multipliers for food frequency (0 = never, 100 = optimal daily)
const FREQUENCY_SCORES: Record<FoodFrequency, number> = {
  daily: 100,
  '4-6_per_week': 80,
  '1-3_per_week': 45,
  rarely: 15,
  never: 0,
};

// Weight multiplier for self-reported symptoms (0 = never, 100 = frequent burden)
const SYMPTOM_SCORES: Record<SymptomFrequency, number> = {
  frequently: 100,
  sometimes: 60,
  rarely: 25,
  never: 0,
};

function getFrequencyScore(freq: FoodFrequency | ''): number {
  if (!freq) return 50;
  return FREQUENCY_SCORES[freq] ?? 50;
}

function getSymptomScore(sym: SymptomFrequency | ''): number {
  if (!sym) return 0;
  return SYMPTOM_SCORES[sym] ?? 0;
}

export function evaluateAssessment(formData: AssessmentFormData): AssessmentResult {
  const { basicInfo, dietaryHabits, symptomsLifestyle } = formData;
  const isVegan = basicInfo.dietaryPreference === 'vegan';
  const isVegetarian = basicInfo.dietaryPreference === 'vegetarian' || basicInfo.dietaryPreference === 'lacto_vegetarian' || isVegan;
  const isFemale = basicInfo.sex === 'female';

  const nutrients: NutrientRiskAssessment[] = [];

  // ==========================================
  // 1. IRON (Fe) ASSESSMENT
  // ==========================================
  {
    const glvScore = getFrequencyScore(dietaryHabits.greenLeafy);
    const pulseScore = getFrequencyScore(dietaryHabits.pulsesLegumes);
    const grainsScore = getFrequencyScore(dietaryHabits.wholeGrainsMillets);
    const nonVegScore = isVegetarian ? 0 : getFrequencyScore(dietaryHabits.eggsMeatFish);
    const fruitScore = getFrequencyScore(dietaryHabits.fruits); // Vitamin C enhancer
    const fortifiedScore = getFrequencyScore(dietaryHabits.fortifiedFoods);

    // Plant iron is lower bioavailability unless complemented with Vitamin C or meat
    const plantBase = (glvScore * 0.35 + pulseScore * 0.35 + grainsScore * 0.2 + fortifiedScore * 0.1);
    const bioBoost = (fruitScore / 100) * 15;
    let intakeScore = Math.min(100, isVegetarian ? (plantBase * 0.85 + bioBoost) : (plantBase * 0.5 + nonVegScore * 0.5 + bioBoost));

    // Tea/Coffee with meals inhibits iron
    if (symptomsLifestyle.teaCoffeeWithMeals === 'often') {
      intakeScore = Math.max(0, intakeScore - 20);
    } else if (symptomsLifestyle.teaCoffeeWithMeals === 'sometimes') {
      intakeScore = Math.max(0, intakeScore - 8);
    }

    const fatigueScore = getSymptomScore(symptomsLifestyle.frequentFatigue);
    const paleScore = getSymptomScore(symptomsLifestyle.paleAppearance);
    const brainFogScore = getSymptomScore(symptomsLifestyle.difficultyConcentrating);
    const symptomBurden = paleScore * 0.45 + fatigueScore * 0.35 + brainFogScore * 0.2;

    // Risk score: Higher when intake is low AND symptom burden is high
    const baseRisk = (100 - intakeScore) * 0.6 + symptomBurden * 0.4;
    // Women have significantly higher iron needs per ICMR (29mg vs 19mg)
    const sexAdjustedRisk = isFemale ? Math.min(100, baseRisk * 1.12) : baseRisk;
    const finalRiskScore = Math.round(sexAdjustedRisk);

    let riskLevel: RiskLevel = 'low';
    if (finalRiskScore >= 62) riskLevel = 'elevated';
    else if (finalRiskScore >= 38) riskLevel = 'moderate';

    const reasons: string[] = [];
    const dietaryFactors: string[] = [];
    const symptomIndicators: string[] = [];

    if (dietaryHabits.greenLeafy === 'rarely' || dietaryHabits.greenLeafy === 'never') {
      reasons.push('Infrequent consumption of dark green leafy vegetables (rich source of plant iron).');
      dietaryFactors.push('Dark Green Leafy Vegetables: Low frequency');
    }
    if (dietaryHabits.pulsesLegumes === 'rarely' || dietaryHabits.pulsesLegumes === 'never') {
      reasons.push('Low intake of legumes, dals, and sprouted pulses.');
      dietaryFactors.push('Pulses/Legumes: Low frequency');
    }
    if (symptomsLifestyle.teaCoffeeWithMeals === 'often') {
      reasons.push('Drinking tea or coffee right with meals introduces tannins that inhibit plant-based iron absorption by up to 60%.');
      dietaryFactors.push('Mealtime Tea/Coffee: High frequency inhibitor');
    }
    if (isFemale) {
      reasons.push('Biological women have elevated physiological iron requirements (ICMR RDA: 29 mg/day).');
    }

    if (symptomsLifestyle.frequentFatigue === 'frequently') {
      symptomIndicators.push('Self-reported persistent fatigue');
    }
    if (symptomsLifestyle.paleAppearance === 'frequently' || symptomsLifestyle.paleAppearance === 'sometimes') {
      symptomIndicators.push('Self-reported pale complexion or brittle nails');
    }
    if (symptomsLifestyle.difficultyConcentrating === 'frequently') {
      symptomIndicators.push('Self-reported cognitive sluggishness/brain fog');
    }

    if (reasons.length === 0) {
      reasons.push('Reported dietary patterns indicate regular consumption of iron-contributing food groups.');
    }

    nutrients.push({
      nutrientId: 'iron',
      name: 'Iron (Fe)',
      category: 'mineral',
      riskLevel,
      riskScore: finalRiskScore,
      adequacyScore: Math.round(intakeScore),
      statusLabel: riskLevel === 'elevated' ? 'Elevated Risk Indication' : riskLevel === 'moderate' ? 'Moderate Risk Indication' : 'Low Risk Indication',
      reasons,
      dietaryFactors,
      symptomIndicators,
      foodRecommendations: isVegetarian
        ? ['Spinach & Drumstick (Moringa) leaves', 'Sprouted Moong & Chickpeas', 'Finger Millet (Ragi)', 'Garden Cress (Halim) seeds soaked in lemon water', 'Jaggery & Sesame seeds']
        : ['Moringa leaves & Spinach', 'Whole eggs with yolk', 'Lean poultry & fish', 'Sprouted lentils', 'Double Fortified Salt (DFS)'],
      icmrRDA: isFemale ? '29 mg/day (Women, ICMR-NIN 2024)' : '19 mg/day (Men, ICMR-NIN 2024)',
      awarenessTips: [
        'Always pair plant iron sources with Vitamin C (Amla, Lemon juice, Guava) to maximize non-heme absorption.',
        'Allow a minimum 45–60 minute window between meal consumption and drinking tea/coffee.',
        'Use cast iron cookware for cooking gravies and dals to naturally enrich meals with trace iron.',
      ],
      absorptionTips: [
        'Soaking dals and sprouting pulses significantly degrades phytates.',
        'Avoid taking high-dose calcium supplements at the exact same meal as high-iron dishes.',
      ],
    });
  }

  // ==========================================
  // 2. VITAMIN B12 ASSESSMENT
  // ==========================================
  {
    const dairyScore = getFrequencyScore(dietaryHabits.dairyOrAlternatives);
    const nonVegScore = isVegetarian ? 0 : getFrequencyScore(dietaryHabits.eggsMeatFish);
    const fortifiedScore = getFrequencyScore(dietaryHabits.fortifiedFoods);

    let intakeScore = 0;
    if (isVegan) {
      // Natural plant foods lack active B12; vegans rely heavily on fortified sources
      intakeScore = fortifiedScore * 0.65;
    } else if (isVegetarian) {
      intakeScore = Math.min(100, dairyScore * 0.75 + fortifiedScore * 0.25);
    } else {
      intakeScore = Math.min(100, nonVegScore * 0.55 + dairyScore * 0.35 + fortifiedScore * 0.1);
    }

    const fatigueScore = getSymptomScore(symptomsLifestyle.frequentFatigue);
    const brainFogScore = getSymptomScore(symptomsLifestyle.difficultyConcentrating);
    const paleScore = getSymptomScore(symptomsLifestyle.paleAppearance);
    const symptomBurden = fatigueScore * 0.4 + brainFogScore * 0.35 + paleScore * 0.25;

    const finalRiskScore = Math.round((100 - intakeScore) * 0.65 + symptomBurden * 0.35);

    let riskLevel: RiskLevel = 'low';
    if (finalRiskScore >= 60) riskLevel = 'elevated';
    else if (finalRiskScore >= 35) riskLevel = 'moderate';

    const reasons: string[] = [];
    const dietaryFactors: string[] = [];
    const symptomIndicators: string[] = [];

    if (isVegan) {
      reasons.push('Strict plant-based diets naturally contain negligible active Vitamin B12 without deliberate fortified food intake.');
      dietaryFactors.push('Dietary pattern: Strict Vegan');
    } else if (isVegetarian && (dietaryHabits.dairyOrAlternatives === 'rarely' || dietaryHabits.dairyOrAlternatives === 'never')) {
      reasons.push('Vegetarian diet with low or infrequent consumption of dairy products (curd, milk, paneer).');
      dietaryFactors.push('Dairy consumption: Low/Infrequent');
    }

    if (symptomsLifestyle.frequentFatigue === 'frequently') {
      symptomIndicators.push('Self-reported frequent fatigue / low energy');
    }
    if (symptomsLifestyle.difficultyConcentrating === 'frequently' || symptomsLifestyle.difficultyConcentrating === 'sometimes') {
      symptomIndicators.push('Self-reported mental fogginess or focus challenges');
    }

    if (reasons.length === 0) {
      reasons.push('Regular consumption of dairy/animal sources supports estimated Vitamin B12 intake.');
    }

    nutrients.push({
      nutrientId: 'vitamin_b12',
      name: 'Vitamin B12 (Cobalamin)',
      category: 'vitamin',
      riskLevel,
      riskScore: finalRiskScore,
      adequacyScore: Math.round(intakeScore),
      statusLabel: riskLevel === 'elevated' ? 'Elevated Risk Indication' : riskLevel === 'moderate' ? 'Moderate Risk Indication' : 'Low Risk Indication',
      reasons,
      dietaryFactors,
      symptomIndicators,
      foodRecommendations: isVegan
        ? ['B12-Fortified Soy / Almond Milk', 'Fortified Nutritional Yeast', 'Fortified Breakfast Cereals', 'Discuss periodic B12 screening/supplementation with a physician']
        : isVegetarian
        ? ['Fresh Curd / Dahi (1–2 bowls daily)', 'Paneer (Cottage cheese)', 'Fresh Cow/Buffalo Milk', 'Buttermilk / Chaas']
        : ['Whole eggs (with yolk)', 'Fish (Rohu, Sardines, Salmon)', 'Curd & Paneer', 'Lean poultry'],
      icmrRDA: '2.5 mcg/day (ICMR-NIN 2024)',
      awarenessTips: [
        'Vitamin B12 is stored in the liver, meaning deficiency develops insidiously over months or years.',
        'Curd and yogurt offer superior digestibility and natural probiotic synergy for gut flora.',
        'Strict vegans should consider periodic serum B12 blood tests under professional medical guidance.',
      ],
    });
  }

  // ==========================================
  // 3. VITAMIN D ASSESSMENT
  // ==========================================
  {
    const sunScore =
      symptomsLifestyle.sunExposure === 'adequate_daily'
        ? 90
        : symptomsLifestyle.sunExposure === 'moderate_weekly'
        ? 45
        : 10;

    const fortifiedScore = getFrequencyScore(dietaryHabits.fortifiedFoods);
    const dairyScore = getFrequencyScore(dietaryHabits.dairyOrAlternatives);
    const nonVegScore = isVegetarian ? 0 : getFrequencyScore(dietaryHabits.eggsMeatFish);

    // Natural dietary sources of Vit D are limited; cutaneous synthesis + fortified food dominates
    const intakeScore = Math.min(100, sunScore * 0.65 + fortifiedScore * 0.15 + (dairyScore * 0.1 + nonVegScore * 0.1));

    const crampsWeakness = getSymptomScore(symptomsLifestyle.muscleCrampsWeakness);
    const weakness = getSymptomScore(symptomsLifestyle.generalWeakness);
    const fatigue = getSymptomScore(symptomsLifestyle.frequentFatigue);
    const symptomBurden = crampsWeakness * 0.4 + weakness * 0.3 + fatigue * 0.3;

    const finalRiskScore = Math.round((100 - intakeScore) * 0.7 + symptomBurden * 0.3);

    let riskLevel: RiskLevel = 'low';
    if (finalRiskScore >= 60) riskLevel = 'elevated';
    else if (finalRiskScore >= 35) riskLevel = 'moderate';

    const reasons: string[] = [];
    const dietaryFactors: string[] = [];
    const symptomIndicators: string[] = [];

    if (symptomsLifestyle.sunExposure === 'minimal_rare') {
      reasons.push('Minimal direct midday sunlight exposure (primary biological driver of Vitamin D synthesis).');
      dietaryFactors.push('Sunlight Exposure: Minimal / Indoor Lifestyle');
    } else if (symptomsLifestyle.sunExposure === 'moderate_weekly') {
      reasons.push('Suboptimal weekly sunlight exposure with limited consumption of fortified foods.');
      dietaryFactors.push('Sunlight Exposure: Moderate');
    }

    if (dietaryHabits.fortifiedFoods === 'rarely' || dietaryHabits.fortifiedFoods === 'never') {
      reasons.push('Infrequent consumption of FSSAI +F certified fortified milk or edible oils.');
    }

    if (symptomsLifestyle.muscleCrampsWeakness === 'frequently' || symptomsLifestyle.muscleCrampsWeakness === 'sometimes') {
      symptomIndicators.push('Self-reported muscle aches, cramps, or dull bone heaviness');
    }

    if (reasons.length === 0) {
      reasons.push('Adequate reported sunlight exposure and intake of fortified/dairy items.');
    }

    nutrients.push({
      nutrientId: 'vitamin_d',
      name: 'Vitamin D3 (Cholecalciferol)',
      category: 'vitamin',
      riskLevel,
      riskScore: finalRiskScore,
      adequacyScore: Math.round(intakeScore),
      statusLabel: riskLevel === 'elevated' ? 'Elevated Risk Indication' : riskLevel === 'moderate' ? 'Moderate Risk Indication' : 'Low Risk Indication',
      reasons,
      dietaryFactors,
      symptomIndicators,
      foodRecommendations: [
        'FSSAI +F Fortified Milk and Fortified Edible Vegetable Oils',
        'Sun-exposed wild mushrooms',
        isVegetarian ? 'Fortified plant-based milks' : 'Egg yolks (2 whole eggs) and oily fish (Sardines, Salmon, Mackerel)',
        'Direct midday sunlight exposure (15–20 minutes, 11 AM – 2 PM)',
      ],
      icmrRDA: '600–800 IU/day (15–20 mcg/day, ICMR-NIN 2024)',
      awarenessTips: [
        'Spend 15–20 minutes in midday sunlight with arms and face exposed for natural synthesis.',
        'Vitamin D is fat-soluble: always consume dietary sources or fortified foods with meals containing healthy fats.',
        'Due to urban indoor lifestyles, routine 25-OH Vitamin D screening is recommended by physicians.',
      ],
    });
  }

  // ==========================================
  // 4. CALCIUM (Ca) ASSESSMENT
  // ==========================================
  {
    const dairyScore = getFrequencyScore(dietaryHabits.dairyOrAlternatives);
    const ragiGrainsScore = getFrequencyScore(dietaryHabits.wholeGrainsMillets);
    const seedsScore = getFrequencyScore(dietaryHabits.nutsSeeds);
    const glvScore = getFrequencyScore(dietaryHabits.greenLeafy);

    let intakeScore = 0;
    if (isVegan) {
      intakeScore = Math.min(100, ragiGrainsScore * 0.35 + seedsScore * 0.35 + glvScore * 0.3);
    } else {
      intakeScore = Math.min(100, dairyScore * 0.55 + ragiGrainsScore * 0.2 + seedsScore * 0.15 + glvScore * 0.1);
    }

    const crampsScore = getSymptomScore(symptomsLifestyle.muscleCrampsWeakness);
    const hairSkinScore = getSymptomScore(symptomsLifestyle.hairSkinChanges);
    const symptomBurden = crampsScore * 0.6 + hairSkinScore * 0.4;

    const finalRiskScore = Math.round((100 - intakeScore) * 0.65 + symptomBurden * 0.35);

    let riskLevel: RiskLevel = 'low';
    if (finalRiskScore >= 58) riskLevel = 'elevated';
    else if (finalRiskScore >= 35) riskLevel = 'moderate';

    const reasons: string[] = [];
    const dietaryFactors: string[] = [];
    const symptomIndicators: string[] = [];

    if (!isVegan && (dietaryHabits.dairyOrAlternatives === 'rarely' || dietaryHabits.dairyOrAlternatives === 'never')) {
      reasons.push('Low frequency of dairy products (milk, curd, paneer) which provide high-bioavailability calcium.');
      dietaryFactors.push('Dairy Products: Infrequent');
    }
    if (dietaryHabits.wholeGrainsMillets === 'rarely' || dietaryHabits.wholeGrainsMillets === 'never') {
      reasons.push('Infrequent consumption of traditional calcium-dense millets like Ragi (Finger Millet).');
    }
    if (dietaryHabits.nutsSeeds === 'rarely' || dietaryHabits.nutsSeeds === 'never') {
      reasons.push('Low intake of calcium-rich seeds such as white and black sesame seeds (Til).');
    }

    if (symptomsLifestyle.muscleCrampsWeakness === 'frequently' || symptomsLifestyle.muscleCrampsWeakness === 'sometimes') {
      symptomIndicators.push('Self-reported involuntary muscle twitches or calf cramps');
    }

    if (reasons.length === 0) {
      reasons.push('Reported dietary profile reflects consistent consumption of calcium-rich foods.');
    }

    nutrients.push({
      nutrientId: 'calcium',
      name: 'Calcium (Ca)',
      category: 'mineral',
      riskLevel,
      riskScore: finalRiskScore,
      adequacyScore: Math.round(intakeScore),
      statusLabel: riskLevel === 'elevated' ? 'Elevated Risk Indication' : riskLevel === 'moderate' ? 'Moderate Risk Indication' : 'Low Risk Indication',
      reasons,
      dietaryFactors,
      symptomIndicators,
      foodRecommendations: [
        'Ragi / Finger Millet (344 mg calcium per 100g — great as rotis or ragi malt)',
        'White and Black Sesame Seeds (Til — 195 mg per 2 tbsp)',
        isVegan ? 'Calcium-set Tofu & Fortified Plant Milks' : 'Fresh Curd, Paneer, and Milk (300 ml daily target per ICMR)',
        'Moringa leaves and Curry leaves incorporated into dals and sambar',
      ],
      icmrRDA: '1000 mg/day (ICMR-NIN 2024)',
      awarenessTips: [
        'ICMR-NIN 2024 recommends consuming 300 ml milk/curd equivalents daily.',
        'Maintain adequate Vitamin D status, as Vitamin D is physiologically required for active gut calcium absorption.',
        'Distribute calcium intake evenly across meals rather than consuming one large single serving.',
      ],
    });
  }

  // ==========================================
  // 5. VITAMIN A ASSESSMENT
  // ==========================================
  {
    const vegScore = getFrequencyScore(dietaryHabits.vegetables); // Carrots, pumpkins
    const glvScore = getFrequencyScore(dietaryHabits.greenLeafy); // Spinach, amaranth, moringa
    const fruitScore = getFrequencyScore(dietaryHabits.fruits); // Papaya, mango
    const dairyScore = isVegan ? 0 : getFrequencyScore(dietaryHabits.dairyOrAlternatives);
    const nonVegScore = isVegetarian ? 0 : getFrequencyScore(dietaryHabits.eggsMeatFish);
    const fortifiedScore = getFrequencyScore(dietaryHabits.fortifiedFoods);

    const intakeScore = Math.min(
      100,
      vegScore * 0.3 + glvScore * 0.3 + fruitScore * 0.2 + (dairyScore * 0.1 + nonVegScore * 0.1) + fortifiedScore * 0.1
    );

    const skinScore = getSymptomScore(symptomsLifestyle.hairSkinChanges);
    const weaknessScore = getSymptomScore(symptomsLifestyle.generalWeakness);
    const symptomBurden = skinScore * 0.6 + weaknessScore * 0.4;

    const finalRiskScore = Math.round((100 - intakeScore) * 0.7 + symptomBurden * 0.3);

    let riskLevel: RiskLevel = 'low';
    if (finalRiskScore >= 58) riskLevel = 'elevated';
    else if (finalRiskScore >= 35) riskLevel = 'moderate';

    const reasons: string[] = [];
    const dietaryFactors: string[] = [];
    const symptomIndicators: string[] = [];

    if (dietaryHabits.vegetables === 'rarely' || dietaryHabits.vegetables === 'never') {
      reasons.push('Low frequency of colorful vegetables (carrots, pumpkin, sweet potato) rich in Provitamin A beta-carotene.');
      dietaryFactors.push('Colorful Vegetables: Low intake');
    }
    if (dietaryHabits.greenLeafy === 'rarely' || dietaryHabits.greenLeafy === 'never') {
      reasons.push('Low intake of dark green leafy vegetables which supply vital lutein and carotenoids.');
    }

    if (symptomsLifestyle.hairSkinChanges === 'frequently' || symptomsLifestyle.hairSkinChanges === 'sometimes') {
      symptomIndicators.push('Self-reported dry rough skin or slow wound repair');
    }

    if (reasons.length === 0) {
      reasons.push('Reported dietary profile reflects frequent intake of colorful and green vegetables.');
    }

    nutrients.push({
      nutrientId: 'vitamin_a',
      name: 'Vitamin A (Retinol & Beta-Carotene)',
      category: 'vitamin',
      riskLevel,
      riskScore: finalRiskScore,
      adequacyScore: Math.round(intakeScore),
      statusLabel: riskLevel === 'elevated' ? 'Elevated Risk Indication' : riskLevel === 'moderate' ? 'Moderate Risk Indication' : 'Low Risk Indication',
      reasons,
      dietaryFactors,
      symptomIndicators,
      foodRecommendations: [
        'Carrots, Sweet Potatoes, and Yellow Pumpkin (Kaddu)',
        'Moringa / Drumstick leaves and Palak (Spinach)',
        'Ripe Papaya and seasonal Mangoes',
        'FSSAI +F Fortified Milk & Edible Oils',
        isVegetarian ? 'Full-fat dairy, Ghee in moderation' : 'Whole eggs (egg yolk) and fish',
      ],
      icmrRDA: isFemale ? '840 mcg RE/day (Women)' : '1000 mcg RE/day (Men, ICMR-NIN 2024)',
      awarenessTips: [
        'Carotenoids are fat-soluble: cook carrots and greens with a teaspoon of healthy oil or ghee for optimal uptake.',
        'Light steaming of vegetables softens plant cell walls and dramatically liberates bioavailable beta-carotene.',
      ],
    });
  }

  // ==========================================
  // 6. FOLATE (VITAMIN B9) ASSESSMENT
  // ==========================================
  {
    const glvScore = getFrequencyScore(dietaryHabits.greenLeafy);
    const pulseScore = getFrequencyScore(dietaryHabits.pulsesLegumes);
    const fruitScore = getFrequencyScore(dietaryHabits.fruits);
    const wholeGrainsScore = getFrequencyScore(dietaryHabits.wholeGrainsMillets);

    const intakeScore = Math.min(100, glvScore * 0.4 + pulseScore * 0.35 + wholeGrainsScore * 0.15 + fruitScore * 0.1);

    const fatigueScore = getSymptomScore(symptomsLifestyle.frequentFatigue);
    const paleScore = getSymptomScore(symptomsLifestyle.paleAppearance);
    const brainFogScore = getSymptomScore(symptomsLifestyle.difficultyConcentrating);
    const symptomBurden = fatigueScore * 0.4 + paleScore * 0.35 + brainFogScore * 0.25;

    const finalRiskScore = Math.round((100 - intakeScore) * 0.65 + symptomBurden * 0.35);

    let riskLevel: RiskLevel = 'low';
    if (finalRiskScore >= 58) riskLevel = 'elevated';
    else if (finalRiskScore >= 35) riskLevel = 'moderate';

    const reasons: string[] = [];
    const dietaryFactors: string[] = [];
    const symptomIndicators: string[] = [];

    if (dietaryHabits.greenLeafy === 'rarely' || dietaryHabits.greenLeafy === 'never') {
      reasons.push('Low frequency of fresh leafy vegetables (primary natural dietary reservoir of folates).');
      dietaryFactors.push('Leafy Greens: Low intake');
    }
    if (dietaryHabits.pulsesLegumes === 'rarely' || dietaryHabits.pulsesLegumes === 'never') {
      reasons.push('Infrequent consumption of pulses, chickpeas, and sprouted lentils.');
      dietaryFactors.push('Pulses/Legumes: Low intake');
    }

    if (symptomsLifestyle.frequentFatigue === 'frequently') {
      symptomIndicators.push('Self-reported persistent tiredness');
    }

    if (reasons.length === 0) {
      reasons.push('Dietary pattern reflects regular intake of folate-dense pulses and greens.');
    }

    nutrients.push({
      nutrientId: 'folate',
      name: 'Folate (Vitamin B9)',
      category: 'vitamin',
      riskLevel,
      riskScore: finalRiskScore,
      adequacyScore: Math.round(intakeScore),
      statusLabel: riskLevel === 'elevated' ? 'Elevated Risk Indication' : riskLevel === 'moderate' ? 'Moderate Risk Indication' : 'Low Risk Indication',
      reasons,
      dietaryFactors,
      symptomIndicators,
      foodRecommendations: [
        'Bengal gram / Chickpeas (Kala Chana & Kabuli Chana — 282 mcg folate/cup)',
        'Sprouted Green Moong & Lentils',
        'Dark leafy greens (Spinach, Methi, Amaranth)',
        'Peanuts, Sunflower seeds, and Wheat germ',
        'Fresh Guava and Citrus fruits',
      ],
      icmrRDA: isFemale ? '220 mcg/day (570 mcg in pregnancy, ICMR-NIN 2024)' : '300 mcg/day (Men, ICMR-NIN 2024)',
      awarenessTips: [
        'Folate is heat-sensitive and water-soluble: avoid discarding cooking water and prefer light steaming or pressure cooking.',
        'Sprouting lentils for 24–48 hours increases native folate concentrations significantly.',
        'Women planning pregnancy should ensure adequate daily folate to prevent neural tube defects.',
      ],
    });
  }

  // ==========================================
  // 7. PROTEIN ASSESSMENT
  // ==========================================
  {
    const pulseScore = getFrequencyScore(dietaryHabits.pulsesLegumes);
    const dairyScore = isVegan ? 0 : getFrequencyScore(dietaryHabits.dairyOrAlternatives);
    const nonVegScore = isVegetarian ? 0 : getFrequencyScore(dietaryHabits.eggsMeatFish);
    const nutsScore = getFrequencyScore(dietaryHabits.nutsSeeds);
    const grainScore = getFrequencyScore(dietaryHabits.wholeGrainsMillets);

    let intakeScore = 0;
    if (isVegan) {
      intakeScore = Math.min(100, pulseScore * 0.45 + nutsScore * 0.25 + grainScore * 0.3);
    } else if (isVegetarian) {
      intakeScore = Math.min(100, pulseScore * 0.35 + dairyScore * 0.35 + nutsScore * 0.15 + grainScore * 0.15);
    } else {
      intakeScore = Math.min(100, nonVegScore * 0.45 + pulseScore * 0.25 + dairyScore * 0.2 + grainScore * 0.1);
    }

    const weaknessScore = getSymptomScore(symptomsLifestyle.generalWeakness);
    const hairSkinScore = getSymptomScore(symptomsLifestyle.hairSkinChanges);
    const appetiteScore = getSymptomScore(symptomsLifestyle.poorAppetite);
    const symptomBurden = weaknessScore * 0.5 + hairSkinScore * 0.3 + appetiteScore * 0.2;

    const finalRiskScore = Math.round((100 - intakeScore) * 0.65 + symptomBurden * 0.35);

    let riskLevel: RiskLevel = 'low';
    if (finalRiskScore >= 58) riskLevel = 'elevated';
    else if (finalRiskScore >= 35) riskLevel = 'moderate';

    const reasons: string[] = [];
    const dietaryFactors: string[] = [];
    const symptomIndicators: string[] = [];

    if (dietaryHabits.pulsesLegumes === 'rarely' || dietaryHabits.pulsesLegumes === 'never') {
      reasons.push('Low frequency of pulses, dals, or legumes (the backbone of plant protein in Indian diets).');
      dietaryFactors.push('Pulses/Dals: Infrequent');
    }
    if (isVegetarian && (dietaryHabits.dairyOrAlternatives === 'rarely' || dietaryHabits.dairyOrAlternatives === 'never')) {
      reasons.push('Vegetarian diet without consistent dairy (paneer, curd, milk) reduces complete amino acid variety.');
    }

    if (symptomsLifestyle.generalWeakness === 'frequently' || symptomsLifestyle.generalWeakness === 'sometimes') {
      symptomIndicators.push('Self-reported muscle fatigue or slow exercise recovery');
    }
    if (symptomsLifestyle.hairSkinChanges === 'frequently' || symptomsLifestyle.hairSkinChanges === 'sometimes') {
      symptomIndicators.push('Self-reported hair shedding or brittle nail texture');
    }

    if (reasons.length === 0) {
      reasons.push('Regular consumption of protein-rich food groups supports estimated daily amino acid targets.');
    }

    nutrients.push({
      nutrientId: 'protein',
      name: 'Dietary Protein & Essential Amino Acids',
      category: 'macronutrient',
      riskLevel,
      riskScore: finalRiskScore,
      adequacyScore: Math.round(intakeScore),
      statusLabel: riskLevel === 'elevated' ? 'Elevated Risk Indication' : riskLevel === 'moderate' ? 'Moderate Risk Indication' : 'Low Risk Indication',
      reasons,
      dietaryFactors,
      symptomIndicators,
      foodRecommendations: isVegan
        ? ['Soy Chunks / Mealmaker (52% protein density)', 'Tofu (Soya paneer) & Edamame', 'Sprouted Moong & Chickpeas', 'Peanuts, Pumpkin seeds, and Almonds', 'Cereal + Pulse combination (Khichdi, Dal-Roti)']
        : isVegetarian
        ? ['Paneer (Cottage cheese — 18g protein/100g)', 'Fresh Curd / Greek yogurt', 'Dals & Legumes (Rajma, Chana, Moong)', 'Nuts & Seeds mix', 'Milk & Buttermilk']
        : ['Whole eggs (6g protein per egg)', 'Lean poultry / Chicken breast', 'Fish (Rohu, Salmon, Sardines)', 'Paneer & Curd', 'Dals & Legumes'],
      icmrRDA: '0.83 g/kg body weight/day (~54g men, ~46g women, ICMR-NIN 2024)',
      awarenessTips: [
        'ICMR-NIN 2024 emphasizes combining cereals and pulses in a 3:1 or 4:1 ratio to balance complementary amino acids.',
        'Distribute protein intake evenly across breakfast, lunch, and dinner to stimulate muscle protein synthesis.',
        'Fermenting batters (such as idli and dosa) improves the digestibility of plant proteins.',
      ],
    });
  }

  // Calculate overall dietary score (0-100)
  const avgAdequacy = Math.round(
    nutrients.reduce((acc, curr) => acc + curr.adequacyScore, 0) / nutrients.length
  );

  // Identify top risk areas
  const elevatedAreas = nutrients.filter((n) => n.riskLevel === 'elevated').map((n) => n.name);
  const moderateAreas = nutrients.filter((n) => n.riskLevel === 'moderate').map((n) => n.name);
  const topRiskAreas = elevatedAreas.length > 0 ? elevatedAreas : moderateAreas.length > 0 ? moderateAreas : ['None flagged (Overall balanced responses)'];

  let overallRiskSummary = '';
  if (elevatedAreas.length >= 3) {
    overallRiskSummary =
      'Your responses indicate several possible nutritional risk areas that may benefit from targeted dietary adjustments and professional review.';
  } else if (elevatedAreas.length > 0 || moderateAreas.length >= 2) {
    overallRiskSummary =
      'Your responses indicate a few specific dietary patterns that could benefit from enhanced food variety and awareness.';
  } else {
    overallRiskSummary =
      'Your responses indicate an overall diverse dietary habit aligned with positive nutritional awareness principles.';
  }

  const lifestyleAdvice: string[] = [
    'Adopt the ICMR-NIN "My Plate for the Day" guideline with 400g vegetables + 100g fruits daily.',
    'Maintain a 45–60 minute separation between meals and tea/coffee consumption to protect mineral absorption.',
    'Aim for 15–20 minutes of sensible midday sun exposure for natural Vitamin D synthesis.',
    'Prioritize whole food diversity, overnight soaking of legumes, and minimal refined sugar/salt.',
  ];

  return {
    id: `ns-eval-${Date.now()}`,
    timestamp: new Date().toISOString(),
    formData,
    overallDietaryScore: avgAdequacy,
    overallRiskSummary,
    nutrients,
    topRiskAreas,
    lifestyleAdvice,
    disclaimer:
      'NutriSense is an academic educational prototype. This report is NOT a medical diagnosis and should not replace clinical evaluation or laboratory blood tests. Consult a qualified healthcare professional or registered dietitian for clinical guidance.',
  };
}
