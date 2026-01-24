/**
 * Content Migration Script
 * Migrates static data from db/ folder to Strapi CMS
 * 
 * Usage: npx ts-node scripts/migrate-content.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || '';

interface MigrationResult {
    contentType: string;
    created: number;
    failed: number;
    errors: string[];
}

async function strapiRequest(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' = 'POST',
    data?: unknown
): Promise<unknown> {
    const response = await fetch(`${STRAPI_URL}/api${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
        },
        body: data ? JSON.stringify({ data }) : undefined,
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Strapi API error: ${response.status} - ${error}`);
    }

    return response.json();
}

// Migrate Testimonials
async function migrateTestimonials(): Promise<MigrationResult> {
    const result: MigrationResult = { contentType: 'testimonials', created: 0, failed: 0, errors: [] };

    try {
        // Dynamic import to handle TypeScript files
        const { testimonials } = await import('../clayworks-main/db/testimonial');

        for (const testimonial of testimonials) {
            try {
                await strapiRequest('/testimonials', 'POST', {
                    name: testimonial.name,
                    position: testimonial.position,
                    company: testimonial.company,
                    content: testimonial.content,
                    // Note: Avatar will need manual upload to media library
                    featured: false,
                    order: parseInt(testimonial.id) || 0,
                });
                result.created++;
                console.log(`✓ Created testimonial: ${testimonial.name}`);
            } catch (error) {
                result.failed++;
                result.errors.push(`Testimonial ${testimonial.name}: ${error}`);
            }
        }
    } catch (error) {
        result.errors.push(`Failed to load testimonials: ${error}`);
    }

    return result;
}

// Migrate Locations
async function migrateLocations(): Promise<MigrationResult> {
    const result: MigrationResult = { contentType: 'locations', created: 0, failed: 0, errors: [] };

    try {
        const { allLocationCards } = await import('../clayworks-main/db/locationCards');

        for (const location of allLocationCards) {
            try {
                await strapiRequest('/locations', 'POST', {
                    slug: location.slug,
                    name: location.title,
                    title: location.title,
                    address: location.address,
                    travelTime: location.travelTime,
                    distance: location.distance,
                    hasPowerBackup: location.hasPowerBackup ?? true,
                    featured: false,
                    order: 0,
                });
                result.created++;
                console.log(`✓ Created location: ${location.title}`);
            } catch (error) {
                result.failed++;
                result.errors.push(`Location ${location.title}: ${error}`);
            }
        }
    } catch (error) {
        result.errors.push(`Failed to load locations: ${error}`);
    }

    return result;
}

// Migrate Blog Posts
async function migrateBlogPosts(): Promise<MigrationResult> {
    const result: MigrationResult = { contentType: 'blog-posts', created: 0, failed: 0, errors: [] };

    try {
        const { blogPostsData } = await import('../clayworks-main/db/data');

        for (let i = 0; i < blogPostsData.length; i++) {
            const post = blogPostsData[i];
            try {
                await strapiRequest('/blog-posts', 'POST', {
                    title: post.title,
                    slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
                    excerpt: post.description,
                    author: post.author,
                    publishedAt: new Date().toISOString(),
                    featured: i < 3,
                });
                result.created++;
                console.log(`✓ Created blog post: ${post.title}`);
            } catch (error) {
                result.failed++;
                result.errors.push(`Blog post ${post.title}: ${error}`);
            }
        }
    } catch (error) {
        result.errors.push(`Failed to load blog posts: ${error}`);
    }

    return result;
}

// Migrate Case Studies
async function migrateCaseStudies(): Promise<MigrationResult> {
    const result: MigrationResult = { contentType: 'case-studies', created: 0, failed: 0, errors: [] };

    try {
        const { caseStudiesData } = await import('../clayworks-main/db/data');

        for (const caseStudy of caseStudiesData) {
            try {
                await strapiRequest('/case-studies', 'POST', {
                    companyName: caseStudy.companyName,
                    slug: caseStudy.id,
                    description: caseStudy.description,
                    linkText: caseStudy.linkText,
                    featured: false,
                    order: 0,
                });
                result.created++;
                console.log(`✓ Created case study: ${caseStudy.companyName}`);
            } catch (error) {
                result.failed++;
                result.errors.push(`Case study ${caseStudy.companyName}: ${error}`);
            }
        }
    } catch (error) {
        result.errors.push(`Failed to load case studies: ${error}`);
    }

    return result;
}

// Migrate Job Listings
async function migrateJobListings(): Promise<MigrationResult> {
    const result: MigrationResult = { contentType: 'job-listings', created: 0, failed: 0, errors: [] };

    try {
        const { jobListings } = await import('../clayworks-main/db/data');

        for (const job of jobListings) {
            try {
                await strapiRequest('/job-listings', 'POST', {
                    title: job.title,
                    slug: job.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    department: job.department,
                    location: job.location,
                    locationType: job.locationType,
                    description: job.description,
                    category: job.category,
                    type: job.type,
                    isActive: true,
                });
                result.created++;
                console.log(`✓ Created job listing: ${job.title}`);
            } catch (error) {
                result.failed++;
                result.errors.push(`Job ${job.title}: ${error}`);
            }
        }
    } catch (error) {
        result.errors.push(`Failed to load job listings: ${error}`);
    }

    return result;
}

// Migrate Team Members (Leaders)
async function migrateTeamMembers(): Promise<MigrationResult> {
    const result: MigrationResult = { contentType: 'team-members', created: 0, failed: 0, errors: [] };

    try {
        const { leaders } = await import('../clayworks-main/db/data');

        for (let i = 0; i < leaders.length; i++) {
            const leader = leaders[i];
            try {
                await strapiRequest('/team-members', 'POST', {
                    name: leader.name,
                    title: leader.title,
                    bio: leader.bio,
                    order: i,
                    featured: true,
                });
                result.created++;
                console.log(`✓ Created team member: ${leader.name}`);
            } catch (error) {
                result.failed++;
                result.errors.push(`Team member ${leader.name}: ${error}`);
            }
        }
    } catch (error) {
        result.errors.push(`Failed to load team members: ${error}`);
    }

    return result;
}

// Migrate FAQ Categories and FAQs
async function migrateFAQs(): Promise<MigrationResult> {
    const result: MigrationResult = { contentType: 'faqs', created: 0, failed: 0, errors: [] };

    try {
        const { faqCategories } = await import('../clayworks-main/db/data');

        for (const category of faqCategories) {
            // Create FAQ category first
            try {
                const categoryResponse = await strapiRequest('/faq-categories', 'POST', {
                    name: category.label,
                    slug: category.id,
                    order: 0,
                }) as { data: { id: number } };

                console.log(`✓ Created FAQ category: ${category.label}`);

                // Create FAQs for this category
                for (let i = 0; i < category.faqs.length; i++) {
                    const faq = category.faqs[i];
                    try {
                        await strapiRequest('/faqs', 'POST', {
                            question: faq.question,
                            answer: faq.answer,
                            category: categoryResponse.data.id,
                            order: i,
                        });
                        result.created++;
                        console.log(`  ✓ Created FAQ: ${faq.question.substring(0, 50)}...`);
                    } catch (error) {
                        result.failed++;
                        result.errors.push(`FAQ "${faq.question.substring(0, 30)}...": ${error}`);
                    }
                }
            } catch (error) {
                result.errors.push(`FAQ Category ${category.label}: ${error}`);
            }
        }
    } catch (error) {
        result.errors.push(`Failed to load FAQs: ${error}`);
    }

    return result;
}

// Create Hero Sections
async function createHeroSections(): Promise<MigrationResult> {
    const result: MigrationResult = { contentType: 'hero-sections', created: 0, failed: 0, errors: [] };

    const heroSections = [
        {
            page: 'home',
            title: 'Premium Coworking Spaces',
            subtitle: 'Ready-to-use workspaces and meeting rooms designed for focus, comfort, and collaboration.',
            layout: 'video',
            order: 0,
        },
        {
            page: 'about',
            badge: 'ABOUT US',
            title: 'Crafting the Future of Workspaces',
            description: 'We are a team of passionate professionals who are dedicated to providing the best workspace solutions for our clients.',
            layout: 'image-right',
            order: 0,
        },
        {
            page: 'built-to-suit',
            badge: 'BUILT-TO-SUIT',
            title: 'Your Brand, Built from the Ground Up',
            description: 'Transform raw space into a custom office that reflects your culture, supports your workflows, and scales with your ambition.',
            layout: 'image-left',
            showForm: true,
            order: 0,
        },
        {
            page: 'day-pass',
            badge: 'DAY PASS',
            title: 'Work Anywhere, Anytime',
            description: 'Access professional, distraction-free workspaces designed for focus and flow.',
            layout: 'image-right',
            order: 0,
        },
        {
            page: 'private-office',
            badge: 'PRIVATE OFFICE',
            title: 'Your Own Private Workspace',
            description: 'Fully-managed private suites offering security, privacy, and all the perks of a premium workspace.',
            layout: 'image-left',
            order: 0,
        },
    ];

    for (const hero of heroSections) {
        try {
            await strapiRequest('/hero-sections', 'POST', hero);
            result.created++;
            console.log(`✓ Created hero section: ${hero.page}`);
        } catch (error) {
            result.failed++;
            result.errors.push(`Hero ${hero.page}: ${error}`);
        }
    }

    return result;
}

// Main migration function
async function runMigration() {
    console.log('╔══════════════════════════════════════════════════════╗');
    console.log('║     ClayWorks Content Migration to Strapi            ║');
    console.log('╚══════════════════════════════════════════════════════╝\n');

    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`API Token: ${STRAPI_TOKEN ? '✓ Configured' : '✗ Not set (using public API)'}\n`);

    const results: MigrationResult[] = [];

    // Run migrations
    console.log('📦 Migrating Hero Sections...');
    results.push(await createHeroSections());

    console.log('\n📦 Migrating Locations...');
    results.push(await migrateLocations());

    console.log('\n📦 Migrating Testimonials...');
    results.push(await migrateTestimonials());

    console.log('\n📦 Migrating Blog Posts...');
    results.push(await migrateBlogPosts());

    console.log('\n📦 Migrating Case Studies...');
    results.push(await migrateCaseStudies());

    console.log('\n📦 Migrating Job Listings...');
    results.push(await migrateJobListings());

    console.log('\n📦 Migrating Team Members...');
    results.push(await migrateTeamMembers());

    console.log('\n📦 Migrating FAQs...');
    results.push(await migrateFAQs());

    // Print summary
    console.log('\n╔══════════════════════════════════════════════════════╗');
    console.log('║                  Migration Summary                   ║');
    console.log('╚══════════════════════════════════════════════════════╝\n');

    let totalCreated = 0;
    let totalFailed = 0;

    for (const result of results) {
        console.log(`${result.contentType}:`);
        console.log(`  ✓ Created: ${result.created}`);
        console.log(`  ✗ Failed: ${result.failed}`);
        if (result.errors.length > 0) {
            console.log(`  Errors:`);
            result.errors.forEach(e => console.log(`    - ${e}`));
        }
        console.log('');
        totalCreated += result.created;
        totalFailed += result.failed;
    }

    console.log('────────────────────────────────────────────────────────');
    console.log(`Total Created: ${totalCreated}`);
    console.log(`Total Failed: ${totalFailed}`);
    console.log('────────────────────────────────────────────────────────');

    // Save report
    const reportPath = path.join(__dirname, 'migration-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({ timestamp: new Date().toISOString(), results }, null, 2));
    console.log(`\n📄 Report saved to: ${reportPath}`);

    if (totalFailed > 0) {
        console.log('\n⚠️  Some items failed to migrate. Check the errors above.');
        console.log('   You may need to:');
        console.log('   1. Create an API token in Strapi admin panel');
        console.log('   2. Set STRAPI_API_TOKEN environment variable');
        console.log('   3. Configure permissions for the API token');
    } else {
        console.log('\n✅ Migration completed successfully!');
    }
}

// Run the migration
runMigration().catch(console.error);
