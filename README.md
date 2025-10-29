<!-- Badges / Étiquettes -->
<p align="center">
  <a href="https://nextjs.org" target="_blank"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" /></a>
  <a href="https://react.dev" target="_blank"><img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react" /></a>
  <a href="https://www.typescriptlang.org/" target="_blank"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" /></a>
  <a href="https://tailwindcss.com/" target="_blank"><img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?logo=tailwind-css" /></a>
  <a href="https://vercel.com" target="_blank"><img alt="Deploy" src="https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel" /></a>
</p>

<div align="center">
  <img alt="InternFinder" src="public/logo-blue.svg" height="100" />
  <h1>InternFinder</h1>
  <p>La plateforme moderne pour trouver et publier des offres de stage.</p>
</div>

---

## ✨ Aperçu

InternFinder centralise des offres de stage vérifiées, propose une recherche efficace (mots‑clés, lieu, type), et permet de postuler simplement. Côté entreprises, la mise en ligne est fluide et la marque employeur valorisée.

Périmètre actuel:
- Pages: Accueil, Offres (liste + détail), Entreprises, Étudiants
- UI responsive (Navbar/Footer, Hero, sections réutilisables)
- Animations subtiles (GSAP)
- Intégration TheirStack (1 crédit = 1 offre) avec filtrage sur les stages

## 🧱 Stack

- Next.js 16 (App Router)
- React 19, TypeScript
- Tailwind CSS v4 (variables CSS `--brand`, `--tint`)
- GSAP pour micro‑interactions

## 🚀 Démarrage

1) Installer les dépendances
```bash
npm install
```

2) Variables d’environnement (`.env`)
```bash
THEIRSTACK_API_KEY=xxxxxxxxxxxxxxxx
```

3) Lancer en local
```bash
npm run dev
# http://localhost:3000
```

4) Tester la recherche d’offres
- Aller sur `/offers`
- Rechercher (mots‑clés, lieu). L’API interne appelle TheirStack et renvoie 1 offre (limitation de crédits).

## 📈 Afficher et demander plusieurs offres par clic sur « Rechercher »

Objectif: à chaque clic sur le bouton « Rechercher », récupérer et afficher plusieurs offres (p. ex. 5), voire charger des offres supplémentaires à chaque clic successif.

1) Côté API (`app/api/offers/route.ts`)
- Assurez‑vous que la requête accepte `limit` et optionnellement `offset`/`page` en entrée (body JSON), et transmet ces valeurs à l’API TheirStack.
- Par défaut, remplacez `limit: 1` par une valeur plus élevée (p. ex. `5`).

Exemple de body attendu:
```json
{
  "query": "stage développeur",
  "location": "Lyon",
  "limit": 5,
  "offset": 0
}
```

2) Côté frontend (`app/offers/page.tsx` et `src/components/pages/offers/OffersSearchFilter.tsx`)
- Conservez un état `limit` (p. ex. 5) et un état `offset` (ou `page`).
- Au premier clic, appelez l’API avec `{ limit, offset: 0 }` puis affichez la liste.
- Au clic suivant, incrémentez `offset` (p. ex. `offset + limit`) et appelez à nouveau l’API en concaténant les résultats au tableau existant.

Exemple minimal de logique (React):
```tsx
const [offers, setOffers] = useState([]);
const [limit] = useState(5);
const [offset, setOffset] = useState(0);

async function onSearch(params) {
  const res = await fetch('/api/offers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...params, limit, offset })
  });
  const data = await res.json();
  setOffers(prev => [...prev, ...data.items]);
  setOffset(prev => prev + limit);
}
```

Conseils:
- Pour « remplacer » au lieu d’« ajouter », remettez `offset` à `0` et faites `setOffers(data.items)`.
- Affichez un bouton « Charger plus » si vous préférez séparer recherche et pagination.
- Gérez la fin des résultats en désactivant le bouton si `data.items.length < limit`.

## 🔌 Intégration TheirStack

- Endpoint: `POST https://api.theirstack.com/v1/jobs/search`
- Auth: `Authorization: Bearer THEIRSTACK_API_KEY`
- Filtres par défaut: `employment_statuses_or: ["internship"]`, `limit: 1`, `posted_at_max_age_days: 30`
- Code: `src/lib/theirstack.ts` + `app/api/offers/route.ts`

## 🔐 Variables d’environnement et `.env.example`

1) Créez un fichier d’exemple à la racine:
```env
# .env.example
THEIRSTACK_API_KEY=
```

2) Copiez‑le pour votre environnement local (ne pas committer):
```bash
cp .env.example .env.local
```

3) Renseignez vos valeurs dans `.env.local`:
```env
THEIRSTACK_API_KEY=votre_cle_personnelle
```

4) En CI/Déploiement (Vercel):
- Ajoutez `THEIRSTACK_API_KEY` dans les Variables d’environnement du projet (Preview & Production).
- Ne committez jamais `.env.local`. Ne mettez dans le code que `.env.example` comme référence.

## 📁 Structure

```
app/
  companies/
  students/
  offers/
  api/offers/route.ts
  error.tsx, global-error.tsx, not-found.tsx
src/components/
  layout/
  pages/
    enterprise/
    students/
    home/
    offers/
  ui/
src/lib/
  theirstack.ts, markdown.ts
```

## 🧭 UI/UX

- Couleurs: `--brand #3028af`, `--tint #f8e1eb`
- Typo: Montserrat (next/font)
- Accessibilité: focus visibles, titres hiérarchisés, labels

## 🛠️ Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## 📦 Déploiement

1) Définir `THEIRSTACK_API_KEY` sur Vercel (Preview/Production)
2) Pousser sur la branche connectée pour déployer

## 🤝 Contribution

Issues/PR bienvenues. Conserver le style (Tailwind, variables CSS, composants modulaires) et ajouter des tests si pertinent.

---

Je sais que tu galères à trouver un stage, maintenant c'est moi qui galère à trouver TON stage.
