import React from 'react';
import { Recipe } from '../types';
import { Clock, Star } from 'lucide-react';

interface Props {
  recipe: Recipe;
  index: number;
}

const RecipeCard: React.FC<Props> = ({ recipe, index }) => {
  return (
    <div 
      className="bg-white rounded-3xl p-6 border-2 border-orange-100 hover:border-warm-yellow shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-caramel leading-tight group-hover:text-soft-brown transition-colors">
          {recipe.title}
        </h3>
      </div>

      <p className="text-sm font-bold text-warm-yellow mb-4 uppercase tracking-wider">
        {recipe.tagline}
      </p>

      <div className="flex gap-4 mb-4 text-xs font-semibold text-gray-500">
        <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
          <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
          <span>{recipe.difficulty}</span>
        </div>
        <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
          <Clock className="w-3 h-3 text-orange-400" />
          <span>{recipe.time}</span>
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed flex-grow">
        {recipe.description}
      </p>
      
      <button className="mt-4 w-full py-2 bg-cream-white text-caramel font-bold rounded-xl border-2 border-transparent hover:border-warm-yellow transition-colors text-sm">
        查看食谱
      </button>
    </div>
  );
};

export default RecipeCard;