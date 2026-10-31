// Skill cards, in the order they flow through the masonry columns.
// n is the card's number; dark marks the highlighted card; brk starts a new column on desktop.
export const skills = [
  { n: 1, title: 'Web development', items: ['WordPress', 'PHP', 'HTML5', 'CSS3', 'Sass', 'JavaScript', 'jQuery', 'Tailwind', 'Responsive design'] },
  { n: 4, title: 'AI', items: ['Claude Code', 'Claude', 'AI-assisted development', 'Prompt and workflow design'] },
  { n: 2, title: 'Leadership', items: ['Code review', 'Mentoring', 'QA process', 'Migration playbooks', 'Estimating'], dark: true, brk: true },
  { n: 5, title: 'Optimization', items: ['SEO', 'Core Web Vitals', 'Accessibility (WCAG / ARIA)', 'A/B testing and CRO', 'Localization'] },
  { n: 7, title: 'CRM and integrations', items: ['HubSpot', 'API integrations'] },
  { n: 3, title: 'Tooling', items: ['Git / GitHub', 'Docker', 'Local', 'WP Engine', 'WordPress VIP', 'Gulp', 'CodeKit', 'Figma', 'Adobe CS', 'Asana', 'ClickUp'], brk: true },
  { n: 6, title: 'Analytics', items: ['GA4', 'Google Tag Manager', 'mParticle'] },
];
