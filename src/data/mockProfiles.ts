import { Profile, Message } from '../types';

export const INITIAL_PROFILES: Profile[] = [
  {
    id: 'profile-1',
    name: 'Dr. Sunita Deshmukh',
    age: 48,
    profession: 'Chief of Pediatric Cardiology',
    company: 'Lilavati Medical Center',
    education: 'MD & Fellowship, King Edward Memorial & Johns Hopkins',
    location: 'Bandra West, Mumbai',
    bio: 'Decades in high-stakes medicine have taught me that true wealth is quiet stillness and genuine presence. Mother of a 20-year-old architecture student. In my personal sanctuary, I practice Hindustani classical vocal, run half-marathons before sunrise, and explore coastal backwaters. Seeking an emotionally grounded equal who values warmth, intellect, and easy laughter.',
    lifeStage: 'Proud Parent (Empty Nester)',
    rashi: 'Vrishabha (Taurus)',
    rashiElement: 'Earth',
    aadhaarVerified: true,
    aadhaarMasked: '•••• •••• 8492',
    verificationDate: '12 Jan 2026',
    trustScore: 99,
    photos: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Hindustani Classical', 'Distance Running', 'Art Galleries', 'Organic Gardening', 'Medical Ethics'],
    values: ['Emotional Stillness', 'Intellectual Curiosity', 'Kindness', 'Autonomy with Intimacy'],
    relationshipIntent: 'Long-term Meaningful Partnership',
    lifestylePacing: 'Early riser, intentional weekends, low-drama simplicity',
    retirementVision: 'Splitting time between a quiet Konkan orchard and global medical humanitarian missions.',
    e2eePublicKeyFingerprint: '9B2F : 47EA : 8801 : CC94 : 3110 : EE65',
    distanceKm: 8,
    compatibilityScore: 94,
    matchReasons: [
      'Shared desire for high-emotional-IQ companionship without corporate posturing',
      'Complementary life stage with independent grown adult family dynamics',
      'High mutual appreciation for artistic culture and mindful living'
    ]
  },
  {
    id: 'profile-2',
    name: 'Rajesh Singhania',
    age: 52,
    profession: 'Senior Managing Partner (Corporate Law)',
    company: 'Singhania & Partners LLP',
    education: 'LL.M., National Law School & Oxford University',
    location: 'Chanakyapuri, New Delhi',
    bio: 'Having spent thirty years dissecting complex international treaties, I find the most compelling conversations happen over handwritten letters, espresso, and rare jazz vinyl. Father to two independent young adults. Believer in quiet generosity, heritage architectural preservation, and walking through old city quarters at dusk.',
    lifeStage: 'Divorced & Thriving',
    rashi: 'Kanya (Virgo)',
    rashiElement: 'Earth',
    aadhaarVerified: true,
    aadhaarMasked: '•••• •••• 9321',
    verificationDate: '04 Feb 2026',
    trustScore: 98,
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Jazz Vinyls', 'Heritage Architecture', 'Fountain Pen Collecting', 'Himalayan Treks', 'Comparative Philosophy'],
    values: ['Discretion', 'Thoughtful Articulateness', 'Integrity', 'Mutual Vulnerability'],
    relationshipIntent: 'Lifelong Intellectual Equal',
    lifestylePacing: 'Focused weekdays, contemplative slow weekends in library retreats',
    retirementVision: 'Restoring a heritage stone cottage in Kumaon while writing legal history monographs.',
    e2eePublicKeyFingerprint: '4A19 : 08BC : FF34 : 1290 : 77A2 : DB49',
    distanceKm: 14,
    compatibilityScore: 91,
    matchReasons: [
      'High alignment on intellectual stimulation and respectful boundaries',
      'Appreciation for quiet elegance over ostentatious social scenes',
      'Grounded outlook forged through mature executive resilience'
    ]
  },
  {
    id: 'profile-3',
    name: 'Ananya Sen',
    age: 44,
    profession: 'VP of Product Experience & Innovation',
    company: 'Global FinTech Collective',
    education: 'B.Des & M.Sc., National Institute of Design & Stanford d.school',
    location: 'Indiranagar, Bengaluru',
    bio: 'I shape digital ecosystems by day and throw clay on the potter’s wheel on weekends. Mother to an amazing 18-year-old girl entering university. I believe that turning 40 was my greatest liberation—shedding perfectionism for authentic connection. I love spontaneous road trips to coastal Karnataka, pour-over coffee experiments, and honest, unguarded banter.',
    lifeStage: 'Co-Parenting with Harmony',
    rashi: 'Tula (Libra)',
    rashiElement: 'Air',
    aadhaarVerified: true,
    aadhaarMasked: '•••• •••• 1092',
    verificationDate: '19 Feb 2026',
    trustScore: 97,
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Ceramics & Pottery', 'Modern Art Biennales', 'Specialty Coffee', 'Indie Cinema', 'Mindful Breathwork'],
    values: ['Creativity', 'Radical Honesty', 'Emotional Generosity', 'Active Playfulness'],
    relationshipIntent: 'Companionship & Shared Adventures',
    lifestylePacing: 'Dynamic weekday focus, tactile artisanal creative weekends',
    retirementVision: 'A collaborative design studio & artist residency near Auroville.',
    e2eePublicKeyFingerprint: '6C33 : F901 : 22BA : 88DE : 0041 : AA77',
    distanceKm: 6,
    compatibilityScore: 95,
    matchReasons: [
      'Synergy between creative intuition and executive maturity',
      'Shared pride and clarity in guiding adult children into independence',
      'Warm, open communication philosophy that values curiosity'
    ]
  },
  {
    id: 'profile-4',
    name: 'Vikramaditya Iyer',
    age: 50,
    profession: 'CleanTech Founder & Climate Investor',
    company: 'Aetheria Renewables',
    education: 'B.Tech IIT Madras, MBA INSEAD',
    location: 'Adyar, Chennai / Bengaluru',
    bio: 'After two decades leading renewable energy infrastructure across Southeast Asia, I invest in climate founders and run a regenerative citrus grove. Life after 40 is about depth, not applause. I love dinghy sailing on breezy mornings, reading history, and listening to classical violin. Seeking someone who finds peace in nature and depth in shared silence.',
    lifeStage: 'Single / Never Married',
    rashi: 'Dhanu (Sagittarius)',
    rashiElement: 'Fire',
    aadhaarVerified: true,
    aadhaarMasked: '•••• •••• 4429',
    verificationDate: '28 Jan 2026',
    trustScore: 99,
    photos: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Regenerative Farming', 'Coastal Sailing', 'World History', 'Carnatic Violin', 'Long-Distance Cycling'],
    values: ['Stewardship', 'Subtle Humor', 'Intellectual Rigor', 'Authenticity'],
    relationshipIntent: 'Long-term Meaningful Partnership',
    lifestylePacing: 'Active, nature-connected, early morning contemplation',
    retirementVision: 'Transitioning completely into ecological restoration and wildlife philanthropy.',
    e2eePublicKeyFingerprint: '11FE : 99B0 : 54CA : 31D9 : 455A : 2021',
    distanceKm: 22,
    compatibilityScore: 89,
    matchReasons: [
      'Strong resonance with long-term planetary and human purpose',
      'Complementary appreciation for outdoors, physical vitality, and classical art',
      'Mature independence with a deep capacity for dedicated partnership'
    ]
  },
  {
    id: 'profile-5',
    name: 'Meera Kapoor',
    age: 46,
    profession: 'Senior Editorial Director & Literary Essayist',
    company: 'Scribe Heritage Publishing',
    education: 'M.A. English Literature, St. Stephen’s & Cambridge',
    location: 'Colaba, Mumbai',
    bio: 'Words are my trade, but genuine connection is what breathes life into them. Curating authors, moderating cultural festivals, and scouring vintage flea markets keep me vibrant. I enjoy cooking slow Sunday roasts for close friends, dry martinis, and late-night philosophical debates. Looking for an accomplished man who holds his own space with quiet grace.',
    lifeStage: 'Divorced & Thriving',
    rashi: 'Simha (Leo)',
    rashiElement: 'Fire',
    aadhaarVerified: true,
    aadhaarMasked: '•••• •••• 7718',
    verificationDate: '15 Jan 2026',
    trustScore: 96,
    photos: [
      'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Literary Festivals', 'Gastronomy', 'Theater', 'Mid-Century Antiques', 'Travel Memoirs'],
    values: ['Eloquent Discourse', 'Emotional Independence', 'Generosity of Spirit', 'Elegance'],
    relationshipIntent: 'Long-term Meaningful Partnership',
    lifestylePacing: 'Cultured, socially engaged yet fiercely protective of private domestic peace',
    retirementVision: 'Running an intimate seaside bookstore and salon in South Goa or Tuscany.',
    e2eePublicKeyFingerprint: '77D1 : AA52 : 39F0 : 44B1 : 0908 : FC12',
    distanceKm: 11,
    compatibilityScore: 92,
    matchReasons: [
      'High intellectual and cultural synergy for engaging dinners and discourse',
      'Mature clarity on what makes a relationship enriching without codependency',
      'Warm appreciation for wit, refined humor, and gracious hospitality'
    ]
  },
  {
    id: 'profile-6',
    name: 'Arjun Nambiar',
    age: 54,
    profession: 'Principal Aerospace Systems Architect',
    company: 'National Defense & Aerospace Consortium',
    education: 'Ph.D. Aerospace Engineering, IISc Bengaluru',
    location: 'Jubilee Hills, Hyderabad',
    bio: 'I spent decades designing guidance algorithms for satellite payloads. When away from technical blueprints, I grind optical mirrors for amateur astronomy, hike in the Western Ghats, and enjoy baking sourdough. Widower who has processed grief into deep gratitude for life’s fragility. I seek a genuine companion with whom to share quiet sunrises and heartfelt laughter.',
    lifeStage: 'Widowed',
    rashi: 'Makara (Capricorn)',
    rashiElement: 'Earth',
    aadhaarVerified: true,
    aadhaarMasked: '•••• •••• 6503',
    verificationDate: '01 Feb 2026',
    trustScore: 99,
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Astronomy & Star Parties', 'Sourdough Baking', 'Mountain Trekking', 'Classical Physics', 'Acoustic Guitar'],
    values: ['Patience', 'Deep Loyalty', 'Scientific Wonder', 'Gentle Empathy'],
    relationshipIntent: 'Marriage & Life Union',
    lifestylePacing: 'Methodical, deeply loving, grounded in home and nature',
    retirementVision: 'A mountain observatory cabin hosting stargazing workshops for curious students.',
    e2eePublicKeyFingerprint: '33A8 : CC41 : 19F9 : 9201 : BEE4 : 8831',
    distanceKm: 18,
    compatibilityScore: 93,
    matchReasons: [
      'Profound emotional maturity forged through life adversity and resilience',
      'Patient, supportive relationship temperament that builds lifelong trust',
      'Harmonious blend of scientific curiosity and comforting domestic warmth'
    ]
  },
  {
    id: 'profile-7',
    name: 'Kavita Roy',
    age: 42,
    profession: 'Principal Sustainable Urban Architect',
    company: 'Studio Biophilic Designs',
    education: 'M.Arch, CEPT University & TU Delft',
    location: 'Ballygunge, Kolkata',
    bio: 'Passionate about integrating verdant living walls into modern concrete skylines. Mother of a delightful 10-year-old son whom I co-parent with deep respect. I find peace in morning Ashtanga yoga, attending chamber concerts, and sketching historical courtyards. I appreciate a partner with quiet confidence, intellectual depth, and a generous heart.',
    lifeStage: 'Co-Parenting with Harmony',
    rashi: 'Meena (Pisces)',
    rashiElement: 'Water',
    aadhaarVerified: true,
    aadhaarMasked: '•••• •••• 5184',
    verificationDate: '22 Feb 2026',
    trustScore: 97,
    photos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Ashtanga Yoga', 'Heritage Conservation', 'Chamber Music', 'Urban Forestry', 'Ceramic Tile Restorations'],
    values: ['Empathy', 'Aesthetic Harmony', 'Patient Parenting', 'Authenticity'],
    relationshipIntent: 'Long-term Meaningful Partnership',
    lifestylePacing: 'Harmonious family rhythms, mindful wellness, vibrant architectural projects',
    retirementVision: 'A biophilic sanctuary studio in the Himalayan foothills promoting sustainable vernacular building.',
    e2eePublicKeyFingerprint: '88BC : 31DF : 6629 : EE00 : 7712 : AB45',
    distanceKm: 15,
    compatibilityScore: 90,
    matchReasons: [
      'Shared respect for balanced parenting alongside demanding career leadership',
      'High aesthetic sensibility and appreciation for harmonious home environments',
      'Warm emotional presence grounded in mindful intentionality'
    ]
  },
  {
    id: 'profile-8',
    name: 'Devendra Malhotra',
    age: 56,
    profession: 'Retired Wing Commander & Aerospace Tech Advisor',
    company: 'Skyward Strategic Advisory',
    education: 'National Defence Academy & M.Sc. Defense Studies, Cranfield University',
    location: 'Koregaon Park, Pune',
    bio: 'After 25 years in the Indian Air Force flying fighters and commanding squadrons, I transitioned to strategic tech advisory. Father to two married army officers. I value discipline paired with deep gentleness, morning rounds of golf, solo motorcycling along the Konkan cliff roads, and good single malts with deep conversation. Looking for an accomplished equal for life’s most serene chapter.',
    lifeStage: 'Proud Parent (Empty Nester)',
    rashi: 'Mesha (Aries)',
    rashiElement: 'Fire',
    aadhaarVerified: true,
    aadhaarMasked: '•••• •••• 3190',
    verificationDate: '09 Jan 2026',
    trustScore: 99,
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Golf', 'Military Aviation History', 'Solo Motorcycling', 'Woodworking', 'Classic Rock & Jazz'],
    values: ['Honor & Integrity', 'Courageous Vulnerability', 'Calm in Crisis', 'Loyalty'],
    relationshipIntent: 'Long-term Meaningful Partnership',
    lifestylePacing: 'Early riser, physically active, calm and unhurried evenings',
    retirementVision: 'Building bespoke timber furniture in a hilltop Pune workshop and road trips across Ladakh.',
    e2eePublicKeyFingerprint: '55E1 : 8820 : CC19 : 7401 : DD98 : 1245',
    distanceKm: 25,
    compatibilityScore: 92,
    matchReasons: [
      'Steadfast emotional anchor with profound respect for partner autonomy',
      'Calm leadership demeanor that provides reassuring domestic tranquility',
      'Shared empty-nester life chapter ready for meaningful companionship'
    ]
  }
];

