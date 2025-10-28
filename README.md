<div align="center">
  <img alt="InternFinder" src="public/logo-blue.svg" height="56" />
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

## 🔌 Intégration TheirStack

- Endpoint: `POST https://api.theirstack.com/v1/jobs/search`
- Auth: `Authorization: Bearer THEIRSTACK_API_KEY`
- Filtres par défaut: `employment_statuses_or: ["internship"]`, `limit: 1`, `posted_at_max_age_days: 30`
- Code: `src/lib/theirstack.ts` + `app/api/offers/route.ts`

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
