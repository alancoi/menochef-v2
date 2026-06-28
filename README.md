# MenoChef - Recetas para la Menopausia

App web que brinda recetas antiinflamatorias y personalizadas para mujeres en menopausia.

## Estructura

```
MenoCheff/
├── backend/          # API Node.js + Express
│   ├── src/
│   │   ├── server.js
│   │   ├── db.js
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── middleware/
│   ├── package.json
│   └── .env
│
└── frontend/         # App React + Vite
    ├── src/
    │   ├── components/
    │   ├── App.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Setup

### Backend
```bash
cd backend
npm install
# Editar .env con credentials
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

El frontend estará en `http://localhost:3000`
El backend estará en `http://localhost:3001`

## Features (MVP)

- ✅ UI responsiva con colores MenoChef
- ✅ Buscador de recetas
- ✅ Botones rápidos (Desinflamarme, Cena rápida, etc.)
- ✅ Chat con IA
- ✅ Estructura lista para integración de PDFs

## TODO

1. [ ] Procesar PDFs desde Drive
2. [ ] Cargar recetas en base de datos
3. [ ] Integrar búsqueda inteligente con Claude API
4. [ ] Implementar autenticación JWT
5. [ ] Desplegar a producción
