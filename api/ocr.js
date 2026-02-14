export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { image } = req.body; // base64 image data
    if (!image) return res.status(400).json({ error: 'No image provided' });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: image.startsWith('/9j/') ? 'image/jpeg' : 'image/png',
                data: image,
              },
            },
            {
              type: 'text',
              text: `이 이미지는 나이키 런클럽(Nike Run Club) 또는 다른 러닝 앱의 스크린샷입니다.
이미지에서 총 러닝 거리(km)를 찾아주세요.

규칙:
- 월간 총 거리, 또는 가장 큰 km 숫자를 찾으세요
- 숫자만 반환하세요 (단위 제외)
- 소수점은 포함 가능 (예: 42.5)
- 찾을 수 없으면 "0"을 반환하세요

반드시 숫자만 반환하세요. 예: 42.5`
            }
          ],
        }],
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const text = data.content?.[0]?.text || '0';
    // 숫자만 추출
    const match = text.match(/[\d]+\.?[\d]*/);
    const km = match ? parseFloat(match[0]) : 0;

    return res.status(200).json({ km, raw: text });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
