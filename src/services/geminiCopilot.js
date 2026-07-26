// Minimalist Artwork & Editorial Datasets for Susan Broy - Strict Zero Invention Engine

export const CONTENT_CATEGORIES = [
  { id: 'exhibition', label: '🏛️ Ausstellung & Vernissage', desc: 'Werbung für Ausstellungen, Galerie, Ort & Öffnungszeiten' },
  { id: 'atelier', label: '🎨 Atelier & Einblick', desc: 'Impressionen aus dem Atelier Gauting & Arbeitsprozess' },
  { id: 'artwork', label: '🗿 Werkstück / Freies Thema', desc: 'Fokus auf Ihr konkretes Kunstwerk' }
];

export const LANGUAGES = [
  { id: 'de', label: '🇩🇪 Deutsch', desc: 'Präziser deutscher Text' },
  { id: 'en', label: '🇬🇧 English', desc: 'International language' },
  { id: 'bilingual', label: '🌐 Zweisprachig (DE / EN)', desc: 'Deutsch & Englisch' }
];

export const ART_MEDIUMS = [
  { id: 'concrete', label: 'Beton-Skulptur', accent: '#A0A0B0', desc: 'Raues Mineral, Schattenspiel & massive Form im Raum' },
  { id: 'metal', label: 'Metall-Installation', accent: '#D4AF37', desc: 'Präziser Stahl/Bronze, Lichtreflexe & geometrische Kanten' },
  { id: 'bw_painting', label: 'S/W Grafik + Akzentfarbe', accent: '#E2F518', desc: 'Klarer Kontrast auf Leinwand mit gezieltem Farbakzent' },
  { id: 'mixed', label: 'Beton & Metall Kombination', accent: '#8E8E93', desc: 'Spannungsverhältnis organischer und industrieller Materialien' }
];

export const PRESET_IMAGES = {
  exhibition: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85',
  atelier: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
  artwork: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85',
  concrete: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85',
  metal: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=85',
  bw_painting: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=85',
  mixed: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85'
};

export const REEL_TRANSITION_EFFECTS = [
  { id: 'zoom_pan', label: '🔍 Ken-Burns Zoom & Schwenk', desc: 'Langsam gleitende Kamera über das Werkstück' },
  { id: 'light_fade', label: '✨ Lichtblitz / Crossfade', desc: 'Eleganter Hell-Dunkel-Übergang zwischen Aufnahmen' },
  { id: 'slide_push', label: '↔️ Horizontaler Slide', desc: 'Dynamisches Herausschieben der Aufnahmen' }
];

