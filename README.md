# 🎓 Tutoriel Zustand - React Native + Web

Projet d'apprentissage pour maîtriser **Zustand**, la bibliothèque de gestion d'état simple et puissante.

## 🚀 Démarrage Rapide

```bash
# Installer les dépendances
npm install

# Lancer sur le web
npm run web

# Lancer sur mobile (simulateur)
npm run android
npm run ios
```

## 📚 Structure du Projet

```
zustand-tutorial/
├── stores/                # Stores Zustand
│   ├── counterStore.js    # Exemple 1: Compteur simple
│   ├── todoStore.js       # Exemple 2: Liste de tâches
│   └── userStore.js       # Exemple 3: Async & getters
├── components/            # Composants React
│   ├── CounterExample.js
│   └── TodoExample.js
├── App.js                # Application principale
├── TUTORIEL.md           # 📖 Guide complet
└── EXERCICE.md           # 🎯 Exercice pratique
```

## 📖 Guide d'Apprentissage

### 1️⃣ Commencez par le Tutoriel

Lisez **[TUTORIEL.md](./TUTORIEL.md)** qui couvre:
- Qu'est-ce que Zustand?
- Structure de base d'un store
- Utilisation de `set()` et `get()`
- Exemples progressifs commentés
- Bonnes pratiques

### 2️⃣ Explorez les Exemples

L'application contient 3 exemples progressifs:

#### Exemple 1: Compteur
- Store simple avec état numérique
- Actions basiques
- Introduction à `set()`

#### Exemple 2: Liste de Tâches
- Gestion de tableaux
- Opérations CRUD
- Immutabilité
- Filtres

#### Exemple 3: Utilisateur (dans le code)
- Actions asynchrones
- Gestion d'erreurs
- Getters et computed values

### 3️⃣ Faites l'Exercice

Mettez en pratique avec **[EXERCICE.md](./EXERCICE.md)**:
- Créer un panier d'achat complet
- Implémenter toutes les fonctionnalités
- Recevoir une revue de code

## 🎯 Ce que Vous Allez Apprendre

- ✅ Créer des stores Zustand
- ✅ Gérer l'état global
- ✅ Utiliser `set()` et `get()`
- ✅ Optimiser les performances avec des sélecteurs
- ✅ Gérer des tableaux et objets (immutabilité)
- ✅ Actions asynchrones
- ✅ Computed values (getters)
- ✅ Bonnes pratiques

## 🛠️ Technologies

- React Native (Expo)
- Zustand
- Compatible Web + Mobile

## 📝 Commandes Utiles

```bash
# Lancer le projet
npm run web          # Version web
npm run android      # Android
npm run ios          # iOS

# Autres
npm start            # Menu Expo
```

## 🎓 Ordre Recommandé

1. Lisez [TUTORIEL.md](./TUTORIEL.md)
2. Lancez l'application: `npm run web`
3. Explorez le code des stores dans `/stores`
4. Explorez le code des composants dans `/components`
5. Faites l'exercice dans [EXERCICE.md](./EXERCICE.md)
6. Partagez votre solution pour une revue!

## 💡 Support

- Consultez les commentaires dans le code
- Relisez le tutoriel
- Expérimentez avec les exemples

## 📚 Ressources

- [Documentation Zustand](https://github.com/pmndrs/zustand)
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)

---

**Bon apprentissage!** 🚀
