// Static content for the Aperture Moments experience.

export const timelineCards = [
  { emoji: '🎂', title: 'Birthday Websites', desc: 'A scrolling celebration of their whole year — wishes, photos, music.' },
  { emoji: '❤️', title: 'Anniversary Websites', desc: 'Your love story told chapter by chapter, the way it deserves.' },
  { emoji: '🙏', title: 'Sorry Websites', desc: 'When "sorry" needs more than a text. Say it like you mean it.' },
  { emoji: '💍', title: 'Proposal Websites', desc: 'A cinematic build-up to the biggest question of your life.' },
  { emoji: '👨', title: "Father's Day Websites", desc: 'Every lesson, every memory, gathered into one heartfelt place.' },
  { emoji: '👩', title: "Mother's Day Websites", desc: 'A warm tribute to the person who gave you everything.' },
  { emoji: '🎓', title: 'Graduation Websites', desc: 'Mark the milestone with a keepsake they will revisit for years.' },
  { emoji: '✨', title: 'Custom Moments', desc: 'Reunions, farewells, new beginnings — if it matters, we craft it.' },
];

// Phone demo "screens" — morph through these as the user scrolls.
export const phoneScreens = [
  {
    key: 'birthday',
    label: 'Birthday',
    emoji: '🎂',
    title: 'Happy Birthday, Aarav',
    subtitle: '25 trips around the sun',
    from: '#fde8c4',
    to: '#f4754b',
  },
  {
    key: 'apology',
    label: 'Apology',
    emoji: '🙏',
    title: "I'm Sorry, Meera",
    subtitle: 'Let me make it right',
    from: '#f7a8b8',
    to: '#ef6f8e',
  },
  {
    key: 'anniversary',
    label: 'Anniversary',
    emoji: '❤️',
    title: 'Five Years, Us',
    subtitle: 'And every one a gift',
    from: '#f59e42',
    to: '#ef6f8e',
  },
  {
    key: 'proposal',
    label: 'Proposal',
    emoji: '💍',
    title: 'Will You Marry Me?',
    subtitle: 'From the very first day',
    from: '#e6a532',
    to: '#f4754b',
  },
];

export const processSteps = [
  { n: '01', emoji: '📤', title: 'Upload Photos', desc: 'Drop in the moments that matter — we handle the rest.' },
  { n: '02', emoji: '✍️', title: 'Share Your Story', desc: 'Tell us the feeling, the names, the inside jokes.' },
  { n: '03', emoji: '🎨', title: 'We Craft The Experience', desc: 'Our team designs a one-of-a-kind interactive site.' },
  { n: '04', emoji: '😊', title: 'Make Someone Smile', desc: 'Send the link and watch their face light up.' },
];

export const pricing = {
  price: '₹699',
  includes: [
    'Personalized Design',
    'Unlimited Photos',
    'Music Integration',
    'Custom Story',
    'Interactive Timeline',
    'Hosting Included',
    'Mobile Optimized',
  ],
  addons: [
    { name: 'Custom Domain', price: '₹499' },
    { name: 'Video Montage', price: '₹399' },
  ],
};

// Memory wall sample sites — gradient + emoji stand-ins for live previews.
export const wallItems = [
  { title: 'Aarav turns 25', tag: 'Birthday', emoji: '🎂', from: '#fde8c4', to: '#f59e42' },
  { title: 'Riya & Karan', tag: 'Anniversary', emoji: '❤️', from: '#f7a8b8', to: '#ef6f8e' },
  { title: 'For Appa', tag: "Father's Day", emoji: '👨', from: '#f59e42', to: '#f4754b' },
  { title: 'The big question', tag: 'Proposal', emoji: '💍', from: '#e6a532', to: '#f4754b' },
  { title: 'Class of 2026', tag: 'Graduation', emoji: '🎓', from: '#fde8c4', to: '#ef6f8e' },
  { title: 'I messed up', tag: 'Sorry', emoji: '🙏', from: '#f7a8b8', to: '#f4754b' },
  { title: 'For Amma', tag: "Mother's Day", emoji: '👩', from: '#f59e42', to: '#ef6f8e' },
  { title: 'Welcome home', tag: 'Custom', emoji: '✨', from: '#e6a532', to: '#f7a8b8' },
];
