const fs = require('fs');
const path = require('path');

const API_DIR = path.join(__dirname, '../strapi/src/api');

// Content Type Definitions
const contentTypes = [
    {
        singularName: 'location',
        pluralName: 'locations',
        displayName: 'Location',
        kind: 'collectionType',
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
            gallery: { type: 'media', allowedTypes: ['images'], multiple: true },
            order: { type: 'integer', default: 0 },
        }
    },
    {
        singularName: 'testimonial',
        pluralName: 'testimonials',
        displayName: 'Testimonial',
        kind: 'collectionType',
        attributes: {
            name: { type: 'string', required: true },
            position: { type: 'string' },
            company: { type: 'string' },
            content: { type: 'text', required: true },
            avatar: { type: 'media', allowedTypes: ['images'], multiple: false },
            rating: { type: 'integer', min: 1, max: 5 },
            featured: { type: 'boolean', default: false },
            order: { type: 'integer', default: 0 },
        }
    },
    {
        singularName: 'blog-post',
        pluralName: 'blog-posts',
        displayName: 'Blog Post',
        kind: 'collectionType',
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
        }
    },
    {
        singularName: 'case-study',
        pluralName: 'case-studies',
        displayName: 'Case Study',
        kind: 'collectionType',
        attributes: {
            companyName: { type: 'string', required: true },
            slug: { type: 'uid', targetField: 'companyName', required: true },
            description: { type: 'text', required: true },
            fullContent: { type: 'richtext' },
            linkText: { type: 'string' },
            featuredImage: { type: 'media', allowedTypes: ['images'], multiple: false },
            featured: { type: 'boolean', default: false },
            order: { type: 'integer', default: 0 },
        }
    },
    {
        singularName: 'faq',
        pluralName: 'faqs',
        displayName: 'FAQ',
        kind: 'collectionType',
        attributes: {
            question: { type: 'text', required: true },
            answer: { type: 'richtext', required: true },
            category: { type: 'string' },
            order: { type: 'integer', default: 0 },
        }
    },
    {
        singularName: 'job-listing',
        pluralName: 'job-listings',
        displayName: 'Job Listing',
        kind: 'collectionType',
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
        }
    },
    {
        singularName: 'team-member',
        pluralName: 'team-members',
        displayName: 'Team Member',
        kind: 'collectionType',
        attributes: {
            name: { type: 'string', required: true },
            title: { type: 'string', required: true },
            bio: { type: 'richtext' },
            image: { type: 'media', allowedTypes: ['images'], multiple: false },
            linkedIn: { type: 'string' },
            order: { type: 'integer', default: 0 },
            featured: { type: 'boolean', default: false },
        }
    },
    {
        singularName: 'partner',
        pluralName: 'partners',
        displayName: 'Partner',
        kind: 'collectionType',
        attributes: {
            name: { type: 'string', required: true },
            website: { type: 'string' },
            logo: { type: 'media', allowedTypes: ['images'], multiple: false },
            order: { type: 'integer', default: 0 },
            featured: { type: 'boolean', default: false },
        }
    },
    {
        singularName: 'hero-section',
        pluralName: 'hero-sections',
        displayName: 'Hero Section',
        kind: 'collectionType',
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
        }
    },
    {
        singularName: 'site-settings',
        pluralName: 'site-settings',
        displayName: 'Site Settings',
        kind: 'singleType',
        attributes: {
            siteName: { type: 'string' },
            tagline: { type: 'string' },
            contactEmail: { type: 'email' },
            contactPhone: { type: 'string' },
        }
    },
    {
        singularName: 'navigation',
        pluralName: 'navigations',
        displayName: 'Navigation',
        kind: 'singleType',
        attributes: {
            headerItems: { type: 'json' },
            footerItems: { type: 'json' },
        }
    }
];

function createFolder(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function createFile(filePath, content) {
    fs.writeFileSync(filePath, content);
    console.log(`✓ Created ${filePath}`);
}

async function main() {
    console.log('Generatring Strapi Schema Files...');

    if (!fs.existsSync(API_DIR)) {
        createFolder(API_DIR);
    }

    for (const type of contentTypes) {
        const apiName = type.singularName; // Folder name usually matches singular name
        const apiPath = path.join(API_DIR, apiName);

        createFolder(apiPath);
        createFolder(path.join(apiPath, 'content-types'));
        createFolder(path.join(apiPath, 'content-types', apiName));
        createFolder(path.join(apiPath, 'controllers'));
        createFolder(path.join(apiPath, 'routes'));
        createFolder(path.join(apiPath, 'services'));

        // 1. Schema.json
        const schema = {
            kind: type.kind,
            collectionName: type.pluralName.replace(/-/g, '_'),
            info: {
                singularName: type.singularName,
                pluralName: type.pluralName,
                displayName: type.displayName,
                description: "",
            },
            options: {
                draftAndPublish: true,
            },
            pluginOptions: {},
            attributes: type.attributes,
        };

        createFile(
            path.join(apiPath, 'content-types', apiName, 'schema.json'),
            JSON.stringify(schema, null, 2)
        );

        // 2. Controller
        // Using TS as the project is TS
        const controllerContent = `/**
 * ${apiName} controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::${apiName}.${apiName}');
`;
        createFile(path.join(apiPath, 'controllers', `${apiName}.ts`), controllerContent);

        // 3. Service
        const serviceContent = `/**
 * ${apiName} service
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreService('api::${apiName}.${apiName}');
`;
        createFile(path.join(apiPath, 'services', `${apiName}.ts`), serviceContent);

        // 4. Routes
        const routesContent = `/**
 * ${apiName} router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::${apiName}.${apiName}');
`;
        createFile(path.join(apiPath, 'routes', `${apiName}.ts`), routesContent);
    }

    console.log('\nAll schema files generated successfully.');
    console.log('Rebuild Strapi Docker container to apply changes.');
}

main();
