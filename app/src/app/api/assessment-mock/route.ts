import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { storage } from '@/lib/storage';

// Validation schemas
const updateAssessmentSchema = z.object({
  answers: z.record(z.string()),
  progress: z.number().min(0).max(40),
});

// GET - Get current assessment
export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({ assessment: storage.assessment }, { status: 200 });
  } catch (error) {
    console.error('Assessment GET error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}

// POST - Create or reset assessment
export async function POST(req: NextRequest) {
  try {
    // Reset assessment
    storage.assessment = {
      id: '1',
      organizationId: 'mock-org-id',
      status: 'in_progress',
      progress: 0,
      answers: {},
      score: null,
      completedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ assessment: storage.assessment }, { status: 201 });
  } catch (error) {
    console.error('Assessment POST error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}

// PATCH - Update assessment (save answers)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validatedFields = updateAssessmentSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: validatedFields.error.errors[0].message },
        { status: 400 }
      );
    }

    const { answers, progress } = validatedFields.data;

    // Check if completed (all 40 questions answered)
    const isCompleted = progress === 40;

    // Calculate score if completed
    let score = null;
    if (isCompleted) {
      // Import score calculation
      const { calculateTotalScore } = await import('@/data/assessment-questions');
      score = calculateTotalScore(answers);
    }

    // Update assessment
    storage.assessment = {
      ...storage.assessment,
      answers,
      progress,
      status: isCompleted ? 'completed' : 'in_progress',
      score: isCompleted ? score : null,
      completedAt: isCompleted ? new Date().toISOString() : null,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ assessment: storage.assessment }, { status: 200 });
  } catch (error) {
    console.error('Assessment PATCH error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}

// DELETE - Reset assessment (start over)
export async function DELETE(req: NextRequest) {
  try {
    // Reset to initial state
    storage.assessment = {
      id: '1',
      organizationId: 'mock-org-id',
      status: 'not_started',
      progress: 0,
      answers: {},
      score: null,
      completedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ message: 'Assessment lähtestatud' }, { status: 200 });
  } catch (error) {
    console.error('Assessment DELETE error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}
