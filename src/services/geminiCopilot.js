// Mock & Gemini API Copilot Integration Service for Susan Broy Instagram Studio

export const ART_MEDIUMS = [
  { id: 'concrete', label: 'Beton-Skulptur', accent: '#A0A0B0', desc: 'Raues Mineral, Schattenspiel & massive Form im Raum' },
  { id: 'metal', label: 'Metall-Installation', accent: '#D4AF37', desc: 'Präziser Stahl/Bronze, Lichtreflexe & geometrische Kanten' },
  { id: 'bw_painting', label: 'S/W Grafik + Akzentfarbe', accent: '#E2F518', desc: 'Klarer Kontrast auf Leinwand mit gezieltem Farbakzent' },
  { id: 'mixed', label: 'Beton & Metall Kombination', accent: '#8E8E93', desc: 'Spannungsverhältnis organischer und industrieller Materialien' }
];

export const DEMO_POSTS = [
  {
    id: 'post-1',
    title: 'Beton-Objekt "FORM IV"',
    medium: 'concrete',
    date: '2026-07-28',
    type: 'reel',
    mediaUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
    keywords: 'Raumwirkung, Beton, Schattenwurf, Stille, Minimalismus',
    tags: ['@galerie_vonundvon', '@artkarlsruhe'],
    accentColor: '#A0A0B0',
    status: 'review_ready',
    variants: [
      {
        id: 'var-1-a',
        name: 'Variant A: Material & Architektur',
        style: 'Minimal slow pan over concrete texture & geometric shadows',
        caption: `FORM IV — Präsenz im Raum.\n\nDer raue Charakter des Betons fordert die Stille heraus. Kein überflüssiges Detail, nur das Wechselspiel von Licht und Schatten auf der mineralischen Oberfläche.\n\nMaterial: Gießbeton, handbearbeitet.\nStudio: @syken_broy`,
        hashtags: ['#susanbroy', '#concreteart', '#contemporarysculpture', '#formimraum', '#minimalism', '#sculptureart'],
        audio: 'Ambient Calm — Deep Resonance (Minimal Instrument)',
        layout: 'fullscreen_clean'
      },
      {
        id: 'var-1-b',
        name: 'Variant B: Grafik & Kontrast (B&W Frame)',
        style: 'High contrast B&W frame with BROY logo framing watermark',
        caption: `Skulpturale Masse & Schatten.\n\nForm IV im architektonischen Kontext. Wenn das Material zur Skulptur wird und den Raum besetzt.\n\nGezeigt bei @galerie_vonundvon\nAtelier: @syken_broy`,
        hashtags: ['#susanbroy', '#minimalistart', '#architecturalsculpture', '#concrete', '#galleryview'],
        audio: 'Pulse of Silence — Atmospheric Studio Beat',
        layout: 'passepartout_dark'
      },
      {
        id: 'var-1-c',
        name: 'Variant C: Atelier & Prozess',
        style: 'Focus crop transition with process storytelling text',
        caption: `Vom Entwurf zum Guss.\n\nEin Blick hinter die Kulissen im Atelier Gauting. Die Entstehung von FORM IV aus Beton und Stahlverankerung.\n\n#susanbroy #studiolife #sculptor #process #artinvestor`,
        hashtags: ['#susanbroy', '#ateliergauting', '#sculptureprocess', '#artcontemporain'],
        audio: 'Natural Studio Acoustics — Quiet Space',
        layout: 'editorial_quote'
      }
    ]
  },
  {
    id: 'post-2',
    title: 'Grafische Malerei "NOIR & NEON NO. 2"',
    medium: 'bw_painting',
    date: '2026-07-30',
    type: 'feed',
    mediaUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
    keywords: 'Schwarz-Weiß, Leuchtkraft, Akzentfarbe, Geometrie, Struktur',
    tags: ['@syken_broy', '@ahcprojectshamburg'],
    accentColor: '#E2F518',
    status: 'draft',
    variants: [
      {
        id: 'var-2-a',
        name: 'Variant A: Neon Accent Focus',
        style: 'Dynamic color pop accent highlighting the neon paint stroke',
        caption: `NOIR & NEON NO. 2.\n\nStarke grafische Kontraste auf strukturierter Leinwand. Das tiefe Schwarz bricht mit der Leuchtkraft der einzelnen Akzentlinie.\n\n120 x 140 cm, Acryl & Pigmente.\nAtelier: @syken_broy`,
        hashtags: ['#susanbroy', '#blackandwhiteart', '#accentcolor', '#contemporarypainting', '#abstractart'],
        audio: 'Modern Minimal — Crisp Tone',
        layout: 'fullscreen_clean'
      },
      {
        id: 'var-2-b',
        name: 'Variant B: Editorial Canvas Frame',
        style: 'Museum gallery border with crisp BROY header frame',
        caption: `Geometrie der Reduktion.\n\nWie viel braucht ein Bild? Schwarz, Weiß und ein einziger präziser Impuls.\n\nVertreten durch @ahcprojectshamburg\nKunstwerk: NOIR & NEON NO. 2`,
        hashtags: ['#susanbroy', '#galleryart', '#minimalistpainting', '#artcollector', '#hamburgart'],
        audio: 'Atmospheric Soft Piano',
        layout: 'passepartout_light'
      },
      {
        id: 'var-2-c',
        name: 'Variant C: Dual Detail Shot',
        style: 'Split slide showing texture detail and full artwork',
        caption: `Materialität auf Leinwand.\n\nDetailaufnahme der tiefen Pigmente und der messerscharfen Abgrenzung der Akzentfarbe.\n\nAusstellung im Atelier Gauting.\n@syken_broy`,
        hashtags: ['#susanbroy', '#artdetail', '#acrylicpainting', '#artcurator'],
        audio: 'Quiet Space — Silent Mode',
        layout: 'editorial_quote'
      }
    ]
  }
];

