import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function chatCompletion({
  messages,
  systemPrompt,
  temperature = 0.7,
  maxTokens = 4096,
}: {
  messages: { role: 'user' | 'assistant'; content: string }[];
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
}) {
  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: maxTokens,
    temperature,
    system: systemPrompt,
    messages,
  });

  return {
    content: response.content[0].type === 'text' ? response.content[0].text : '',
    usage: response.usage,
    id: response.id,
  };
}

export async function chatCompletionStream({
  messages,
  systemPrompt,
  onChunk,
}: {
  messages: { role: 'user' | 'assistant'; content: string }[];
  systemPrompt?: string;
  onChunk: (text: string) => void;
}) {
  const stream = await anthropic.messages.stream({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4096,
    system: systemPrompt,
    messages,
  });

  for await (const chunk of stream) {
    if (
      chunk.type === 'content_block_delta' &&
      chunk.delta.type === 'text_delta'
    ) {
      onChunk(chunk.delta.text);
    }
  }

  const finalMessage = await stream.finalMessage();
  return {
    content:
      finalMessage.content[0].type === 'text' ? finalMessage.content[0].text : '',
    usage: finalMessage.usage,
  };
}
