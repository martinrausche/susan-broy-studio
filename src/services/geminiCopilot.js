// Minimalist Artwork & Editorial Datasets for Susan Broy

export const CONTENT_CATEGORIES = [
  { id: 'artwork', label: '🗿 Kunstwerk / Skulptur', desc: 'Fokus auf Beton, Metall oder S/W-Malerei' },
  { id: 'exhibition', label: '🏛️ Ausstellung & Vernissage', desc: 'Werbung für Ausstellungen, Galerie, Datum & Öffnungszeiten' },
  { id: 'atelier', label: '🎨 Atelier & Werkstatt-Einblick', desc: 'Impressionen aus dem Atelier Gauting & Arbeitsprozess' },
  { id: 'statement', label: '👤 Portrait & Kunst-Philosophie', desc: 'Gedanken zu "Form im Raum", Zitate & Raumpräsenz' }
];

export const LANGUAGES = [
  { id: 'de', label: '🇩🇪 Deutsch', desc: 'Präziser deutscher Kunst-Kontext' },
  { id: 'en', label: '🇬🇧 English', desc: 'International art collector focus' },
  { id: 'bilingual', label: '🌐 Zweisprachig (DE / EN)', desc: 'Deutsch mit englischer Übersetzung' }
];

export const ART_MEDIUMS = [
  { id: 'concrete', label: 'Beton-Skulptur', accent: '#A0A0B0', desc: 'Raues Mineral, Schattenspiel & massive Form im Raum' },
  { id: 'metal', label: 'Metall-Installation', accent: '#D4AF37', desc: 'Präziser Stahl/Bronze, Lichtreflexe & geometrische Kanten' },
  { id: 'bw_painting', label: 'S/W Grafik + Akzentfarbe', accent: '#E2F518', desc: 'Klarer Kontrast auf Leinwand mit gezieltem Farbakzent' },
  { id: 'mixed', label: 'Beton & Metall Kombination', accent: '#8E8E93', desc: 'Spannungsverhältnis organischer und industrieller Materialien' }
];

export const PRESET_IMAGES = {
  concrete: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85',
  metal: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=85',
  bw_painting: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=85',
  mixed: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
  exhibition: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85',
  atelier: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85'
};

export const REEL_TEXT_OVERLAY_STYLES = [
  { id: 'kinetic_hero', name: 'Kinetic Typography (Zentraler Titel & Fakten)', desc: 'Großer, animierter Haupttitel mit Sanfteinblendung mitten im Video' },
  { id: 'exhibition_card', name: 'Galerie-Poster Overlay (Ort, Datum & Zeiten)', desc: 'Elegante Ausstellungs-Einblendung mit Ort, Vernissage-Datum & Zeiten' },
  { id: 'subtitles_minimal', name: 'Minimalistische Untertitel (Zentriert unten)', desc: 'Schlichte, moderne Textzeilen im unteren Videobereich' },
  { id: 'broy_watermark_quote', name: 'BROY Zitat & Philosophie Overlay', desc: 'Typografische Zitat-Einblendung mit BROY-Logo Wasserzeichen' }
];

