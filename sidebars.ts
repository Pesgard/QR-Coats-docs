import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/index',
        {
          type: 'category',
          label: 'Components',
          items: ['architecture/components/index'],
        },
        {
          type: 'category',
          label: 'Data Flow',
          items: ['architecture/data-flow/index'],
        },
        {
          type: 'category',
          label: 'Deployment',
          items: ['architecture/deployment/index'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Frontend Applications',
      items: [
        'admin/index',
        'superadmin/index',
        'customers/index',
        'employees/index',
      ],
    },
    {
      type: 'category',
      label: 'Backend Services',
      items: [
        'architecture/backend-services/swagger',
        'api-employees/index',
        'qr-api/index',

      ],
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
