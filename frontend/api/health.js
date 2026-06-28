export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({
    status: 'ok',
    message: 'MenoChef API funcionando en Vercel',
    timestamp: new Date().toISOString()
  });
}
