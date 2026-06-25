export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import * as Models from '@/models/Portfolio';
import { verifyToken } from '@/lib/auth';

const getModel = (modelName: string) => {
  const modelKey = Object.keys(Models).find(
    (key) => key.toLowerCase() === modelName.toLowerCase()
  );
  return modelKey ? (Models as any)[modelKey] : null;
};

export async function GET(
  req: Request,
  { params }: { params: Promise<{ model: string }> }
) {
  try {
    await dbConnect();
    const { model: modelName } = await params;
    const model = getModel(modelName);

    if (!model) {
      return NextResponse.json({ message: 'Model not found' }, { status: 404 });
    }

    const data = await model.find({}).sort({ order: 1 });

    if (modelName.toLowerCase() === 'profile') {
      const optimizedData = data.map((item: any) => {
        const doc = item.toObject ? item.toObject() : item;
        if (doc.resumeLink && doc.resumeLink.trim().startsWith('data:')) {
          doc.resumeLink = '/api/resume';
        }
        return doc;
      });
      return NextResponse.json(optimizedData);
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ model: string }> }
) {
  try {
    await dbConnect();
    const { model: modelName } = await params;
    const model = getModel(modelName);

    if (!model) {
      return NextResponse.json({ message: 'Model not found' }, { status: 404 });
    }

    const payload = await req.json();
    const newData = await model.create(payload);
    return NextResponse.json(newData, { status: 201 });
  } catch (error: any) {
    console.error('API Error:', error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ model: string }> }
) {
  try {
    await dbConnect();
    const { model: modelName } = await params;
    const model = getModel(modelName);

    if (!model) {
      return NextResponse.json({ message: 'Model not found' }, { status: 404 });
    }

    if (!verifyToken(req)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const payload = await req.json();
    if (!Array.isArray(payload)) {
      return NextResponse.json({ message: 'Payload must be an array of updates' }, { status: 400 });
    }

    const bulkOps = payload.map((item: any) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { order: item.order },
      },
    }));

    await model.bulkWrite(bulkOps);
    return NextResponse.json({ message: 'Reordered successfully' });
  } catch (error: any) {
    console.error('API Error:', error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
