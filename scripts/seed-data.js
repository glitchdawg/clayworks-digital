/**
 * Simple Strapi Seed Script
 * 
 * This script seeds sample data into Strapi after content types are created.
 * 
 * PREREQUISITE: Create content types in Strapi Admin (http://localhost:1337/admin)
 * using the Content-Type Builder first!
 * 
 * Usage: node seed-data.js
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || '';

async function strapiCreate(endpoint, data) {
    try {
        const response = await fetch(`${STRAPI_URL}/api${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
            },
            body: JSON.stringify({ data }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error(`  ✗ Failed: ${error}`);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error(`  ✗ Error: ${error.message}`);
        return null;
    }
}

// Sample data - customize as needed
const sampleLocations = [
    {
        name: 'Indiranagar',
        slug: 'indiranagar',
        address: '100 Feet Road, Indiranagar, Bangalore',
        hasPowerBackup: true,
        featured: true,
    },
    {
        name: 'Koramangala',
        slug: 'koramangala',
        address: '5th Block, Koramangala, Bangalore',
        hasPowerBackup: true,
        featured: true,
    },
    {
        name: 'Whitefield',
        slug: 'whitefield',
        address: 'ITPL Main Road, Whitefield, Bangalore',
        hasPowerBackup: true,
        featured: false,
    },
];

const sampleTestimonials = [
    {
        name: 'Rahul Sharma',
        position: 'CTO',
        company: 'TechStart Inc.',
        content: 'ClayWorks provided the perfect workspace for our growing team. The amenities and community have been exceptional.',
        featured: true,
    },
    {
        name: 'Priya Patel',
        position: 'Founder',
        company: 'Design Studio',
        content: 'The flexibility and professional environment helped us scale our business without the overhead of traditional offices.',
        featured: true,
    },
];

const sampleBlogPosts = [
    {
        title: 'The Future of Hybrid Work',
        slug: 'future-of-hybrid-work',
        excerpt: 'Exploring how flexible workspaces are reshaping the modern workplace.',
        author: 'ClayWorks Team',
        featured: true,
    },
    {
        title: 'Productivity Tips for Remote Workers',
        slug: 'productivity-tips-remote-workers',
        excerpt: 'Essential strategies to stay focused and efficient while working from anywhere.',
        author: 'ClayWorks Team',
        featured: false,
    },
];

async function seedData() {
    console.log('╔══════════════════════════════════════════════════════╗');
    console.log('║           ClayWorks Strapi Data Seeder               ║');
    console.log('╚══════════════════════════════════════════════════════╝\n');

    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`API Token: ${STRAPI_TOKEN ? '✓ Set' : '✗ Not set'}\n`);

    // Seed Locations
    console.log('📍 Seeding Locations...');
    for (const location of sampleLocations) {
        const result = await strapiCreate('/locations', location);
        if (result) {
            console.log(`  ✓ Created: ${location.name}`);
        }
    }

    // Seed Testimonials
    console.log('\n💬 Seeding Testimonials...');
    for (const testimonial of sampleTestimonials) {
        const result = await strapiCreate('/testimonials', testimonial);
        if (result) {
            console.log(`  ✓ Created: ${testimonial.name}`);
        }
    }

    // Seed Blog Posts
    console.log('\n📝 Seeding Blog Posts...');
    for (const post of sampleBlogPosts) {
        const result = await strapiCreate('/blog-posts', post);
        if (result) {
            console.log(`  ✓ Created: ${post.title}`);
        }
    }

    console.log('\n✅ Seeding complete!');
    console.log('\n⚠️  Note: This only works AFTER you create the content types in Strapi Admin.');
    console.log('   Go to http://localhost:1337/admin → Content-Type Builder to create them.');
}

seedData().catch(console.error);
