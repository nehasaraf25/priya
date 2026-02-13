import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import AIStylist from './components/AIStylist';
import ChatAssistant from './components/ChatAssistant';
import Logo from './components/Logo';
import { JEWELRY_COLLECTION } from './constants';
import { Product, CartItem, Material, Size } from './types';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [view, setView] = useState<'home' | 'cart' | 'detail'>('home');
  const [filterGender, setFilterGender] = useState<string>('All');
  const [filterPrice, setFilterPrice] = useState<[number, number]>([100, 10000]);
  const [generatingSeal, setGeneratingSeal] = useState(false);
  const [auraSealUrl, setAuraSealUrl] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return JEWELRY_COLLECTION.filter(p => {
      const genderMatch = filterGender === 'All' || p.gender === filterGender || p.gender === 'Unisex';
      const priceMatch = p.price >= filterPrice[0] && p.price <= filterPrice[1];
      return genderMatch && priceMatch;
    });
  }, [filterGender, filterPrice]);

  const generateAuraSeal = async (personalization: string) => {
    if (!personalization) return;
    setGeneratingSeal(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: `Create a minimalist luxury brand logo/seal for a jewelry piece. The seal should represent the words "${personalization}". Elegant gold lines on a clean black background. Modernist, geometric, high-fashion aesthetic.` }
          ]
        },
        config: {
          imageConfig: { aspectRatio: "1:1" }
        }
      });
      
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setAuraSealUrl(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingSeal(false);
    }
  };

  const addToCart = (product: Product, material: Material, size: Size, personalization?: string) => {
    setCart([...cart, { ...product, selectedMaterial: material, selectedSize: size, quantity: 1 }]);
    setView('cart');
    setAuraSealUrl(null); 
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
          onClick={() => { setView('home'); setAuraSealUrl(null); }}
          className="flex items-center gap-2 text-zinc-400 hover:text-black mb-12 transition-colors uppercase text-[10px] font-bold tracking-[0.3em]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Go Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-6">
            <div className="aspect-[4/5] bg-zinc-50 overflow-hidden rounded-[40px] relative border border-zinc-100 shadow-sm">
              <img 
                src={product.images[selectedMaterial]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
              />
              {auraSealUrl && (
                <div className="absolute top-8 right-8 w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 animate-in zoom-in duration-500 shadow-2xl overflow-hidden">
                   <img src={auraSealUrl} alt="Aura Seal" className="w-full h-full object-contain" />
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/60 transition-opacity">
                      <span className="text-[7px] font-bold text-white uppercase tracking-widest text-center">Your Aura Seal</span>
                   </div>
                </div>
              )}
            </div>
            <div className="p-10 bg-zinc-950 rounded-[40px] text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                The Brand Identity
              </h4>
              <p className="text-sm font-medium leading-relaxed opacity-90 mb-6">
                Every LŪM piece is a vessel for your energy. Our new geometric identifier represents the convergence of craft and legacy.
              </p>
              <div className="flex items-center gap-4">
                 <Logo size={30} className="text-zinc-600" />
                 <span className="h-px bg-zinc-800 flex-grow"></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col py-4">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-400 mb-4">{product.category} · DROP SERIES 01</p>
            <h1 className="text-6xl font-black luxury-font mb-6 tracking-tighter">{product.name}</h1>
            <div className="flex items-center gap-4 mb-8">
              <p className="text-3xl text-black font-black tracking-tighter">₹{product.price.toLocaleString()}</p>
              <span className="text-[9px] font-black bg-zinc-100 text-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">Verified Drop</span>
            </div>
            <p className="text-zinc-500 mb-10 text-lg leading-relaxed font-light">{product.description}</p>

            <div className="mb-10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6">Select Material</h4>
              <div className="flex gap-5">
                {product.materials.map(mat => (
                  <button 
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`w-16 h-16 rounded-full border-2 p-1 transition-all ${selectedMaterial === mat ? 'border-black scale-110 shadow-xl' : 'border-transparent opacity-40 hover:opacity-100'}`}
                  >
                    <div className={`w-full h-full rounded-full shadow-inner ${
                      mat === '18K Gold' ? 'bg-[#FFD700]' : 
                      mat === 'Sterling Silver' ? 'bg-[#E0E0E0]' : 
                      mat === 'Rose Gold' ? 'bg-[#D4A5A5]' : 
                      mat === 'Platinum' ? 'bg-[#F0F0F0]' : 'bg-[#121212]'
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6">Size Selection</h4>
              <div className="flex gap-4">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-16 h-16 flex items-center justify-center rounded-2xl border-2 text-xs font-black transition-all ${selectedSize === size ? 'bg-black text-white border-black shadow-2xl' : 'hover:border-black text-zinc-300 border-zinc-100'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 mb-10">
              <div className="p-8 bg-zinc-50 rounded-[32px] border border-zinc-100">
                <div className="flex justify-between mb-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em]">Personalized Seal</h4>
                  <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Premium Service</span>
                </div>
                <div className="flex gap-3">
                    <input 
                    type="text" 
                    placeholder="Enter initials or a keyword..." 
                    maxLength={24}
                    className="flex-grow bg-white p-5 rounded-2xl border-none focus:ring-2 focus:ring-black text-sm font-bold tracking-tight shadow-sm"
                    value={engraving}
                    onChange={(e) => setEngraving(e.target.value)}
                    />
                    <button 
                        onClick={() => generateAuraSeal(engraving)}
                        disabled={generatingSeal || !engraving}
                        className="bg-black text-white px-6 rounded-2xl text-[9px] font-black uppercase tracking-widest disabled:bg-zinc-200"
                    >
                        {generatingSeal ? '...' : 'Generate Seal'}
                    </button>
                </div>
                <p className="mt-4 text-[9px] text-zinc-400 uppercase font-black tracking-widest">This generates a unique AI visual mark for your piece.</p>
              </div>

              <div className="p-8 bg-zinc-50 rounded-[32px] border border-zinc-100">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4">Digital Aura Legacy</h4>
                <textarea 
                  placeholder="The story behind this piece... (to be saved in your digital vault)" 
                  className="w-full bg-white p-5 rounded-2xl border-none focus:ring-2 focus:ring-black text-sm min-h-[120px] shadow-sm font-medium"
                  value={legacyNote}
                  onChange={(e) => setLegacyNote(e.target.value)}
                />
              </div>
            </div>

            <button 
              onClick={() => addToCart(product, selectedMaterial, selectedSize, engraving)}
              className="w-full bg-black text-white py-8 rounded-[32px] font-black uppercase tracking-[0.4em] text-[12px] hover:bg-zinc-800 transition-all active:scale-[0.96] shadow-2xl shadow-black/20"
            >
              Secure Drop — ₹{product.price.toLocaleString()}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CartView = () => (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-5xl font-black luxury-font tracking-tighter">Your Drop</h2>
        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-300">{cart.length} PIECES</span>
      </div>
      {cart.length === 0 ? (
        <div className="text-center py-48 bg-zinc-50 rounded-[80px]">
          <p className="text-zinc-300 mb-10 uppercase text-[11px] font-black tracking-[0.5em]">The bag is empty</p>
          <button 
            onClick={() => setView('home')}
            className="px-16 py-6 bg-black text-white rounded-full uppercase text-[11px] font-black tracking-[0.3em] hover:scale-110 transition-transform shadow-2xl shadow-black/20"
          >
            Explore The Vault
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-16">
          <div className="space-y-6">
            {cart.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex items-center gap-10 p-8 bg-white border border-zinc-100 rounded-[48px] hover:shadow-3xl transition-all group">
                <div className="w-32 h-32 bg-zinc-50 rounded-3xl overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                  <img src={item.images[item.selectedMaterial]} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-black text-2xl leading-tight uppercase tracking-tighter">{item.name}</h4>
                  <p className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.3em] mt-3">{item.selectedMaterial} · SIZE {item.selectedSize}</p>
                  <p className="text-black font-black mt-4 text-xl tracking-tight">₹{item.price.toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(idx)}
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-zinc-50 text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          <div className="bg-black p-16 rounded-[80px] text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center mb-12">
              <span className="text-zinc-500 uppercase text-[11px] font-black tracking-[0.5em]">Total Drop</span>
              <span className="text-6xl font-black tracking-tighter">₹{totalCartValue.toLocaleString()}</span>
            </div>
            <button className="w-full bg-white text-black py-8 rounded-[32px] font-black uppercase tracking-[0.4em] text-[14px] hover:bg-zinc-100 transition-all active:scale-[0.98]">
              Confirm Legacy
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
        onHomeClick={() => { setView('home'); setAuraSealUrl(null); }}
      />

      <main>
        {view === 'home' && (
          <>
            <section className="relative h-[95vh] overflow-hidden">
              <img 
                src="https://i.ibb.co/5XKsW0Lj/Initial-Ring-Set.png" 
                alt="Jewellery Aura" 
                className="w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex items-end justify-center text-center pb-24 px-6">
                <div className="max-w-5xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
                  <div className="flex justify-center mb-10">
                    <Logo className="text-white scale-150 mb-8" size={60} />
                  </div>
                  <span className="text-[12px] font-black tracking-[0.6em] text-white opacity-60 mb-6 block uppercase">Identity & Shine</span>
                  <h2 className="text-8xl md:text-[11rem] font-black text-white luxury-font tracking-tighter leading-[0.85] mb-12">DROP <br/> 01.</h2>
                  <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    <button onClick={() => window.scrollTo({ top: window.innerHeight * 0.95, behavior: 'smooth'})} className="px-16 py-6 bg-white text-black font-black uppercase text-[11px] tracking-[0.4em] rounded-full hover:scale-110 transition-transform shadow-2xl">
                      Browse The Drop
                    </button>
                    <button className="px-12 py-6 bg-black/20 backdrop-blur-2xl text-white border-2 border-white/30 font-black uppercase text-[11px] tracking-[0.4em] rounded-full hover:bg-white/10 transition-all">
                      Personalize Identity
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-40">
              <AIStylist />

              <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
                <div className="animate-in fade-in slide-in-from-left-8 duration-700">
                  <div className="flex items-center gap-4 mb-4">
                    <Logo size={24} className="text-black" />
                    <span className="h-px bg-zinc-200 w-20"></span>
                  </div>
                  <h2 className="text-7xl font-black luxury-font tracking-tighter mb-4 uppercase">The Vault.</h2>
                  <p className="text-zinc-400 font-black uppercase tracking-[0.3em] text-[11px]">Curated Heirlooms. Digital Signatures.</p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <select 
                    value={filterGender}
                    onChange={(e) => setFilterGender(e.target.value)}
                    className="p-6 bg-zinc-50 border-none rounded-3xl text-[11px] uppercase font-black tracking-[0.3em] focus:ring-2 focus:ring-black outline-none appearance-none px-10 pr-16 cursor-pointer shadow-sm"
                  >
                    <option value="All">All Identities</option>
                    <option value="Men">Men Only</option>
                    <option value="Women">Women Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-40">
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

            <section className="bg-zinc-950 py-48 px-6 text-center text-white my-32 rounded-[100px] mx-6 relative overflow-hidden shadow-[0_100px_150px_-50px_rgba(0,0,0,0.4)]">
               <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
                  <Logo size={800} />
               </div>
              <div className="max-w-4xl mx-auto relative z-10">
                <span className="text-[11px] font-black tracking-[0.6em] text-zinc-600 uppercase mb-10 block">Brand Philosophy</span>
                <h3 className="text-6xl md:text-9xl font-black luxury-font tracking-tighter leading-tight mb-16 uppercase">PURE <br/> IDENTITY.</h3>
                <p className="text-zinc-400 text-xl md:text-2xl font-light mb-20 opacity-80 leading-relaxed">Free AI-generated Aura Seals for every bespoke piece. Jewelry is no longer just metal; it's a digital-physical bridge.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                  <div className="space-y-5">
                    <span className="block text-5xl font-black tracking-tighter">AI</span>
                    <span className="text-[10px] font-black uppercase text-zinc-700 tracking-[0.4em]">Seal Gen</span>
                  </div>
                  <div className="space-y-5">
                    <span className="block text-5xl font-black tracking-tighter">1/1</span>
                    <span className="text-[10px] font-black uppercase text-zinc-700 tracking-[0.4em]">Personal</span>
                  </div>
                  <div className="space-y-5">
                    <span className="block text-5xl font-black tracking-tighter">QR</span>
                    <span className="text-[10px] font-black uppercase text-zinc-700 tracking-[0.4em]">Vault Box</span>
                  </div>
                  <div className="space-y-5">
                    <span className="block text-5xl font-black tracking-tighter">24K</span>
                    <span className="text-[10px] font-black uppercase text-zinc-700 tracking-[0.4em]">Quality</span>
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

      <footer className="bg-white py-48 px-6 border-t border-zinc-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-24">
          <div className="col-span-1 md:col-span-2">
            <Logo size={50} className="mb-12" />
            <p className="text-zinc-400 max-w-sm leading-relaxed text-sm font-bold uppercase tracking-tight opacity-50 mb-10">
              Personalized luxury for the main character era. Crafted for the ones who know that the only thing that lives forever is the shine you leave behind.
            </p>
            <div className="flex gap-6">
                <div className="w-10 h-10 bg-zinc-50 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
                    <span className="font-black text-xs">IG</span>
                </div>
                <div className="w-10 h-10 bg-zinc-50 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
                    <span className="font-black text-xs">TT</span>
                </div>
                <div className="w-10 h-10 bg-zinc-50 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
                    <span className="font-black text-xs">DC</span>
                </div>
            </div>
          </div>
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.5em] mb-12 text-black">Collections</h4>
            <ul className="space-y-6 text-xs font-black text-zinc-300 uppercase tracking-widest">
              <li className="hover:text-black cursor-pointer transition-colors">The Aura Drop</li>
              <li className="hover:text-black cursor-pointer transition-colors">Men's Signets</li>
              <li className="hover:text-black cursor-pointer transition-colors">Bespoke Heirlooms</li>
              <li className="hover:text-black cursor-pointer transition-colors">Vault Items</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.5em] mb-12 text-black">The Lab</h4>
            <ul className="space-y-6 text-xs font-black text-zinc-300 uppercase tracking-widest">
              <li className="hover:text-black cursor-pointer transition-colors">AI Styling</li>
              <li className="hover:text-black cursor-pointer transition-colors">Aura Generation</li>
              <li className="hover:text-black cursor-pointer transition-colors">Legacy Keys</li>
              <li className="hover:text-black cursor-pointer transition-colors">Sustainability</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-40 pt-16 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-10 text-[11px] font-black text-zinc-300 uppercase tracking-[0.5em]">
          <span>© 2024 LŪM GROUP INC. — THE LEGACY DROP.</span>
          <div className="flex gap-16">
            <span className="hover:text-black cursor-pointer">Privacy Vault</span>
            <span className="hover:text-black cursor-pointer">Terms Of Aura</span>
          </div>
        </div>
      </footer>
      <ChatAssistant />
    </div>
  );
};

export default App;