
import { Product } from './types';

// Using a conversion rate of roughly 1 USD = 83 INR
export const JEWELRY_COLLECTION: Product[] = [
  {
    id: '1',
    name: 'Aurelius Signet',
    category: 'Rings',
    gender: 'Men',
    price: 99600,
    description: 'The ultimate power move. A heavy signet for your main character energy. Bold, heavy, and commandingly elegant.',
    materials: ['18K Gold', 'Sterling Silver', 'Platinum'],
    sizes: ['S', 'M', 'L'],
    images: {
      '18K Gold': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
      'Sterling Silver': 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=800&auto=format&fit=crop',
      'Rose Gold': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop&sat=-50',
      'Platinum': 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=800&auto=format&fit=crop&sat=-100',
      'Black Onyx': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop&bri=-20'
    }
  },
  {
    id: '2',
    name: 'Seraphina Pendant',
    category: 'Necklaces',
    gender: 'Women',
    price: 705500,
    description: 'Catch the light and the vibes. High-clarity diamonds for that ethereal aesthetic.',
    materials: ['18K Gold', 'Rose Gold', 'Platinum'],
    sizes: ['S', 'M', 'L'],
    images: {
      '18K Gold': 'https://images.unsplash.com/photo-1599643478518-a744c517b208?q=80&w=800&auto=format&fit=crop',
      'Sterling Silver': 'https://images.unsplash.com/photo-1611085583191-a3b13b24424a?q=80&w=800&auto=format&fit=crop',
      'Rose Gold': 'https://images.unsplash.com/photo-1599643478518-a744c517b208?q=80&w=800&auto=format&fit=crop&sepia=30',
      'Platinum': 'https://images.unsplash.com/photo-1611085583191-a3b13b24424a?q=80&w=800&auto=format&fit=crop&sat=-100',
      'Black Onyx': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop'
    }
  },
  {
    id: '3',
    name: 'Minimalist Stack Cuff',
    category: 'Bracelets',
    gender: 'Unisex',
    price: 37350,
    description: 'Understated luxury for the minimalist at heart. Perfect for stacking or wearing solo to elevate your daily fit.',
    materials: ['Sterling Silver', 'Rose Gold', 'Black Onyx'],
    sizes: ['S', 'M', 'L'],
    images: {
      '18K Gold': 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
      'Sterling Silver': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop&sat=-100',
      'Rose Gold': 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop&sepia=50',
      'Platinum': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop&sat=-100',
      'Black Onyx': 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop&bri=-50'
    }
  },
  {
    id: '4',
    name: 'Imperial Link',
    category: 'Necklaces',
    gender: 'Men',
    price: 265600,
    description: 'Heavy gauge links for a bold presence. It’s not just a chain; it’s a statement of prestige.',
    materials: ['18K Gold', 'Platinum'],
    sizes: ['M', 'L'],
    images: {
      '18K Gold': 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop',
      'Sterling Silver': 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop&sat=-100',
      'Rose Gold': 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop&sepia=30',
      'Platinum': 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop&sat=-100',
      'Black Onyx': 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop&bri=-40'
    }
  },
  {
    id: '5',
    name: 'Celestial Hoops',
    category: 'Earrings',
    gender: 'Women',
    price: 12450,
    description: 'Lightweight hoops that live rent-free in your accessories drawer. Everyday sophistication for the win.',
    materials: ['18K Gold', 'Sterling Silver', 'Rose Gold'],
    sizes: ['S', 'M'],
    images: {
      '18K Gold': 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800&auto=format&fit=crop',
      'Sterling Silver': 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800&auto=format&fit=crop&sat=-100',
      'Rose Gold': 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800&auto=format&fit=crop&sepia=30',
      'Platinum': 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800&auto=format&fit=crop&sat=-100',
      'Black Onyx': 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800&auto=format&fit=crop&bri=-40'
    }
  }
];
