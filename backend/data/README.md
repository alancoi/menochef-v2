# Parser de Recetas MenoChef

## Descripción

Parser robusto que extrae recetas de PDFs en formato MenoChef. Captura automáticamente:
- Nombre de receta
- Tipo/Categoría
- Ingredientes con cantidades
- Beneficios/Propiedades
- Pasos de preparación
- Texto motivacional

## Resultados

**193 recetas extraídas** de 3 PDFs:
- MenoChef_80_Desayunos_Meriendas: 57 recetas
- MenoChef_50_Postres: 44 recetas  
- MenoChef_120_Recetas_Almuerzo_Cena: 92 recetas

### Distribución por tipo:
- MERIENDA: 29 (15.0%)
- DESAYUNO: 28 (14.5%)
- POSTRE: 26 (13.5%)
- ENERGÍA: 22 (11.4%)
- MEJOR: 20 (10.4%)
- HINCHAZÓN: 18 (9.3%)
- BEBIDA: 16 (8.3%)
- CLARIDAD: 16 (8.3%)
- BAJAR: 16 (8.3%)

### Completitud de datos:
- Nombres: 193/193 (100%)
- Tipos: 191/193 (99%)
- Ingredientes: 193/193 (100%)
- Pasos: 193/193 (100%)
- Beneficios: 111/193 (57.5%)
- Texto motivacional: 192/193 (99.5%)

## Archivos

### `recipes.json`
Base de datos de recetas en formato JSON. Estructura por receta:
```json
{
  "name": "NOMBRE RECETA",
  "type": "CATEGORÍA",
  "ingredients": [
    "Ingrediente 1: cantidad",
    "Ingrediente 2: cantidad"
  ],
  "benefits": "Descripción de beneficios",
  "steps": [
    "Paso 1 descripción",
    "Paso 2 descripción"
  ],
  "motivational": "Texto motivacional entre comillas"
}
```

### `pdf_parser.py`
Parser reutilizable con:
- Clase `RecipeParser` para procesar PDFs
- Función `main()` para uso directo
- Limpieza automática de códigos CID y caracteres especiales
- Heurísticas de clasificación mejoradas

## Uso

### Como script standalone:
```bash
python pdf_parser.py
```

### Como módulo:
```python
from pdf_parser import RecipeParser, main

# Opción 1: Usar la clase directamente
parser = RecipeParser()
recipes = parser.parse_pdf("ruta/al/pdf.pdf")

# Opción 2: Usar la función main
recipes = main(
    ["ruta/pdf1.pdf", "ruta/pdf2.pdf"],
    output_file="output.json"
)
```

## Estructura del PDF esperada

El parser espera PDFs con esta estructura:

```
NOMBRE RECETA (MAYÚSCULAS)
[tipo: DESAYUNO, ALMUERZO, etc.]

INGREDIENTES
• Ingrediente 1: cantidad
• Ingrediente 2: cantidad

BENEFICIOS (o POR QUÉ ESTE PLATO)
Texto explicando beneficios y propiedades

PASOS (o PREPARACIÓN)
• Paso 1 descripción
• Paso 2 descripción
"Texto motivacional entre comillas"
```

## Características técnicas

### Limpieza de datos:
- Elimina códigos CID (artefactos de decodificación PDF)
- Remueve caracteres especiales invisibles
- Normaliza espacios múltiples
- Preserva puntuación e información importante

### Detección robusta:
- Identifica nombres de receta (mayúsculas >70%)
- Ubica secciones por headers exactos
- Maneja múltiples formatos de tipo (DESAYUNO, ENERGÍA, etc.)
- Busca ingredientes por patrón ":" o códigos CID

### Clasificación heurística:
- Clasificación primaria por headers
- Clasificación secundaria por palabras clave
- Manejo de casos especiales (postres, bebidas, etc.)

## Mejoras futuras

1. **OCR para PDFs escaneados**: Permitir procesar PDFs con imágenes
2. **Validación de ingredientes**: Verificar contra base de datos conocida
3. **Extracción de información nutricional**: Si está disponible en el PDF
4. **Múltiples idiomas**: Adaptar detección de headers y tipos
5. **Formato alternativo**: Exportar a formatos adicionales (CSV, SQL, etc.)

## Problemas conocidos

1. **2 recetas sin clasificar (OTRO)**: Tienen estructura atípica pero datos válidos
2. **57.5% con beneficios**: Algunos PDFs no incluyen sección de beneficios
3. **Nombres truncados (removidos)**: Algunas líneas se cortaban en extracción inicial

## Dependencias

```
pdfplumber>=0.9.0
```

Instalar con:
```bash
pip install pdfplumber
```

## Notas de desarrollo

### Histórico de mejoras:
- v1: Detección simple de headers (capturó 23 recetas)
- v2: Búsqueda por posiciones de INGREDIENTES (capturó 89 recetas)
- v3: Mejor detección de límites de secciones (capturó 155 recetas)
- v4: Clasificación heurística mejorada (capturó 193 recetas)

### Cambios principales en v4:
- Función `_extract_type()` con regex de límites de palabra
- Función `_reclassify_by_keywords()` para categorías secundarias
- Búsqueda hacia adelante de próximo INGREDIENTES para límites de pasos
- Palabras clave expandidas para POSTRE, BEBIDA, etc.

## Autor

Creado para MenoChef - Sistema de recetas y bienestar.
