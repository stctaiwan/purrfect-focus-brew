import { CatCardData } from '@/components/CatCard';

export const CAT_CARDS: CatCardData[] = [
  {
    id: 'churchill-cat',
    name: 'Winston Whiskerton',
    celebrity: 'Winston Churchill',
    description: 'A distinguished British shorthair with an indomitable spirit and love for naps.',
    quote: 'We shall never surrender... until dinner time!',
    rarity: 'legendary',
    attributes: {
      wisdom: 10,
      cuteness: 7,
      charm: 9,
      fluffiness: 6
    },
    catEmoji: '🐱',
    backgroundColor: 'from-amber-500 to-orange-600'
  },
  {
    id: 'einstein-cat',
    name: 'Professor Purrstein',
    celebrity: 'Albert Einstein',
    description: 'A genius tabby with wild fur and an insatiable curiosity about catnip physics.',
    quote: 'Imagination is more impurrtant than knowledge!',
    rarity: 'epic',
    attributes: {
      wisdom: 10,
      cuteness: 8,
      charm: 7,
      fluffiness: 9
    },
    catEmoji: '🐱',
    backgroundColor: 'from-blue-500 to-purple-600'
  },
  {
    id: 'shakespeare-cat',
    name: 'William Shakespear',
    celebrity: 'William Shakespeare',
    description: 'A dramatic longhair who speaks in meows and purrs with poetic flair.',
    quote: 'To nap or not to nap, that is the question... nap!',
    rarity: 'epic',
    attributes: {
      wisdom: 9,
      cuteness: 8,
      charm: 10,
      fluffiness: 8
    },
    catEmoji: '🐱',
    backgroundColor: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'leonardo-cat',
    name: 'Leonardo da Pinci',
    celebrity: 'Leonardo da Vinci',
    description: 'A Renaissance cat with artistic talents and mysterious smile.',
    quote: 'Purr-fection is achieved not when there is nothing more to add, but when there is nothing left to eat!',
    rarity: 'legendary',
    attributes: {
      wisdom: 9,
      cuteness: 8,
      charm: 9,
      fluffiness: 7
    },
    catEmoji: '🐱',
    backgroundColor: 'from-green-500 to-teal-600'
  },
  {
    id: 'marie-cat',
    name: 'Marie Purrie',
    celebrity: 'Marie Curie',
    description: 'A brilliant scientist cat who glows with curiosity and determination.',
    quote: 'Nothing in life is to be feared, it is only to be purred at!',
    rarity: 'epic',
    attributes: {
      wisdom: 10,
      cuteness: 7,
      charm: 8,
      fluffiness: 6
    },
    catEmoji: '🐱',
    backgroundColor: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'beethoven-cat',
    name: 'Ludwig van Beethomeow',
    celebrity: 'Ludwig van Beethoven',
    description: 'A musical genius cat who composes symphonies with their purrs.',
    quote: 'Music should strike fire from the heart of meow and tears from the eyes of cat!',
    rarity: 'rare',
    attributes: {
      wisdom: 8,
      cuteness: 9,
      charm: 10,
      fluffiness: 8
    },
    catEmoji: '🐱',
    backgroundColor: 'from-violet-500 to-purple-600'
  },
  {
    id: 'napoleon-cat',
    name: 'Napoleon Bonapurr',
    celebrity: 'Napoleon Bonaparte',
    description: 'A small but mighty cat with big ambitions and an even bigger appetite.',
    quote: 'An army marches on its stomach, but a cat naps on its belly!',
    rarity: 'rare',
    attributes: {
      wisdom: 7,
      cuteness: 6,
      charm: 9,
      fluffiness: 5
    },
    catEmoji: '🐱',
    backgroundColor: 'from-red-500 to-orange-600'
  },
  {
    id: 'cleopatra-cat',
    name: 'Cleopurra VII',
    celebrity: 'Cleopatra',
    description: 'A regal Egyptian cat with mesmerizing eyes and royal grace.',
    quote: 'I came, I saw, I conquered... the sunny windowsill!',
    rarity: 'legendary',
    attributes: {
      wisdom: 8,
      cuteness: 10,
      charm: 10,
      fluffiness: 7
    },
    catEmoji: '🐱',
    backgroundColor: 'from-yellow-500 to-amber-600'
  },
  {
    id: 'tesla-cat',
    name: 'Nikola Teslacat',
    celebrity: 'Nikola Tesla',
    description: 'An inventive cat with electric personality and shocking intelligence.',
    quote: 'The present is theirs; the future, for which I really worked, is mine... and it has tuna!',
    rarity: 'epic',
    attributes: {
      wisdom: 9,
      cuteness: 7,
      charm: 8,
      fluffiness: 6
    },
    catEmoji: '🐱',
    backgroundColor: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'monroe-cat',
    name: 'Marilyn Meowroe',
    celebrity: 'Marilyn Monroe',
    description: 'A glamorous cat with sparkling personality and undeniable charm.',
    quote: 'Keep smiling, because life is a beautiful thing and there is so much to purr about!',
    rarity: 'rare',
    attributes: {
      wisdom: 6,
      cuteness: 10,
      charm: 10,
      fluffiness: 8
    },
    catEmoji: '🐱',
    backgroundColor: 'from-pink-500 to-rose-600'
  }
];

export const getRandomCatCard = (): CatCardData => {
  // Weighted random selection based on rarity
  const weights = {
    common: 0.5,
    rare: 0.3,
    epic: 0.15,
    legendary: 0.05
  };

  const random = Math.random();
  let targetRarity: keyof typeof weights = 'common';

  if (random < weights.legendary) targetRarity = 'legendary';
  else if (random < weights.legendary + weights.epic) targetRarity = 'epic';
  else if (random < weights.legendary + weights.epic + weights.rare) targetRarity = 'rare';

  const cardsOfRarity = CAT_CARDS.filter(card => card.rarity === targetRarity);
  return cardsOfRarity[Math.floor(Math.random() * cardsOfRarity.length)];
};