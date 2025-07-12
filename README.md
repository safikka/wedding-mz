# Wedding Mahdy & Zahro

This project is a simple static website for our wedding that displays a personalized invitation based on a query parameter for the recipient's name.

---

## ✨ Features

- Personalized greeting using the `name` query parameter (e.g., `?name=John`)
- Smooth scrolling with Lenis.js
- Beautiful animations powered by GSAP
- Responsive design styled with Tailwind CSS
- ⚡ Super fast development with Vite + hot reload
- 📦 Single HTML file output (JS & CSS inlined via Vite plugin)
- ✨ Auto-formatting with Prettier on save (VSCode ready)

---

## 📦 Dependencies

All visual dependencies are loaded via **CDN**:

- **GSAP**: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
- **Lenis**: `https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/bundled.js`
- **Tailwind CSS**: `https://cdn.tailwindcss.com`

For development & build, install local dependencies:

```bash
npm install
```

This installs:
- [`vite`](https://vitejs.dev)
- [`vite-plugin-singlefile`](https://github.com/sheremet-va/vite-plugin-singlefile)
- [`prettier`](https://prettier.io)

---

## 🧪 Setup Instructions

1. **Clone the Repository**:

```bash
git clone <repository-url>
cd <project-folder>
npm install
```

2. **Start Development (Live Preview with Hot Reload)**:

```bash
npm run dev
```

Visit `http://localhost:5173/?name=Alice` in your browser to see the personalized invitation.

3. **Build for Production** (one single HTML file):

```bash
npm run build
```

The output file will be:

```
build/index.html
```

---

## 🛠️ Project Structure

```
project/
├── src/
│   ├── css/
│   │   └── main.css        # Optional custom styles
│   ├── js/
│   │   └── main.js         # Your JS for GSAP, Lenis, name logic
│   └── main.html           # Main HTML file using CDN
├── build/                  # Output: final inline HTML
├── .vscode/
│   └── settings.json       # Local VSCode settings (Prettier)
├── .prettierrc             # Prettier formatting rules
├── .prettierignore         # Files to ignore when formatting
├── vite.config.js          # Vite + singlefile build config
├── package.json            # Scripts & devDependencies
└── README.md
```

---

## 🔧 NPM Scripts

| Script         | Description                                        |
|----------------|----------------------------------------------------|
| `npm run dev`  | Start Vite dev server with live reload             |
| `npm run build`| Build final single-file HTML (inlined CSS/JS)     |
| `npm run preview` | Preview the built HTML locally (after build)   |
| `npm run format`| Format all code files with Prettier              |

---

## ✨ Prettier Formatting

This project uses Prettier for consistent formatting.

- Format on save is enabled via `.vscode/settings.json`
- Customize rules in `.prettierrc`
- To format manually:

```bash
npm run format
```

---

## 🚀 Deployment

After running the build:

```bash
npm run build
```

Upload the file:

```
build/index.html
```

to any static hosting provider:

- [Netlify](https://netlify.com)
- [Vercel](https://vercel.com)
- [GitHub Pages](https://pages.github.com)
- or your own server

---

## 🔐 License

This project is licensed under the MIT License.<br>
💌 With Love, Mahdy & Zahro
