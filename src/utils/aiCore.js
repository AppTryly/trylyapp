// Chamada à OpenAI via API do próprio backend (chave NUNCA no frontend)
export async function processReflection(text, missionAttribute, badgeName, customPrompt) {
  try {
    const response = await fetch("/api/reflection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        missionAttribute,
        badgeName,
        customPrompt,
        variationSeed: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.content) {
      console.warn("⚠️ Resposta da API de reflexão inválida:", data.error || data);
      return fallbackResponse();
    }

    return data.content;
  } catch (error) {
    console.error("🚨 Erro de Conexão (reflection):", error);
    return fallbackResponse();
  }
}

function fallbackResponse() {
  const fallbacks = [
    "Registro salvo. A consistência gera alavancagem.",
    "Input recebido. Menos conversa, mais ação.",
    "Anotado. A disciplina vence o talento.",
    "Execução validada. Go Try."
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}
