# Setup Completo de MenoChef

## 1. Descargar PDFs del Drive

1. Abre el Drive compartido: https://drive.google.com/drive/folders/17LRC7FiklbK2l4LWesWlX_twA8nQ1x6g
2. Descarga todos los PDFs
3. Colócalos en una carpeta: `backend/data/pdfs/`

## 2. Procesar PDFs y cargar recetas

Ejecuta:
```bash
cd backend
npm install
node scripts/processPDFs.js
```

Esto:
- Extrae texto de los PDFs
- Parsea las recetas
- Las carga en `data/recipes.json`

## 3. Configurar variables de entorno

Edita `backend/.env`:
```
CLAUDE_API_KEY=sk-...
```

Obtén tu API key en: https://console.anthropic.com

## 4. Ejecutar la app

### Terminal 1 - Backend
```bash
cd backend
npm install
npm run dev
```

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev
```

Abre http://localhost:3000

## Roadmap MVP → Producción

### MVP (Ahora)
- ✅ UI completa
- ✅ Búsqueda de recetas
- ✅ Chat con IA
- ✅ Datos de ejemplo

### V1 (Esta semana)
- [ ] Procesar todos los PDFs
- [ ] Cargar 1000+ recetas en BD
- [ ] Claude API inteligente
- [ ] Autenticación JWT
- [ ] Perfil de usuario

### V2 (Próximas semanas)
- [ ] Plan semanal automático
- [ ] Lista de compras
- [ ] Seguimiento de síntomas
- [ ] Recomendaciones personalizadas

### Producción
- [ ] Database PostgreSQL real
- [ ] Hosting (Vercel + Railway)
- [ ] SSL/HTTPS
- [ ] Analytics
- [ ] CI/CD

## Troubleshooting

**Puerto 3000/3001 en uso:**
```bash
lsof -i :3000
kill -9 <PID>
```

**Error CORS:**
Asegúrate que backend está en http://localhost:3001

**Claude API no funciona:**
Sin CLAUDE_API_KEY usa respuestas simuladas (está OK para MVP)
