/**
 * Strapi Content Type Creator
 * Creates content types using Strapi's Content-Type Builder API
 * 
 * Usage: node create-content-types.js
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'joydeeppaul9000@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@123';

let authToken = null;

async function login() {
    console.log('🔐 Logging in to Strapi admin...');

    const response = await fetch(`${STRAPI_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
        }),
    });

    if (!response.ok) {
        if (response.status === 429) {
            console.log('  ⏳ Rate limited, waiting 60s...');
            await new Promise(r => setTimeout(r, 60000));
            return login(); // Retry login
        }
        const error = await response.text();
        console.error('Login Error:', error);
        throw new Error(`Login failed: ${error}`);
    }

    const data = await response.json();
    authToken = data.data.token;
    console.log('✓ Logged in successfully\n');
    return authToken;
}

// Helper to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function createContentType(contentType) {
    const { displayName, singularName, pluralName, kind, draftAndPublish, attributes } = contentType;

    console.log(`📦 Creating: ${displayName}`);

    // Strapi Content-Type Builder API payload structure
    const payload = {
        contentType: {
            kind,
            collectionName: pluralName.replace(/-/g, '_'),
            displayName,   // Top-level, not in info
            singularName,  // Top-level
            pluralName,    // Top-level
            draftAndPublish, // Top-level options usually
            pluginOptions: {},
            attributes,
        },
    };

    const response = await fetch(`${STRAPI_URL}/content-type-builder/content-types`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorText = await response.text();
        try {
            const errorJson = JSON.parse(errorText);
            console.error(`  ✗ Failed: ${JSON.stringify(errorJson, null, 2)}`);
        } catch (e) {
            console.error(`  ✗ Failed: ${errorText}`);
        }

        // Ignore if already exists (status 400 and specific message)
        if (errorText.includes('already exists')) {
            console.log(`  (Model seems to already exist)`);
            return true;
        }
        return false;
    }

    console.log(`  ✓ Created: ${displayName}`);
    return true;
}

// Content Type Definitions
// Simplified to minimal required fields first to avoid validation errors
const contentTypes = [
    {
        displayName: 'Location',
        singularName: 'location',
        pluralName: 'locations',
        kind: 'collectionType',
        draftAndPublish: true,
        attributes: {
            name: { type: 'string', required: true },
            slug: { type: 'uid', targetField: 'name', required: true },
            address: { type: 'text', required: true },
            travelTime: { type: 'string' },
            distance: { type: 'string' },
            hasPowerBackup: { type: 'boolean', default: true },
            seats: { type: 'integer' },
            featured: { type: 'boolean', default: false },
            featuredImage: { type: 'media', allowedTypes: ['images'], multiple: false },
            order: { type: 'integer', default: 0 },
        },
    },
    {
        displayName: 'Testimonial',
        singularName: 'testimonial',
        pluralName: 'testimonials',
        kind: 'collectionType',
        draftAndPublish: true,
        attributes: {
            name: { type: 'string', required: true },
            position: { type: 'string' },
            company: { type: 'string' },
            content: { type: 'text', required: true },
            avatar: { type: 'media', allowedTypes: ['images'], multiple: false },
            rating: { type: 'integer', min: 1, max: 5 },
            featured: { type: 'boolean', default: false },
            order: { type: 'integer', default: 0 },
        },
    },
    {
        displayName: 'Blog Post',
        singularName: 'blog-post',
        pluralName: 'blog-posts',
        kind: 'collectionType',
        draftAndPublish: true,
        attributes: {
            title: { type: 'string', required: true },
            slug: { type: 'uid', targetField: 'title', required: true },
            excerpt: { type: 'text' },
            content: { type: 'richtext' },
            featuredImage: { type: 'media', allowedTypes: ['images'], multiple: false },
            author: { type: 'string' },
            publishedAt: { type: 'datetime' },
            featured: { type: 'boolean', default: false },
            metaTitle: { type: 'string' },
            metaDescription: { type: 'text' },
        },
    },
    {
        displayName: 'Case Study',
        singularName: 'case-study',
        pluralName: 'case-studies',
        kind: 'collectionType',
        draftAndPublish: true,
        attributes: {
            companyName: { type: 'string', required: true },
            slug: { type: 'uid', targetField: 'companyName', required: true },
            description: { type: 'text', required: true },
            fullContent: { type: 'richtext' },
            linkText: { type: 'string' },
            featuredImage: { type: 'media', allowedTypes: ['images'], multiple: false },
            featured: { type: 'boolean', default: false },
            order: { type: 'integer', default: 0 },
        },
    },
    {
        displayName: 'FAQ',
        singularName: 'faq',
        pluralName: 'faqs',
        kind: 'collectionType',
        draftAndPublish: true,
        attributes: {
            question: { type: 'text', required: true },
            answer: { type: 'richtext', required: true },
            category: { type: 'string' },
            order: { type: 'integer', default: 0 },
        },
    },
    {
        displayName: 'Job Listing',
        singularName: 'job-listing',
        pluralName: 'job-listings',
        kind: 'collectionType',
        draftAndPublish: true,
        attributes: {
            title: { type: 'string', required: true },
            slug: { type: 'uid', targetField: 'title', required: true },
            department: { type: 'string', required: true },
            location: { type: 'string', required: true },
            locationType: { type: 'enumeration', enum: ['on-site', 'remote', 'hybrid'], default: 'on-site' },
            description: { type: 'text', required: true },
            fullDescription: { type: 'richtext' },
            type: { type: 'enumeration', enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], default: 'Full-time' },
            isActive: { type: 'boolean', default: true },
        },
    },
    {
        displayName: 'Team Member',
        singularName: 'team-member',
        pluralName: 'team-members',
        kind: 'collectionType',
        draftAndPublish: true,
        attributes: {
            name: { type: 'string', required: true },
            title: { type: 'string', required: true },
            bio: { type: 'richtext' },
            image: { type: 'media', allowedTypes: ['images'], multiple: false },
            linkedIn: { type: 'string' },
            order: { type: 'integer', default: 0 },
            featured: { type: 'boolean', default: false },
        },
    },
    {
        displayName: 'Hero Section',
        singularName: 'hero-section',
        pluralName: 'hero-sections',
        kind: 'collectionType',
        draftAndPublish: true,
        attributes: {
            title: { type: 'string', required: true },
            subtitle: { type: 'text' },
            badge: { type: 'string' },
            description: { type: 'text' },
            videoUrl: { type: 'string' },
            backgroundImage: { type: 'media', allowedTypes: ['images', 'videos'], multiple: false },
            ctaText: { type: 'string' },
            ctaLink: { type: 'string' },
            page: { type: 'enumeration', enum: ['home', 'about', 'day-pass', 'meeting-rooms', 'built-to-suit', 'private-office', 'virtual-office', 'careers', 'contact'], required: true },
            layout: { type: 'enumeration', enum: ['video', 'image-left', 'image-right', 'centered'], default: 'video' },
            showForm: { type: 'boolean', default: false },
            order: { type: 'integer', default: 0 },
        },
    },
];

async function main() {
    console.log('╔══════════════════════════════════════════════════════╗');
    console.log('║      ClayWorks Strapi Content Type Creator           ║');
    console.log('╚══════════════════════════════════════════════════════╝\n');

    try {
        await login();

        let created = 0;
        let failed = 0;

        for (const contentType of contentTypes) {
            // Strapi needs time to reload after content type creation
            // Wait for Strapi to come back up before next request
            if (created > 0 || failed > 0) {
                console.log('  ⏳ Waiting for Strapi to restart (autoReload)...');
                // Wait 10 seconds for Strapi to restart
                await delay(10000);

                // Verify it's up by hitting health check or trying to login again silently to wait
                let isUp = false;
                while (!isUp) {
                    try {
                        // Using admin/init as a health check
                        const res = await fetch(`${STRAPI_URL}/admin/init`, { signal: AbortSignal.timeout(2000) });
                        if (res.ok) isUp = true;
                        else await delay(2000);
                    } catch (e) {
                        process.stdout.write('.');
                        await delay(2000);
                    }
                }
                console.log('\n  ✓ Strapi is back up');
            }

            const success = await createContentType(contentType);
            if (success) {
                created++;
            } else {
                failed++;
            }
        }

        console.log('\n════════════════════════════════════════════════════════');
        console.log(`✅ Created: ${created}`);
        console.log(`❌ Failed: ${failed}`);
        console.log('════════════════════════════════════════════════════════');

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

main();
