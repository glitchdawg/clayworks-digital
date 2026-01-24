const endpoints = [
    'hero-sections',
    'locations',
    'testimonials',
    'blog-posts',
    'case-studies',
    'faqs',
    'job-listings',
    'team-members',
    'partners',
    'site-settings', // Single type might be different: /api/site-settings
    'navigation'     // Single type
];

const BASE = 'http://localhost:1337/api';

async function check() {
    console.log('Checking endpoints...');
    for (const ep of endpoints) {
        try {
            const res = await fetch(`${BASE}/${ep}`);
            console.log(`${ep}: ${res.status} ${res.statusText}`);
        } catch (e) {
            console.log(`${ep}: ERROR ${e.message}`);
        }
    }
}

check();
