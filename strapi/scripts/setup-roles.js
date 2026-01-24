const Strapi = require('@strapi/strapi');

/**
 * Setup Admin Roles Script
 * 
 * This script creates the following admin roles based on README.md specifications:
 * - Content Manager: Create, edit, publish content. No settings access.
 * - Content Editor: Create and edit content. Cannot publish or delete.
 * - Marketing User: Edit blogs, testimonials, case studies only.
 * - SEO Specialist: Edit SEO fields and site settings. Read-only content.
 * 
 * Usage: node scripts/setup-roles.js
 */
async function setupRoles() {
    // Initialize Strapi
    const strapi = await Strapi().load();

    try {
        const rolesService = strapi.admin.services.role;
        const permissionService = strapi.admin.services.permission;

        console.log('🚀 Starting Admin Role Setup (README Spec)...');

        const rolesKeys = [
            {
                name: 'Content Manager',
                code: 'content-manager',
                description: 'Can create, edit, and publish content. No access to settings.',
            },
            {
                name: 'Content Editor',
                code: 'content-editor',
                description: 'Can create and edit content. Cannot publish or delete.',
            },
            {
                name: 'Marketing User',
                code: 'marketing-user',
                description: 'Edit blogs, testimonials, case studies only.',
            },
            {
                name: 'SEO Specialist',
                code: 'seo-specialist',
                description: 'Edit SEO fields and site settings. Read-only content.',
            }
        ];

        for (const roleDef of rolesKeys) {
            const existingRole = await rolesService.findOne({ code: roleDef.code });

            if (existingRole) {
                console.log(`ℹ️  Role "${roleDef.name}" (${roleDef.code}) already exists.`);
            } else {
                await rolesService.create(roleDef);
                console.log(`✅ Created Role: "${roleDef.name}"`);
            }
        }

        // TODO: Programmatic permission assignment requires fetching specific permission actions
        // which can be complex to hardcode reliably across versions. 
        // This script bootstraps the roles so they can be fine-tuned in the dashboard.

        console.log('\n✨ Role setup complete!');
        console.log('IMPORTANT: Permissions must be fine-tuned in the Admin Panel or via detailed permission mapping.');

    } catch (error) {
        console.error('❌ Error creating roles:', error);
    } finally {
        strapi.destroy();
    }
}

setupRoles();
