export interface Ingredient {
  id: string;
  name: string;
  emoji: string;
}

export interface Recipe {
  title: string;
  difficulty: string; // e.g., "⭐" or "Easy"
  time: string; // e.g., "15 mins"
  tagline: string; // e.g., "Lazy man's savior"
  description: string;
}

export interface AlchemyResult {
  message: string;
  recipes: Recipe[];
}