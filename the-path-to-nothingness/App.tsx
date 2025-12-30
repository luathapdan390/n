
import React, { useState } from 'react';
import { generateNothingnessSteps } from './services/geminiService';
import { TransmutationResult } from './types';
import ReasoningList from './components/ReasoningList';
import { Wind, Loader2, Sparkles, BookOpen } from 'lucide-react';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TransmutationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTransmute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await generateNothingnessSteps(input);
      setResult(data);
    } catch (err) {
      setError('Sự thiền định bị gián đoạn. Hãy thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 md:py-24 selection:bg-zinc-800 selection:text-white">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
      </div>

      <header className="text-center mb-16 space-y-4 max-w-3xl">
        <div className="inline-flex items-center justify-center p-3 bg-zinc-900 rounded-full mb-4 border border-zinc-800">
          <Wind className="w-6 h-6 text-zinc-400" />
        </div>
        <h1 className="serif text-5xl md:text-7xl font-bold text-white tracking-tight">
          Hành Trình Về <span className="italic opacity-50">Hư Vô</span>
        </h1>
        <p className="text-zinc-500 text-lg md:text-xl font-light tracking-wide max-w-xl mx-auto italic">
          "Danh bất chính thì ngôn bất thuận. Khi mọi danh xưng tan biến, chỉ còn lại sự trống rỗng thuần khiết."
        </p>
      </header>

      <main className="w-full max-w-2xl">
        <form onSubmit={handleTransmute} className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập một sự thật, một cái tên, một vật chất..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-5 text-xl text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all nothingness-glow"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="absolute right-3 top-3 bottom-3 px-6 bg-white text-black rounded-xl font-semibold hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 transition-colors flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Hóa Giải</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-red-400 text-center text-sm italic">{error}</p>
        )}

        {result && (
          <div className="mt-8">
             <ReasoningList 
               steps={result.steps} 
               conclusion={result.finalConclusion} 
               identityReflection={result.identityReflection}
             />
          </div>
        )}

        {!result && !loading && (
          <div className="mt-12 p-8 border border-dashed border-zinc-800 rounded-2xl opacity-40 hover:opacity-60 transition-opacity">
            <div className="flex items-center gap-3 mb-3 text-zinc-400">
              <BookOpen className="w-5 h-5" />
              <span className="font-semibold uppercase text-xs tracking-widest">Ví dụ về đạo lý</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed italic">
              "Elon Musk có 769 tỷ USD" &rarr; Đô la là tiền &rarr; Tiền làm từ giấy &rarr; Giấy từ cây &rarr; Cây từ đất &rarr; Đất thuộc Trái đất &rarr; Trái đất thuộc Vũ trụ &rarr; Vũ trụ là gương &rarr; Gương là ảo ảnh &rarr; Ảo ảnh là Hư vô.
            </p>
          </div>
        )}
      </main>

      <footer className="mt-auto pt-24 pb-8 text-zinc-700 text-xs tracking-widest uppercase text-center font-mono">
        © Thuyết Hư Vô Điện Tử · 2024
      </footer>
    </div>
  );
};

export default App;
