# Simple Web-App Template

This is a simple Web-App template for creating Single-Page-Applications with offline capabilities quickly. It uses Vite as a Build-Tool and Vue 3 with TypeScript. It comes with pre-styled components and interactive systems.

## Features

* 🎨 Versatile Color palette
* ✔️ Pre-styled components
* ☀️ Automatic light/dark mode
* 🤖 SSR Landing Page
* 💬 Internationalization
* 💥 SPA Functionality
* ⚙ Settings Interface

## Pre-styled Components
* Ready-to-use responsive Navbar
* Toasts system
* Confirm modals
* Input methods
* Buttons
* Links

## How to use

### Components
```js
// Navbar ------------------------------
<Navbar :links />
const links: Link[] = /* your links*/;

// Toast system ------------------------------
<Toaster />
const toastStore = useToastStore();
toastStore.push('<message>', '<status>');

// Confirm modal ------------------------------
<Confirm />
const { confirm } = useConfirm();

(async () => {
    const isConfirmed = await confirm('<title>', { '<options>' });
    // further processing
})();
```

## Project Setup

### Install dependencies

```sh
npm install
```

### Generate all icons

To automatically generate all required icons for your PWA, follow these steps:
1. Create a maskable, square icon with at least 512px in width.
2. Save the file to public/base.png
3. Run this command: ```node utils/generateIcons.js public/base.png public/icons```
4. Follow further instructions

### Configure PWA
Modify the properties of VitePWA in vite.config.ts to custimize the app to your preferences.

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
