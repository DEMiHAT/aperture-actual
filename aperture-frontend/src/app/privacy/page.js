import { site } from '@/lib/site';
import { LegalDoc } from '@/components/sections/LegalDoc';

export const metadata = {
  title: `Privacy Policy | ${site.name}`,
  description: `How ${site.name} collects, uses, and protects your personal data.`,
};

const sections = [
  {
    heading: 'Introduction',
    body: [
      `This Privacy Policy explains how ${site.name} ("we", "us", "our") collects, uses, and safeguards information when you visit ${site.domain} or engage our services. By using this website, you consent to the practices described here.`,
    ],
  },
  {
    heading: 'Information We Collect',
    body: [
      'We collect information you provide directly — such as your name, email address, phone number, and project details — when you submit a contact form, request a proposal, or book a call.',
      'We also collect limited technical data automatically, including IP address, browser type, device information, and pages visited, through cookies and analytics tools.',
    ],
  },
  {
    heading: 'How We Use Your Information',
    body: [
      'To respond to enquiries, prepare proposals, and deliver the services you request.',
      'To improve our website, understand how it is used, and maintain its security.',
      'To send updates or marketing communications where you have opted in. You can unsubscribe at any time.',
    ],
  },
  {
    heading: 'Cookies',
    body: [
      'We use cookies and similar technologies to operate the site and measure traffic. You can control cookies through your browser settings and via the consent banner shown on your first visit.',
    ],
  },
  {
    heading: 'Data Sharing',
    body: [
      'We do not sell your personal data. We may share it with trusted service providers (such as analytics or hosting providers) who process it on our behalf under appropriate confidentiality obligations, or where required by law.',
    ],
  },
  {
    heading: 'Data Security & Retention',
    body: [
      'We apply reasonable technical and organisational measures to protect your data, including encrypted transport (HTTPS) and access controls. We retain personal data only as long as necessary for the purposes described or as required by law.',
    ],
  },
  {
    heading: 'Your Rights',
    body: [
      'Subject to applicable law, you may request access to, correction of, or deletion of your personal data, and may object to or restrict certain processing. To exercise these rights, contact us at the address below.',
    ],
  },
  {
    heading: 'Contact Us',
    body: [
      `For any privacy questions or requests, email us at ${site.email.general}.`,
    ],
  },
];

export default function PrivacyPage() {
  return <LegalDoc title="Privacy Policy" sections={sections} />;
}
