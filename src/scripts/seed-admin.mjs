// Simple seed script - no external deps beyond what's already installed
// Run: node src/scripts/seed-admin.mjs

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
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
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env.local');
  process.exit(1);
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

async function main() {
  console.log('🔗 Connecting to MongoDB Atlas...');
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
  console.log('✅ Connected');

  const User = mongoose.models.User || mongoose.model('User', UserSchema);

  const email = 'prathameshgadewar181@gmail.com';
  const plainPassword = 'Prathamesh@181_2006';

  const hashedPassword = await bcrypt.hash(plainPassword, 12);

  const existing = await User.findOne({ email: { $exists: true } });
  if (existing) {
    console.log(`🔄 Updating existing admin user...`);
    await User.updateOne({}, { email, password: hashedPassword });
  } else {
    console.log(`✨ Creating new admin user...`);
    await User.create({ email, password: hashedPassword });
  }

  console.log('\n✅ Admin credentials updated successfully!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Email:    ', email);
  console.log('  Password: ', plainPassword);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n🔐 You can now log in with these credentials.\n');

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
