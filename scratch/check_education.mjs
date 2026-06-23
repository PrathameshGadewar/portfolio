import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://prathameshgadewar181_db_user:JJlNgyphTSQ8RrK6@cluster0.o2bwe1h.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0';

const EducationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  specialization: String,
  startYear: String,
  endYear: String,
  link: String,
  logo: String,
  score: String,
});

async function main() {
  await mongoose.connect(MONGODB_URI);
  const Education = mongoose.models.Education || mongoose.model('Education', EducationSchema);
  const records = await Education.find();
  console.log('--- Education Records Found ---');
  console.log(JSON.stringify(records, null, 2));
  await mongoose.disconnect();
}

main().catch(console.error);
