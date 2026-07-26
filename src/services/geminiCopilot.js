// Minimalist Artwork & Editorial Datasets for Susan Broy - High Creativity Engine

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

export const PRESET_IMAGES = {
  exhibition: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85',
  atelier: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
  artwork: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85'
};

export const REEL_TRANSITION_EFFECTS = [
  { id: 'zoom_pan', label: '🔍 Ken-Burns Raum-Zoom', desc: 'Kamera schwenkt durch den Raum' },
  { id: 'light_fade', label: '✨ Lichtblitz / Crossfade', desc: 'Eleganter Hell-Dunkel-Übergang' },
  { id: 'slide_push', label: '↔️ Horizontaler Slide', desc: 'Dynamischer Bildwechsel' }
];

export const TYPOGRAPHY_LAYOUT_PRESETS = [
  { id: 'angled_top', name: '📐 Schräge Schrift im Weißraum (-8° Tilt)', zone: 'negative_space_top' },
  { id: 'vertical_margin', name: '▍ Vertikale Seitenschrift (Senkrecht 90°)', zone: 'negative_space_side' },
  { id: 'top_left_clean', name: '↖️ Obere linke Ecke im Freiraum', zone: 'top_left' },
  { id: 'top_right_clean', name: '↗️ Obere rechte Ecke im Freiraum', zone: 'top_right' }
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
          name: 'Variant A: Angled Negative Space (-8° Tilt in White Space)',
          layoutPreset: 'angled_top',
          overlayPosition: 'top_angled',
          rotationAngle: '-8deg',
          textColor: 'black',
          overlayText: `${titleClean.toUpperCase()}\n${locClean}${hoursString}`,
          transitionEffect: 'zoom_pan',
          caption: `EXHIBITION "${titleClean}".\n\n${keywordsClean}\n\n📍 Location: ${locClean}\n🗓️ Date: ${inputData.date}\n🕒 Hours: ${hoursClean}\n\n@syken_broy ${inputData.tags.join(' ')}`,
          hashtags: ['#susanbroy', '#exhibition', '#contemporaryart', '#artgallery'],
          audio: 'Ambient Calm — Deep Resonance'
        },
        {
          id: `gen-${Date.now()}-b`,
          name: 'Variant B: Vertical Margin Stamp (Senkrecht an der Seite)',
          layoutPreset: 'vertical_margin',
          overlayPosition: 'side_vertical',
          rotationAngle: '90deg',
          textColor: 'black',
          overlayText: `SUSAN BROY • ${titleClean.toUpperCase()}`,
          transitionEffect: 'light_fade',
          caption: `Exhibition: "${titleClean}".\n\n${keywordsClean}\n\nInfo: www.susanbroy.com\n@syken_broy`,
          hashtags: ['#susanbroy', '#sculpture', '#minimalism'],
          audio: 'Pulse of Silence — Atmospheric Beat'
        },
        {
          id: `gen-${Date.now()}-c`,
          name: 'Variant C: Top-Right Clean Negative Space Header',
          layoutPreset: 'top_right_clean',
          overlayPosition: 'top_right',
          rotationAngle: '0deg',
          textColor: 'black',
          overlayText: `${titleClean.toUpperCase()}\nOPENING ${inputData.date}`,
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
          name: 'Variante A: Schräge Schrift im Weißraum (-8° Tilt im Freiraum)',
          layoutPreset: 'angled_top',
          overlayPosition: 'top_angled',
          rotationAngle: '-8deg',
          textColor: 'black',
          overlayText: `${titleClean.toUpperCase()}\n${locClean}${hoursString}`,
          transitionEffect: 'zoom_pan',
          caption: `HERZLICHE EINLADUNG zur Ausstellung "${titleClean}".\n\n${keywordsClean}\n\n📍 Ort: ${locClean}\n🗓️ Datum: ${inputData.date}\n🕒 Öffnungszeiten: ${hoursClean}\n\n@syken_broy ${inputData.tags.join(' ')}`,
          hashtags: ['#susanbroy', '#ausstellung', '#vernissage', '#contemporaryart'],
          audio: 'Ambient Calm — Deep Resonance'
        },
        {
          id: `gen-${Date.now()}-b`,
          name: 'Variante B: Vertikale Seitenschrift (Senkrecht am Rand)',
          layoutPreset: 'vertical_margin',
          overlayPosition: 'side_vertical',
          rotationAngle: '90deg',
          textColor: 'black',
          overlayText: `SUSAN BROY • ${titleClean.toUpperCase()}`,
          transitionEffect: 'light_fade',
          caption: `Ausstellung: "${titleClean}".\n\n${keywordsClean}\n\nDetails & Infos: www.susanbroy.com\n@syken_broy`,
          hashtags: ['#susanbroy', '#ausstellung', '#minimalismus'],
          audio: 'Pulse of Silence — Atmospheric Beat'
        },
        {
          id: `gen-${Date.now()}-c`,
          name: 'Variante C: Obere rechte Ecke im Freiraum über dem Objekt',
          layoutPreset: 'top_right_clean',
          overlayPosition: 'top_right',
          rotationAngle: '0deg',
          textColor: 'black',
          overlayText: `${titleClean.toUpperCase()}\nVERNISSAGE ${inputData.date}`,
          transitionEffect: 'slide_push',
          caption: `"${titleClean}".\n\n${keywordsClean}\n\n@syken_broy`,
          hashtags: ['#susanbroy', '#atelier'],
          audio: 'Natural Studio Acoustics — Quiet Space'
        }
      ];
    }
  } else {
    // Atelier / General Artwork
    variants = [
      {
        id: `gen-${Date.now()}-a`,
        name: 'Variante A: Schräge Dynamik-Schrift im Weißraum (-10° Tilt)',
        layoutPreset: 'angled_top',
        overlayPosition: 'top_angled',
        rotationAngle: '-10deg',
        textColor: 'black',
        overlayText: `${titleClean.toUpperCase()}\nATELIER GAUTING`,
        transitionEffect: 'zoom_pan',
        caption: `${titleClean}.\n\n${keywordsClean}\n\nAtelier: @syken_broy ${inputData.tags.join(' ')}`,
        hashtags: ['#susanbroy', '#ateliergauting', '#contemporaryart'],
        audio: 'Ambient Calm — Deep Resonance'
      },
      {
        id: `gen-${Date.now()}-b`,
        name: 'Variante B: Senkrechter Galerie-Stempel (90° Vertikal)',
        layoutPreset: 'vertical_margin',
        overlayPosition: 'side_vertical',
        rotationAngle: '90deg',
        textColor: 'black',
        overlayText: `SUSAN BROY • ${titleClean.toUpperCase()}`,
        transitionEffect: 'light_fade',
        caption: `${titleClean}.\n\n${keywordsClean}\n\n@syken_broy`,
        hashtags: ['#susanbroy', '#minimalart'],
        audio: 'Pulse of Silence — Atmospheric Beat'
      },
      {
        id: `gen-${Date.now()}-c`,
        name: 'Variante C: Freistehender Eck-Titel im oberen Weißraum',
        layoutPreset: 'top_left_clean',
        overlayPosition: 'top_left',
        rotationAngle: '0deg',
        textColor: 'black',
        overlayText: `${titleClean.toUpperCase()}\nGAUTING STUDIO`,
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
