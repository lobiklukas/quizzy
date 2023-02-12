# Quizzy

## Description

Quizzy is a web app for creating flashcard, simillar to quizlet. It is built with Next.js, React, TypeScript, TailwindCSS, Zustand, React Query, Framer Motion, and other technologies.

Main purpose of this project is to learn new technologies and experiment with them. This project is still in development and not ready for production.

This app also partially supports PWA standart and can be turned into mobile app with "Add to home screen" feature.

## Features

- [x] Authentication
- [x] Authorization
- [x] User profile
- [x] User settings
- [x] User notifications
- [x] Autosave
- [x] Quiz management
- [x] Learning mode
- [x] Folders
- [x] Themes
- [x] Theme preview
- [ ] Quiz sharing
- [ ] User statistics
- [ ] User achievements
- [ ] User badges

## Tech stack

- [trpc](https://trpc.io/)
- [nextjs](https://nextjs.org/)
- [react-query](https://react-query.tanstack.com/)
- [tailwindcss](https://tailwindcss.com/)
- [typescript](https://www.typescriptlang.org/)
- [daisyui](https://daisyui.com/)
- [zustand](https://github.com/pmndrs/zustand)
- [zod](https://github.com/colinhacks/zod)
- [react-hook-form](https://react-hook-form.com/)
- [framermotion](https://www.framer.com/motion/)
- [planet-scale](https://www.planetscale.com/)
- [vercel](https://vercel.com/)
- [prisma](https://www.prisma.io/)
- [next-auth](https://next-auth.js.org/)
- [next-pwa](https://github.com/shadowwalker/next-pwa)

## Getting Started

First, create a `.env` file in the root directory and fill in the environment variables.

```bash
cp .env.example .env
```

Install dependencies:

```bash
npm install
# or
yarn
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

This app currently has no tests. Cypress is currently being used only for generating theme previews.

## Deployment

This app is currently deployed on Vercel. You can deploy it to Vercel by clicking the button below.

[Vercel](https://vercel.com/)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
