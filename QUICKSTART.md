# MenoChef - Quick Start

## 🚀 En 2 minutos

### 1. Instala dependencias
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Inicia servidores
**Terminal 1:**
```bash
cd backend
npm run dev
```

**Terminal 2:**
```bash
cd frontend
npm run dev
```

### 3. Abre la app
http://localhost:3000

---

## 📁 Estructura

```
MenoCheff/
├── backend/               # Node.js + Express
│   ├── src/
│   │   ├── server.js      # API principal
│   │   ├── db.js          # Almacenamiento de recetas
│   │   └── utils/
│   │       ├── claudeIntegration.js  # Chat con IA
│   │       └── pdfProcessor.js       # Procesar PDFs
│   ├── scripts/
│   │   └── processPDFs.js # Cargar recetas desde PDFs
│   └── package.json
│
├── frontend/              # React + Vite
│   ├── src/
│   │   ├── App.jsx        # App principal
│   │   ├── components/    # Componentes UI
│   │   └── index.css      # Estilos
│   ├── index.html
│   └── package.json
│
├── SETUP.md              # Instrucciones detalladas
├── DEPLOYMENT.md         # Deploy a producción
└── README.md
```

---

## ✨ Features

✅ Búsqueda de recetas por ingredientes
✅ Botones rápidos (Desinflamarme, Cena rápida, etc.)
✅ Chat inteligente con IA (Claude)
✅ UI responsiva con colores MenoChef
✅ 300+ recetas antiinflamatorias (cuando cargues PDFs)

---

## 📝 Próximos pasos

1. **Cargar recetas desde PDFs:**
   ```bash
   # Descarga los PDFs del Drive
   # Colócalos en: backend/data/pdfs/
   # Luego ejecuta:
   cd backend && node scripts/processPDFs.js
   ```

2. **Configurar Claude API:**
   ```bash
   # Obtén key en: https://console.anthropic.com
   # Edita backend/.env
   CLAUDE_API_KEY=sk-...
   ```

3. **Desplegar:**
   ```bash
   # Ver DEPLOYMENT.md
   # Opción recomendada: Docker
   docker-compose up --build
   ```

---

## 🆘 Troubleshooting

**Frontend no conecta con backend:**
- Verifica que backend esté en http://localhost:3001
- Abre DevTools → Network → busca errores CORS

**Recetas no aparecen:**
- Ejecuta: `cd backend && node scripts/processPDFs.js`
- Reinicia servidores

**Puerto en uso:**
```bash
# Linux/Mac
lsof -i :3000
kill -9 <PID>
```

---

¿Preguntas? Ver SETUP.md y DEPLOYMENT.md para más detalles.
