# Simple Web-App Template

This is a simple Web-App template for creating Single-Page-Applications with offline capabilities quickly. It uses Vite as a Built-Tool and Vue JS with TypeScript. It comes with pre-styled components and interactive systems.

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
```js
// Navbar ------------------------------
<Navbar :links />
const links: Link[] = /* your links*/;

// Toast system ------------------------------
<Toaster />
const toastStore = useToastStore();
toastStore.push('<your message>')

// Confirm modal ------------------------------
<Confirm />
const { confirm } = useConfirm();

(async () => {
    const isConfirmed = await confirm('<title>', /* ... */);
    // <your logic>
})();
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
