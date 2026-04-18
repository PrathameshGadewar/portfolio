import mongoose, { Schema } from 'mongoose';

const ProfileSchema = new Schema({
  name: { type: String, required: true },
  roles: { type: [String], required: true },
  bio: { type: String, required: true },
  overview: { type: String }, // For 'About Me' page
  profileImage: { type: String },
  resumeLink: { type: String },
  github: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
  instagram: { type: String },
  discord: { type: String },
  email: { type: String },
  quote: { type: String },
});

const EducationSchema = new Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  specialization: { type: String },
  startYear: { type: String },
  endYear: { type: String },
  link: { type: String },
  logo: { type: String },
});

const ExperienceSchema = new Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  location: { type: String },
  status: { type: String }, // 'internship', 'full-time', etc.
  description: { type: String },
});

const CertificationSchema = new Schema({
  title: { type: String, required: true },
  organization: { type: String, required: true },
  year: { type: String },
  link: { type: String },
  image: { type: String }, // badge image
});

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  tags: { type: [String], default: [] },
  liveLink: { type: String },
  githubLink: { type: String },
  category: { type: String }, // 'Web', 'AI/ML', etc.
});

const SkillSchema = new Schema({
  category: { type: String, required: true }, // 'Programming', 'Deployment'
  name: { type: String, required: true },
  icon: { type: String }, // class name or URL
});

const ServiceSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String }, // class name or URL used for lucide-react mostly mapping
});

const MessageSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

// Force re-registration of models to ensure schema changes (like 'logo') are picked up
if (process.env.NODE_ENV !== 'production') {
  delete mongoose.models.Profile;
  delete mongoose.models.Education;
  delete mongoose.models.Experience;
  delete mongoose.models.Certification;
  delete mongoose.models.Project;
  delete mongoose.models.Skill;
  delete mongoose.models.Service;
  delete mongoose.models.Message;
}

export const Profile = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
export const Education = mongoose.models.Education || mongoose.model('Education', EducationSchema);
export const Experience = mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);
export const Certification = mongoose.models.Certification || mongoose.model('Certification', CertificationSchema);
export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export const Skill = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
export const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
export const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);
