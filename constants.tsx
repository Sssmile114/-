import { Ingredient } from './types';

export const PRESET_INGREDIENTS: Ingredient[] = [
  { id: '1', name: '鸡蛋', emoji: '🥚' },
  { id: '2', name: '番茄', emoji: '🍅' },
  { id: '3', name: '洋葱', emoji: '🧅' },
  { id: '4', name: '土豆', emoji: '🥔' },
  { id: '5', name: '鸡肉', emoji: '🍗' },
  { id: '6', name: '米饭', emoji: '🍚' },
  { id: '7', name: '芝士', emoji: '🧀' },
  { id: '8', name: '牛肉', emoji: '🥩' },
  { id: '9', name: '胡萝卜', emoji: '🥕' },
  { id: '10', name: '豆腐', emoji: '🧊' },
];

export const MOCK_RECIPES = [
  {
    title: "黄金洋葱蛋炒饭",
    difficulty: "⭐",
    time: "5分钟",
    tagline: "懒人救星，碳水炸弹",
    description: "松软的鸡蛋遇上焦糖化的洋葱，一碗快速又满足的暖心料理。"
  },
  {
    title: "洋葱圈配水煮蛋",
    difficulty: "⭐⭐",
    time: "10分钟",
    tagline: "轻食主义者的选择",
    description: "酥脆的口感搭配柔软的蛋白质，一份营养均衡的完美小食。"
  },
  {
    title: "洋葱碎滑蛋",
    difficulty: "⭐",
    time: "3分钟",
    tagline: "快手便当首选",
    description: "快速、营养，是上班族带饭的绝佳选择。"
  }
];