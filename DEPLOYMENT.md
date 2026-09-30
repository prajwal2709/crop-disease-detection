# Deployment Guide

This guide covers various deployment options for the Crop Disease Detection app.

## Prerequisites

- Node.js 16+ installed
- Git installed
- Project built successfully (`npm run build`)

---

## Option 1: Netlify (Recommended for Quick Deploy)

### Via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

4. **Follow prompts:**
   - Choose "Create & configure a new site"
   - Select your team
   - Enter site name (or leave blank for random)
   - Publish directory: `dist`

### Via Netlify UI

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Netlify:**
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Choose your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Add environment variables:
     - `VITE_API_BASE_URL`: Your API URL
   - Click "Deploy site"

### Custom Domain on Netlify

1. Go to Site settings > Domain management
2. Click "Add custom domain"
3. Follow DNS configuration instructions

---

## Option 2: Vercel

### Via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow prompts and deploy to production:**
   ```bash
   vercel --prod
   ```

### Via Vercel UI

1. **Push to GitHub** (if not already done)

2. **Import to Vercel:**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your repository
   - Configure:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Add environment variables
   - Click "Deploy"

---

## Option 3: GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json:**
   ```json
   {
     "homepage": "https://yourusername.github.io/crop-disease-app",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js:**
   ```javascript
   export default defineConfig({
     base: '/crop-disease-app/',
     // ... rest of config
   })
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages:**
   - Go to repository settings
   - Pages section
   - Source: gh-pages branch

---

## Option 4: Firebase Hosting

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```

3. **Initialize Firebase:**
   ```bash
   firebase init hosting
   ```
   - Choose existing project or create new
   - Public directory: `dist`
   - Single-page app: Yes
   - GitHub integration: Optional

4. **Build and deploy:**
   ```bash
   npm run build
   firebase deploy
   ```

---

## Option 5: AWS S3 + CloudFront

### Setup S3 Bucket

1. **Create S3 bucket:**
   ```bash
   aws s3 mb s3://crop-disease-app
   ```

2. **Enable static website hosting:**
   ```bash
   aws s3 website s3://crop-disease-app \
     --index-document index.html \
     --error-document index.html
   ```

3. **Upload files:**
   ```bash
   npm run build
   aws s3 sync dist/ s3://crop-disease-app
   ```

4. **Set bucket policy for public read:**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::crop-disease-app/*"
       }
     ]
   }
   ```

### Setup CloudFront (Optional but Recommended)

1. Create CloudFront distribution
2. Origin: S3 bucket
3. Viewer Protocol Policy: Redirect HTTP to HTTPS
4. Default Root Object: index.html
5. Error Pages: Custom 404 → /index.html (for SPA routing)

---

## Option 6: DigitalOcean App Platform

1. **Push to GitHub**

2. **Create App:**
   - Go to DigitalOcean dashboard
   - Apps → Create App
   - Choose GitHub repository
   - Configure:
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Add environment variables
   - Choose plan
   - Deploy

---

## Option 7: Railway

1. **Push to GitHub**

2. **Deploy:**
   - Go to https://railway.app
   - "New Project"
   - "Deploy from GitHub repo"
   - Select repository
   - Add environment variables
   - Deploy

---

## Option 8: Docker + Self-Hosting

### Create Dockerfile

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Create nginx.conf

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;
}
```

### Build and Run

```bash
docker build -t crop-disease-app .
docker run -p 8080:80 crop-disease-app
```

### Docker Compose

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "80:80"
    environment:
      - VITE_API_BASE_URL=https://api.yourdomain.com
    restart: unless-stopped
```

---

## Progressive Web App (PWA) Setup

### 1. Create manifest.json

```json
{
  "name": "Crop Disease Detection",
  "short_name": "CropDetect",
  "description": "AI-powered crop disease detection for farmers",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#E8F5E9",
  "theme_color": "#2E7D32",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 2. Create Service Worker

```javascript
// public/sw.js
const CACHE_NAME = 'crop-disease-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/index.css',
  '/assets/index.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

### 3. Register Service Worker

```javascript
// src/main.jsx
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW registered'))
      .catch(err => console.log('SW registration failed'));
  });
}
```

---

## Environment Variables by Platform

### Netlify
Add in UI: Site settings > Build & deploy > Environment

### Vercel
Add in UI: Project settings > Environment Variables

### Firebase
Create `.env.production`:
```env
VITE_API_BASE_URL=https://your-api.com
```

### GitHub Pages
Not supported. Use build-time replacement.

---

## Post-Deployment Checklist

- [ ] Test all routes work correctly
- [ ] Test image upload functionality
- [ ] Verify camera capture on mobile
- [ ] Check API integration
- [ ] Test on different devices and browsers
- [ ] Verify HTTPS is working
- [ ] Test PWA installation (if enabled)
- [ ] Check performance (Lighthouse score)
- [ ] Verify SEO metadata
- [ ] Test error handling
- [ ] Monitor error logs
- [ ] Set up analytics (optional)

---

## Performance Optimization

### 1. Enable Compression

Most platforms (Netlify, Vercel) enable this by default.

For Nginx:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
```

### 2. Use CDN

Platforms like Netlify and Vercel automatically use CDN.

### 3. Optimize Images

Use WebP format and lazy loading:
```jsx
<img src="image.webp" loading="lazy" />
```

### 4. Code Splitting

Vite does this automatically, but you can add dynamic imports:
```javascript
const Component = lazy(() => import('./Component'));
```

---

## Monitoring and Analytics

### Google Analytics

```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Error Tracking (Sentry)

```bash
npm install @sentry/react
```

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production"
});
```

---

## Troubleshooting

### Camera not working on deployed site
- Ensure HTTPS is enabled
- Check browser permissions
- Verify `capture="environment"` attribute

### 404 errors on page refresh
- Configure rewrites/redirects for SPA routing
- Example for Netlify (_redirects file):
  ```
  /*    /index.html   200
  ```

### API CORS errors
- Enable CORS on backend
- Check API URL in environment variables

### Build failures
- Clear cache and reinstall dependencies
- Check Node version compatibility
- Verify all environment variables are set

---

For platform-specific issues, consult the respective documentation:
- [Netlify Docs](https://docs.netlify.com)
- [Vercel Docs](https://vercel.com/docs)
- [Firebase Docs](https://firebase.google.com/docs/hosting)
- [AWS S3 Docs](https://docs.aws.amazon.com/s3)
