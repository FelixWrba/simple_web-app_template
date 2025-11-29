import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({

      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'APP_NAME',
        short_name: 'APP_NAME',
        description: 'APP_NAME_DESCRIPTION',
        theme_color: '#0066ff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/app',
        icons: [{ "src": "/icons/icon-72x72.png", "sizes": "72x72", "type": "image/png", "purpose": "maskable" }, { "src": "/icons/icon-96x96.png", "sizes": "96x96", "type": "image/png", "purpose": "maskable" }, { "src": "/icons/icon-128x128.png", "sizes": "128x128", "type": "image/png", "purpose": "maskable" }, { "src": "/icons/icon-144x144.png", "sizes": "144x144", "type": "image/png", "purpose": "maskable" }, { "src": "/icons/icon-152x152.png", "sizes": "152x152", "type": "image/png", "purpose": "maskable" }, { "src": "/icons/icon-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable" }, { "src": "/icons/icon-384x384.png", "sizes": "384x384", "type": "image/png", "purpose": "maskable" }, { "src": "/icons/icon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              request.destination === 'document' ||
              request.destination === 'script' ||
              request.destination === 'style' ||
              request.destination === 'image' ||
              request.destination === 'font',
            handler: 'CacheFirst',
            options: {
              cacheName: 'app-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      }
    })

  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        app: 'app.html'
      }
    }
  }
})
