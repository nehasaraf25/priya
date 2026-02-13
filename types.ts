
export type Gender = 'Men' | 'Women' | 'Unisex';
export type Size = 'S' | 'M' | 'L';
export type Material = '18K Gold' | 'Sterling Silver' | 'Rose Gold' | 'Platinum' | 'Black Onyx';

export interface Product {
  id: string;
  name: string;
  category: 'Rings' | 'Necklaces' | 'Bracelets' | 'Earrings';
  gender: Gender;
  price: number;
  description: string;
  materials: Material[];
  sizes: Size[];
  images: Record<Material, string>;
}

export interface CartItem extends Product {
  selectedSize: Size;
  selectedMaterial: Material;
  quantity: number;
}
