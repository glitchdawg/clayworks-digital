/**
 * Strapi Content Type Verifier
 * Checks if deployed Strapi instance has expected content types
 */

const STRAPI_URL = 'http://localhost:1337';

async function main() {
    console.log('🔍 Checking Strapi Content Types...');

    try {
        // We don't need auth to list public info usually, but for content types schema we do need admin access or look at /api/content-type-builder/content-types
        // Using the same credentials as before
        const loginRes = await fetch(`${STRAPI_URL}/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'joydeeppaul9000@gmail.com',
                password: 'Admin@123',
            }),
        });

        if (!loginRes.ok) {
            throw new Error('Login failed');
        }

        const { data: { token } } = await loginRes.json();

        const res = await fetch(`${STRAPI_URL}/content-type-builder/content-types`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const { data } = await res.json();

        const expectedTypes = [
            'api::location.location',
            'api::testimonial.testimonial',
            'api::blog-post.blog-post',
            'api::case-study.case-study',
            'api::faq.faq',
            'api::job-listing.job-listing',
            'api::team-member.team-member',
            'api::partner.partner',
            'api::hero-section.hero-section',
            'api::site-settings.site-settings',
            'api::navigation.navigation'
        ];

        let foundCount = 0;
        console.log('\nFound Content Types:');

        const foundUIDs = data.map(t => t.uid);

        expectedTypes.forEach(uid => {
            if (foundUIDs.includes(uid)) {
                console.log(` ✅ ${uid}`);
                foundCount++;
            } else {
                console.log(` ❌ ${uid} (Missing)`);
            }
        });

        console.log(`\nTotal Found: ${foundCount} / ${expectedTypes.length}`);

        if (foundCount === expectedTypes.length) {
            console.log('\n✨ All content types verified successfully!');
        } else {
            console.log('\n⚠️  Some content types are missing.');
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();
