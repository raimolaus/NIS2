'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  followUps?: string[];
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

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

      // Add assistant response with follow-ups
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.response,
          sources: data.sources || [],
          followUps: data.followUps || [],
        },
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

  const handleFollowUp = (question: string) => {
    setInput(question);
  };

  const starterPrompts = [
    {
      icon: '📋',
      title: 'Mis on NIS2?',
      subtitle: 'Saa ülevaade NIS2 direktiivist',
      prompt: 'Mis on NIS2 direktiiv ja kas see kohaldub meile?',
    },
    {
      icon: '🚀',
      title: 'Kust alustada?',
      subtitle: 'Esimesed sammud vastavuse saavutamiseks',
      prompt: 'Kuidas ma alustan NIS2 nõuete täitmist?',
    },
    {
      icon: '🔒',
      title: 'Turvanõuded',
      subtitle: 'Mida NIS2 meilt nõuab?',
      prompt: 'Millised on NIS2 peamised turvanõuded?',
    },
    {
      icon: '⚠️',
      title: 'Tagajärjed',
      subtitle: 'Mida juhtub mittevastavuse korral?',
      prompt: 'Mis juhtub, kui me ei täida NIS2 nõudeid?',
    },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {messages.length === 0 ? (
            <div className="text-center py-12 animate-fade-in">
              {/* Welcome Header */}
              <Card className="mb-8 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 border-2 border-primary/20">
                <CardContent className="pt-8 pb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                    <span className="text-5xl">💬</span>
                  </div>
                  <h1 className="text-3xl font-bold mb-3">NIS2 AI Assistent</h1>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Esita mulle küsimusi NIS2 nõuete kohta või küsi nõu, kuidas oma
                    organisatsiooni kaitsta. Olen siin, et aidata!
                  </p>
                </CardContent>
              </Card>

              {/* Starter Prompts */}
              <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {starterPrompts.map((prompt, idx) => (
                  <Card
                    key={idx}
                    className="cursor-pointer hover:shadow-lg hover:border-primary transition-all group opacity-0 animate-slide-up"
                    style={{ animationDelay: `${idx * 100}ms` }}
                    onClick={() => setInput(prompt.prompt)}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl flex-shrink-0">{prompt.icon}</div>
                        <div className="text-left">
                          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition">
                            {prompt.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {prompt.subtitle}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Tips Section */}
              <Card className="mt-8 max-w-2xl mx-auto bg-amber-50 dark:bg-amber-950 border-amber-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div className="text-left text-sm">
                      <p className="font-semibold mb-1">Näpunäide</p>
                      <p className="text-muted-foreground">
                        Võid küsida nii üldiseid kui ka konkreetseid küsimusi. Näiteks: "Kuidas luua
                        intsidendi käsitlemise plaani?" või "Mis on meie riskitase?"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-4 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  } opacity-0 animate-slide-up`}
                  style={{ animationDelay: '50ms' }}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-md">
                        <span className="text-white font-bold text-lg">AI</span>
                      </div>
                    </div>
                  )}

                  <div className="max-w-2xl">
                    <Card
                      className={`${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-primary'
                          : 'bg-card hover:shadow-md transition-shadow'
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <p className="whitespace-pre-wrap leading-relaxed">
                            {msg.content}
                          </p>
                        </div>

                        {msg.role === 'assistant' && (
                          <div className="mt-3 flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(msg.content, idx)}
                              className="h-8 px-3"
                            >
                              {copiedIndex === idx ? (
                                <>
                                  <span className="text-xs">✓ Kopeeritud</span>
                                </>
                              ) : (
                                <>
                                  <span className="text-xs">📋 Kopeeri</span>
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Sources (if available) */}
                    {msg.role === 'assistant' && msg.sources && msg.sources.length > 0 && (
                      <Card className="mt-2 bg-blue-50 dark:bg-blue-950 border-blue-200">
                        <CardContent className="p-3">
                          <div className="flex items-start gap-2">
                            <span className="text-lg">📚</span>
                            <div className="text-xs">
                              <p className="font-semibold mb-1">Allikad:</p>
                              <ul className="space-y-1">
                                {msg.sources.map((source, sidx) => (
                                  <li key={sidx} className="text-muted-foreground">
                                    • {source}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Follow-up Questions */}
                    {msg.role === 'assistant' && msg.followUps && msg.followUps.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                          <span>💡</span> Jätkuküsimused:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {msg.followUps.map((followUp, fidx) => (
                            <Button
                              key={fidx}
                              variant="outline"
                              size="sm"
                              onClick={() => handleFollowUp(followUp)}
                              className="text-xs h-auto py-2 hover:border-primary hover:text-primary"
                            >
                              {followUp}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 flex items-center justify-center shadow-md">
                        <span className="text-slate-700 dark:text-slate-200 font-bold text-lg">
                          SA
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-4 justify-start opacity-0 animate-fade-in">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-lg">AI</span>
                    </div>
                  </div>
                  <Card className="max-w-2xl">
                    <CardContent className="p-4">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" />
                        <div
                          className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: '0.1s' }}
                        />
                        <div
                          className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area - Fixed Bottom */}
      <div className="border-t bg-card shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Kirjuta oma küsimus..."
              disabled={loading}
              className="flex-1 px-4 py-3 border-2 border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-background disabled:opacity-50 transition"
            />
            <Button
              type="submit"
              disabled={!input.trim() || loading}
              size="lg"
              className="px-8 font-semibold"
            >
              Saada
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center flex items-center justify-center gap-2">
            <span>⚠️</span>
            AI võib teha vigu. Kontrolli alati olulist infot.
          </p>
        </div>
      </div>
    </div>
  );
}
