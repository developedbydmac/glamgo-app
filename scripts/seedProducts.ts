/**
 * Seed Products Script
 * 
 * This script generates 30 sample beauty products and seeds them into Firestore.
 * Run this once to populate the database with test data for development.
 * 
 * Usage:
 *   npx ts-node scripts/seedProducts.ts
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { ProductCategory } from '../src/features/products/domain/entities/ProductCategory';

// Firebase configuration (same as in firebase.config.ts)
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

// Sample product data
const sampleProducts = [
  // Hair Products (8 products)
  {
    name: 'Silk Protein Hair Serum',
    description: 'Lightweight serum infused with silk proteins to smooth frizz, add shine, and protect hair from heat damage. Perfect for all hair types.',
    price: 29.99,
    category: ProductCategory.HAIR,
    imageUrls: ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500'],
    stockQuantity: 45,
    brand: 'GLAMGO Beauty',
    weight: 4,
    isFeatured: true,
  },
  {
    name: 'Deep Moisture Conditioner',
    description: 'Rich, creamy conditioner with argan oil and shea butter. Deeply nourishes and repairs damaged hair, leaving it soft and manageable.',
    price: 24.99,
    category: ProductCategory.HAIR,
    imageUrls: ['https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500'],
    stockQuantity: 60,
    brand: 'Luxe Hair Care',
    weight: 8,
  },
  {
    name: 'Curl Definition Cream',
    description: 'Define and enhance your natural curls with this moisturizing cream. Controls frizz while adding bounce and shine to curly and wavy hair.',
    price: 22.99,
    category: ProductCategory.HAIR,
    imageUrls: ['https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500'],
    stockQuantity: 35,
    brand: 'Curl Queen',
    weight: 6,
  },
  {
    name: 'Heat Protection Spray',
    description: 'Shield your hair from heat styling tools with this lightweight protective spray. Contains vitamin E and offers up to 450°F heat protection.',
    price: 18.99,
    category: ProductCategory.HAIR,
    imageUrls: ['https://images.unsplash.com/photo-1571875257727-256c39da42af?w=500'],
    stockQuantity: 50,
    brand: 'Style Guard',
    weight: 5,
    isFeatured: true,
  },
  {
    name: 'Volumizing Mousse',
    description: 'Create full, voluminous hair with long-lasting hold. This lightweight mousse adds body without weighing hair down or leaving residue.',
    price: 19.99,
    category: ProductCategory.HAIR,
    imageUrls: ['https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500'],
    stockQuantity: 40,
    brand: 'Volume Up',
    weight: 7,
  },
  {
    name: 'Hydrating Hair Mask',
    description: 'Intensive weekly treatment that restores moisture and repairs damage. Enriched with coconut oil and keratin for silky, healthy hair.',
    price: 32.99,
    category: ProductCategory.HAIR,
    imageUrls: ['https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=500'],
    stockQuantity: 28,
    brand: 'Deep Repair Pro',
    weight: 10,
  },
  {
    name: 'Color Protect Shampoo',
    description: 'Gentle sulfate-free shampoo specially formulated for color-treated hair. Extends color vibrancy and prevents fading with UV protection.',
    price: 26.99,
    category: ProductCategory.HAIR,
    imageUrls: ['https://images.unsplash.com/photo-1585838108990-1e5e17e4b2d9?w=500'],
    stockQuantity: 55,
    brand: 'ColorGuard',
    weight: 12,
  },
  {
    name: 'Scalp Treatment Oil',
    description: 'Nourishing blend of tea tree, peppermint, and jojoba oils. Soothes dry scalp, promotes healthy hair growth, and adds natural shine.',
    price: 21.99,
    category: ProductCategory.HAIR,
    imageUrls: ['https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500'],
    stockQuantity: 32,
    brand: 'Scalp Health',
    weight: 3,
  },

  // Nail Products (8 products)
  {
    name: 'Gel Polish - Ruby Red',
    description: 'Long-lasting gel nail polish with brilliant shine. Chip-resistant formula lasts up to 2 weeks. No UV lamp required for application.',
    price: 14.99,
    category: ProductCategory.NAILS,
    imageUrls: ['https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=500'],
    stockQuantity: 80,
    brand: 'Gel Luxe',
    weight: 0.5,
    isFeatured: true,
  },
  {
    name: 'Nail Strengthener',
    description: 'Professional-grade treatment that repairs weak, brittle nails. Contains calcium and keratin to promote nail growth and prevent breaking.',
    price: 16.99,
    category: ProductCategory.NAILS,
    imageUrls: ['https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500'],
    stockQuantity: 45,
    brand: 'Strong Nails Pro',
    weight: 0.5,
  },
  {
    name: 'Cuticle Oil Treatment',
    description: 'Nourishing cuticle oil with vitamin E and almond oil. Softens cuticles, promotes healthy nail growth, and adds natural shine.',
    price: 12.99,
    category: ProductCategory.NAILS,
    imageUrls: ['https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=500'],
    stockQuantity: 65,
    brand: 'Cuticle Care',
    weight: 0.3,
  },
  {
    name: 'Base Coat Pro',
    description: 'Professional base coat that protects nails and extends polish wear. Creates a smooth surface and prevents staining from colored polishes.',
    price: 11.99,
    category: ProductCategory.NAILS,
    imageUrls: ['https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=500'],
    stockQuantity: 70,
    brand: 'Polish Perfect',
    weight: 0.5,
  },
  {
    name: 'Top Coat - Ultra Shine',
    description: 'Quick-dry top coat with diamond shine finish. Seals and protects your manicure while adding brilliant gloss that lasts.',
    price: 11.99,
    category: ProductCategory.NAILS,
    imageUrls: ['https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=500'],
    stockQuantity: 70,
    brand: 'Polish Perfect',
    weight: 0.5,
    isFeatured: true,
  },
  {
    name: 'Gel Nail Polish Set',
    description: 'Complete gel polish collection with 6 trendy colors. Includes base coat, top coat, and nail prep. Salon-quality results at home.',
    price: 49.99,
    category: ProductCategory.NAILS,
    imageUrls: ['https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=500'],
    stockQuantity: 25,
    brand: 'Gel Luxe',
    weight: 3,
  },
  {
    name: 'Nail Polish Remover',
    description: 'Acetone-free formula that gently removes polish without drying nails. Enriched with aloe vera and vitamin E for nail care.',
    price: 8.99,
    category: ProductCategory.NAILS,
    imageUrls: ['https://images.unsplash.com/photo-1604654894706-ae39b07b2b22?w=500'],
    stockQuantity: 90,
    brand: 'Gentle Remove',
    weight: 8,
  },
  {
    name: 'Acrylic Nail Kit',
    description: 'Complete professional acrylic nail system. Includes powder, liquid, brush, and tips. Everything needed for salon-quality nail extensions.',
    price: 89.99,
    category: ProductCategory.NAILS,
    imageUrls: ['https://images.unsplash.com/photo-1610913965748-02e82529388f?w=500'],
    stockQuantity: 15,
    brand: 'Pro Nails',
    weight: 12,
  },

  // Makeup Products (8 products)
  {
    name: 'Matte Liquid Lipstick',
    description: 'Long-wearing liquid lipstick with velvety matte finish. Highly pigmented formula stays put for hours without drying lips.',
    price: 18.99,
    category: ProductCategory.MAKEUP,
    imageUrls: ['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500'],
    stockQuantity: 75,
    brand: 'GLAMGO Cosmetics',
    weight: 0.2,
    isFeatured: true,
  },
  {
    name: 'HD Foundation',
    description: 'Full-coverage liquid foundation with natural finish. Available in 24 shades. Lightweight formula provides all-day wear without caking.',
    price: 42.99,
    category: ProductCategory.MAKEUP,
    imageUrls: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500'],
    stockQuantity: 50,
    brand: 'Flawless Face',
    weight: 1,
    salePrice: 35.99,
  },
  {
    name: 'Waterproof Mascara',
    description: 'Smudge-proof, waterproof mascara that lengthens and volumizes lashes. Stays perfect through tears, sweat, and humidity.',
    price: 24.99,
    category: ProductCategory.MAKEUP,
    imageUrls: ['https://images.unsplash.com/photo-1631214524020-7e18db7f6f74?w=500'],
    stockQuantity: 65,
    brand: 'Lash Magic',
    weight: 0.3,
  },
  {
    name: 'Eyeshadow Palette',
    description: '12-color eyeshadow palette with matte and shimmer finishes. Highly pigmented, blendable shadows for endless eye looks.',
    price: 34.99,
    category: ProductCategory.MAKEUP,
    imageUrls: ['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500'],
    stockQuantity: 40,
    brand: 'Color Dreams',
    weight: 0.5,
    isFeatured: true,
  },
  {
    name: 'Cream Blush Stick',
    description: 'Multi-use cream blush for cheeks and lips. Buildable color with dewy finish. Easy to blend for a natural flush.',
    price: 16.99,
    category: ProductCategory.MAKEUP,
    imageUrls: ['https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=500'],
    stockQuantity: 55,
    brand: 'GLAMGO Cosmetics',
    weight: 0.3,
  },
  {
    name: 'Brow Pomade',
    description: 'Long-wearing brow pomade for defined, natural-looking brows. Waterproof formula stays put all day. Includes angled brush.',
    price: 19.99,
    category: ProductCategory.MAKEUP,
    imageUrls: ['https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=500'],
    stockQuantity: 48,
    brand: 'Perfect Brows',
    weight: 0.2,
  },
  {
    name: 'Setting Spray',
    description: 'Makeup setting spray that locks in your look for up to 16 hours. Lightweight mist keeps makeup fresh and prevents fading.',
    price: 22.99,
    category: ProductCategory.MAKEUP,
    imageUrls: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500'],
    stockQuantity: 60,
    brand: 'Stay Perfect',
    weight: 4,
  },
  {
    name: 'Highlighter Powder',
    description: 'Illuminating powder highlighter with ultra-fine shimmer. Adds a luminous glow to cheekbones, brow bones, and cupid\'s bow.',
    price: 26.99,
    category: ProductCategory.MAKEUP,
    imageUrls: ['https://images.unsplash.com/photo-1610913967649-2ad3d8186356?w=500'],
    stockQuantity: 42,
    brand: 'Glow Getter',
    weight: 0.4,
  },

  // Skincare Products (8 products)
  {
    name: 'Vitamin C Serum',
    description: 'Powerful antioxidant serum with 20% vitamin C. Brightens skin, evens tone, and reduces fine lines. Suitable for all skin types.',
    price: 38.99,
    category: ProductCategory.SKINCARE,
    imageUrls: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500'],
    stockQuantity: 55,
    brand: 'Radiant Skin',
    weight: 1,
    isFeatured: true,
  },
  {
    name: 'Hyaluronic Acid Moisturizer',
    description: 'Deeply hydrating face cream with hyaluronic acid and ceramides. Plumps skin and locks in moisture for 24-hour hydration.',
    price: 32.99,
    category: ProductCategory.SKINCARE,
    imageUrls: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500'],
    stockQuantity: 48,
    brand: 'Hydra Boost',
    weight: 2,
    salePrice: 28.99,
  },
  {
    name: 'Gentle Foaming Cleanser',
    description: 'pH-balanced gentle cleanser that removes makeup and impurities without stripping skin. Perfect for sensitive and combination skin.',
    price: 24.99,
    category: ProductCategory.SKINCARE,
    imageUrls: ['https://images.unsplash.com/photo-1556228852-80633f530f72?w=500'],
    stockQuantity: 70,
    brand: 'Pure Clean',
    weight: 6,
  },
  {
    name: 'Anti-Aging Night Cream',
    description: 'Rich night cream with retinol and peptides. Reduces wrinkles, firms skin, and promotes cell renewal while you sleep.',
    price: 45.99,
    category: ProductCategory.SKINCARE,
    imageUrls: ['https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500'],
    stockQuantity: 35,
    brand: 'Youth Restore',
    weight: 2,
    isFeatured: true,
  },
  {
    name: 'Daily SPF 50 Sunscreen',
    description: 'Broad-spectrum mineral sunscreen with SPF 50. Lightweight, non-greasy formula protects against UVA/UVB rays. No white cast.',
    price: 28.99,
    category: ProductCategory.SKINCARE,
    imageUrls: ['https://images.unsplash.com/photo-1556228994-43bc32f5c50b?w=500'],
    stockQuantity: 60,
    brand: 'Sun Shield',
    weight: 3,
  },
  {
    name: 'Exfoliating Face Scrub',
    description: 'Gentle physical exfoliator with jojoba beads and AHA. Removes dead skin cells, unclogs pores, and reveals smoother, brighter skin.',
    price: 22.99,
    category: ProductCategory.SKINCARE,
    imageUrls: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500'],
    stockQuantity: 50,
    brand: 'Smooth Skin',
    weight: 4,
  },
  {
    name: 'Eye Cream - Dark Circle Treatment',
    description: 'Targeted eye cream with caffeine and niacinamide. Reduces dark circles, puffiness, and fine lines around the delicate eye area.',
    price: 29.99,
    category: ProductCategory.SKINCARE,
    imageUrls: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500'],
    stockQuantity: 45,
    brand: 'Bright Eyes',
    weight: 0.5,
  },
  {
    name: 'Clay Purifying Mask',
    description: 'Detoxifying clay mask with charcoal and tea tree oil. Deep cleans pores, controls oil, and improves skin clarity. Use weekly.',
    price: 26.99,
    category: ProductCategory.SKINCARE,
    imageUrls: ['https://images.unsplash.com/photo-1608248543407-c3dc90d1806d?w=500'],
    stockQuantity: 40,
    brand: 'Pure Detox',
    weight: 4,
  },
];

/**
 * Seed products into Firestore
 */
