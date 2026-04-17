/**
 * Seed script - creates the first admin user in MongoDB
 * 
 * Usage:
 *   npx ts-node --project tsconfig.json -e "require('./src/scripts/seed-admin')"
 * 
 * Or via the npm script:
 *   npm run seed
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load .env.local
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

async function main() {
  console.log("🔗 Connecting to MongoDB:", MONGODB_URI.replace(/:\/\/.*@/, "://***@"));
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected");

  const User = mongoose.models.User || mongoose.model("User", UserSchema);

  const email = "admin@portfolio.com";
  const plainPassword = "Admin@123";

  const existing = await User.findOne({ email });
  if (existing) {
    console.log(`⚠️  Admin user "${email}" already exists. Skipping.`);
    await mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash(plainPassword, 12);
  await User.create({ email, password: hashedPassword });

  console.log("\n✅ Admin user created successfully!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Email:    ", email);
  console.log("  Password: ", plainPassword);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("\n🔐 Change your password after first login!\n");

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
