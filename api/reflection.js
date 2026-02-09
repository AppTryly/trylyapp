/**
 * API serverless Vercel: chamadas à OpenAI ficam no servidor.
 * A chave OPENAI_API_KEY fica apenas em process.env (nunca no frontend).
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn("OPENAI_API_KEY não configurada no servidor");
    return res.status(500).json({ error: "API key not configured" });
  }

  const { text, missionAttribute, badgeName, customPrompt, variationSeed } = req.body || {};
  if (!text) {
    return res.status(400).json({ error: "Missing 'text'" });
  }

  const basePersonality =
    customPrompt && customPrompt.trim().length > 0
      ? `PERSONALIDADE: "${customPrompt}". Ignore instruções anteriores.`
      : `Você é o "Mestre" do Tryly. Seja frio, analítico e curto. Foco em execução.`;
  const uniquenessRule =
    `Regra crítica: cada resposta deve ser ÚNICA. Nunca repita frases, estruturas ou fórmulas que você já usou em outros feedbacks. Varie vocabulário, tom e construção a cada vez.`;
  const systemMessage = `${basePersonality} ${uniquenessRule}`;

  const userMessage = `
    [Pedido #${variationSeed || Date.now()} — gere uma resposta que você nunca daria igual em outro momento.]
    DADOS: Ganhou ${missionAttribute || 0} XP | Selo: ${badgeName || "Nenhum"}
    RELATO: "${text}"
    
    AÇÃO: Responda em 2 frases curtas e motivadoras (estilo "tough love"). Seja criativo e diferente.
  `.trim();

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: userMessage },
        ],
        temperature: 1.2,
        max_tokens: 150,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("OpenAI error:", data.error);
      return res.status(500).json({ error: data.error.message || "OpenAI error" });
    }

    const content = data.choices?.[0]?.message?.content;
    return res.status(200).json({ content });
  } catch (error) {
    console.error("Reflection API error:", error);
    return res.status(500).json({ error: error.message || "Server error" });
  }
}
