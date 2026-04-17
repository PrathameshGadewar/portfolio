import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Manually read .env.local
const envPath = resolve(process.cwd(), '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
const envVars = Object.fromEntries(
  envContent.split('\n')
    .filter(line => line.includes('=') && !line.startsWith('#'))
    .map(line => {
      const [key, ...rest] = line.split('=');
      return [key.trim(), rest.join('=').trim()];
    })
);

const MONGODB_URI = envVars['MONGODB_URI'];

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  const Education = mongoose.models.Education || mongoose.model('Education', new mongoose.Schema({}));
  const data = await Education.find({}).lean();
  
  console.log('--- Education Data ---');
  console.log(JSON.stringify(data, null, 2));
  console.log('----------------------');

  await mongoose.disconnect();
}

main().catch(console.error);
