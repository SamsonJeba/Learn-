const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });
const Subject = require('./models/Subject');
const Level = require('./models/Level');
const Testimonial = require('./models/Testimonial');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Promise.all([
      Subject.deleteMany({}),
      Level.deleteMany({}),
      Testimonial.deleteMany({})
    ]);

    // Seed Subjects - Tamil Nadu focus
    await Subject.insertMany([
      {
        name: 'Mathematics',
        icon: 'calculator',
        description: 'From basic arithmetic to advanced calculus. Master problem-solving with proven techniques. Special focus on SSLC & HSC board exam preparation with past paper practice.',
        topics: ['Algebra', 'Geometry', 'Trigonometry', 'Calculus', 'Statistics', 'Vectors'],
        color: '#1a365d',
        levels: ['Std 1-5', 'Std 6-8', 'Std 9-10', 'Std 11-12'],
        featured: true,
        order: 1
      },
      {
        name: 'Physics',
        icon: 'atom',
        description: 'Understand the laws of the universe. Concept-based learning with practical demonstrations and numerical problem-solving for board exams.',
        topics: ['Mechanics', 'Thermodynamics', 'Optics', 'Electromagnetism', 'Modern Physics'],
        color: '#2d5a8e',
        levels: ['Std 6-8', 'Std 9-10', 'Std 11-12'],
        featured: false,
        order: 2
      },
      {
        name: 'Chemistry',
        icon: 'flask',
        description: 'Master chemical reactions and equations. Visual learning approach for organic chemistry and periodic table mastery for Samacheer & CBSE.',
        topics: ['Organic', 'Inorganic', 'Physical', 'Analytical', 'Biochemistry'],
        color: '#1e4d7a',
        levels: ['Std 6-8', 'Std 9-10', 'Std 11-12'],
        featured: false,
        order: 3
      },
      {
        name: 'Biology',
        icon: 'leaf',
        description: 'Explore life sciences from cell biology to ecology. Diagram-based learning with memory techniques for board exams.',
        topics: ['Cell Biology', 'Genetics', 'Physiology', 'Ecology', 'Evolution'],
        color: '#0f2440',
        levels: ['Std 6-8', 'Std 9-10', 'Std 11-12'],
        featured: false,
        order: 4
      }
    ]);
    console.log('Subjects seeded');

    // Seed Levels - Tamil Nadu class structure
    await Level.insertMany([
      {
        name: 'Primary (Std 1-5)',
        icon: 'bookshelf',
        description: 'Build strong foundations in Mathematics with fun, interactive learning methods tailored for young minds.',
        features: ['Fun visual learning methods', 'Tamil & English medium', 'Basic arithmetic mastery', 'Tables & speed math practice', 'Regular parent updates', 'Confidence building activities'],
        price: 'Starting from Rs.1,500/month',
        color: '#2d5a8e',
        popular: false,
        order: 1
      },
      {
        name: 'Middle (Std 6-8)',
        icon: 'science',
        description: 'Strengthen conceptual understanding and problem-solving skills across all Math & Science subjects.',
        features: ['Concept-based learning approach', 'Problem-solving techniques', 'Weekly practice tests', 'Doubt clearance sessions', 'Progress reports to parents', 'Science practical demos'],
        price: 'Starting from Rs.2,000/month',
        color: '#1a365d',
        popular: true,
        order: 2
      },
      {
        name: 'SSLC (Std 9-10)',
        icon: 'graduate',
        description: 'Comprehensive SSLC board exam preparation with past paper practice and time management strategies.',
        features: ['Board exam focused curriculum', 'Past 10 years paper practice', 'Chapter-wise revision program', 'Mock tests every month', 'Answer writing techniques', 'Individual weak-area focus'],
        price: 'Starting from Rs.2,500/month',
        color: '#0f2440',
        popular: false,
        order: 3
      },
      {
        name: 'HSC (Std 11-12)',
        icon: 'graduate',
        description: 'Advanced preparation for HSC board exams and competitive exams (JEE/NEET) with college entrance guidance.',
        features: ['Advanced syllabus coverage', 'JEE/NEET foundation prep', 'HSC board specialization', 'Weekly full-length tests', 'Weekend doubt classes', 'Career counseling sessions'],
        price: 'Starting from Rs.3,000/month',
        color: '#d4a843',
        popular: false,
        order: 4
      }
    ]);
    console.log('Levels seeded');

    // Seed Testimonials - Tamil Nadu students
    await Testimonial.insertMany([
      {
        name: 'Priya Karthik',
        role: 'SSLC Topper - 2025',
        content: 'Learn+ completely changed my attitude towards Mathematics. I went from failing grades to scoring 98/100 in my SSLC board exams! The teachers here are truly magicians.',
        rating: 5,
        featured: true,
        order: 1
      },
      {
        name: 'R. Balasubramanian',
        role: 'Parent of HSC Student',
        content: 'My son joined Learn+ for 12th standard Maths and Physics. The personalized attention and regular mock tests helped him clear his board exams with distinction. Worth every rupee!',
        rating: 5,
        featured: true,
        order: 2
      },
      {
        name: 'Ananya S.',
        role: 'HSC Student - 2024',
        content: 'The JEE foundation program at Learn+ gave me a huge advantage. The shortcut techniques and problem-solving strategies helped me crack both my HSC board and JEE Mains.',
        rating: 5,
        featured: true,
        order: 3
      },
      {
        name: 'M. Rajeshwari',
        role: 'Parent of Std 7 Student',
        content: 'My daughter used to struggle with basic math concepts. Now she actually enjoys solving problems! The bilingual teaching (Tamil + English) made such a difference.',
        rating: 5,
        featured: false,
        order: 4
      },
      {
        name: 'Karthik S.',
        role: 'CBSE Class 10 Student',
        content: 'I moved from CBSE to Samacheer and was worried about the transition. Learn+ made it seamless. I scored 95% in my board exams!',
        rating: 4,
        featured: false,
        order: 5
      }
    ]);
    console.log('Testimonials seeded');

    console.log('\nAll data seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seedData();