export const DEMO_POSTS = [
  {
    id: 'post-1',
    title: 'Ausstellung "SPATIAL PRESENCE"',
    category: 'exhibition',
    language: 'de',
    date: '2026-07-28',
    type: 'reel',
    mediaUrl: PRESET_IMAGES.exhibition,
    location: 'Galerie von&von, Nürnberg',
    hours: 'Di–Fr 11–18 Uhr, Sa 11–15 Uhr',
    keywords: 'Vernissage, Ausstellungsaufbau, Skulpturen im Raum',
    tags: ['@galerie_vonundvon'],
    accentColor: '#FFFFFF',
    status: 'review_ready',
    variants: [
      {
        id: 'var-1-a',
        name: 'Variante A: Dezenter Ausstellungs-Text unten',
        overlayPosition: 'bottom_bar',
        overlayText: 'AUSSTELLUNG "SPATIAL PRESENCE"\nGalerie von&von, Nürnberg • Ab 28. Juli 2026',
        transitionEffect: 'zoom_pan',
        caption: `HERZLICHE EINLADUNG zur Ausstellung "SPATIAL PRESENCE".\n\n📍 Ort: Galerie von&von, Nürnberg\n🗓️ Eröffnung: 28. Juli 2026\n🕒 Öffnungszeiten: Di–Fr 11–18 Uhr, Sa 11–15 Uhr\n\n@syken_broy @galerie_vonundvon`,
        hashtags: ['#susanbroy', '#ausstellung', '#contemporaryart', '#nürnberg'],
        audio: 'Ambient Calm — Deep Resonance'
      },
      {
        id: 'var-1-b',
        name: 'Variante B: Minimalistischer Eck-Titel',
        overlayPosition: 'top_left',
        overlayText: 'SUSAN BROY\nSPATIAL PRESENCE',
        transitionEffect: 'light_fade',
        caption: `Ausstellung "SPATIAL PRESENCE" in Nürnberg.\n\nBesuchszeiten & Details: www.susanbroy.com\n@syken_broy`,
        hashtags: ['#susanbroy', '#exhibition2026', '#minimalism'],
        audio: 'Pulse of Silence — Atmospheric Beat'
      },
      {
        id: 'var-1-c',
        name: 'Variante C: Nur Wasserzeichen (Kein Text im Bild)',
        overlayPosition: 'none',
        overlayText: '',
        transitionEffect: 'slide_push',
        caption: `Einblicke vor der Eröffnung von "SPATIAL PRESENCE".\n\n@syken_broy`,
        hashtags: ['#susanbroy', '#behindthescenes'],
        audio: 'Natural Studio Acoustics — Quiet Space'
      }
    ]
  }
];

