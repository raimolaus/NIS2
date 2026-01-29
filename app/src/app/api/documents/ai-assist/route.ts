import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: NextRequest) {
  try {
    const { content, prompt } = await req.json();

    if (!content || !prompt) {
      return NextResponse.json(
        { error: 'Sisu ja küsimus on kohustuslikud' },
        { status: 400 }
      );
    }

    // Check if API key exists
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY pole seadistatud. Lisa see .env.local faili.' },
        { status: 500 }
      );
    }

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: `Sa oled NIS2 direktiivi ekspert ja aitad parandada NIS2 vastavuse dokumente.

Praegune dokument (Markdown vormingus):
---
${content}
---

Kasutaja soov: ${prompt}

OLULINE:
- Tagasta AINULT parandatud dokumendi sisu Markdown vormingus
- ÄRA lisa selgitusi ega kommentaare
- Säilita Markdown vorming (päised #, ##, loetelu -, tabelid jne)
- Säilita dokumendi struktuur
- Tee ainult need muudatused, mida kasutaja palus
- Kirjuta eesti keeles
- Ole konkreetne ja professionaalne

Parandatud dokument:`,
        },
      ],
    });

    const response = message.content[0].type === 'text'
      ? message.content[0].text
      : '';

    return NextResponse.json({ response }, { status: 200 });
  } catch (error: any) {
    console.error('AI assist error:', error);

    if (error.status === 401) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY on vale või puudub' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'AI assistent ebaõnnestus: ' + (error.message || 'Tundmatu viga') },
      { status: 500 }
    );
  }
}
