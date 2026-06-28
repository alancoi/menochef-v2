# 🚀 Deploy MenoChef - Guía Simplificada

## OPCIÓN: Frontend (Vercel) + Backend (Railway)

### PASO 1: Push a GitHub

```bash
cd /Users/coiselot/Claude/Projects/MenoCheff
git add .
git commit -m "Ready for deploy"
git push origin main
```

---

## PASO 2: Deployar Backend en Railway (2 min)

1. Ve a [railway.app](https://railway.app)
2. Conecta con GitHub (autoriza)
3. Click "New Project" → "Deploy from GitHub repo"
4. Selecciona "MenoCheff"
5. Railway detecta `/backend` automáticamente
6. Click "Deploy"

### Variables de entorno en Railway:
- Click en el deploy → "Variables"
- Agrega:
  ```
  ANTHROPIC_API_KEY=sk-ant-xxxxx...
  NODE_ENV=production
  ```
- La URL se genera automática (ej: `https://menochef-prod-xxxxx.railway.app`)

---

## PASO 3: Deployar Frontend en Vercel (2 min)

1. Ve a [vercel.com](https://vercel.com)
2. "Add New" → "Project" → Selecciona MenoCheff
3. Vercel detecta Vite automáticamente ✓
4. Ve a "Settings" → "Environment Variables"
5. Agrega:
   ```
   VITE_API_URL=https://menochef-prod-xxxxx.railway.app
   ```
   (Reemplaza con tu URL de Railway)
6. Click "Deploy"

Tu app estará en: **https://menochef.vercel.app**

---

## PASO 4: Probar (30 segundos)

1. Abre https://menochef.vercel.app
2. Click "Desinflamarse 🍃" → deberías ver 3 recetas
3. Click "Asistente virtual 👩‍⚕️" → escribe pregunta

**¿Funciona?** ✅ Listo, estás live.

**¿No funciona?**
- Abre F12 (consola) → ¿qué error ves?
- Revisa que VITE_API_URL en Vercel es correcta
- Comprueba que Railway está running (verde)

---

## Próximas veces que cambies código:

```bash
cd /Users/coiselot/Claude/Projects/MenoCheff
git add .
git commit -m "tu mensaje"
git push origin main
```

✅ Vercel y Railway auto-actualizan automáticamente (en ~30-60 segundos)

---

## ¿Dónde ver logs si hay error?

- **Frontend:** Vercel → Project → Deployments → Logs
- **Backend:** Railway → Project → Logs

