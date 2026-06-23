import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://prathameshgadewar181_db_user:JJlNgyphTSQ8RrK6@cluster0.o2bwe1h.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0';

const ProfileSchema = new mongoose.Schema({
  name: String,
  resumeLink: String,
});

async function main() {
  await mongoose.connect(MONGODB_URI);
  const Profile = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
  const profile = await Profile.findOne();
  console.log('--- Profile Found ---');
  console.log(JSON.stringify(profile, null, 2));
  await mongoose.disconnect();
}

main().catch(console.error);
