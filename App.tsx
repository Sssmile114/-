import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import IngredientBubble from './components/IngredientBubble';
import RecipeCard from './components/RecipeCard';
import { PRESET_INGREDIENTS } from './constants';
import { Ingredient, AlchemyResult } from './types';
import { generateRecipesFromIngredients } from './services/geminiService';
import { Wand2, Utensils, RefreshCw, Sparkles, ChefHat } from 'lucide-react';

const App: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [isAlchemyActive, setIsAlchemyActive] = useState(false);
  const [result, setResult] = useState<AlchemyResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleIngredient = useCallback((ingredient: Ingredient) => {
    setSelectedIngredients(prev => {
      const exists = prev.find(i => i.id === ingredient.id);
      if (exists) {
        return prev.filter(i => i.id !== ingredient.id);
      }
      return [...prev, ingredient];
    });
  }, []);

  const handleAlchemy = async () => {
    if (selectedIngredients.length === 0) return;

    setIsAlchemyActive(true);
    setError(null);
    setResult(null);

    try {
      const ingredientNames = selectedIngredients.map(i => i.name);
      const data = await generateRecipesFromIngredients(ingredientNames);
      setResult(data);
    } catch (err) {
      setError("魔法失效了，请重试。");
    } finally {
      setIsAlchemyActive(false);
    }
  };

  const handleReset = () => {
    setSelectedIngredients([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-cream-white text-caramel pb-20 overflow-x-hidden">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* --- Hero / Interactive Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[500px] items-center">
          
          {/* A. Left: The Fridge (Input) */}
          <div className="lg:col-span-4 relative order-2 lg:order-1">
            <div className="relative bg-white/40 backdrop-blur-sm border-4 border-white rounded-[3rem] p-8 h-[500px] flex flex-col shadow-xl">
               {/* Fridge Handle Visual */}
               <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-24 bg-white/60 rounded-full shadow-inner"></div>
               
               <h2 className="text-xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                 食材冷藏库
               </h2>

               <div className="flex-grow grid grid-cols-3 gap-4 content-start overflow-y-auto pr-2 custom-scrollbar">
                 {PRESET_INGREDIENTS.map(ing => (
                   <IngredientBubble
                     key={ing.id}
                     ingredient={ing}
                     isSelected={selectedIngredients.some(i => i.id === ing.id)}
                     onClick={toggleIngredient}
                   />
                 ))}
               </div>

               <div className="mt-4 pt-4 border-t-2 border-caramel/10 text-center text-sm font-semibold opacity-60">
                 点击气泡添加食材
               </div>
            </div>
            
            {/* Fridge "Glow" decoration */}
            <div className="absolute -inset-4 bg-blue-200/20 blur-3xl rounded-full -z-10 pointer-events-none"></div>
          </div>


          {/* B. Center: The Magic Button */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center z-10 order-3 lg:order-2 py-8 lg:py-0">
            <div className="relative group">
               {/* Glowing effect behind button */}
               <div className={`absolute -inset-1 bg-warm-yellow rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 ${isAlchemyActive ? 'animate-pulse' : ''}`}></div>
               
               <button
                 onClick={handleAlchemy}
                 disabled={isAlchemyActive || selectedIngredients.length === 0}
                 className={`
                    relative w-48 h-48 rounded-full flex flex-col items-center justify-center gap-2
                    border-4 border-caramel shadow-[0px_8px_0px_0px_#8B4513] active:shadow-none active:translate-y-[8px]
                    transition-all duration-150
                    ${isAlchemyActive 
                      ? 'bg-orange-100 cursor-wait' 
                      : selectedIngredients.length === 0 
                        ? 'bg-gray-100 cursor-not-allowed opacity-80' 
                        : 'bg-warm-yellow hover:bg-[#FFC700] cursor-pointer'
                    }
                 `}
               >
                 {isAlchemyActive ? (
                   <div className="animate-pan-shake">
                      <ChefHat className="w-16 h-16 text-caramel opacity-50" />
                   </div>
                 ) : (
                   <Wand2 className={`w-16 h-16 text-caramel ${selectedIngredients.length > 0 ? 'animate-pulse' : ''}`} />
                 )}
                 <span className="text-lg font-black uppercase tracking-wider text-caramel">
                   {isAlchemyActive ? '炼金中...' : '开始炼金'}
                 </span>
               </button>
            </div>
            
            {selectedIngredients.length > 0 && !isAlchemyActive && (
               <p className="mt-8 font-bold text-caramel/60 animate-bounce">
                 已选择 {selectedIngredients.length} 种食材！
               </p>
            )}
          </div>


          {/* C. Right: The Dish (Result Preview) */}
          <div className="lg:col-span-4 h-full flex items-center justify-center order-1 lg:order-3 mb-8 lg:mb-0">
             <div className="relative w-full h-[400px] flex flex-col items-center justify-center text-center">
                {isAlchemyActive ? (
                  <div className="flex flex-col items-center gap-6">
                    <div className="relative">
                      <div className="w-32 h-32 border-4 border-caramel border-t-transparent rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-4xl">🍳</div>
                    </div>
                    <p className="text-xl font-bold text-caramel animate-pulse">正在翻阅古老的食谱...</p>
                  </div>
                ) : result ? (
                  <div className="animate-float w-full max-w-sm">
                    {/* Placeholder for the "Generated Dish Image" - Using a high quality food placeholder */}
                    <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl mb-6 group">
                        <img 
                          src="https://picsum.photos/800/800?food" 
                          alt="Delicious Result" 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-6">
                           <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full text-caramel font-bold text-sm shadow-lg flex items-center gap-2">
                             <Sparkles className="w-4 h-4 text-warm-yellow" />
                             炼金成功！
                           </div>
                        </div>
                    </div>
                    <p className="text-lg font-bold text-caramel">{result.message}</p>
                    <button 
                      onClick={handleReset}
                      className="mt-4 flex items-center gap-2 mx-auto text-sm font-bold text-caramel/60 hover:text-caramel transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" /> 重新开始
                    </button>
                  </div>
                ) : (
                  <div className="opacity-40 flex flex-col items-center">
                    <Utensils className="w-32 h-32 mb-4" />
                    <p className="text-2xl font-bold">等待投喂食材...</p>
                    <p className="text-sm mt-2 max-w-xs">从左侧选择食材，然后点击炼金按钮。</p>
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* --- D. Recipe Cards Section --- */}
        {result && (
          <div className="mt-16 animate-in slide-in-from-bottom-10 fade-in duration-700">
             <div className="flex items-center gap-4 mb-8">
               <div className="h-1 bg-caramel/10 flex-grow rounded-full"></div>
               <h3 className="text-3xl font-black text-caramel text-center">解锁的食谱</h3>
               <div className="h-1 bg-caramel/10 flex-grow rounded-full"></div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {result.recipes.map((recipe, idx) => (
                  <RecipeCard key={idx} recipe={recipe} index={idx} />
                ))}
             </div>
          </div>
        )}

        {error && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-red-100 text-red-800 px-6 py-3 rounded-full font-bold shadow-lg border-2 border-red-200 animate-bounce">
            {error}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;