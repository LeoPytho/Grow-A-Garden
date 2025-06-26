export const config = {
  runtime: 'nodejs' // memastikan tidak dijalankan di Edge Function
};

export default async function handler(req, res) {
  try {
    const apiRes = await fetch('https://v2.jkt48connect.my.id/api/growagarden/stock?apikey=JKTCONNECT');

    if (!apiRes.ok) {
      const text = await apiRes.text();
      return res.status(apiRes.status).json({ error: text });
    }

    const data = await apiRes.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('API Proxy Error:', error);
    return res.status(500).json({ error: 'Internal server error while proxying request' });
  }
}
