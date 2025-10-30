<!-- Badges / Étiquettes -->
<p align="center">
  <a href="https://nextjs.org" target="_blank"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" /></a>
  <a href="https://react.dev" target="_blank"><img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react" /></a>
  <a href="https://www.typescriptlang.org/" target="_blank"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" /></a>
  <a href="https://tailwindcss.com/" target="_blank"><img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?logo=tailwind-css" /></a>
  <a href="https://vercel.com" target="_blank"><img alt="Deploy" src="https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel" /></a>
</p>

<div align="center">
  <img alt="InternFinder" src="public/logo-blue.svg" height="200" />
  <p>La plateforme moderne pour trouver et publier des offres de stage.</p>
</div>

---

## ✨ Aperçu

InternFinder centralise des offres de stage vérifiées, propose une recherche efficace (mots‑clés, lieu, type), et permet de postuler simplement. Côté entreprises, la mise en ligne est fluide et la marque employeur valorisée.

➡️ Guide dédié aux offres: voir `src/components/pages/offers/README.md`.

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

## 📈 Configuration du nombre d'offres affichées

Le nombre d'offres est centralisé dans **`src/config.json`** :

```json
{
  "offers": {
    "limit": 1,
    "postedAtMaxAgeDays": 30,
    "employmentStatuses": ["internship"]
  }
}
```

- `limit` : nombre d'offres retournées par recherche (limite stricte appliquée au frontend et à l'API)
- `postedAtMaxAgeDays` : ancienneté maximale des offres (jours)
- `employmentStatuses` : types d'emploi recherchés

➡️ Pour afficher plusieurs offres, modifiez uniquement `limit` dans ce fichier (ex: `5`, `10`).

**Guide détaillé** : voir [📄 Guide Offres](src/components/pages/offers/README.md) pour la pagination, l'affichage multiple, et le cache navigateur.

## 🔌 Intégration TheirStack

- Endpoint: `POST https://api.theirstack.com/v1/jobs/search`
- Auth: `Authorization: Bearer THEIRSTACK_API_KEY`
- Filtres par défaut: définis dans `src/config.json` (voir ci-dessus)
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
src/
  config.json (⚠️ configuration centralisée: limite, filtres)
  components/
    layout/
    pages/
      enterprise/
      students/
      home/
      offers/
    ui/
  lib/
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