export async function generatePostVariants(inputData) {
  // Simulate Gemini API vision & LLM processing delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const mediumInfo = ART_MEDIUMS.find(m => m.id === inputData.medium) || ART_MEDIUMS[0];
  const accent = inputData.accentColor || mediumInfo.accent;

  const generatedVariants = [
    {
      id: `gen-${Date.now()}-a`,
      name: 'Variant A: Architektur & Materialstille',
      style: 'Langsame, meditative Kameraschwenks über Beton/Metall-Strukturen',
      caption: `${inputData.title.toUpperCase()} — Form & Raum.\n\n${inputData.keywords || 'Reduktion auf das Wesentliche.'} Die Wechselwirkung von scharfer Kante und Schatten erzeugt eine raumgreifende Präsenz.\n\nMaterial: ${mediumInfo.label}\nAtelier: @syken_broy ${inputData.tags.join(' ')}`,
      hashtags: ['#susanbroy', '#contemporaryart', '#concreteart', '#metalsculpture', '#minimalism', '#formimraum'],
      audio: 'Ambient Calm — Deep Resonance',
      layout: 'fullscreen_clean'
    },
    {
      id: `gen-${Date.now()}-b`,
      name: 'Variant B: Grafischer Kontrast (BROY Frame)',
      style: 'Rahmen-Design mit BROY-Logo-Wasserzeichen & Farbkontrast',
      caption: `Präzision & Haptik.\n\n"${inputData.keywords}" im Fokus. Minimalismus bedeutet nicht Abwesenheit, sondern die perfekte Balance der Elemente.\n\nPartner: ${inputData.tags.join(' ') || '@galerie_vonundvon'}\nKunstlerin: @syken_broy`,
      hashtags: ['#susanbroy', '#minimalistart', '#artgallery', '#sculptor', '#artcollector'],
      audio: 'Pulse of Silence — Atmospheric Studio Beat',
      layout: 'passepartout_dark'
    },
    {
      id: `gen-${Date.now()}-c`,
      name: 'Variant C: Atelier & Ausstellungs-Story',
      style: 'Kuratorische Vorschau mit Detail-Guss & Zitat',
      caption: `Blick ins Atelier Gauting.\n\nEntstehung und Raumwirkung von ${inputData.title}. Gezeigt im Ausstellungs-Kontext.\n\nBesuchen Sie www.susanbroy.com für weitere Einblicke.\n@syken_broy`,
      hashtags: ['#susanbroy', '#exhibition', '#ateliergauting', '#contemporarystudio'],
      audio: 'Natural Studio Acoustics — Quiet Space',
      layout: 'editorial_quote'
    }
  ];

  return {
    id: `post-${Date.now()}`,
    title: inputData.title || 'Unbenanntes Werk',
    medium: inputData.medium,
    date: inputData.date || new Date().toISOString().split('T')[0],
    type: inputData.type || 'reel',
    mediaUrl: inputData.mediaUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
    keywords: inputData.keywords,
    tags: inputData.tags || ['@syken_broy'],
    accentColor: accent,
    status: 'review_ready',
    variants: generatedVariants
  };
}
