# Ridho Alif Utama — Portfolio

Portofolio React/Vite yang dibuka dengan profile card, lalu bertransisi ke halaman CV satu halaman. Termasuk chatbot mengambang dan visualisasi konseptual dengan Recharts serta ilustrasi SVG.

## Menjalankan secara lokal

```sh
npm install
npm run dev
```

Chatbot halaman CV menggunakan API pada `http://127.0.0.1:3000/api/chat` secara default. Untuk mengaktifkannya, jalankan backend chatbot dari folder `WEB APA GE/server` dengan `npm run dev`, dan pastikan `GEMINI_API_KEY` sudah diatur pada file `.env` di root `WEB APA GE`. URL API dapat dioverride melalui `VITE_CHAT_API_URL`.

## Build dan pemeriksaan

```sh
npm run build
npm run lint
```

Visualisasi grafik dan peta pada halaman ini adalah ilustrasi konsep, bukan data hasil analisis proyek.

## Deploy ke GitHub Pages

Workflow `.github/workflows/deploy.yml` membangun dan menerbitkan situs ke GitHub Pages setiap kali ada push ke branch `main` atau `master`, atau saat workflow dijalankan manual. Di pengaturan repository, aktifkan Pages dengan **GitHub Actions** sebagai deployment source.

Chatbot memerlukan backend Node.js yang dapat diakses publik melalui HTTPS. Atur URL endpoint backend sebagai repository Actions variable bernama `VITE_CHAT_API_URL` (URL harus berakhiran `/api/chat`) dan masukkan origin halaman Pages ke `ALLOWED_ORIGINS` pada backend. Jangan simpan API key Gemini di repository frontend.