export const DEMO_POSTS = [
  {
    id: 'post-1',
    title: 'Ausstellung "SPATIAL PRESENCE"',
    category: 'exhibition',
    language: 'de',
    medium: 'mixed',
    date: '2026-07-28',
    type: 'reel',
    mediaUrl: PRESET_IMAGES.exhibition,
    location: 'Galerie von&von, Nürnberg',
    hours: 'Di–Fr 11–18 Uhr, Sa 11–15 Uhr',
    keywords: 'Ausstellungseröffnung, Skulptur & Raum, Einladung',
    tags: ['@galerie_vonundvon', '@artkarlsruhe'],
    accentColor: '#D4AF37',
    status: 'review_ready',
    variants: [
      {
        id: 'var-1-a',
        name: 'Variante A: Ausstellungs-Poster Overlay (Werbung mit Daten)',
        overlayStyle: 'exhibition_card',
        overlayText: 'AUSSTELLUNG "SPATIAL PRESENCE"\nGalerie von&von, Nürnberg\nVernissage: 28. Juli 2026\nÖffnungszeiten: Di–Fr 11–18 Uhr',
        style: 'Dynamischer Kameraschwenk mit eingeblendeten Ausstellungs-Eckdaten direkt im Video',
        caption: `HERZLICHE EINLADUNG zur Ausstellung "SPATIAL PRESENCE".\n\nErleben Sie ausgewählte Beton-Skulpturen und großformatige S/W-Grafiken von Susan Broy.\n\n📍 Ort: Galerie von&von, Nürnberg\n🗓️ Eröffnung: 28. Juli 2026\n🕒 Öffnungszeiten: Di–Fr 11–18 Uhr, Sa 11–15 Uhr\n\nWir freuen uns auf Ihren Besuch.\n@syken_broy @galerie_vonundvon`,
        hashtags: ['#susanbroy', '#ausstellung', '#vernissage', '#contemporaryart', '#nürnberg', '#artgallery'],
        audio: 'Ambient Calm — Deep Resonance',
        transitionEffect: 'ken_burns_zoom'
      },
      {
        id: 'var-1-b',
        name: 'Variante B: Kinetic Typography Reel (Dynamische Texteinblendung)',
        overlayStyle: 'kinetic_hero',
        overlayText: 'SUSAN BROY\nSPATIAL PRESENCE\nGALERIE VON&VON',
        style: 'Große kinetische Schrift-Einblendung synchron zur Musik',
        caption: `Skulptur & Raumpräsenz.\n\nAb 28. Juli 2026 im Rahmen der Ausstellung "SPATIAL PRESENCE" in Nürnberg zu sehen.\n\nDetails: www.susanbroy.com\nKünstlerin: @syken_broy`,
        hashtags: ['#susanbroy', '#exhibition2026', '#minimalism', '#sculpturegallery'],
        audio: 'Pulse of Silence — Atmospheric Beat',
        transitionEffect: 'light_sweep'
      },
      {
        id: 'var-1-c',
        name: 'Variante C: Atelier-Prozess & Einblick (Behind The Scenes)',
        overlayStyle: 'broy_watermark_quote',
        overlayText: '"Jedes Werkstück fordert seinen eigenen Ort im Raum."',
        style: 'Werkstatt-Impressionen mit animiertem Zitat-Overlay im Video',
        caption: `Der Aufbau läuft.\n\nEinblicke in die Vorbereitungen für die kommende Ausstellung "SPATIAL PRESENCE". Jedes Objekt findet seinen präzisen Ort im Raum.\n\nAtelier: @syken_broy`,
        hashtags: ['#susanbroy', '#behindthescenes', '#exhibitionsetup', '#ateliergauting'],
        audio: 'Natural Studio Acoustics — Quiet Space',
        transitionEffect: 'slow_pan'
      }
    ]
  }
];