async function seedProducts() {
  console.log('🌱 Starting product seeding...\n');

  const productsRef = collection(db, 'products');
  let successCount = 0;
  let errorCount = 0;

  for (const productData of sampleProducts) {
    try {
      // Create mock vendor data (replace with real vendor IDs later)
      const vendorId = `vendor_${Math.random().toString(36).substr(2, 9)}`;
      const vendorName = productData.brand || 'GLAMGO Vendor';

      // Generate mock ratings
      const averageRating = parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)); // 3.5 to 5.0
      const reviewCount = Math.floor(Math.random() * 50) + 5; // 5 to 55 reviews

      const docData = {
        ...productData,
        vendorId,
        vendorName,
        averageRating,
        reviewCount,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      await addDoc(productsRef, docData);
      successCount++;
      console.log(`✅ Added: ${productData.name} (${productData.category})`);
    } catch (error) {
      errorCount++;
      console.error(`❌ Failed to add: ${productData.name}`, error);
    }
  }

  console.log(`\n🎉 Seeding complete!`);
  console.log(`✅ Successfully added: ${successCount} products`);
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount} products`);
  }
  console.log(`\n💡 Total products in catalog: ${successCount}`);
}

// Run the seed function
seedProducts()
  .then(() => {
    console.log('\n✨ All done! Check your Firestore console to see the products.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Fatal error during seeding:', error);
    process.exit(1);
  });
