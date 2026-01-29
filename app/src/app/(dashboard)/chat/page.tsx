'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message to UI immediately
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);

    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          conversationId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Midagi läks valesti');
      }

      // Add assistant response
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.response },
      ]);

      // Save conversation ID
      if (!conversationId && data.conversationId) {
        setConversationId(data.conversationId);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Vabandust, midagi läks valesti. Palun proovi uuesti.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">N2</span>
              </div>
              <span className="font-bold text-xl">NIS2 Abimees</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Dashboard
              </Link>
              <Link
                href="/chat"
                className="text-primary-600 font-semibold border-b-2 border-primary-600 pb-1"
              >
                AI Vestlus
              </Link>
              <Link
                href="/profile"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Profiil
              </Link>
            </nav>
          </div>

          <Link
            href="/dashboard"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Tagasi
          </Link>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Tere! Kuidas saan sind aidata?</h2>
              <p className="text-gray-600 mb-6">
                Esita mulle küsimusi NIS2 nõuete kohta või küsi nõu, kuidas oma
                organisatsiooni kaitsta.
              </p>
              <div className="grid md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                <button
                  onClick={() =>
                    setInput('Mis on NIS2 direktiiv ja kas see kohaldub meile?')
                  }
                  className="p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-300 text-left"
                >
                  <div className="font-medium text-gray-900 mb-1">
                    Mis on NIS2?
                  </div>
                  <div className="text-sm text-gray-600">
                    Saa ülevaade NIS2 direktiivist
                  </div>
                </button>
                <button
                  onClick={() => setInput('Kuidas ma alustan NIS2 nõuete täitmist?')}
                  className="p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-300 text-left"
                >
                  <div className="font-medium text-gray-900 mb-1">
                    Kust alustada?
                  </div>
                  <div className="text-sm text-gray-600">
                    Esimesed sammud vastavuse saavutamiseks
                  </div>
                </button>
                <button
                  onClick={() =>
                    setInput('Millised on NIS2 peamised turvanõuded?')
                  }
                  className="p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-300 text-left"
                >
                  <div className="font-medium text-gray-900 mb-1">
                    Turvanõuded
                  </div>
                  <div className="text-sm text-gray-600">
                    Mida NIS2 meilt nõuab?
                  </div>
                </button>
                <button
                  onClick={() =>
                  setInput('Mis juhtub, kui me ei täida NIS2 nõudeid?')
                  }
                  className="p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-300 text-left"
                >
                  <div className="font-medium text-gray-900 mb-1">Tagajärjed</div>
                  <div className="text-sm text-gray-600">
                    Mida juhtub mittevastavuse korral?
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-4 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                        <span className="text-white font-bold">AI</span>
                      </div>
                    </div>
                  )}
                  <div
                    className={`max-w-2xl px-4 py-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  {msg.role === 'user' && (
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600 font-bold">SA</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-4 justify-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                      <span className="text-white font-bold">AI</span>
                    </div>
                  </div>
                  <div className="max-w-2xl px-4 py-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Kirjuta oma küsimus..."
              disabled={loading}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-gray-900 bg-white disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Saada
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2 text-center">
            AI võib teha vigu. Kontrolli alati olulist infot.
          </p>
        </div>
      </div>
    </div>
  );
}
