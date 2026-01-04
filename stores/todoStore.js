// ==========================================
// EXEMPLE 2: STORE AVEC TABLEAUX - TODOS
// ==========================================
// Cet exemple montre comment gérer des tableaux d'objets
// et des opérations CRUD (Create, Read, Update, Delete)

import { create } from 'zustand';

export const useTodoStore = create((set) => ({
  // État: tableau de todos
  todos: [],
  filter: 'all', // 'all', 'active', 'completed'

  // Ajouter une todo
  addTodo: (text) =>
    set((state) => ({
      todos: [
        ...state.todos, // Copie des todos existantes
        {
          id: Date.now(), // ID simple (en prod, utilisez uuid)
          text,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ],
    })),

  // Supprimer une todo
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  // Basculer le statut completed
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),

  // Modifier le texte d'une todo
  editTodo: (id, newText) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      ),
    })),

  // Changer le filtre
  setFilter: (filter) => set({ filter }),

  // Supprimer toutes les todos complétées
  clearCompleted: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    })),
}));

// PRINCIPES IMPORTANTS:
// 1. TOUJOURS créer de nouveaux tableaux/objets (immutabilité)
// 2. Utilisez spread operator (...) pour copier
// 3. .map() pour modifier un élément
// 4. .filter() pour supprimer un élément
// 5. [...array, newItem] pour ajouter un élément
