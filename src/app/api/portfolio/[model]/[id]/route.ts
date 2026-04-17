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

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ model: string; id: string }> }
) {
  if (!verifyToken(req)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    await dbConnect();
    const { model: modelName, id } = await params;
    const model = getModel(modelName);
    if (!model) return NextResponse.json({ message: 'Model not found' }, { status: 404 });

    const payload = await req.json();
    delete payload._id;
    delete payload.__v;

    const updated = await model.findByIdAndUpdate(id, payload, { new: true });
    if (!updated) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ model: string; id: string }> }
) {
  if (!verifyToken(req)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    await dbConnect();
    const { model: modelName, id } = await params;
    const model = getModel(modelName);
    if (!model) return NextResponse.json({ message: 'Model not found' }, { status: 404 });

    await model.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
