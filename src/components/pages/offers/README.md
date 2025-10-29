/**
# 🔄 Comment passer d'une seule offre à plusieurs offres (étape par étape)

Ce guide explique comment modifier le code pour passer d'un affichage **d'une seule offre** (vue "détail") à un affichage **multiple** (vue "liste" avec plusieurs offres), ou réciproquement. On se réfère ici au composant `OffersSearchFilter`.

---

## 1️⃣ Stocker plusieurs offres (état React)

- **Affichage d'une seule offre** : on utilise `const [offer, setOffer] = React.useState<TheirStackJob | null>(null);`
- **Affichage multiple** : on utilise `const [offers, setOffers] = React.useState<TheirStackJob[]>([]);`

→ **Passez d'un seul état à l'autre selon l'affichage souhaité.**

---

## 2️⃣ Récupérer les résultats de la recherche

Dans `fetchOffers`, selon le mode choisi :

- **Pour une seule offre**  
  ```js
  setOffer(json?.data?.[0] ?? null);
  ```
- **Pour plusieurs offres**  
  ```js
  const items: TheirStackJob[] = Array.isArray(json?.data) ? json.data : [];
  setOffers((prev) => (append ? [...prev, ...items] : items));
  ```

→ **Commentez ou dé-commentez la ligne appropriée, selon le mode voulu.**

---

## 3️⃣ Rendu du composant

- **Affichage d'une seule offre (mode "détail")**  
  Affichez la carte/interview SEULEMENT SI `offer` est non nul.

  ```jsx
  {offer && (
    <SingleOfferCard job={offer} />
  )}
  ```

- **Affichage multiple (mode "liste")**  
  Parcourez `offers` pour afficher N cartes :

  ```jsx
  {offers.length > 0 && (
    <div>
      {offers.map((o) => <OfferCard key={o.id} job={o} />)}
    </div>
  )}
  ```

---

## 4️⃣ Cache local (localStorage)

Quand vous sauvegardez/restaurez les résultats, adaptez le champ :

- **Pour une seule offre**  
  ```js
  offer: json?.data?.[0] ?? null,
  ```
- **Pour plusieurs offres**  
  ```js
  offers: append ? [...offers, ...items] : items,
  ```

Et adaptez la restauration (`setOffer` OU `setOffers`) dans le useEffect d'initialisation.

---

## ⚡ Résumé pour activer le mode "plusieurs offres"

- Utilisez `offers` (tableau) pour le state.
- Dans `fetchOffers`, utilisez le bloc qui manipule `offers` (et **non** `offer`).
- Pour le rendu, mappez sur `offers`.
- Sauvegardez/restaurez la clé `offers`.

Pour repasser à une **seule offre**, faites l'inverse !

---

**N'hésitez pas à regarder les blocs de code commentés dans le composant `OffersSearchFilter.tsx` pour basculer rapidement.**

*/
