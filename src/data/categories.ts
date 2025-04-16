export const categoryMappings = {
  // English mappings
  'love': 'प्यार',
  'pyar': 'प्यार',
  'pyaar': 'प्यार',
  'friendship': 'दोस्ती',
  'dosti': 'दोस्ती',
  'life': 'जिंदगी',
  'zindagi': 'जिंदगी',
  'motivation': 'मोटिवेशन',
  'prerna': 'मोटिवेशन',
  'happiness': 'खुशी',
  'khushi': 'खुशी',
  'pain': 'दर्द',
  'dard': 'दर्द',
  'dukh': 'दर्द',
  'gum': 'दर्द',

  // New: इंतज़ार
  'intezar': 'इंतज़ार',
  'intezaar': 'इंतज़ार',
  'wait': 'इंतज़ार',

  // New: यादें
  'yaadein': 'यादें',
  'yaad': 'यादें',
  'memories': 'यादें',
  'khat': 'यादें',
  
  // Hindi mappings
  'प्यार': 'प्यार',
  'दोस्ती': 'दोस्ती',
  'जिंदगी': 'जिंदगी',
  'मोटिवेशन': 'मोटिवेशन',
  'खुशी': 'खुशी',

  // Hinglish style
  'mohabbat': 'प्यार',
  'ishq': 'प्यार',
  'yaari': 'दोस्ती',
  'jindagi': 'जिंदगी',
  'prerana': 'मोटिवेशन',
  'hausla': 'मोटिवेशन',
  'khushiyan': 'खुशी',
  'muskaan': 'खुशी',

  // Spanish
  'amor': 'प्यार',
  'amistad': 'दोस्ती',
  'vida': 'जिंदगी',
  'motivación': 'मोटिवेशन',
  'felicidad': 'खुशी',

  // French
  'amour': 'प्यार',
  'amitié': 'दोस्ती',
  'vie': 'जिंदगी',
  'motivation': 'मोटिवेशन',
  'bonheur': 'खुशी',

  // German
  'liebe': 'प्यार',
  'freundschaft': 'दोस्ती',
  'leben': 'जिंदगी',
  'motivation': 'मोटिवेशन',
  'glück': 'खुशी',

  // Arabic
  'حب': 'प्यार',
  'صداقة': 'दोस्ती',
  'حياة': 'जिंदगी',
  'تحفيز': 'मोटिवेशन',
  'سعادة': 'खुशी',

  // Portuguese
  'amizade': 'दोस्ती',
  'felicidade': 'खुशी',

  // Russian
  'любовь': 'प्यार',
  'дружба': 'दोस्ती',
  'жизнь': 'जिंदगी',
  'мотивация': 'मोटिवेशन',
  'счастье': 'खुशी',

  // Chinese (Simplified)
  '爱': 'प्यार',
  '友谊': 'दोस्ती',
  '生活': 'जिंदगी',
  '激励': 'मोटिवेशन',
  '幸福': 'खुशी',

  // Japanese
  '愛': 'प्यार',
  '友情': 'दोस्ती',
  '人生': 'जिंदगी',
  'モチベーション': 'मोटिवेशन',
  '幸福': 'खुशी',

  // Tamil (written in Latin)
  'kathal': 'प्यार',
  'anbu': 'प्यार',
  'nanban': 'दोस्ती',
  'vaazhkai': 'जिंदगी',
  'uthaavi': 'मोटिवेशन',
  'magizhchi': 'खुशी',

  // Telugu (written in Latin)
  'prema': 'प्यार',
  'sneham': 'दोस्ती',
  'jeevitam': 'जिंदगी',
  'prernaa': 'मोटिवेशन',
  'santosham': 'खुशी',

  // Kannada (written in Latin)
  'preethi': 'प्यार',
  'sneha': 'दोस्ती',
  'jeevana': 'जिंदगी',
  'prerane': 'मोटिवेशन',
  'santosh': 'खुशी',
} as const;


export type CategoryKey = keyof typeof categoryMappings;
export type CategoryValue = typeof categoryMappings[CategoryKey];

export const findCategory = (input: string): CategoryValue | null => {
  const normalizedInput = input.toLowerCase().trim();
  
  // Direct match
  const directMatch = categoryMappings[normalizedInput as CategoryKey];
  if (directMatch) return directMatch;
  
  // Partial match
  const keys = Object.keys(categoryMappings) as CategoryKey[];
  const matchingKey = keys.find(key => 
    normalizedInput.includes(key.toLowerCase()) || 
    key.toLowerCase().includes(normalizedInput)
  );
  
  return matchingKey ? categoryMappings[matchingKey] : null;
};