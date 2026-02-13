
import React, { useState } from 'react';
import { getStylingAdvice } from '../services/gemini';

const AIStylist: React.FC = () => {
  const [occasion, setOccasion] = useState('');
  const [outfit, setOutfit] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!occasion || !outfit) return;
    setLoading(true);
    const result = await getStylingAdvice(occasion, outfit);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="bg-zinc-950 p-12 md:p-20 rounded-[60px] mb-32 relative overflow-hidden text-white shadow-2xl">
      <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
        <h3 className="text-[12rem] font-black leading-none tracking-tighter">AI.</h3>
      </div>
      
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div className="inline-block px-4 py-1.5 bg-white text-black text-[9px] font-black rounded-full uppercase tracking-[0.3em] mb-8">
          Styling Aura
        </div>
        <h2 className="text-5xl md:text-7xl font-bold luxury-font mb-6 tracking-tighter">THE FIT CHECK.</h2>
        <p className="text-zinc-500 mb-12 text-sm font-bold uppercase tracking-widest">Feed the AI your vibe, it'll curate the shine.</p>
        
        <div className="flex flex-col gap-5 mb-12">
          <input 
            type="text" 
            placeholder="Occasion? (e.g. Club, Gala, Sunday Reset)"
            className="p-6 rounded-[32px] border-none focus:outline-none focus:ring-2 focus:ring-white bg-white/5 backdrop-blur-md text-white placeholder:text-zinc-700 text-lg font-medium"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="What's the fit? (e.g. Baggy suit, Silk slip)"
            className="p-6 rounded-[32px] border-none focus:outline-none focus:ring-2 focus:ring-white bg-white/5 backdrop-blur-md text-white placeholder:text-zinc-700 text-lg font-medium"
            value={outfit}
            onChange={(e) => setOutfit(e.target.value)}
          />
        </div>

        <button 
          onClick={handleAsk}
          disabled={loading || !occasion || !outfit}
          className="px-16 py-6 bg-white text-black font-black rounded-full uppercase text-[11px] tracking-[0.3em] transition-all hover:scale-105 active:scale-95 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:hover:scale-100"
        >
          {loading ? 'Consulting The AI...' : 'Generate My Vibe'}
        </button>

        {advice && (
          <div className="mt-16 p-10 bg-white/5 border border-white/10 rounded-[40px] shadow-3xl animate-in zoom-in duration-500">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em] mb-6">AI Stylist Analysis</h4>
            <p className="text-xl md:text-2xl leading-relaxed italic text-zinc-100 font-light tracking-tight">"{advice}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIStylist;