export async function generatePostVariants(inputData) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const category = inputData.category || 'exhibition';
  const lang = inputData.language || 'de';
  const titleClean = inputData.title || (category === 'exhibition' ? 'Ausstellung' : 'Atelier Einblick');
  const locClean = inputData.location || '';
  const hoursClean = inputData.hours || '';
  const keywordsClean = inputData.keywords || '';

  let variants = [];

  if (category === 'exhibition') {
    const hoursString = hoursClean ? ` • ${hoursClean}` : '';

    if (lang === 'en') {
      variants = [
        {
          id: `gen-${Date.now()}-a`,
          name: 'Variant A: Clean Bottom Banner',
          overlayPosition: 'bottom_bar',
          overlayText: `${titleClean.toUpperCase()}\n${locClean}${hoursString}`,
          transitionEffect: 'zoom_pan',
          caption: `EXHIBITION "${titleClean}".\n\n${keywordsClean}\n\n📍 Location: ${locClean}\n🗓️ Date: ${inputData.date}\n🕒 Hours: ${hoursClean}\n\n@syken_broy ${inputData.tags.join(' ')}`,
          hashtags: ['#susanbroy', '#exhibition', '#contemporaryart', '#artgallery'],
          audio: 'Ambient Calm — Deep Resonance'
        },
        {
          id: `gen-${Date.now()}-b`,
          name: 'Variant B: Top-Left Minimalist Header',
          overlayPosition: 'top_left',
          overlayText: `SUSAN BROY\n${titleClean.toUpperCase()}`,
          transitionEffect: 'light_fade',
          caption: `Exhibition: "${titleClean}".\n\n${keywordsClean}\n\nInfo: www.susanbroy.com\n@syken_broy`,
          hashtags: ['#susanbroy', '#sculpture', '#minimalism'],
          audio: 'Pulse of Silence — Atmospheric Beat'
        },
        {
          id: `gen-${Date.now()}-c`,
          name: 'Variant C: Watermark Only (No In-Video Text)',
          overlayPosition: 'none',
          overlayText: '',
          transitionEffect: 'slide_push',
          caption: `"${titleClean}".\n\n${keywordsClean}\n\n@syken_broy`,
          hashtags: ['#susanbroy', '#art'],
          audio: 'Natural Studio Acoustics — Quiet Space'
        }
      ];
    } else {
      // German
      variants = [
        {
          id: `gen-${Date.now()}-a`,
          name: 'Variante A: Dezenter Banner am unteren Bildrand',
          overlayPosition: 'bottom_bar',
          overlayText: `${titleClean.toUpperCase()}\n${locClean}${hoursString}`,
          transitionEffect: 'zoom_pan',
          caption: `HERZLICHE EINLADUNG zur Ausstellung "${titleClean}".\n\n${keywordsClean}\n\n📍 Ort: ${locClean}\n🗓️ Datum: ${inputData.date}\n🕒 Öffnungszeiten: ${hoursClean}\n\n@syken_broy ${inputData.tags.join(' ')}`,
          hashtags: ['#susanbroy', '#ausstellung', '#vernissage', '#contemporaryart'],
          audio: 'Ambient Calm — Deep Resonance'
        },
        {
          id: `gen-${Date.now()}-b`,
          name: 'Variante B: Schlichter Eck-Titel oben links',
          overlayPosition: 'top_left',
          overlayText: `SUSAN BROY\n${titleClean.toUpperCase()}`,
          transitionEffect: 'light_fade',
          caption: `Ausstellung: "${titleClean}".\n\n${keywordsClean}\n\nDetails & Infos: www.susanbroy.com\n@syken_broy`,
          hashtags: ['#susanbroy', '#ausstellung', '#minimalismus'],
          audio: 'Pulse of Silence — Atmospheric Beat'
        },
        {
          id: `gen-${Date.now()}-c`,
          name: 'Variante C: Nur Wasserzeichen (Video völlig textil)',
          overlayPosition: 'none',
          overlayText: '',
          transitionEffect: 'slide_push',
          caption: `"${titleClean}".\n\n${keywordsClean}\n\n@syken_broy`,
          hashtags: ['#susanbroy', '#atelier'],
          audio: 'Natural Studio Acoustics — Quiet Space'
        }
      ];
    }
  } else {
    // Atelier / General
    variants = [
      {
        id: `gen-${Date.now()}-a`,
        name: 'Variante A: Kameraschwenk mit unterer Textzeile',
        overlayPosition: 'bottom_bar',
        overlayText: `${titleClean.toUpperCase()}\nAtelier Gauting`,
        transitionEffect: 'zoom_pan',
        caption: `${titleClean}.\n\n${keywordsClean}\n\nAtelier: @syken_broy ${inputData.tags.join(' ')}`,
        hashtags: ['#susanbroy', '#ateliergauting', '#contemporaryart'],
        audio: 'Ambient Calm — Deep Resonance'
      },
      {
        id: `gen-${Date.now()}-b`,
        name: 'Variante B: Licht-Blend-Übergang mit Eck-Titel',
        overlayPosition: 'top_left',
        overlayText: `SUSAN BROY\n${titleClean.toUpperCase()}`,
        transitionEffect: 'light_fade',
        caption: `${titleClean}.\n\n${keywordsClean}\n\n@syken_broy`,
        hashtags: ['#susanbroy', '#minimalart'],
        audio: 'Pulse of Silence — Atmospheric Beat'
      },
      {
        id: `gen-${Date.now()}-c`,
        name: 'Variante C: Reines Video mit dezentem Wasserzeichen',
        overlayPosition: 'none',
        overlayText: '',
        transitionEffect: 'slide_push',
        caption: `${titleClean}.\n\n${keywordsClean}\n\n@syken_broy`,
        hashtags: ['#susanbroy'],
        audio: 'Natural Studio Acoustics — Quiet Space'
      }
    ];
  }

  return {
    id: `post-${Date.now()}`,
    title: titleClean,
    category,
    language: lang,
    date: inputData.date || new Date().toISOString().split('T')[0],
    type: 'reel',
    mediaUrl: inputData.mediaUrl || PRESET_IMAGES[category] || PRESET_IMAGES.exhibition,
    keywords: keywordsClean,
    tags: inputData.tags || ['@syken_broy'],
    location: locClean,
    hours: hoursClean,
    status: 'review_ready',
    variants,
    assetList: inputData.assetList || []
  };
}
