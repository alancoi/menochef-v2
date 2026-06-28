# 🚀 MenoChef - Guía de Deployment

## PASO 1: Deployar Backend en Render

### 1.1 Crear cuenta en Render
- Ve a [render.com](https://render.com)
- Regístrate o inicia sesión

### 1.2 Crear nuevo Web Service
1. Click en "New +" → "Web Service"
2. Busca el repositorio (o conecta GitHub)
3. Completa:
   - **Name**: `menochef-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`
   - **Plan**: Free

### 1.3 Variables de entorno
En "Environment Variables" agrega:
```
ANTHROPIC_API_KEY=sk-ant-xxxxxx...
PORT=3001
```

### 1.4 Deploy
- Click "Deploy"
- Espera ~2 minutos
- Copia la URL (ej: https://menochef-backend.onrender.com)

---

## PASO 2: Deployar Frontend en Vercel

### 2.1 Importar proyecto
1. Ve a [vercel.com](https://vercel.com)
2. "Add New" → "Project"
3. Selecciona el repositorio MenoCheff

### 2.2 Variables de entorno
En "Environment Variables" agrega:
```
VITE_API_URL=https://menochef-backend.onrender.com
```
(Reemplaza con tu URL real de Render)

### 2.3 Deploy
- Click "Deploy"
- Espera ~1-2 minutos
- Tu app: https://menochef.vercel.app

---

## PASO 3: Probar

1. Abre https://menochef.vercel.app
2. Haz click en "Desinflamarse 🍃"
3. Deberías ver 3 recetas
4. Click en "Asistente virtual 👩‍⚕️"
5. Escribe pregunta

Si falla, revisa:
- Console (F12) en navegador
- Variables de entorno en Vercel
- Logs en Render

¡Listo! 🎉
