
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
    const [legacyNote, setLegacyNote] = useState('');

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
          <div className="space-y-6">
            <div className="aspect-[4/5] bg-gray-50 overflow-hidden rounded-3xl">
              <img 
                src={product.images[selectedMaterial]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
              />
            </div>
            {/* Gen Z Legacy Card */}
            <div className="p-8 bg-zinc-900 rounded-3xl text-white">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                The Vibe Check
              </h4>
              <p className="text-sm font-medium leading-relaxed opacity-90">
                This isn't just an accessory. It's a digital-physical bridge. Designed in our studio, crafted for your era. 100% authentic, 0% mid.
              </p>
            </div>
          </div>

          <div className="flex flex-col py-4">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-4">{product.category} · LŪM EXCLUSIVE</p>
            <h1 className="text-5xl font-bold luxury-font mb-6 tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-4 mb-8">
              <p className="text-3xl text-black font-bold tracking-tighter">₹{product.price.toLocaleString()}</p>
              <span className="text-[9px] font-bold bg-black text-white px-3 py-1 rounded-full uppercase tracking-widest">Limited Drop</span>
            </div>
            <p className="text-gray-500 mb-10 text-lg leading-relaxed font-light">{product.description}</p>

            <div className="mb-10">
              <h4 className="text-[10px] font-bold uppercase tracking-widest mb-6">Material Selection</h4>
              <div className="flex gap-4">
                {product.materials.map(mat => (
                  <button 
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`w-14 h-14 rounded-full border-2 p-1 transition-all ${selectedMaterial === mat ? 'border-black scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <div className={`w-full h-full rounded-full shadow-inner ${
                      mat === '18K Gold' ? 'bg-[#FFD700]' : 
                      mat === 'Sterling Silver' ? 'bg-[#C0C0C0]' : 
                      mat === 'Rose Gold' ? 'bg-[#B76E79]' : 
                      mat === 'Platinum' ? 'bg-[#E5E4E2]' : 'bg-[#1A1A1A]'
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h4 className="text-[10px] font-bold uppercase tracking-widest mb-6">Size Guide</h4>
              <div className="flex gap-4">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 flex items-center justify-center rounded-2xl border text-xs font-black transition-all ${selectedSize === size ? 'bg-black text-white border-black shadow-xl shadow-black/20' : 'hover:border-black text-gray-400'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Personalized Touch UI */}
            <div className="space-y-4 mb-10">
              <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                <div className="flex justify-between mb-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest">Custom Engraving</h4>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Included</span>
                </div>
                <input 
                  type="text" 
                  placeholder="e.g. 'FOR THE PLOT' or '11:11'" 
                  maxLength={24}
                  className="w-full bg-white p-4 rounded-xl border-none focus:ring-2 focus:ring-black text-sm font-medium tracking-tight shadow-sm"
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value)}
                />
              </div>

              <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4">The Aura Message</h4>
                <textarea 
                  placeholder="Record a digital message for the future. We'll generate a unique QR code on the box." 
                  className="w-full bg-white p-4 rounded-xl border-none focus:ring-2 focus:ring-black text-sm min-h-[100px] shadow-sm"
                  value={legacyNote}
                  onChange={(e) => setLegacyNote(e.target.value)}
                />
              </div>
            </div>

            <button 
              onClick={() => addToCart(product, selectedMaterial, selectedSize, engraving)}
              className="w-full bg-black text-white py-6 rounded-3xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-zinc-800 transition-all active:scale-[0.97] shadow-2xl shadow-black/10"
            >
              Add To Bag — ₹{product.price.toLocaleString()}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CartView = () => (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-4xl font-bold luxury-font tracking-tight">Your Drop</h2>
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{cart.length} ITEMS</span>
      </div>
      {cart.length === 0 ? (
        <div className="text-center py-40 bg-zinc-50 rounded-[60px]">
          <p className="text-zinc-400 mb-8 uppercase text-[10px] font-bold tracking-widest">Nothing secured yet</p>
          <button 
            onClick={() => setView('home')}
            className="px-12 py-5 bg-black text-white rounded-full uppercase text-[10px] font-bold tracking-widest hover:scale-105 transition-transform"
          >
            Browse The Vault
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12">
          <div className="space-y-4">
            {cart.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex items-center gap-8 p-6 bg-white border border-zinc-100 rounded-[32px] hover:shadow-2xl transition-shadow">
                <div className="w-28 h-28 bg-zinc-50 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={item.images[item.selectedMaterial]} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-xl leading-tight uppercase tracking-tight">{item.name}</h4>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-2">{item.selectedMaterial} · SIZE {item.selectedSize}</p>
                  <p className="text-black font-black mt-3 text-lg">₹{item.price.toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(idx)}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-50 text-zinc-300 hover:text-black hover:bg-zinc-100 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          <div className="bg-black p-12 rounded-[60px] text-white">
            <div className="flex justify-between items-center mb-10">
              <span className="text-zinc-500 uppercase text-[10px] font-bold tracking-[0.4em]">Subtotal</span>
              <span className="text-5xl font-black tracking-tighter">₹{totalCartValue.toLocaleString()}</span>
            </div>
            <button className="w-full bg-white text-black py-7 rounded-3xl font-black uppercase tracking-[0.3em] text-[12px] hover:bg-zinc-100 transition-all shadow-2xl shadow-white/5">
              Secure Delivery
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header 
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} 
        onCartClick={() => setView('cart')}
        onHomeClick={() => setView('home')}
      />

      <main>
        {view === 'home' && (
          <>
            <section className="relative h-[95vh] overflow-hidden">
              {/* Macro Jewellery Hero */}
              <img 
                src="https://images.unsplash.com/photo-1573408302185-9127fe5a0353?q=80&w=2070&auto=format&fit=crop" 
                alt="Jewellery Aura" 
                className="w-full h-full object-cover grayscale-[0.2] brightness-75 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-end justify-center text-center pb-24 px-6">
                <div className="max-w-5xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
                  <span className="text-[11px] font-black tracking-[0.5em] uppercase text-white opacity-60 mb-6 block">Personalize Your Shine</span>
                  <h2 className="text-7xl md:text-[10rem] font-black text-white luxury-font tracking-tighter leading-[0.85] mb-12">LŪM <br/> DROP 01.</h2>
                  <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    <button onClick={() => window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth'})} className="px-16 py-6 bg-white text-black font-black uppercase text-[11px] tracking-[0.3em] rounded-full hover:scale-110 transition-transform">
                      Browse Drops
                    </button>
                    <button className="px-12 py-6 bg-white/10 backdrop-blur-md text-white border border-white/20 font-black uppercase text-[11px] tracking-[0.3em] rounded-full hover:bg-white/20 transition-all">
                      Personalize Aura
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-32">
              <AIStylist />

              <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                <div className="animate-in fade-in slide-in-from-left-8 duration-700">
                  <h2 className="text-6xl font-bold luxury-font tracking-tighter mb-4">THE VAULT.</h2>
                  <p className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Macro-crafted. High-Def. Yours.</p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <select 
                    value={filterGender}
                    onChange={(e) => setFilterGender(e.target.value)}
                    className="p-5 bg-zinc-50 border-none rounded-3xl text-[10px] uppercase font-black tracking-[0.2em] focus:ring-2 focus:ring-black outline-none appearance-none px-8 pr-12 cursor-pointer shadow-sm"
                  >
                    <option value="All">All Identities</option>
                    <option value="Men">Men Only</option>
                    <option value="Women">Women Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
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

            {/* Gen Z Personalized Banner */}
            <section className="bg-zinc-900 py-40 px-6 text-center text-white my-20 rounded-[80px] mx-6">
              <div className="max-w-4xl mx-auto">
                <span className="text-[10px] font-black tracking-[0.5em] text-zinc-500 uppercase mb-8 block">Your Aura</span>
                <h3 className="text-5xl md:text-8xl font-black luxury-font tracking-tighter leading-none mb-12">MAKE IT <br/> PERSONAL.</h3>
                <p className="text-zinc-400 text-lg md:text-xl font-medium mb-16 opacity-80">Free engraving on all pieces. Every box includes a unique digital heritage key.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="space-y-4">
                    <span className="block text-4xl font-black">24K</span>
                    <span className="text-[9px] font-bold uppercase text-zinc-600 tracking-widest">Purity</span>
                  </div>
                  <div className="space-y-4">
                    <span className="block text-4xl font-black">NFT</span>
                    <span className="text-[9px] font-bold uppercase text-zinc-600 tracking-widest">Certified</span>
                  </div>
                  <div className="space-y-4">
                    <span className="block text-4xl font-black">QR</span>
                    <span className="text-[9px] font-bold uppercase text-zinc-600 tracking-widest">Story Box</span>
                  </div>
                  <div className="space-y-4">
                    <span className="block text-4xl font-black">01</span>
                    <span className="text-[9px] font-bold uppercase text-zinc-600 tracking-widest">Drop Only</span>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {view === 'detail' && selectedProduct && (
          <ProductDetail product={selectedProduct} />
        )}

        {view === 'cart' && <CartView />}
      </main>

      <footer className="bg-white py-40 px-6 border-t border-zinc-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-24">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-6xl font-black luxury-font tracking-tighter mb-10">LŪM.</h2>
            <p className="text-zinc-400 max-w-sm leading-relaxed text-sm font-bold uppercase tracking-tight opacity-60">
              Personalized luxury for the main character era. Crafted for the ones who know that the only thing that lives forever is the story.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 text-black">Philosophy</h4>
            <ul className="space-y-6 text-xs font-black text-zinc-400 uppercase tracking-widest">
              <li className="hover:text-black cursor-pointer transition-colors">The Aura ID</li>
              <li className="hover:text-black cursor-pointer transition-colors">Heritage Drop</li>
              <li className="hover:text-black cursor-pointer transition-colors">Clean Craft</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 text-black">Pulse</h4>
            <ul className="space-y-6 text-xs font-black text-zinc-400 uppercase tracking-widest">
              <li className="hover:text-black cursor-pointer transition-colors">Instagram</li>
              <li className="hover:text-black cursor-pointer transition-colors">TikTok Pulse</li>
              <li className="hover:text-black cursor-pointer transition-colors">Discord Vault</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-40 pt-16 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black text-zinc-300 uppercase tracking-[0.4em]">
          <span>© 2024 LŪM — THE NEW HERITAGE.</span>
          <div className="flex gap-12">
            <span className="hover:text-black cursor-pointer">Privacy</span>
            <span className="hover:text-black cursor-pointer">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
