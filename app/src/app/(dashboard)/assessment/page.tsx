'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  assessmentQuestions,
  assessmentSections,
  getQuestionsBySection,
  calculateSectionScore,
  calculateTotalScore,
  NOT_SURE_OPTION,
  type AssessmentQuestion,
} from '@/data/assessment-questions';

export default function AssessmentPage() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Load existing assessment on mount
  useEffect(() => {
    loadAssessment();
  }, []);

  const loadAssessment = async () => {
    try {
      const res = await fetch('/api/assessment');
      const data = await res.json();

      if (data.assessment) {
        setAssessmentId(data.assessment.id);
        setAnswers(data.assessment.answers || {});

        // If completed, show results
        if (data.assessment.status === 'completed') {
          setShowResults(true);
        }
      } else {
        // Create new assessment
        await createAssessment();
      }
    } catch (error) {
      console.error('Failed to load assessment:', error);
    }
  };

  const createAssessment = async () => {
    try {
      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      setAssessmentId(data.assessment.id);
    } catch (error) {
      console.error('Failed to create assessment:', error);
    }
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const saveProgress = async () => {
    if (!assessmentId) return;

    setLoading(true);
    try {
      const answeredCount = Object.keys(answers).length;

      await fetch('/api/assessment', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessmentId,
          answers,
          progress: answeredCount,
        }),
      });
    } catch (error) {
      console.error('Failed to save progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    await saveProgress();

    if (currentSection < assessmentSections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Completed all sections
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentSectionData = assessmentSections[currentSection];
  const currentQuestions = getQuestionsBySection(currentSectionData.id);
  const currentSectionAnswers = currentQuestions.filter((q) => answers[q.id]);
  const isSectionComplete = currentSectionAnswers.length === currentQuestions.length;
  const totalAnswered = Object.keys(answers).length;
  const progressPercentage = Math.round((totalAnswered / 40) * 100);

  // Results view
  if (showResults) {
    const totalScore = calculateTotalScore(answers);

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">N2</span>
              </div>
              <span className="font-bold text-xl">NIS2 Enesehindamine</span>
            </div>
          </div>
        </header>

        {/* Results */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 mb-4">
                <span className="text-4xl">✓</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">Enesehindamine lõpetatud!</h1>
              <p className="text-gray-600">
                Olete vastanud kõigile 40 küsimusele
              </p>
            </div>

            {/* Total Score */}
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-6 mb-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary-600 mb-2">
                  {totalScore}%
                </div>
                <div className="text-lg font-semibold text-gray-700">
                  NIS2 Vastavuse skoor
                </div>
              </div>
              <div className="mt-4 w-full bg-white rounded-full h-4">
                <div
                  className="bg-primary-600 h-4 rounded-full transition-all"
                  style={{ width: `${totalScore}%` }}
                ></div>
              </div>
            </div>

            {/* Section Scores */}
            <div className="space-y-4 mb-8">
              <h2 className="text-xl font-bold mb-4">Valdkondade tulemused</h2>
              {assessmentSections.map((section) => {
                const score = calculateSectionScore(section.id, answers);
                const getScoreColor = (score: number) => {
                  if (score >= 80) return 'bg-green-500';
                  if (score >= 60) return 'bg-yellow-500';
                  if (score >= 40) return 'bg-orange-500';
                  return 'bg-red-500';
                };

                return (
                  <div key={section.id} className="bg-white border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                          {section.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{section.name}</h3>
                          <p className="text-sm text-gray-600">{section.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600">
                          {score}%
                        </div>
                        <div className="text-xs text-gray-500">
                          {section.questionCount} küsimust
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${getScoreColor(score)}`}
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Link
                href="/dashboard"
                className="flex-1 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition text-center"
              >
                Tagasi dashboard'ile
              </Link>
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentSection(0);
                  setAnswers({});
                }}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
              >
                Alusta uuesti
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N2</span>
                </div>
                <span className="font-bold text-xl">NIS2 Abimees</span>
              </Link>

              <nav className="hidden md:flex items-center gap-6">
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Dashboard
                </Link>
                <Link
                  href="/assessment"
                  className="text-primary-600 font-semibold border-b-2 border-primary-600 pb-1"
                >
                  Enesehindamine
                </Link>
                <Link
                  href="/documents"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Dokumendid
                </Link>
                <Link
                  href="/risks"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Riskihaldus
                </Link>
                <Link
                  href="/chat"
                  className="text-gray-600 hover:text-gray-900 transition"
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
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Progress: {totalAnswered}/40
            </span>
            <span className="text-sm font-medium text-primary-600">
              {progressPercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Section indicators */}
          <div className="flex gap-2 mt-4">
            {assessmentSections.map((section, idx) => (
              <div
                key={section.id}
                className={`flex-1 h-1 rounded-full ${
                  idx < currentSection
                    ? 'bg-green-500'
                    : idx === currentSection
                    ? 'bg-primary-600'
                    : 'bg-gray-200'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Section Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-2xl">
                {currentSectionData.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{currentSectionData.name}</h1>
                <p className="text-gray-600">{currentSectionData.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Sektsioon {currentSection + 1}/{assessmentSections.length} •{' '}
                  {currentSectionData.questionCount} küsimust
                </p>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              ← Dashboard
            </Link>
          </div>
          <div className="bg-primary-50 border-l-4 border-primary-600 p-4 rounded">
            <p className="text-sm text-gray-700">
              Vasta ausalt kõigile küsimustele. Kui ei ole kindel, vali "Ei oska vastata". Vastused aitavad meil hinnata teie organisatsiooni NIS2 vastavust.
            </p>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {currentQuestions.map((question) => {
            const answer = answers[question.id];

            return (
              <div
                key={question.id}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="mb-4">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 font-bold text-sm flex-shrink-0">
                      {question.questionNumber}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {question.question}
                      </h3>
                      {question.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {question.description}
                        </p>
                      )}
                      {question.nis2Reference && (
                        <p className="text-xs text-primary-600 mt-1">
                          📖 NIS2 {question.nis2Reference}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {question.options.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition ${
                        answer === option.value
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
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
                        className="mt-1 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="flex-1 text-gray-900">
                        {option.label}
                      </span>
                    </label>
                  ))}

                  {/* "Ei oska vastata" variant */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition ${
                      answer === NOT_SURE_OPTION.value
                        ? 'border-gray-400 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
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
                      className="mt-1 text-gray-600 focus:ring-gray-500"
                    />
                    <span className="flex-1 text-gray-600 italic">
                      {NOT_SURE_OPTION.label}
                    </span>
                  </label>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex gap-4">
          {currentSection > 0 && (
            <button
              onClick={handleBack}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
            >
              ← Eelmine sektsioon
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!isSectionComplete || loading}
            className="flex-1 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? 'Salvestan...'
              : currentSection === assessmentSections.length - 1
              ? 'Lõpeta ja vaata tulemusi →'
              : 'Järgmine sektsioon →'}
          </button>
        </div>

        {/* Section completion status */}
        <div className="mt-4 text-center text-sm text-gray-600">
          {!isSectionComplete && (
            <p>
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
    </div>
  );
}
