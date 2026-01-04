# 🎯 Exercice Pratique: Panier d'Achat

## Objectif

Créer un **store Zustand pour un panier d'achat** avec toutes les fonctionnalités d'un e-commerce.

---

## Consignes

### Étape 1: Créer le Store

Créez un fichier `stores/cartStore.js` avec les fonctionnalités suivantes:

#### État initial:
```javascript
{
  items: [],        // Liste des produits dans le panier
  isOpen: false     // Modal panier ouvert/fermé
}
```

#### Structure d'un item:
```javascript
{
  id: 1,
  name: "Product Name",
  price: 29.99,
  quantity: 2,
  image: "url"  // optionnel
}
```

#### Actions à implémenter:

1. **addItem(product)**: Ajouter un produit au panier
   - Si le produit existe déjà, augmenter sa quantité de 1
   - Sinon, l'ajouter avec quantity = 1

2. **removeItem(id)**: Supprimer complètement un produit

3. **updateQuantity(id, quantity)**: Modifier la quantité d'un produit
   - Si quantity <= 0, supprimer le produit

4. **clearCart()**: Vider le panier

5. **toggleCart()**: Ouvrir/fermer le modal du panier

#### Getters à créer:

1. **getTotalItems()**: Nombre total d'articles (somme des quantités)
2. **getTotalPrice()**: Prix total du panier
3. **getItemCount(id)**: Quantité d'un produit spécifique

---

### Étape 2: Créer le Composant

Créez `components/ShoppingCart.js` qui affiche:

1. **Liste de produits disponibles** (vous pouvez utiliser des données mock):
   ```javascript
   const PRODUCTS = [
     { id: 1, name: "Laptop", price: 999.99 },
     { id: 2, name: "Phone", price: 699.99 },
     { id: 3, name: "Headphones", price: 199.99 },
     { id: 4, name: "Mouse", price: 49.99 },
   ];
   ```

2. **Bouton pour ajouter au panier** pour chaque produit

3. **Badge** affichant le nombre total d'articles

4. **Modal/Section panier** montrant:
   - Liste des items avec nom, prix, quantité
   - Boutons +/- pour modifier les quantités
   - Bouton pour supprimer un item
   - Total du panier
   - Bouton "Vider le panier"

---

### Étape 3: Design (Optionnel)

Rendez votre panier visuellement agréable avec:
- Couleurs cohérentes
- Animations (optionnel)
- Icons (vous pouvez utiliser des emojis: 🛒 🗑️ ➕ ➖)

---

## Critères de Validation

Votre solution doit:

- [ ] Utiliser Zustand correctement avec `create()` et `set()`
- [ ] Gérer l'immutabilité (spread operator, map, filter)
- [ ] Implémenter toutes les actions demandées
- [ ] Utiliser des sélecteurs ciblés dans le composant
- [ ] Afficher correctement le total et le nombre d'items
- [ ] Gérer le cas où un produit existe déjà (quantité++)
- [ ] Permettre de modifier les quantités
- [ ] Avoir un code propre et commenté

---

## Indices

<details>
<summary>Indice 1: Structure du store</summary>

```javascript
export const useCartStore = create((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product) => set((state) => {
    // Vérifier si le produit existe
    const existingItem = state.items.find(item => item.id === product.id);

    if (existingItem) {
      // Augmenter la quantité
      return {
        items: state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    } else {
      // Ajouter le nouveau produit
      return {
        items: [...state.items, { ...product, quantity: 1 }]
      };
    }
  }),

  // ... autres actions
}));
```
</details>

<details>
<summary>Indice 2: Getters avec get()</summary>

```javascript
getTotalItems: () => {
  const items = get().items;
  return items.reduce((sum, item) => sum + item.quantity, 0);
},

getTotalPrice: () => {
  const items = get().items;
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}
```
</details>

<details>
<summary>Indice 3: Utilisation dans le composant</summary>

```javascript
function ShoppingCart() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const total = getTotalPrice(); // Appeler le getter

  return (
    <View>
      {PRODUCTS.map(product => (
        <TouchableOpacity
          key={product.id}
          onPress={() => addItem(product)}
        >
          <Text>{product.name} - ${product.price}</Text>
        </TouchableOpacity>
      ))}

      <Text>Total: ${total.toFixed(2)}</Text>
    </View>
  );
}
```
</details>

---

## Bonus (Avancé)

Si vous avez terminé l'exercice de base, essayez ces challenges:

### 1. Persistence
Utilisez le middleware `persist` pour sauvegarder le panier:
```javascript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      // votre store
    }),
    {
      name: 'shopping-cart', // nom dans localStorage
    }
  )
);
```

### 2. Codes Promo
Ajoutez un système de codes promo:
- État: `discountCode: null`, `discountPercent: 0`
- Action: `applyDiscount(code)` qui applique -10% si code === "PROMO10"
- Getter: `getFinalPrice()` qui applique la réduction

### 3. Historique
Ajoutez un historique des achats:
- Action: `checkout()` qui vide le panier et ajoute à l'historique
- État: `orderHistory: []`

---

## Solution

Une fois que vous avez terminé votre exercice, partagez votre code!

Je vais le réviser et vous donner des retours sur:
- ✅ Ce qui est bien fait
- 💡 Ce qui peut être amélioré
- 🎯 Bonnes pratiques Zustand

---

## Fichiers à créer

```
zustand-tutorial/
├── stores/
│   └── cartStore.js        ← À CRÉER
├── components/
│   └── ShoppingCart.js     ← À CRÉER
└── App.js                  ← À MODIFIER (ajouter <ShoppingCart />)
```

---

Bon courage! N'hésitez pas à consulter le tutoriel et les exemples existants si vous êtes bloqué.

**Quand vous avez terminé, montrez-moi votre code pour une revue!** 🚀