export async function generatePostVariants(inputData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const category = inputData.category || 'artwork';
  const lang = inputData.language || 'de'; // 'de', 'en', 'bilingual'
  const mediumInfo = ART_MEDIUMS.find(m => m.id === inputData.medium);

  const titleClean = inputData.title || (category === 'exhibition' ? 'Ausstellung' : category === 'atelier' ? 'Atelier Gauting' : 'Skulptur');
  const locClean = inputData.location || 'Atelier Gauting';
  const hoursClean = inputData.hours || 'Nach Vereinbarung';
  const keywordsClean = inputData.keywords || (lang === 'en' ? 'Form in space, silence, reduction' : 'Form im Raum, Stille, Reduktion');

  let generatedVariants = [];

  if (lang === 'en') {
    // Pure English Generation
    if (category === 'exhibition') {
      generatedVariants = [
        {
          id: `gen-${Date.now()}-a`,
          name: 'Variant A: Exhibition Poster Overlay (In-Video Event Details)',
          overlayStyle: 'exhibition_card',
          overlayText: `EXHIBITION "${titleClean.toUpperCase()}"\n📍 ${locClean}\n🗓️ Opening: ${inputData.date}\n🕒 Hours: ${hoursClean}`,
          style: 'Video Reel with burned-in exhibition details (Location, Date & Hours)',
          caption: `INVITATION to the exhibition "${titleClean}".\n\n${keywordsClean}\n\n📍 Location: ${locClean}\n🗓️ Opening Date: ${inputData.date}\n🕒 Visiting Hours: ${hoursClean}\n\nArtist: @syken_broy ${inputData.tags.join(' ')}`,
          hashtags: ['#susanbroy', '#exhibition', '#vernissage', '#contemporaryart', '#artgallery', '#artcollector'],
          audio: 'Ambient Calm — Deep Resonance',
          transitionEffect: 'ken_burns_zoom'
        },
        {
          id: `gen-${Date.now()}-b`,
          name: 'Variant B: Kinetic Typography Reel (Bold In-Video Text)',
          overlayStyle: 'kinetic_hero',
          overlayText: `SUSAN BROY\n${titleClean.toUpperCase()}\n${locClean.toUpperCase()}`,
          style: 'Large kinetic typography projected directly onto the video clip',
          caption: `EXHIBITION: "${titleClean}"\n\n"Sculpture demands space — not through volume, but presence."\n\nLocation: ${locClean}\nInformation & Catalog: www.susanbroy.com\n\n@syken_broy ${inputData.tags.join(' ')}`,
          hashtags: ['#susanbroy', '#sculptureexhibition', '#artcollector', '#minimalism', '#spatialart'],
          audio: 'Pulse of Silence — Atmospheric Beat',
          transitionEffect: 'light_sweep'
        },
        {
          id: `gen-${Date.now()}-c`,
          name: 'Variant C: Statement & Philosophy Overlay',
          overlayStyle: 'broy_watermark_quote',
          overlayText: `"Form in space – The quiet art of space-filling presence."`,
          style: 'Minimalist quote projection on the exhibition video clip',
          caption: `Behind the scenes before the opening of "${titleClean}".\n\n${keywordsClean}\n\nVisit us starting ${inputData.date} at ${locClean}.\n@syken_broy`,
          hashtags: ['#susanbroy', '#galleryview', '#contemporarystudio', '#artcurator'],
          audio: 'Natural Studio Acoustics — Quiet Space',
          transitionEffect: 'slow_pan'
        }
      ];
    } else {
      const medLabel = mediumInfo ? mediumInfo.label : 'Sculpture';
      generatedVariants = [
        {
          id: `gen-${Date.now()}-a`,
          name: 'Variant A: Kinetic Artwork Title (In-Video Text)',
          overlayStyle: 'kinetic_hero',
          overlayText: `${titleClean.toUpperCase()}\n${medLabel.toUpperCase()}`,
          style: 'Artwork video with floating title & material designation',
          caption: `${titleClean.toUpperCase()} — Form & Space.\n\n${keywordsClean}\n\nMaterial: ${medLabel}\nStudio: @syken_broy ${inputData.tags.join(' ')}`,
          hashtags: ['#susanbroy', '#contemporaryart', '#concreteart', '#metalsculpture', '#minimalism', '#spatialart'],
          audio: 'Ambient Calm — Deep Resonance',
          transitionEffect: 'ken_burns_zoom'
        },
        {
          id: `gen-${Date.now()}-b`,
          name: 'Variant B: Gallery Poster Overlay',
          overlayStyle: 'exhibition_card',
          overlayText: `${titleClean.toUpperCase()}\nMaterial: ${medLabel}\nAtelier Susan Broy, Gauting`,
          style: 'Gallery poster overlay in the upper third of the video reel',
          caption: `Precision & Haptics.\n\n"${keywordsClean}" in focus.\n\nPartner: ${inputData.tags.join(' ') || '@galerie_vonundvon'}\nArtist: @syken_broy`,
          hashtags: ['#susanbroy', '#minimalistart', '#artgallery', '#sculptor', '#artcollector'],
          audio: 'Pulse of Silence — Atmospheric Beat',
          transitionEffect: 'light_sweep'
        },
        {
          id: `gen-${Date.now()}-c`,
          name: 'Variant C: Quote & Spatial Effect Overlay',
          overlayStyle: 'broy_watermark_quote',
          overlayText: `"Silence of form, presence in space."`,
          style: 'Minimalist quote projection on artwork video clip',
          caption: `Presence in space.\n\n${keywordsClean}\n\nVisit www.susanbroy.com for further insights.\n@syken_broy`,
          hashtags: ['#susanbroy', '#exhibition', '#ateliergauting', '#contemporarystudio'],
          audio: 'Natural Studio Acoustics — Quiet Space',
          transitionEffect: 'slow_pan'
        }
      ];
    }
  } else if (lang === 'bilingual') {
    // Bilingual (German first, English second)
    generatedVariants = [
      {
        id: `gen-${Date.now()}-a`,
        name: 'Variante A: Zweisprachiges Video-Poster (DE / EN)',
        overlayStyle: 'exhibition_card',
        overlayText: `${titleClean.toUpperCase()}\n📍 ${locClean}\n🗓️ ${inputData.date} | Opening\n🕒 ${hoursClean}`,
        style: 'Zweisprachiges Video-Reel mit eingebrannter Einladung (DE / EN)',
        caption: `HERZLICHE EINLADUNG zur Ausstellung "${titleClean}".\n${keywordsClean}\n\n📍 Ort / Location: ${locClean}\n🗓️ Datum / Date: ${inputData.date}\n🕒 Öffnungszeiten / Hours: ${hoursClean}\n\n—\nINVITATION to the exhibition "${titleClean}". We look forward to your visit.\n\n@syken_broy ${inputData.tags.join(' ')}`,
        hashtags: ['#susanbroy', '#ausstellung', '#exhibition', '#contemporaryart', '#artgallery'],
        audio: 'Ambient Calm — Deep Resonance',
        transitionEffect: 'ken_burns_zoom'
      },
      {
        id: `gen-${Date.now()}-b`,
        name: 'Variante B: Kinetischer Zweisprachiger Titel (DE / EN)',
        overlayStyle: 'kinetic_hero',
        overlayText: `SUSAN BROY\n${titleClean.toUpperCase()}\n${locClean.toUpperCase()}`,
        style: 'Zweisprachige kinetische Schrifteinblendung im Video',
        caption: `SUSAN BROY — "${titleClean}"\n\nForm im Raum • Form in space.\n\nBesuchen Sie / Visit: www.susanbroy.com\n@syken_broy ${inputData.tags.join(' ')}`,
        hashtags: ['#susanbroy', '#minimalism', '#spatialart', '#artcollector'],
        audio: 'Pulse of Silence — Atmospheric Beat',
        transitionEffect: 'light_sweep'
      },
      {
        id: `gen-${Date.now()}-c`,
        name: 'Variante C: Zweisprachiges Zitat-Overlay',
        overlayStyle: 'broy_watermark_quote',
        overlayText: `"Form im Raum – The quiet art of space-filling presence."`,
        style: 'Zweisprachiges Zitat-Overlay mit BROY-Logo auf dem Reel',
        caption: `Atelier Gauting — Susan Broy.\n\n"Präsenz im Raum • Presence in space."\n\n@syken_broy`,
        hashtags: ['#susanbroy', '#ateliergauting', '#sculptorstudio'],
        audio: 'Natural Studio Acoustics — Quiet Space',
        transitionEffect: 'slow_pan'
      }
    ];
  } else {
    // Pure German Generation (Default)
    if (category === 'exhibition') {
      generatedVariants = [
        {
          id: `gen-${Date.now()}-a`,
          name: 'Variante A: Ausstellungs-Poster Overlay (Werbung im Video)',
          overlayStyle: 'exhibition_card',
          overlayText: `${titleClean.toUpperCase()}\n📍 ${locClean}\n🗓️ Ab ${inputData.date}\n🕒 ${hoursClean}`,
          style: 'Video-Reel mit direkt eingebrannten Ausstellungs-Eckdaten (Ort, Datum & Zeiten)',
          caption: `HERZLICHE EINLADUNG zur Ausstellung "${titleClean}".\n\n${keywordsClean}\n\n📍 Ort: ${locClean}\n🗓️ Datum: ${inputData.date}\n🕒 Öffnungszeiten: ${hoursClean}\n\nWir freuen uns auf Ihren Besuch.\n@syken_broy ${inputData.tags.join(' ')}`,
          hashtags: ['#susanbroy', '#ausstellung', '#vernissage', '#contemporaryart', '#artgallery', '#exhibition'],
          audio: 'Ambient Calm — Deep Resonance',
          transitionEffect: 'ken_burns_zoom'
        },
        {
          id: `gen-${Date.now()}-b`,
          name: 'Variante B: Kinetic Typography Reel (Dynamische Schrift)',
          overlayStyle: 'kinetic_hero',
          overlayText: `SUSAN BROY\n${titleClean.toUpperCase()}\n${locClean.toUpperCase()}`,
          style: 'Große, rhythmische Text-Einblendungen direkt auf den Videoclip projiziert',
          caption: `AUSSTELLUNG: "${titleClean}"\n\n${keywordsClean}\n\nLocation: ${locClean}\nInformationen & Katalog: www.susanbroy.com\n\n@syken_broy ${inputData.tags.join(' ')}`,
          hashtags: ['#susanbroy', '#sculptureexhibition', '#artcollector', '#minimalism', '#spatialart'],
          audio: 'Pulse of Silence — Atmospheric Beat',
          transitionEffect: 'light_sweep'
        },
        {
          id: `gen-${Date.now()}-c`,
          name: 'Variante C: Zitat & Philosophie Overlay',
          overlayStyle: 'broy_watermark_quote',
          overlayText: `"Form im Raum – Die Kunst der raumgreifenden Präsenz."`,
          style: 'Minimalistische Zitat-Einblendung mit BROY-Logo auf dem Reel',
          caption: `Impressionen vor der Eröffnung von "${titleClean}".\n\n${keywordsClean}\n\nBesuchen Sie uns ab ${inputData.date} in ${locClean}.\n@syken_broy`,
          hashtags: ['#susanbroy', '#galleryview', '#contemporarystudio', '#artcurator'],
          audio: 'Natural Studio Acoustics — Quiet Space',
          transitionEffect: 'slow_pan'
        }
      ];
    } else if (category === 'atelier') {
      generatedVariants = [
        {
          id: `gen-${Date.now()}-a`,
          name: 'Variante A: Atelier-Impression & Videotext',
          overlayStyle: 'kinetic_hero',
          overlayText: `ATELIER GAUTING\n${titleClean.toUpperCase()}\nWERKSTATT-EINBLICK`,
          style: 'Behind-The-Scenes Videoclip mit eingebranntem Werkstatt-Titel',
          caption: `EINBLICK INS ATELIER GAUTING.\n\n${keywordsClean}\n\nDer Entstehungsprozess im Dialog zwischen Werkstoff und Form.\nKünstlerin: @syken_broy`,
          hashtags: ['#susanbroy', '#ateliergauting', '#behindthescenes', '#workinprogress', '#sculptorstudio'],
          audio: 'Natural Studio Acoustics — Quiet Space',
          transitionEffect: 'slow_pan'
        },
        {
          id: `gen-${Date.now()}-b`,
          name: 'Variante B: Materialkunde Video-Overlay',
          overlayStyle: 'subtitles_minimal',
          overlayText: `Werkstoff & Haptik — Atelier Gauting`,
          style: 'Haptische Video-Nahaufnahme mit zentrierten Untertiteln',
          caption: `RAU & PRÄZISE.\n\n${keywordsClean}\n\nVom flüssigen Guss zur massiven Form im Raum.\nAtelier Gauting — @syken_broy ${inputData.tags.join(' ')}`,
          hashtags: ['#susanbroy', '#materialart', '#haptic', '#contemporaryprocess'],
          audio: 'Ambient Calm — Deep Resonance',
          transitionEffect: 'ken_burns_zoom'
        },
        {
          id: `gen-${Date.now()}-c`,
          name: 'Variante C: Zitat auf Videoclip',
          overlayStyle: 'broy_watermark_quote',
          overlayText: `"Im Atelier geht es nicht darum, Formen zu erfinden, sondern das Überflüssige wegzulassen."`,
          style: 'Typografische Zitat-Animation auf den Werkstatt-Videoclip',
          caption: `"Im Atelier geht es nicht darum, Formen zu erfinden, sondern das Überflüssige wegzulassen."\n\nSusan Broy — @syken_broy`,
          hashtags: ['#susanbroy', '#artistquote', '#minimalistmindset', '#artphilosophy'],
          audio: 'Pulse of Silence — Atmospheric Beat',
          transitionEffect: 'light_sweep'
        }
      ];
    } else {
      const medLabel = mediumInfo ? mediumInfo.label : 'Beton & Metall';
      generatedVariants = [
        {
          id: `gen-${Date.now()}-a`,
          name: 'Variante A: Kinetischer Werkstitteltitel (In-Video Text)',
          overlayStyle: 'kinetic_hero',
          overlayText: `${titleClean.toUpperCase()}\n${medLabel.toUpperCase()}`,
          style: 'Werkstück-Video mit direkt im Video schwebendem Titel & Materialbezeichnung',
          caption: `${titleClean.toUpperCase()} — Form & Raum.\n\n${keywordsClean}\n\nMaterial: ${medLabel}\nAtelier: @syken_broy ${inputData.tags.join(' ')}`,
          hashtags: ['#susanbroy', '#contemporaryart', '#concreteart', '#metalsculpture', '#minimalism', '#formimraum'],
          audio: 'Ambient Calm — Deep Resonance',
          transitionEffect: 'ken_burns_zoom'
        },
        {
          id: `gen-${Date.now()}-b`,
          name: 'Variante B: Galerie-Passpartout Overlay',
          overlayStyle: 'exhibition_card',
          overlayText: `${titleClean.toUpperCase()}\nMaterial: ${medLabel}\nAtelier Susan Broy, Gauting`,
          style: 'Galerie-Poster Einblendung im oberen Drittel des Reel-Videos',
          caption: `Präzision & Haptik.\n\n"${keywordsClean}" im Fokus.\n\nPartner: ${inputData.tags.join(' ') || '@galerie_vonundvon'}\nKünstlerin: @syken_broy`,
          hashtags: ['#susanbroy', '#minimalistart', '#artgallery', '#sculptor', '#artcollector'],
          audio: 'Pulse of Silence — Atmospheric Beat',
          transitionEffect: 'light_sweep'
        },
        {
          id: `gen-${Date.now()}-c`,
          name: 'Variante C: Zitat & Raumwirkung Overlay',
          overlayStyle: 'broy_watermark_quote',
          overlayText: `"Stille der Form, Präsenz im Raum."`,
          style: 'Minimalistische Zitat-Projektion direkt auf das Kunstwerk-Video',
          caption: `Präsenz im Raum.\n\n${keywordsClean}\n\nBesuchen Sie www.susanbroy.com für weitere Einblicke.\n@syken_broy`,
          hashtags: ['#susanbroy', '#exhibition', '#ateliergauting', '#contemporarystudio'],
          audio: 'Natural Studio Acoustics — Quiet Space',
          transitionEffect: 'slow_pan'
        }
      ];
    }
  }

  return {
    id: `post-${Date.now()}`,
    title: titleClean,
    category,
    language: lang,
    medium: inputData.medium || 'mixed',
    date: inputData.date || new Date().toISOString().split('T')[0],
    type: 'reel',
    mediaUrl: inputData.mediaUrl || PRESET_IMAGES[category] || PRESET_IMAGES.concrete,
    keywords: keywordsClean,
    tags: inputData.tags || ['@syken_broy'],
    location: locClean,
    hours: hoursClean,
    accentColor: inputData.accentColor || '#E2F518',
    status: 'review_ready',
    variants: generatedVariants,
    assetList: inputData.assetList || []
  };
}
