'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Progress,
  Separator,
} from '@/components/ui';
import {
  assessmentQuestions,
  assessmentSections,
  getQuestionsBySection,
  calculateSectionScore,
  calculateTotalScore,
  NOT_SURE_OPTION,
} from '@/data/assessment-questions';

export default function AssessmentPage() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Load existing assessment on mount
  useEffect(() => {
    loadAssessment();
  }, []);

  const loadAssessment = async () => {
    try {
      setInitialLoading(true);
      const response = await fetch('/api/assessment-mock');

      if (!response.ok) {
        throw new Error('Assessment laadmine ebaõnnestus');
      }

      const data = await response.json();

      if (data.assessment) {
        setAssessmentId(data.assessment.id);

        // Load saved answers if exists
        if (data.assessment.answers && Object.keys(data.assessment.answers).length > 0) {
          setAnswers(data.assessment.answers);
        }

        // If completed, show results
        if (data.assessment.status === 'completed') {
          setShowResults(true);
        }
      }
    } catch (error) {
      console.error('Error loading assessment:', error);
      // Continue with empty state if loading fails
    } finally {
      setInitialLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = async () => {
    setLoading(true);

    try {
      // Save progress to API
      const totalAnswered = Object.keys(answers).length;

      const response = await fetch('/api/assessment-mock', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          progress: totalAnswered,
        }),
      });

      if (!response.ok) {
        throw new Error('Vastuste salvestamine ebaõnnestus');
      }

      const data = await response.json();

      // Update assessment ID if needed
      if (data.assessment && data.assessment.id) {
        setAssessmentId(data.assessment.id);
      }

      if (currentSection < assessmentSections.length - 1) {
        setCurrentSection(currentSection + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setShowResults(true);
      }
    } catch (error) {
      console.error('Error saving assessment:', error);
      alert('Viga vastuste salvestamisel. Palun proovi uuesti.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartOver = async () => {
    try {
      setLoading(true);

      // Reset assessment via API
      const response = await fetch('/api/assessment-mock', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Assessment lähtestamine ebaõnnestus');
      }

      // Reset local state
      setShowResults(false);
      setCurrentSection(0);
      setAnswers({});
      setAssessmentId(null);

      // Reload assessment
      await loadAssessment();
    } catch (error) {
      console.error('Error resetting assessment:', error);
      alert('Viga assessment lähtestamisel. Palun proovi uuesti.');
    } finally {
      setLoading(false);
    }
  };

  // Show loading while fetching assessment
  if (initialLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <div className="text-6xl mb-4">⏳</div>
            <h3 className="text-xl font-semibold mb-2">
              Laadin enesehindamist...
            </h3>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentSectionData = assessmentSections[currentSection];
  const currentQuestions = getQuestionsBySection(currentSectionData.id);
  const currentSectionAnswers = currentQuestions.filter((q) => answers[q.id]);
  const isSectionComplete = currentSectionAnswers.length === currentQuestions.length;
  const totalAnswered = Object.keys(answers).length;
  const progressPercentage = Math.round((totalAnswered / 40) * 100);

  // Results view
  if (showResults) {
    const totalScore = calculateTotalScore(answers);

    // Gamification: Get badge and level based on score
    const getBadge = (score: number) => {
      if (score >= 90) return { emoji: '🏆', name: 'NIS2 Expert', color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' };
      if (score >= 75) return { emoji: '🥈', name: 'NIS2 Professional', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' };
      if (score >= 60) return { emoji: '🥉', name: 'NIS2 Practitioner', color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200' };
      if (score >= 40) return { emoji: '📚', name: 'Learning Progress', color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' };
      return { emoji: '🌱', name: 'Getting Started', color: 'text-green-600', bg: 'bg-green-50 border-green-200' };
    };

    const badge = getBadge(totalScore);

    // Benchmark data
    const benchmarks = [
      { label: 'Eesti keskmine', value: 62, color: 'bg-gray-400' },
      { label: 'Euroopa keskmine', value: 68, color: 'bg-blue-400' },
      { label: 'Top 10%', value: 85, color: 'bg-green-500' },
    ];

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section with Circular Progress */}
        <Card className="mb-6 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-indigo-950 dark:via-blue-950 dark:to-purple-950 border-2 border-primary/20 opacity-0 animate-fade-in">
          <CardContent className="pt-12 pb-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="text-6xl">{badge.emoji}</span>
                <div className="text-left">
                  <div className={`text-2xl font-bold ${badge.color}`}>{badge.name}</div>
                  <p className="text-sm text-muted-foreground">Saavutus avatud!</p>
                </div>
              </div>
            </div>

            {/* Circular Progress Gauge */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-64 h-64">
                <svg className="w-64 h-64 transform -rotate-90">
                  {/* Background circle */}
                  <circle
                    cx="128"
                    cy="128"
                    r="110"
                    stroke="currentColor"
                    strokeWidth="16"
                    fill="none"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="128"
                    cy="128"
                    r="110"
                    stroke="url(#gradient)"
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 110}`}
                    strokeDashoffset={`${2 * Math.PI * 110 * (1 - totalScore / 100)}`}
                    className="transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Score in center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {totalScore}%
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">NIS2 Vastavus</p>
                </div>
              </div>

              <p className="text-center text-muted-foreground mt-4 max-w-md">
                Olete vastanud kõigile 40 küsimusele. Teie organisatsioon on{' '}
                <span className="font-semibold text-primary">{totalScore}% valmis</span> NIS2 nõuetele vastamiseks.
              </p>
            </div>

            {/* Badge Achievement */}
            <div className={`max-w-md mx-auto p-4 rounded-lg border-2 ${badge.bg}`}>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{badge.emoji}</span>
                <div className="flex-1">
                  <h3 className={`font-bold text-lg ${badge.color}`}>{badge.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {totalScore >= 90 ? 'Suurepärane! Olete NIS2 ekspert!' :
                     totalScore >= 75 ? 'Väga hea! Professionaalne tase saavutatud!' :
                     totalScore >= 60 ? 'Hea algus! Praktiline teadmine olemas!' :
                     totalScore >= 40 ? 'Õppimise rada! Jätkake samas vaimus!' :
                     'Algus tehtud! Jätkake õppimist!'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Benchmark Comparison */}
          <Card className="lg:col-span-2 opacity-0 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>📊</span>
                Võrdlus turu keskmisega
              </CardTitle>
              <CardDescription>Kuidas Te võrrelda teiste organisatsioonidega</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {benchmarks.map((benchmark, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{benchmark.label}</span>
                    <span className="text-muted-foreground">{benchmark.value}%</span>
                  </div>
                  <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`absolute h-full ${benchmark.color} transition-all duration-1000`}
                      style={{ width: `${benchmark.value}%` }}
                    />
                    {/* Your score marker */}
                    {totalScore >= benchmark.value - 5 && totalScore <= benchmark.value + 15 && (
                      <div
                        className="absolute top-0 h-full w-1 bg-purple-600 animate-pulse"
                        style={{ left: `${totalScore}%` }}
                      />
                    )}
                  </div>
                  {totalScore > benchmark.value && (
                    <p className="text-xs text-green-600">
                      ✓ Olete {totalScore - benchmark.value}% parem kui {benchmark.label.toLowerCase()}
                    </p>
                  )}
                  {totalScore < benchmark.value && (
                    <p className="text-xs text-amber-600">
                      ⚡ Parandage {benchmark.value - totalScore}% jõudmaks {benchmark.label.toLowerCase()} tasemeni
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="opacity-0 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle>Kiirstatistika</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <div>
                  <p className="text-2xl font-bold text-green-600">{assessmentSections.filter(s => calculateSectionScore(s.id, answers) >= 75).length}</p>
                  <p className="text-xs text-muted-foreground">Tugevad valdkonnad</p>
                </div>
                <span className="text-3xl">💪</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-950 rounded-lg">
                <div>
                  <p className="text-2xl font-bold text-amber-600">{assessmentSections.filter(s => calculateSectionScore(s.id, answers) < 75 && calculateSectionScore(s.id, answers) >= 50).length}</p>
                  <p className="text-xs text-muted-foreground">Vajab täiendamist</p>
                </div>
                <span className="text-3xl">⚠️</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                <div>
                  <p className="text-2xl font-bold text-red-600">{assessmentSections.filter(s => calculateSectionScore(s.id, answers) < 50).length}</p>
                  <p className="text-xs text-muted-foreground">Kriitilised lüngad</p>
                </div>
                <span className="text-3xl">🚨</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section Scores with Circular Progress */}
        <Card className="mb-6 opacity-0 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🎯</span>
              Valdkondade detailne ülevaade
            </CardTitle>
            <CardDescription>Teie tugevused ja parendusvaldkonnad</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {assessmentSections.map((section, idx) => {
                const score = calculateSectionScore(section.id, answers);
                const gradient = score >= 75 ? 'from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200' :
                                score >= 50 ? 'from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200' :
                                'from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 border-red-200';

                return (
                  <Card key={section.id} className={`bg-gradient-to-br ${gradient} border-2 opacity-0 animate-slide-up`} style={{ animationDelay: `${400 + idx * 50}ms` }}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        {/* Mini Circular Progress */}
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <svg className="w-20 h-20 transform -rotate-90">
                            <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="6" fill="none" className="text-gray-200 dark:text-gray-700" />
                            <circle
                              cx="40"
                              cy="40"
                              r="32"
                              stroke="currentColor"
                              strokeWidth="6"
                              fill="none"
                              className={score >= 75 ? 'text-green-500' : score >= 50 ? 'text-amber-500' : 'text-red-500'}
                              strokeDasharray={`${2 * Math.PI * 32}`}
                              strokeDashoffset={`${2 * Math.PI * 32 * (1 - score / 100)}`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold">{score}%</span>
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">{section.icon}</span>
                            <h3 className="font-semibold">{section.name}</h3>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{section.description}</p>
                          <p className="text-xs font-medium">
                            {score >= 75 ? '✓ Suurepärane tulemus!' :
                             score >= 50 ? '⚡ Hea algus, jätkake!' :
                             '🚨 Vajab kiiret tähelepanu!'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4 opacity-0 animate-slide-up" style={{ animationDelay: '800ms' }}>
          <Button size="lg" className="flex-1" asChild>
            <Link href="/dashboard">
              <span className="mr-2">🏠</span>
              Tagasi dashboard'ile
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleStartOver}
            disabled={loading}
          >
            <span className="mr-2">🔄</span>
            {loading ? 'Lähtestan...' : 'Alusta uuesti'}
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/documents">
              <span className="mr-2">📄</span>
              Genereeri dokumendid
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Progress Bar */}
      <div className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Progress: {totalAnswered}/40
            </span>
            <span className="text-sm font-medium text-primary">
              {progressPercentage}%
            </span>
          </div>
          <Progress value={progressPercentage} />

          {/* Section indicators */}
          <div className="flex gap-2 mt-4">
            {assessmentSections.map((section, idx) => (
              <div
                key={section.id}
                className={`flex-1 h-1 rounded-full ${
                  idx < currentSection
                    ? 'bg-green-500'
                    : idx === currentSection
                    ? 'bg-primary'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Section Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                  {currentSectionData.icon}
                </div>
                <div>
                  <CardTitle className="text-2xl">{currentSectionData.name}</CardTitle>
                  <CardDescription className="text-base">
                    {currentSectionData.description} • Sektsioon {currentSection + 1}/{assessmentSections.length} • {currentSectionData.questionCount} küsimust
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border-l-4 border-primary p-4 rounded">
              <p className="text-sm">
                Vasta ausalt kõigile küsimustele. Kui ei ole kindel, vali "Ei oska vastata". Vastused aitavad meil hinnata teie organisatsiooni NIS2 vastavust.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-6">
          {currentQuestions.map((question) => {
            const answer = answers[question.id];

            return (
              <Card key={question.id}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <Badge className="shrink-0">
                      {question.questionNumber}
                    </Badge>
                    <div className="flex-1">
                      <CardTitle className="text-lg">
                        {question.question}
                      </CardTitle>
                      {question.description && (
                        <CardDescription className="mt-2">
                          {question.description}
                        </CardDescription>
                      )}
                      {question.nis2Reference && (
                        <Badge variant="outline" className="mt-2">
                          📖 NIS2 {question.nis2Reference}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {question.options.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition ${
                        answer === option.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50 hover:bg-accent'
                      }`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option.value}
                        checked={answer === option.value}
                        onChange={(e) =>
                          handleAnswerChange(question.id, e.target.value)
                        }
                        className="mt-1"
                      />
                      <span className="flex-1">
                        {option.label}
                      </span>
                    </label>
                  ))}

                  {/* "Ei oska vastata" variant */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition ${
                      answer === NOT_SURE_OPTION.value
                        ? 'border-muted-foreground bg-muted'
                        : 'border-border hover:border-muted-foreground hover:bg-muted/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={NOT_SURE_OPTION.value}
                      checked={answer === NOT_SURE_OPTION.value}
                      onChange={(e) =>
                        handleAnswerChange(question.id, e.target.value)
                      }
                      className="mt-1"
                    />
                    <span className="flex-1 text-muted-foreground italic">
                      {NOT_SURE_OPTION.label}
                    </span>
                  </label>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex gap-4">
          {currentSection > 0 && (
            <Button
              variant="outline"
              onClick={handleBack}
            >
              ← Eelmine sektsioon
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!isSectionComplete || loading}
            className="flex-1"
          >
            {loading
              ? 'Salvestan...'
              : currentSection === assessmentSections.length - 1
              ? 'Lõpeta ja vaata tulemusi →'
              : 'Järgmine sektsioon →'}
          </Button>
        </div>

        {/* Section completion status */}
        <div className="mt-4 text-center text-sm">
          {!isSectionComplete && (
            <p className="text-muted-foreground">
              Palun vasta kõigile {currentSectionData.questionCount} küsimusele enne
              jätkamist
            </p>
          )}
          {isSectionComplete && (
            <p className="text-green-600 font-medium">
              ✓ Sektsioon {currentSection + 1} täidetud
            </p>
          )}
        </div>
      </main>
    </>
  );
}
