
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      onClick={() => onClick(product)}
      className="group cursor-pointer bg-white overflow-hidden transition-all duration-300 glow-hover"
    >
      <div className="aspect-[4/5] relative overflow-hidden bg-gray-50">
        <img 
          src={product.images[product.materials[0]]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-black/5 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">
            {product.gender}
          </span>
        </div>
      </div>
      <div className="py-4 px-1">
        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-gray-600 transition-colors uppercase tracking-tight">{product.name}</h3>
        <p className="text-gray-500 text-sm mt-0.5">₹{product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProductCard;
