
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
    <div className="bg-gray-50 p-10 rounded-[40px] border border-gray-100 mb-16 relative overflow-hidden">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-bold rounded-full uppercase tracking-widest mb-4">
          Personalized Aura
        </div>
        <h2 className="text-4xl font-bold luxury-font mb-4 tracking-tight">AI Style Check</h2>
        <p className="text-gray-500 mb-8 text-sm">Tell us your fit, we'll curate the vibe.</p>
        
        <div className="flex flex-col gap-4 mb-8">
          <input 
            type="text" 
            placeholder="Occasion? (e.g. Rave, Brunch, Interview)"
            className="p-4 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-black bg-white shadow-sm placeholder:text-gray-300"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Fit check? (e.g. Baggy jeans, Satin slip)"
            className="p-4 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-black bg-white shadow-sm placeholder:text-gray-300"
            value={outfit}
            onChange={(e) => setOutfit(e.target.value)}
          />
        </div>

        <button 
          onClick={handleAsk}
          disabled={loading || !occasion || !outfit}
          className="px-10 py-4 bg-black text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95 disabled:bg-gray-300"
        >
          {loading ? 'Styling you...' : 'Consult Stylist'}
        </button>

        {advice && (
          <div className="mt-10 p-8 bg-white rounded-3xl border border-gray-100 shadow-xl animate-in zoom-in duration-300">
            <p className="text-lg leading-relaxed italic text-gray-800">"{advice}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIStylist;
