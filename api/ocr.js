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
이미지에서 다음 2가지를 찾아주세요:

1. 총 러닝 거리(km) - 월간 총 거리 또는 가장 큰 km 숫자
2. 해당 월(month) - 이미지에 표시된 월 정보 (예: 1월, January, 2026.01 등)

반드시 아래 JSON 형식으로만 반환하세요. 다른 텍스트 없이 JSON만:
{"km": 42.5, "month": "2026-01"}

규칙:
- km: 숫자만 (소수점 가능). 찾을 수 없으면 0
- month: YYYY-MM 형식. 찾을 수 없으면 ""
- 연도가 안 보이면 현재 연도(2026) 사용
- JSON 외에 다른 텍스트를 절대 포함하지 마세요`
            }
          ],
        }],
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const text = data.content?.[0]?.text || '{}';
    // JSON 파싱 시도
    let km = 0;
    let month = '';
    try {
      const cleaned = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      km = parseFloat(parsed.km) || 0;
      month = parsed.month || '';
    } catch(e) {
      // JSON 파싱 실패 시 숫자만 추출
      const match = text.match(/[\d]+\.?[\d]*/);
      km = match ? parseFloat(match[0]) : 0;
    }

    return res.status(200).json({ km, month, raw: text });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
