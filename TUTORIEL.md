# 📚 Tutoriel Zustand - Apprendre la Gestion d'État

Bienvenue dans ce tutoriel complet sur **Zustand**, une bibliothèque de gestion d'état simple et puissante pour React.

---

## 📖 Table des Matières

1. [Qu'est-ce que Zustand?](#quest-ce-que-zustand)
2. [Pourquoi utiliser Zustand?](#pourquoi-utiliser-zustand)
3. [Structure de base](#structure-de-base)
4. [Exemples progressifs](#exemples-progressifs)
5. [Exercice pratique](#exercice-pratique)

---

## Qu'est-ce que Zustand?

**Zustand** (qui signifie "état" en allemand) est une bibliothèque de gestion d'état pour React qui se distingue par sa simplicité et sa légèreté.

### Caractéristiques principales:
- **Simple**: Moins de boilerplate que Redux
- **Léger**: ~1KB (minifié + gzippé)
- **Rapide**: Performance optimale
- **Pas de provider**: Fonctionne sans Context API
- **TypeScript**: Support natif

---

## Pourquoi utiliser Zustand?

### Comparaison avec d'autres solutions:

#### Redux
```javascript
// Redux: beaucoup de boilerplate
const INCREMENT = 'INCREMENT';
const increment = () => ({ type: INCREMENT });
const reducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT: return state + 1;
    default: return state;
  }
};
```

#### Zustand
```javascript
// Zustand: simple et direct
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}));
```

**Zustand gagne en simplicité!**

---

## Structure de base

### 1. Création d'un Store

Un store Zustand se crée avec la fonction `create()`:

```javascript
import { create } from 'zustand';

const useStore = create((set, get) => ({
  // État initial
  propriete: valeur,

  // Actions
  action: () => set({ propriete: nouvelleValeur })
}));
```

### 2. Les deux paramètres importants

#### `set` - Modifier l'état

```javascript
// Méthode 1: Objet direct
set({ count: 5 })

// Méthode 2: Fonction (quand vous avez besoin de l'état précédent)
set((state) => ({ count: state.count + 1 }))
```

**Règle d'or**: Utilisez la fonction quand vous lisez l'état actuel!

#### `get` - Lire l'état

```javascript
const useStore = create((set, get) => ({
  count: 0,
  increment: () => {
    const current = get().count; // Lire l'état
    set({ count: current + 1 });
  },

  // Créer des getters (computed values)
  isPositive: () => get().count > 0
}));
```

### 3. Utilisation dans un composant

```javascript
function Counter() {
  // Méthode 1: Tout le store (⚠️ re-render à chaque changement)
  const { count, increment } = useStore();

  // Méthode 2: Sélection ciblée (✅ RECOMMANDÉ)
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}
```

---

## Exemples progressifs

### Exemple 1: Compteur Simple

**Fichier**: `stores/counterStore.js`

Ce store montre les concepts de base:
- État simple (nombre)
- Actions sans paramètre
- Actions avec paramètre
- Deux façons d'utiliser `set()`

**Points clés**:
```javascript
// Sans état précédent
reset: () => set({ count: 0 })

// Avec état précédent
increment: () => set((state) => ({ count: state.count + 1 }))
```

**Composant**: `components/CounterExample.js`

Ouvrez ce fichier et observez:
1. Comment importer le hook `useCounterStore`
2. Sélection ciblée avec `(state) => state.count`
3. Utilisation des actions

### Exemple 2: Liste de Tâches

**Fichier**: `stores/todoStore.js`

Cet exemple avancé montre:
- Gestion de tableaux
- Opérations CRUD (Create, Read, Update, Delete)
- Immutabilité avec spread operator
- Filtres et états multiples

**Principes d'immutabilité**:
```javascript
// Ajouter un élément
todos: [...state.todos, nouvelElement]

// Supprimer un élément
todos: state.todos.filter(todo => todo.id !== id)

// Modifier un élément
todos: state.todos.map(todo =>
  todo.id === id ? { ...todo, completed: true } : todo
)
```

**Composant**: `components/TodoExample.js`

Points d'apprentissage:
1. Sélection de plusieurs valeurs du store
2. Calculs dérivés dans le composant (`filteredTodos`)
3. Gestion de formulaires avec état local (`inputText`)

### Exemple 3: Utilisateur avec Async

**Fichier**: `stores/userStore.js`

Concepts avancés:
- Actions asynchrones (async/await)
- États de chargement
- Gestion d'erreurs
- Utilisation de `get()` pour créer des getters
- Computed values (valeurs calculées)

**Pattern async recommandé**:
```javascript
login: async (username, password) => {
  // 1. État de chargement
  set({ isLoading: true, error: null });

  try {
    // 2. Requête API
    const user = await api.login(username, password);

    // 3. Succès
    set({ user, isLoading: false });
  } catch (error) {
    // 4. Erreur
    set({ error: error.message, isLoading: false });
  }
}
```

---

## Concepts Avancés

### 1. Sélecteurs et Performance

```javascript
// ❌ MAUVAIS: Re-render à chaque changement du store
const { count, user, todos } = useStore();

// ✅ BON: Re-render seulement si count change
const count = useStore((state) => state.count);

// ✅ BON: Sélecteur complexe
const activeTodos = useTodoStore((state) =>
  state.todos.filter(t => !t.completed)
);
```

### 2. Middleware

Zustand offre des middlewares pour des fonctionnalités avancées:

#### `persist` - Sauvegarde automatique
```javascript
import { persist, createJSONStorage } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 }))
    }),
    {
      name: 'my-store',
      storage: createJSONStorage(() => localStorage), // Web
    }
  )
);
```

**Note**: La persistance peut nécessiter une configuration spécifique selon votre environnement (Web vs Mobile).

#### `devtools` - Déboguer avec Redux DevTools
```javascript
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 }))
  }))
);
```

#### Combiner plusieurs middlewares
```javascript
import { persist, devtools } from 'zustand/middleware';

const useStore = create(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 }))
      }),
      { name: 'my-store' }
    )
  )
);
```

### 3. Réinitialisation du Store

```javascript
const initialState = { count: 0, todos: [] };

const useStore = create((set) => ({
  ...initialState,

  increment: () => set((state) => ({ count: state.count + 1 })),

  // Action pour réinitialiser
  reset: () => set(initialState)
}));
```

---

## Bonnes Pratiques

### ✅ À faire:

1. **Utilisez des sélecteurs ciblés** pour éviter les re-renders inutiles
2. **Créez un fichier par store** pour l'organisation
3. **Nommez vos stores clairement**: `useUserStore`, `useTodoStore`
4. **Utilisez TypeScript** pour la sécurité des types
5. **Immutabilité**: toujours créer de nouveaux objets/tableaux

### ❌ À éviter:

1. Mutabilité directe: `state.count++` ❌
2. Sélectionner tout le store quand vous n'avez besoin que d'une partie
3. Logique métier complexe dans les composants (mettez-la dans le store)
4. Stores gigantesques (divisez en plusieurs stores)

---

## Démarrer le Projet

```bash
cd zustand-tutorial
npm run web       # Lancer sur le web
npm run android   # Lancer sur Android
npm run ios       # Lancer sur iOS
```

---

## Exercice Pratique

Maintenant que vous avez compris les bases, passez à l'exercice pratique dans `EXERCICE.md`!

Vous allez créer un **store de panier d'achat** avec:
- Ajout/suppression de produits
- Calcul du total
- Gestion des quantités

**Bon courage!** 🚀

---

## Ressources

- [Documentation officielle Zustand](https://github.com/pmndrs/zustand)
- [Zustand vs Redux](https://zustand-demo.pmnd.rs/)
- [Exemples avancés](https://github.com/pmndrs/zustand/tree/main/examples)
