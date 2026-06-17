import { site } from '@/lib/site';
import { LegalDoc } from '@/components/sections/LegalDoc';

export const metadata = {
  title: `Terms & Conditions | ${site.name}`,
  description: `The terms governing your use of the ${site.name} website and services.`,
};

const sections = [
  {
    heading: 'Acceptance of Terms',
    body: [
      `These Terms & Conditions govern your access to and use of ${site.domain} and any services provided by ${site.name}. By using this website, you agree to be bound by these terms. If you do not agree, please do not use the site.`,
    ],
  },
  {
    heading: 'Use of the Website',
    body: [
      'You may use this website for lawful purposes only. You agree not to misuse the site, attempt unauthorised access, or interfere with its normal operation.',
    ],
  },
  {
    heading: 'Intellectual Property',
    body: [
      `All content on this website — including text, graphics, logos, and code — is the property of ${site.name} unless otherwise stated, and is protected by applicable intellectual property laws. You may not reproduce or redistribute it without prior written permission.`,
    ],
  },
  {
    heading: 'Services & Engagements',
    body: [
      'Information about our services is provided for general guidance. Any engagement is governed by a separate written agreement or statement of work, which takes precedence over these terms in the event of a conflict.',
    ],
  },
  {
    heading: 'Limitation of Liability',
    body: [
      'This website is provided on an "as is" basis. To the fullest extent permitted by law, we are not liable for any indirect or consequential loss arising from your use of the site or reliance on its content.',
    ],
  },
  {
    heading: 'Third-Party Links',
    body: [
      'This site may contain links to third-party websites. We are not responsible for the content, policies, or practices of those external sites.',
    ],
  },
  {
    heading: 'Governing Law',
    body: [
      'These terms are governed by and construed in accordance with the laws of India, and any disputes are subject to the exclusive jurisdiction of the courts of Chennai, Tamil Nadu.',
    ],
  },
  {
    heading: 'Changes to These Terms',
    body: [
      'We may update these terms from time to time. Continued use of the website after changes are posted constitutes acceptance of the revised terms.',
    ],
  },
  {
    heading: 'Contact Us',
    body: [`For questions about these terms, email us at ${site.email.general}.`],
  },
];

export default function TermsPage() {
  return <LegalDoc title="Terms & Conditions" sections={sections} />;
}
