import React from 'react';
import { ChefHat, BookOpen, History } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-3 select-none cursor-pointer">
        <div className="bg-warm-yellow p-2 rounded-xl border-2 border-caramel shadow-[4px_4px_0px_0px_rgba(139,69,19,1)]">
            <ChefHat className="w-8 h-8 text-caramel" />
        </div>
        <h1 className="text-2xl font-bold text-caramel tracking-wide">冰箱炼金术士</h1>
      </div>

      <div className="flex gap-4">
        <button className="flex items-center gap-2 text-caramel hover:text-soft-brown font-bold transition-colors">
          <BookOpen className="w-5 h-5" />
          <span className="hidden sm:inline">我的食谱本</span>
        </button>
        <button className="flex items-center gap-2 text-caramel hover:text-soft-brown font-bold transition-colors">
          <History className="w-5 h-5" />
          <span className="hidden sm:inline">历史记录</span>
        </button>
      </div>
    </header>
  );
};

export default Header;