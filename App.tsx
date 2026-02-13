
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import AIStylist from './components/AIStylist';
import { JEWELRY_COLLECTION } from './constants';
import { Product, CartItem, Material, Size } from './types';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [view, setView] = useState<'home' | 'cart' | 'detail'>('home');
  const [filterGender, setFilterGender] = useState<string>('All');
  const [filterPrice, setFilterPrice] = useState<[number, number]>([0, 1000000]);

  const filteredProducts = useMemo(() => {
    return JEWELRY_COLLECTION.filter(p => {
      const genderMatch = filterGender === 'All' || p.gender === filterGender || p.gender === 'Unisex';
      const priceMatch = p.price >= filterPrice[0] && p.price <= filterPrice[1];
      return genderMatch && priceMatch;
    });
  }, [filterGender, filterPrice]);

  const addToCart = (product: Product, material: Material, size: Size, personalization?: string) => {
    const cartId = `${product.id}-${material}-${size}-${personalization || ''}`;
    setCart([...cart, { ...product, selectedMaterial: material, selectedSize: size, quantity: 1 }]);
    setView('cart');
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const totalCartValue = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const ProductDetail = ({ product }: { product: Product }) => {
    const [selectedMaterial, setSelectedMaterial] = useState<Material>(product.materials[0]);
    const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0]);
    const [engraving, setEngraving] = useState('');

    return (
      <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-500">
        <button 
          onClick={() => setView('home')}
          className="flex items-center gap-2 text-gray-400 hover:text-black mb-12 transition-colors uppercase text-[10px] font-bold tracking-widest"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Go Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="aspect-[4/5] bg-gray-50 overflow-hidden rounded-3xl">
            <img 
              src={product.images[selectedMaterial]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col py-4">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-4">{product.category} · {product.gender}</p>
            <h1 className="text-5xl font-bold luxury-font mb-6 tracking-tight">{product.name}</h1>
            <p className="text-2xl text-black mb-8 font-semibold">₹{product.price.toLocaleString()}</p>
            <p className="text-gray-500 mb-10 text-lg leading-relaxed font-light">{product.description}</p>

            <div className="mb-10">
              <h4 className="text-[10px] font-bold uppercase tracking-widest mb-6">Select Material</h4>
              <div className="flex gap-4">
                {product.materials.map(mat => (
                  <button 
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`w-14 h-14 rounded-full border-2 p-1 transition-all ${selectedMaterial === mat ? 'border-black scale-105' : 'border-transparent'}`}
                  >
                    <div className={`w-full h-full rounded-full ${
                      mat === '18K Gold' ? 'bg-amber-400' : 
                      mat === 'Sterling Silver' ? 'bg-gray-300' : 
                      mat === 'Rose Gold' ? 'bg-orange-200' : 
                      mat === 'Platinum' ? 'bg-slate-100' : 'bg-zinc-900'
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h4 className="text-[10px] font-bold uppercase tracking-widest mb-6">Size</h4>
              <div className="flex gap-4">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center rounded-xl border text-sm font-bold transition-all ${selectedSize === size ? 'bg-black text-white border-black shadow-lg shadow-black/20' : 'hover:border-black'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10 p-6 bg-gray-50 rounded-2xl">
              <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4">Personalize This Piece</h4>
              <input 
                type="text" 
                placeholder="Engrave a name or date..." 
                maxLength={20}
                className="w-full bg-white p-4 rounded-xl border-none focus:ring-2 focus:ring-black text-sm"
                value={engraving}
                onChange={(e) => setEngraving(e.target.value)}
              />
              <p className="mt-2 text-[10px] text-gray-400 uppercase tracking-widest font-medium">Free of charge for your LŪM ID</p>
            </div>

            <button 
              onClick={() => addToCart(product, selectedMaterial, selectedSize, engraving)}
              className="w-full bg-black text-white py-6 rounded-2xl font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-[0.98] shadow-2xl shadow-black/10"
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CartView = () => (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold luxury-font mb-12 tracking-tight">Your Bag</h2>
      {cart.length === 0 ? (
        <div className="text-center py-32 bg-gray-50 rounded-[40px]">
          <p className="text-gray-400 mb-8 uppercase text-[10px] font-bold tracking-widest">Bag is empty</p>
          <button 
            onClick={() => setView('home')}
            className="px-10 py-4 bg-black text-white rounded-full uppercase text-[10px] font-bold tracking-widest"
          >
            Explore Drops
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12">
          <div className="space-y-4">
            {cart.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex items-center gap-8 p-6 bg-white border border-gray-100 rounded-3xl glow-hover">
                <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={item.images[item.selectedMaterial]} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-lg leading-tight uppercase tracking-tight">{item.name}</h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{item.selectedMaterial} · Size {item.selectedSize}</p>
                  <p className="text-black font-semibold mt-2">₹{item.price.toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(idx)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-black transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          <div className="bg-black p-10 rounded-[40px] text-white">
            <div className="flex justify-between items-center mb-10">
              <span className="text-gray-400 uppercase text-[10px] font-bold tracking-[0.2em]">Total Checkout</span>
              <span className="text-4xl font-bold">₹{totalCartValue.toLocaleString()}</span>
            </div>
            <button className="w-full bg-white text-black py-6 rounded-2xl font-bold uppercase tracking-widest hover:bg-gray-100 transition-all">
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen">
      <Header 
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} 
        onCartClick={() => setView('cart')}
        onHomeClick={() => setView('home')}
      />

      <main>
        {view === 'home' && (
          <>
            <section className="relative h-[90vh] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop" 
                alt="Main Character Era" 
                className="w-full h-full object-cover scale-110 blur-[1px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-start p-12 text-white">
                <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
                  <h2 className="text-6xl md:text-9xl font-bold mb-8 luxury-font tracking-tighter leading-none">THE NEW <br/> STANDARD.</h2>
                  <p className="text-sm md:text-lg font-bold mb-10 tracking-[0.3em] uppercase opacity-80">Personalized Luxury for the Modern Era</p>
                  <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth'})} className="px-12 py-5 bg-white text-black font-bold uppercase text-[10px] tracking-widest rounded-full hover:bg-black hover:text-white transition-all">
                    Browse Drops
                  </button>
                </div>
              </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-24">
              <AIStylist />

              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-10">
                <div>
                  <h2 className="text-5xl font-bold luxury-font mb-4 tracking-tight">Recent Drops</h2>
                  <p className="text-gray-400 font-medium text-sm">Every piece, personalized for your story.</p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <select 
                    value={filterGender}
                    onChange={(e) => setFilterGender(e.target.value)}
                    className="p-4 bg-gray-50 border-none rounded-2xl text-[10px] uppercase font-bold tracking-widest focus:ring-2 focus:ring-black outline-none"
                  >
                    <option value="All">All Identities</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={(p) => {
                      setSelectedProduct(p);
                      setView('detail');
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {view === 'detail' && selectedProduct && (
          <ProductDetail product={selectedProduct} />
        )}

        {view === 'cart' && <CartView />}
      </main>

      <footer className="bg-white border-t border-gray-100 py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-5xl font-bold luxury-font mb-8">LŪM</h2>
            <p className="text-gray-400 max-w-sm leading-relaxed text-sm font-medium uppercase tracking-tight">
              Quiet luxury. Personalized details. Crafted for the ones who know.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-black">Company</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-400 uppercase tracking-widest">
              <li className="hover:text-black cursor-pointer transition-colors">Our Ethos</li>
              <li className="hover:text-black cursor-pointer transition-colors">Personalization</li>
              <li className="hover:text-black cursor-pointer transition-colors">Sustainability</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-black">Connect</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-400 uppercase tracking-widest">
              <li className="hover:text-black cursor-pointer transition-colors">Instagram</li>
              <li className="hover:text-black cursor-pointer transition-colors">TikTok</li>
              <li className="hover:text-black cursor-pointer transition-colors">VIP Access</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <span>© 2024 LŪM GROUP INC.</span>
          <div className="flex gap-10">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Cookies</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
