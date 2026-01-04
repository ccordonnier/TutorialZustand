// ==========================================
// EXEMPLE 1: STORE SIMPLE - COMPTEUR
// ==========================================
// Ceci est l'exemple le plus basique de Zustand
// Il montre comment créer un store avec un état et des actions

import { create } from 'zustand';

// create() prend une fonction qui reçoit "set" en paramètre
// "set" est la fonction qui permet de modifier l'état
export const useCounterStore = create((set) => ({
  // État initial
  count: 0,

  // Actions pour modifier l'état
  increment: () => set((state) => ({ count: state.count + 1 })),

  decrement: () => set((state) => ({ count: state.count - 1 })),

  // On peut aussi modifier l'état directement sans fonction
  reset: () => set({ count: 0 }),

  // Action avec paramètre
  incrementByAmount: (amount) => set((state) => ({ count: state.count + amount })),
}));

// NOTES IMPORTANTES:
// 1. "set" peut recevoir un objet direct: set({ count: 0 })
// 2. Ou une fonction qui reçoit l'état actuel: set((state) => ({ count: state.count + 1 }))
// 3. Utilisez la fonction quand vous avez besoin de l'état précédent