export const INITIAL_USER_PROFILE: Profile = {
  id: 'current-user',
  name: 'Vasu Sharma',
  age: 46,
  profession: 'Senior Managing Director & Venture Principal',
  company: 'Prism Capital Ventures',
  education: 'B.Tech & MBA, IIM Ahmedabad',
  location: 'Nariman Point, Mumbai',
  bio: 'Two decades in technology investment have taught me to value substance over sparkle. Having achieved professional equilibrium, I cherish early morning seaside runs, exploring contemporary South Asian literature, and quiet dinners with meaningful conversations. Looking for an emotionally mature, intellectually curious partner to share life’s next chapter with mutual grace and warmth.',
  lifeStage: 'Single / Never Married',
  rashi: 'Dhanu (Sagittarius)',
  rashiElement: 'Fire',
  aadhaarVerified: true,
  aadhaarMasked: '•••• •••• 6219',
  verificationDate: '10 Feb 2026',
  trustScore: 99,
  photos: [
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80'
  ],
  interests: ['Venture Mentorship', 'Distance Running', 'Contemporary Art', 'Pour-Over Coffee', 'Global Geopolitics'],
  values: ['Authenticity', 'Intellectual Rigor', 'Emotional Availability', 'Shared Stillness'],
  relationshipIntent: 'Long-term Meaningful Partnership',
  lifestylePacing: 'Structured weekdays, mindful slow weekends with cultural walks',
  retirementVision: 'Advising purpose-led sustainability founders and curating an artisanal hill retreat.',
  e2eePublicKeyFingerprint: '88AC : 10E9 : 45BB : 9021 : AA18 : 7734',
  distanceKm: 0,
  compatibilityScore: 100,
  matchReasons: []
};

