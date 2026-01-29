/**
 * Seed Products Script - JavaScript Version
 * 
 * Run with: node scripts/seedProductsSimple.js
 * 
 * This script populates Firestore with 30 sample beauty products
 * across 4 categories: Hair, Nails, Makeup, and Skincare.
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs } = require('firebase/firestore');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

// Load environment variables
require('dotenv').config();

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Sample products data
const products = [
  // Hair Products (8 products)
  {
    name: 'Silk Protein Hair Serum',
    description: 'Luxurious serum enriched with silk proteins to smooth and strengthen hair. Eliminates frizz and adds brilliant shine. Perfect for all hair types.',
    price: 29.99,
    imageUrls: ['https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400'],
    category: 'Hair',
    stockQuantity: 45,
    averageRating: 4.7,
    reviewCount: 89,
  },
  {
    name: 'Deep Moisture Conditioner',
    description: 'Ultra-hydrating conditioner with argan oil and shea butter. Restores moisture to dry, damaged hair. Leave-in formula for maximum nourishment.',
    price: 24.99,
    imageUrls: ['https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400'],
    category: 'Hair',
    stockQuantity: 67,
    averageRating: 4.5,
    reviewCount: 112,
  },
  {
    name: 'Curl Definition Cream',
    description: 'Define and enhance natural curls without crunch. Provides long-lasting hold and moisture. Reduces frizz for smooth, bouncy curls.',
    price: 19.99,
    imageUrls: ['https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400'],
    category: 'Hair',
    stockQuantity: 52,
    averageRating: 4.8,
    reviewCount: 156,
  },
  {
    name: 'Heat Protection Spray',
    description: 'Shield your hair from heat styling damage up to 450°F. Lightweight formula adds shine and reduces breakage. Essential for healthy styling.',
    price: 16.99,
    imageUrls: ['https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400'],
    category: 'Hair',
    stockQuantity: 89,
    averageRating: 4.6,
    reviewCount: 203,
  },
  {
    name: 'Color-Safe Shampoo',
    description: 'Gentle sulfate-free formula preserves hair color while cleansing. Infused with UV protection and antioxidants. Keeps color vibrant for weeks.',
    price: 22.99,
    imageUrls: ['https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400'],
    category: 'Hair',
    stockQuantity: 73,
    averageRating: 4.4,
    reviewCount: 97,
  },
  {
    name: 'Volumizing Root Lift Spray',
    description: 'Boost volume at the roots with this weightless lifting spray. Creates long-lasting body and fullness. Perfect for fine, flat hair.',
    price: 18.99,
    imageUrls: ['https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400'],
    category: 'Hair',
    stockQuantity: 61,
    averageRating: 4.3,
    reviewCount: 78,
  },
  {
    name: 'Scalp Treatment Oil',
    description: 'Nourishing blend of essential oils promotes healthy scalp and hair growth. Reduces dandruff and irritation. Massage in for best results.',
    price: 27.99,
    imageUrls: ['https://images.unsplash.com/photo-1595475207225-428b7973e2e3?w=400'],
    category: 'Hair',
    stockQuantity: 38,
    averageRating: 4.9,
    reviewCount: 145,
  },
  {
    name: 'Professional Hair Dryer',
    description: 'Salon-quality ionic hair dryer with multiple heat and speed settings. Reduces drying time by 50%. Includes concentrator and diffuser attachments.',
    price: 89.99,
    imageUrls: ['https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400'],
    category: 'Hair',
    stockQuantity: 24,
    averageRating: 4.8,
    reviewCount: 67,
  },

  // Nail Products (8 products)
  {
    name: 'Gel Polish - Ruby Red',
    description: 'Long-lasting gel polish in a stunning ruby red shade. Chip-resistant formula lasts up to 3 weeks. LED/UV curable with high-shine finish.',
    price: 12.99,
    imageUrls: ['https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400'],
    category: 'Nails',
    stockQuantity: 95,
    averageRating: 4.6,
    reviewCount: 234,
  },
  {
    name: 'Nail Strengthener Treatment',
    description: 'Repair and strengthen weak, brittle nails. Enriched with keratin and calcium. Visible results in 2 weeks with daily application.',
    price: 15.99,
    imageUrls: ['https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400'],
    category: 'Nails',
    stockQuantity: 78,
    averageRating: 4.7,
    reviewCount: 189,
  },
  {
    name: 'Cuticle Oil Treatment',
    description: 'Nourishing oil blend hydrates cuticles and promotes healthy nail growth. Sweet almond and vitamin E formula. Perfect for daily use.',
    price: 9.99,
    imageUrls: ['https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400'],
    category: 'Nails',
    stockQuantity: 102,
    averageRating: 4.5,
    reviewCount: 156,
  },
  {
    name: 'Base Coat Pro',
    description: 'Professional-grade base coat creates smooth surface for perfect polish application. Prevents staining and extends wear time. Quick-dry formula.',
    price: 11.99,
    imageUrls: ['https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=400'],
    category: 'Nails',
    stockQuantity: 87,
    averageRating: 4.4,
    reviewCount: 98,
  },
  {
    name: 'Matte Top Coat',
    description: 'Transform any polish into a trendy matte finish. Fast-drying formula seals and protects. No-shine, velvety texture lasts for days.',
    price: 10.99,
    imageUrls: ['https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400'],
    category: 'Nails',
    stockQuantity: 93,
    averageRating: 4.6,
    reviewCount: 187,
  },
  {
    name: 'Nail Art Kit - Glitter Edition',
    description: 'Complete nail art kit with 12 glitter colors, brushes, and gems. Create stunning designs at home. Professional results made easy.',
    price: 24.99,
    imageUrls: ['https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400'],
    category: 'Nails',
    stockQuantity: 56,
    averageRating: 4.8,
    reviewCount: 145,
  },
  {
    name: 'Acetone-Free Remover',
    description: 'Gentle yet effective nail polish remover without harsh acetone. Enriched with vitamin E and aloe. Will not dry out nails or cuticles.',
    price: 8.99,
    imageUrls: ['https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400'],
    category: 'Nails',
    stockQuantity: 112,
    averageRating: 4.3,
    reviewCount: 203,
  },
  {
    name: 'LED Nail Lamp',
    description: 'Professional LED lamp cures gel polish in 60 seconds. Four timer settings and automatic sensor. Compact design perfect for home use.',
    price: 45.99,
    imageUrls: ['https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400'],
    category: 'Nails',
    stockQuantity: 34,
    averageRating: 4.9,
    reviewCount: 167,
  },

  // Makeup Products (8 products)
  {
    name: 'Matte Liquid Lipstick - Rose',
    description: 'Long-wearing liquid lipstick with velvety matte finish. Highly pigmented, transfer-proof formula. Comfortable wear for up to 12 hours.',
    price: 16.99,
    imageUrls: ['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400'],
    category: 'Makeup',
    stockQuantity: 84,
    averageRating: 4.7,
    reviewCount: 298,
  },
  {
    name: 'HD Foundation - Medium',
    description: 'Flawless coverage with a natural finish. Buildable formula from light to full coverage. Oil-free, long-lasting, and perfect for all skin types.',
    price: 34.99,
    imageUrls: ['https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=400'],
    category: 'Makeup',
    stockQuantity: 67,
    averageRating: 4.5,
    reviewCount: 412,
  },
  {
    name: 'Waterproof Mascara',
    description: 'Volumizing and lengthening mascara resists water, sweat, and humidity. Clump-free application with easy removal. Lasts all day without flaking.',
    price: 19.99,
    imageUrls: ['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400'],
    category: 'Makeup',
    stockQuantity: 91,
    averageRating: 4.6,
    reviewCount: 267,
  },
  {
    name: 'Eyeshadow Palette - Nude Collection',
    description: '12-shade eyeshadow palette with matte and shimmer finishes. Highly blendable, richly pigmented. Create endless day and night looks.',
    price: 42.99,
    imageUrls: ['https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400'],
    category: 'Makeup',
    stockQuantity: 48,
    averageRating: 4.8,
    reviewCount: 356,
  },
  {
    name: 'Contour & Highlight Kit',
    description: 'Professional contour and highlight duo. Cream-to-powder formula blends seamlessly. Sculpt and illuminate for a flawless finish.',
    price: 28.99,
    imageUrls: ['https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=400'],
    category: 'Makeup',
    stockQuantity: 59,
    averageRating: 4.7,
    reviewCount: 189,
  },
  {
    name: 'Setting Spray - All Day',
    description: 'Lock makeup in place for up to 16 hours. Lightweight, refreshing mist prevents fading and creasing. Suitable for all skin types.',
    price: 22.99,
    imageUrls: ['https://images.unsplash.com/photo-1583241800698-eeaa6ea95280?w=400'],
    category: 'Makeup',
    stockQuantity: 76,
    averageRating: 4.5,
    reviewCount: 234,
  },
  {
    name: 'Brow Pomade - Dark Brown',
    description: 'Waterproof brow pomade creates natural-looking, defined brows. Long-wearing formula resists smudging. Includes angled brush.',
    price: 18.99,
    imageUrls: ['https://images.unsplash.com/photo-1614252368533-c4de6defce45?w=400'],
    category: 'Makeup',
    stockQuantity: 82,
    averageRating: 4.6,
    reviewCount: 176,
  },
  {
    name: 'Makeup Brush Set - 10 Piece',
    description: 'Professional makeup brush set with synthetic bristles. Includes face and eye brushes with carrying case. Cruelty-free and easy to clean.',
    price: 49.99,
    imageUrls: ['https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=400'],
    category: 'Makeup',
    stockQuantity: 41,
    averageRating: 4.9,
    reviewCount: 203,
  },

  // Skincare Products (6 products)
  {
    name: 'Vitamin C Serum',
    description: 'Brightening serum with 20% vitamin C fights dark spots and uneven tone. Powerful antioxidants protect against environmental damage. Visible results in 4 weeks.',
    price: 38.99,
    imageUrls: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400'],
    category: 'Skincare',
    stockQuantity: 63,
    averageRating: 4.8,
    reviewCount: 487,
  },
  {
    name: 'Hyaluronic Acid Moisturizer',
    description: 'Intense hydration with hyaluronic acid and ceramides. Plumps and smooths skin while locking in moisture. Suitable for all skin types.',
    price: 32.99,
    imageUrls: ['https://images.unsplash.com/photo-1556229010-aa3ca8c56f8a?w=400'],
    category: 'Skincare',
    stockQuantity: 78,
    averageRating: 4.7,
    reviewCount: 392,
  },
  {
    name: 'Gentle Foaming Cleanser',
    description: 'Soap-free cleanser removes makeup and impurities without stripping skin. pH-balanced formula with soothing aloe. Perfect for sensitive skin.',
    price: 24.99,
    imageUrls: ['https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400'],
    category: 'Skincare',
    stockQuantity: 92,
    averageRating: 4.6,
    reviewCount: 267,
  },
  {
    name: 'Anti-Aging Night Cream',
    description: 'Rich night cream with retinol and peptides reduces fine lines and wrinkles. Firms and rejuvenates skin while you sleep. Wake up to smoother skin.',
    price: 54.99,
    imageUrls: ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400'],
    category: 'Skincare',
    stockQuantity: 47,
    averageRating: 4.9,
    reviewCount: 412,
  },
  {
    name: 'Sunscreen SPF 50',
    description: 'Broad-spectrum protection against UVA/UVB rays. Lightweight, non-greasy formula absorbs quickly. Water-resistant for 80 minutes.',
    price: 26.99,
    imageUrls: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400'],
    category: 'Skincare',
    stockQuantity: 85,
    averageRating: 4.5,
    reviewCount: 298,
  },
  {
    name: 'Clay Face Mask - Detox',
    description: 'Purifying clay mask draws out impurities and excess oil. Minimizes pores and improves skin texture. Use 2-3 times weekly for best results.',
    price: 21.99,
    imageUrls: ['https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400'],
    category: 'Skincare',
    stockQuantity: 71,
    averageRating: 4.7,
    reviewCount: 234,
  },
];

async function seedProducts() {
  console.log('🌱 Starting product seeding...\n');

  try {
    // First, authenticate as an admin user
    console.log('🔐 Authenticating...');
    const email = process.env.SEED_ADMIN_EMAIL || 'admin@glamgo.com';
    const password = process.env.SEED_ADMIN_PASSWORD || 'admin123';
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Authenticated successfully!\n');
    } catch (authError) {
      console.log('⚠️  Could not authenticate. Make sure you have an admin user or update Firestore rules.');
      console.log('   Email:', email);
      console.log('   Error:', authError.message);
      console.log('\n   Continuing without authentication...\n');
    }

    // Check if products already exist
    const productsRef = collection(db, 'products');
    const existingProducts = await getDocs(productsRef);
    
    if (!existingProducts.empty) {
      console.log(`⚠️  Found ${existingProducts.size} existing products.`);
      console.log('   Do you want to add more products or skip? (This script will add new products)\n');
    }

    // Add vendor info to each product
    const vendorNames = ['Beauty Co.', 'GLAMGO Store', 'Elite Beauty', 'Luxe Cosmetics', 'Beauty Haven'];
    
    let addedCount = 0;
    for (const product of products) {
      const productData = {
        ...product,
        vendorId: 'seed-vendor-1', // Placeholder vendor ID
        vendorName: vendorNames[Math.floor(Math.random() * vendorNames.length)],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await addDoc(productsRef, productData);
      addedCount++;
      console.log(`✅ Added: ${product.name} ($${product.price}) - ${product.category}`);
    }

    console.log(`\n🎉 Successfully seeded ${addedCount} products to Firestore!`);
    console.log('\nBreakdown by category:');
    console.log('  - Hair: 8 products');
    console.log('  - Nails: 8 products');
    console.log('  - Makeup: 8 products');
    console.log('  - Skincare: 6 products');
    console.log('\n✨ Total: 30 products ready for testing!\n');

  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }

  process.exit(0);
}

// Run the seed function
seedProducts();
