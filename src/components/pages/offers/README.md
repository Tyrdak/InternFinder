## 📄 Guide Offres (Offers)

Ce guide documente le comportement de la page Offres: affichage multiple, pagination (sans infinite scroll), limite par page, et cache navigateur. Il se réfère au composant `src/components/pages/offers/OffersSearchFilter.tsx` et à l’API `app/api/offers/route.ts`.

---

### 1) Affichage: une seule vs plusieurs offres
- Une seule: utilisez l’état `offer: TheirStackJob | null` et affichez la carte si `offer` est non nul.
- Plusieurs: utilisez l’état `offers: TheirStackJob[]` et mappez pour afficher chaque carte.

Le composant inclut des commentaires pour basculer entre les deux modes (recherche « détail » vs « liste »).

---

### 2) Pagination (sans infinite scroll)
- La pagination est contrôlée par boutons « Page précédente / Page suivante ».
- La fonction `fetchOffers(formDataOrParams, pageOverride?)` remplace la page courante et ne cumule pas.
- La page est 0‑based côté UI. Adaptez côté API si besoin (1‑based).

---

### 3) Limite stricte par page
- La constante `LIMIT` dans `OffersSearchFilter.tsx` définit le nombre d’offres maximum par page.
- L’UI n’affiche jamais plus que `LIMIT` éléments par page.
- L’API reçoit `limit: LIMIT` et `page`.

---

### 4) Cache navigateur (persistance au refresh)
- Sauvegarde dans `localStorage`: `{ offers, params, page, ts }`.
- Restauration au montage pour recharger la dernière recherche et sa page.

---

### 5) Chemins utiles
- Composant: `src/components/pages/offers/OffersSearchFilter.tsx`
- API: `app/api/offers/route.ts`

---

### 6) Astuces rapides
- Pour repasser à une seule offre, remplacez `setOffers(items)` par `setOffer(items[0] ?? null)` et ajustez le rendu.
- Pour n’afficher qu’une colonne, le wrapper utilise `grid grid-cols-1`.