export const INITIAL_CONVERSATIONS: Record<string, Message[]> = {
  'profile-1': [
    {
      id: 'msg-1',
      senderId: 'profile-1',
      receiverId: 'current-user',
      text: "Good evening, Vasu. I read your reflection on valuing substance over sparkle—it resonates deeply with my daily experience in the pediatric ward. At this stage of life, genuine presence is everything.",
      timestamp: 'Yesterday at 7:42 PM',
      isEncrypted: true,
      read: true,
      type: 'text'
    },
    {
      id: 'msg-2',
      senderId: 'current-user',
      receiverId: 'profile-1',
      text: "Thank you, Sunita. Running marathons before dawn and practicing classical vocal must provide a wonderful anchor of stillness amidst demanding surgeries. How long have you been studying Hindustani vocal?",
      timestamp: 'Yesterday at 8:15 PM',
      isEncrypted: true,
      read: true,
      type: 'text'
    },
    {
      id: 'msg-3',
      senderId: 'profile-1',
      receiverId: 'current-user',
      text: "Over fourteen years now under Pt. Jasraj's lineage. It teaches you that every note needs breath and silence before it. I'd love to share an acoustic recording sometime.",
      timestamp: 'Today at 9:30 AM',
      isEncrypted: true,
      read: true,
      type: 'text'
    },
    {
      id: 'msg-4',
      senderId: 'profile-1',
      receiverId: 'current-user',
      text: "I noticed the National Gallery of Modern Art has a private retrospective this Saturday afternoon. Would you be open to an unhurried walk through the exhibits and an espresso at the courtyard cafe?",
      timestamp: 'Today at 10:14 AM',
      isEncrypted: true,
      read: true,
      type: 'rendezvous_proposal',
      rendezvousDetails: {
        title: 'Curated Gallery Walk & Courtyard Espresso',
        venueType: 'National Gallery of Modern Art, Colaba',
        date: 'This Saturday, 4:30 PM',
        status: 'proposed'
      }
    }
  ],
  'profile-3': [
    {
      id: 'msg-301',
      senderId: 'profile-3',
      receiverId: 'current-user',
      text: "Hello Vasu! Your perspective on turning 40 as a moment of liberation rather than crisis completely aligns with mine. Pottery taught me that mistakes in clay often make the most soulful vessels.",
      timestamp: '2 days ago',
      isEncrypted: true,
      read: true,
      type: 'text'
    },
    {
      id: 'msg-302',
      senderId: 'current-user',
      receiverId: 'profile-3',
      text: "Ananya, that's such an evocative metaphor. In venture capital, we are always taught to predict outcomes, but real maturity is learning to embrace the organic unfolding of life.",
      timestamp: '2 days ago',
      isEncrypted: true,
      read: true,
      type: 'text'
    }
  ]
};

export const MATURE_ICEBREAKERS = [
  "What is a core belief you held firmly in your 30s that you have completely outgrown in your 40s?",
  "What does your ideal restorative weekend look like when all executive duties are paused?",
  "How do you maintain emotional autonomy while nurturing deep partnership?",
  "What passion project or creative pursuit brings you the greatest personal stillness today?",
  "What kind of laughter feels most healing and nourishing to you?",
  "If we could sit at a quiet cafe anywhere in the world right now, where would we be?"
];
