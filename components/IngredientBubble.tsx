import React from 'react';
import { Ingredient } from '../types';

interface Props {
  ingredient: Ingredient;
  onClick: (ingredient: Ingredient) => void;
  isSelected: boolean;
}

const IngredientBubble: React.FC<Props> = ({ ingredient, onClick, isSelected }) => {
  return (
    <button
      onClick={() => onClick(ingredient)}
      className={`
        relative flex flex-col items-center justify-center p-3 rounded-full w-20 h-20 
        transition-all duration-300 ease-out transform
        border-2 
        ${isSelected 
          ? 'bg-warm-yellow border-caramel scale-110 shadow-[0px_0px_15px_rgba(255,215,0,0.6)] rotate-3' 
          : 'bg-white border-transparent hover:border-warm-yellow hover:scale-105 shadow-sm'
        }
      `}
    >
      <span className="text-3xl mb-1 filter drop-shadow-sm">{ingredient.emoji}</span>
      <span className={`text-xs font-bold ${isSelected ? 'text-caramel' : 'text-gray-400'}`}>
        {ingredient.name}
      </span>
      
      {/* Magic particles when selected */}
      {isSelected && (
        <>
          <span className="absolute -top-1 -right-1 text-yellow-500 animate-ping text-[8px]">✨</span>
          <span className="absolute bottom-0 -left-1 text-yellow-500 animate-bounce text-[8px] delay-75">✨</span>
        </>
      )}
    </button>
  );
};

export default IngredientBubble;