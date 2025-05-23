// seedCategories.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI1;

const categories = [
  { name: 'Events', slug: 'event', description: 'Event related banners' },
  { name: 'Business', slug: 'business', description: 'Business promotions' },
  { name: 'Festivals', slug: 'festival', description: 'Festival-related promotions' },
];

async function seedCategories() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const existing = await Category.find({});
    if (existing.length > 0) {
      console.log('Categories already exist. Skipping...');
      process.exit();
    }

    await Category.insertMany(categories);
    console.log('Categories seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
}

seedCategories();
