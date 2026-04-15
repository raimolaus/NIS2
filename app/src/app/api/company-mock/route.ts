import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

// GET - Get company data
export async function GET(req: NextRequest) {
  try {
    if (!storage.company) {
      // Return empty/default data if not set
      return NextResponse.json({ company: null }, { status: 200 });
    }

    return NextResponse.json({ company: storage.company }, { status: 200 });
  } catch (error) {
    console.error('Company GET error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}

// POST - Save/Update company data
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Update company data with timestamp
    storage.company = {
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ company: storage.company }, { status: 200 });
  } catch (error) {
    console.error('Company POST error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}
