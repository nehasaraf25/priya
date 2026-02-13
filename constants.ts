
import { Product } from './types';

// Range from ~₹8,000 to ₹8,50,000 (roughly $100 - $10,000 USD)
export const JEWELRY_COLLECTION: Product[] = [
  {
    id: 'lum-1',
    name: 'The Main Character Ring',
    category: 'Rings',
    gender: 'Unisex',
    price: 98000,
    description: 'A heavy 18K gold signet designed for those who own the room. Macro-polished for a mirror finish. This is your signature.',
    materials: ['18K Gold', 'Sterling Silver', 'Platinum'],
    sizes: ['S', 'M', 'L'],
    images: {
      '18K Gold': 'https://images.unsplash.com/photo-1603912627214-923b55ad4dc0?q=80&w=800&auto=format&fit=crop',
      'Sterling Silver': 'https://images.unsplash.com/photo-1622398476035-711718918205?q=80&w=800&auto=format&fit=crop',
      'Rose Gold': 'https://images.unsplash.com/photo-1603912627214-923b55ad4dc0?q=80&w=800&auto=format&fit=crop&sepia=30',
      'Platinum': 'https://images.unsplash.com/photo-1622398476035-711718918205?q=80&w=800&auto=format&fit=crop&sat=-100',
      'Black Onyx': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop&bri=-20'
    }
  },
  {
    id: 'lum-2',
    name: 'Aura Link Chain',
    category: 'Necklaces',
    gender: 'Unisex',
    price: 245000,
    description: 'A bold, chunky link chain that serves quiet luxury with a loud presence. Originally a legacy design, updated for the now.',
    materials: ['18K Gold', 'Platinum'],
    sizes: ['M', 'L'],
    images: {
      '18K Gold': 'https://images.unsplash.com/photo-1599643478518-a744c517b208?q=80&w=800&auto=format&fit=crop',
      'Sterling Silver': 'https://images.unsplash.com/photo-1611085583191-a3b13b24424a?q=80&w=800&auto=format&fit=crop',
      'Rose Gold': 'https://images.unsplash.com/photo-1599643478518-a744c517b208?q=80&w=800&auto=format&fit=crop&sepia=40',
      'Platinum': 'https://images.unsplash.com/photo-1611085583191-a3b13b24424a?q=80&w=800&auto=format&fit=crop&sat=-100',
      'Black Onyx': 'https://images.unsplash.com/photo-1599643478518-a744c517b208?q=80&w=800&auto=format&fit=crop&bri=-40'
    }
  },
  {
    id: 'lum-3',
    name: 'Legacy Diamond Studs',
    category: 'Earrings',
    gender: 'Women',
    price: 640000,
    description: 'Brilliant-cut diamonds set in a minimalist 3-prong frame. Passed from mother to daughter, these are built to be forever.',
    materials: ['18K Gold', 'Platinum', 'Rose Gold'],
    sizes: ['S', 'M'],
    images: {
      '18K Gold': 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800&auto=format&fit=crop',
      'Sterling Silver': 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800&auto=format&fit=crop&sat=-100',
      'Rose Gold': 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800&auto=format&fit=crop&sepia=30',
      'Platinum': 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800&auto=format&fit=crop&sat=-100',
      'Black Onyx': 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800&auto=format&fit=crop&bri=-40'
    }
  },
  {
    id: 'lum-4',
    name: 'Manifest Cuff',
    category: 'Bracelets',
    gender: 'Unisex',
    price: 32000,
    description: 'A sleek, solid band that fits every fit. Personalize with your mantra. Minimalist, but makes a statement.',
    materials: ['Sterling Silver', 'Rose Gold', 'Black Onyx'],
    sizes: ['S', 'M', 'L'],
    images: {
      '18K Gold': 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
      'Sterling Silver': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop',
      'Rose Gold': 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop&sepia=50',
      'Platinum': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop&sat=-100',
      'Black Onyx': 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop&bri=-50'
    }
  },
  {
    id: 'lum-5',
    name: 'The Era Pendant',
    category: 'Necklaces',
    gender: 'Women',
    price: 8500,
    description: 'A delicate coin pendant for the daily slay. Hand-engraved with the LŪM insignia.',
    materials: ['Sterling Silver', '18K Gold'],
    sizes: ['S', 'M'],
    images: {
      '18K Gold': 'https://images.unsplash.com/photo-1531995811006-35cb42e1a021?q=80&w=800&auto=format&fit=crop',
      'Sterling Silver': 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop',
      'Rose Gold': 'https://images.unsplash.com/photo-1531995811006-35cb42e1a021?q=80&w=800&auto=format&fit=crop&sepia=40',
      'Platinum': 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop&sat=-100',
      'Black Onyx': 'https://images.unsplash.com/photo-1531995811006-35cb42e1a021?q=80&w=800&auto=format&fit=crop&bri=-40'
    }
  }
];
