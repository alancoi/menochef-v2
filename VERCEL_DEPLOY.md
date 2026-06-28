# 🚀 Deploy MenoChef en Vercel (Solo Frontend + Backend)

## PASO 1: Push a GitHub

```bash
cd /Users/coiselot/Claude/Projects/MenoCheff
git add .
git commit -m "Ready for Vercel deploy"
git push origin main
```

---

## PASO 2: Conectar en Vercel (1 minuto)

1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Selecciona "MenoCheff" (tu repositorio)
4. Vercel auto-detecta todo ✓
5. Click "Deploy"

**Espera ~3-5 minutos mientras construye**

---

## PASO 3: Agregar API Key (30 segundos)

El deploy puede fallar si no tiene tu API key. Arréglalo así:

1. En Vercel → Tu Proyecto → "Settings"
2. Click "Environment Variables"
3. Agrega:
   - **Nombre:** `ANTHROPIC_API_KEY`
   - **Valor:** `sk-ant-xxxxxx...` (tu API key)
4. Click "Save"
5. Click "Deployments" → el deployment fallido → "Redeploy"

---

## PASO 4: Probar

Tu app estará en: **https://menochef.vercel.app**

1. Abre en navegador
2. Click "Desinflamarse 🍃" → deberías ver recetas
3. Click "Asistente virtual" → escribe pregunta

¿Funciona? ✅ **Listo, estás live**

---

## Si algo falla:

1. Ve a Vercel → "Logs" → verás el error exacto
2. Problemas comunes:
   - **"Cannot find API key"** → Agrega ANTHROPIC_API_KEY en Environment
   - **"Cannot find recipes.json"** → Verifica que está en `/backend/data/`
   - **"Module not found"** → Revisa que `package.json` está en `/frontend` y `/backend`

---

## Próximas actualizaciones

Cada vez que hagas cambios:

```bash
git add .
git commit -m "tu mensaje"
git push origin main
```

Vercel auto-redeploya automáticamente (en ~2-3 min).

✅ **Listo!**
