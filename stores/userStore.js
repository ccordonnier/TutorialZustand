// ==========================================
// EXEMPLE 3: STORE AVEC GET ET COMPUTED VALUES
// ==========================================
// Montre comment utiliser "get" pour lire l'état
// et créer des valeurs calculées (selectors)

import { create } from 'zustand';

export const useUserStore = create((set, get) => ({
  // État
  user: null,
  isLoading: false,
  error: null,
  theme: 'light',

  // Action de connexion (simulation)
  login: async (username, password) => {
    set({ isLoading: true, error: null });

    try {
      // Simulation d'une requête API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (password === 'password123') {
        set({
          user: {
            id: 1,
            username,
            email: `${username}@example.com`,
            loginAt: new Date().toISOString(),
          },
          isLoading: false,
        });
      } else {
        throw new Error('Mot de passe incorrect');
      }
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
        user: null,
      });
    }
  },

  // Déconnexion
  logout: () => {
    set({
      user: null,
      error: null,
    });
  },

  // Changer le thème
  toggleTheme: () => {
    // Utilisation de "get" pour lire l'état actuel
    const currentTheme = get().theme;
    set({ theme: currentTheme === 'light' ? 'dark' : 'light' });
  },

  // Getter (computed value) - fonction qui retourne une valeur calculée
  isAuthenticated: () => {
    return get().user !== null;
  },

  // Autre getter
  getUserDisplayName: () => {
    const user = get().user;
    return user ? user.username : 'Invité';
  },
}));

// UTILISATION DES GETTERS:
// Les fonctions get() permettent de:
// 1. Lire l'état actuel dans une action
// 2. Créer des valeurs calculées (computed)
// 3. Éviter la duplication de logique

// NOTES:
// - "get" est le 2ème paramètre de create()
// - Utilisez get() pour accéder à l'état dans les actions
// - Les getters sont des fonctions, appelez-les: isAuthenticated()
