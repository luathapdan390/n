
import React, { useEffect, useState } from 'react';
import { ReasoningStep } from '../types';

interface ReasoningListProps {
  steps: ReasoningStep[];
  conclusion: string;
  identityReflection: string;
}

const ReasoningList: React.FC<ReasoningListProps> = ({ steps, conclusion, identityReflection }) => {
  const [visibleSteps, setVisibleSteps] = useState<number>(0);
  const [showIdentity, setShowIdentity] = useState(false);

  useEffect(() => {
    if (steps.length > 0) {
      const interval = setInterval(() => {
        setVisibleSteps((prev) => {
          if (prev < steps.length) return prev + 1;
          clearInterval(interval);
          setTimeout(() => setShowIdentity(true), 1500);
          return prev;
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [steps]);

  return (
    <div className="mt-12 max-w-2xl mx-auto space-y-6 pb-24">
      {steps.slice(0, visibleSteps).map((step) => (
        <div 
          key={step.index}
          className="flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000"
        >
          <span className="text-zinc-600 font-mono pt-1 text-sm">{step.index}.</span>
          <p className="text-zinc-300 text-lg leading-relaxed italic">
            {step.content}
          </p>
        </div>
      ))}

      {visibleSteps === steps.length && (
        <div className="mt-16 pt-12 border-t border-zinc-800 text-center animate-in zoom-in fade-in duration-1000">
          <h2 className="serif text-4xl md:text-5xl text-white font-bold tracking-widest uppercase opacity-80">
            {conclusion}
          </h2>
          <p className="mt-4 text-zinc-500 italic">Vạn vật quy nhất, nhất quy hư vô.</p>
        </div>
      )}

      {showIdentity && (
        <div className="mt-20 pt-16 border-t border-zinc-900 animate-in fade-in duration-1000">
          <div className="bg-zinc-900/30 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
             <h3 className="text-xs tracking-[0.3em] uppercase text-zinc-600 mb-6 font-mono text-center">Tự Tính & Bản Ngã</h3>
             <p className="serif text-2xl md:text-3xl text-zinc-400 italic leading-relaxed text-center">
               "{identityReflection}"
             </p>
             <div className="mt-8 flex justify-center gap-1">
                <div className="w-1 h-1 bg-zinc-700 rounded-full"></div>
                <div className="w-1 h-1 bg-zinc-800 rounded-full"></div>
                <div className="w-1 h-1 bg-zinc-700 rounded-full"></div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReasoningList;
