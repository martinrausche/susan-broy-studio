// Minimalist Artwork & Editorial Datasets for Susan Broy

export const CONTENT_CATEGORIES = [
  { id: 'artwork', label: '🗿 Kunstwerk / Skulptur', desc: 'Fokus auf Beton, Metall oder S/W-Malerei' },
  { id: 'exhibition', label: '🏛️ Ausstellung & Vernissage', desc: 'Werbung für Ausstellungen, Galerie, Datum & Öffnungszeiten' },
  { id: 'atelier', label: '🎨 Atelier & Werkstatt-Einblick', desc: 'Impressionen aus dem Atelier Gauting & Arbeitsprozess' },
  { id: 'statement', label: '👤 Portrait & Kunst-Philosophie', desc: 'Gedanken zu "Form im Raum", Zitate & Raumpräsenz' }
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

export const DEMO_POSTS = [
  {
    id: 'post-1',
    title: 'Ausstellung "SPATIAL PRESENCE"',
    category: 'exhibition',
    medium: 'mixed',
    date: '2026-07-28',
    type: 'feed',
    mediaUrl: PRESET_IMAGES.exhibition,
    location: 'Galerie von&von, Nürnberg',
    hours: 'Di-Fr 11-18 Uhr, Sa 11-15 Uhr',
    keywords: 'Ausstellungseröffnung, Skulptur & Raum, Einladung',
    tags: ['@galerie_vonundvon', '@artkarlsruhe'],
    accentColor: '#D4AF37',
    status: 'review_ready',
    variants: [
      {
        id: 'var-1-a',
        name: 'Variant A: Offizielle Vernissage-Einladung',
        style: 'Minimalistische Galerie-Einladung mit Datum & Adresse',
        caption: `HERZLICHE EINLADUNG zur Ausstellung "SPATIAL PRESENCE".\n\nErleben Sie ausgewählte Beton-Skulpturen und großformatige S/W-Grafiken von Susan Broy.\n\n📍 Ort: Galerie von&von, Nürnberg\n🗓️ Vernissage: Freitag, 18.00 Uhr\n🕒 Öffnungszeiten: Di–Fr 11–18 Uhr, Sa 11–15 Uhr\n\nWir freuen uns auf Ihren Besuch.\n@syken_broy @galerie_vonundvon`,
        hashtags: ['#susanbroy', '#ausstellung', '#vernissage', '#contemporaryart', '#nürnberg', '#artgallery'],
        audio: 'Ambient Calm — Deep Resonance',
        layout: 'fullscreen_clean'
      },
      {
        id: 'var-1-b',
        name: 'Variant B: Kuratorisches Statement & Countdown',
        style: 'Architektonischer Textfokus mit Ausstellungs-Informationen',
        caption: `"Form im Raum — Die Kunst der raumgreifenden Präsenz."\n\nAb nächster Woche im Rahmen der Ausstellung "SPATIAL PRESENCE" in Nürnberg zu sehen.\n\nBesuchszeiten & Details: www.susanbroy.com\nMit Werken von @syken_broy`,
        hashtags: ['#susanbroy', '#exhibition2026', '#minimalism', '#sculpturegallery'],
        audio: 'Pulse of Silence — Studio Minimal',
        layout: 'passepartout_dark'
      },
      {
        id: 'var-1-c',
        name: 'Variant C: Atelier & Aufbau-Vorschau',
        style: 'Storytelling über die Vorbereitung der Ausstellung',
        caption: `Der Aufbau läuft.\n\nEinblicke in die Vorbereitungen für die kommende Ausstellung "SPATIAL PRESENCE". Jedes Objekt findet seinen präzisen Ort im Raum.\n\nAtelier: @syken_broy`,
        hashtags: ['#susanbroy', '#behindthescenes', '#exhibitionsetup', '#ateliergauting'],
        audio: 'Natural Studio Acoustics — Quiet Space',
        layout: 'editorial_quote'
      }
    ]
  }
];

export async function generatePostVariants(inputData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const category = inputData.category || 'artwork';
  const mediumInfo = ART_MEDIUMS.find(m => m.id === inputData.medium);

  let generatedVariants = [];

  if (category === 'exhibition') {
    // Exhibition / Vernissage focused post variants
    generatedVariants = [
      {
        id: `gen-${Date.now()}-a`,
        name: 'Variant A: Einladung & Ausstellungsdaten',
        style: 'Klar strukturierte Galerie-Einladung mit Ort & Zeiten',
        caption: `EINLADUNG zur Ausstellung "${inputData.title.toUpperCase()}".\n\n${inputData.keywords || 'Herzliche Einladung zur Ausstellungs-Vorschau.'}\n\n📍 Ort / Galerie: ${inputData.location || 'Atelier Gauting / Galerie'}\n🕒 Öffnungszeiten: ${inputData.hours || 'Di–Fr 11–18 Uhr, Sa 11–15 Uhr'}\n🗓️ Datum: ${inputData.date}\n\nWir freuen uns auf Ihren Besuch.\n@syken_broy ${inputData.tags.join(' ')}`,
        hashtags: ['#susanbroy', '#ausstellung', '#vernissage', '#contemporaryart', '#artgallery', '#exhibition'],
        audio: 'Ambient Calm — Deep Resonance',
        layout: 'fullscreen_clean'
      },
      {
        id: `gen-${Date.now()}-b`,
        name: 'Variant B: Kuratorischer Fokus & Raumkonzept',
        style: 'Architektur-Fokus auf die Präsentation im Galerieraum',
        caption: `AUSSTELLUNG: "${inputData.title}"\n\n"Die Skulptur fordert den Raum – nicht durch Lautstärke, sondern durch Präsenz."\n\nLocation: ${inputData.location || 'Galerie'}\nDetails & Katalog: www.susanbroy.com\n\nAtelier: @syken_broy ${inputData.tags.join(' ')}`,
        hashtags: ['#susanbroy', '#sculptureexhibition', '#artcollector', '#minimalism', '#spatialart'],
        audio: 'Pulse of Silence — Atmospheric Beat',
        layout: 'passepartout_dark'
      },
      {
        id: `gen-${Date.now()}-c`,
        name: 'Variant C: Impressionen & Countdown-Story',
        style: 'Behind-the-Scenes Einblick in den Ausstellungsaufbau',
        caption: `Impressionen vor der Eröffnung von "${inputData.title}".\n\nJede Skulptur besetzt ihren eigenen Raumkontext.\n\nBesuchen Sie uns ab ${inputData.date} in ${inputData.location || 'der Galerie'}.\n@syken_broy`,
        hashtags: ['#susanbroy', '#galleryview', '#contemporarystudio', '#artcurator'],
        audio: 'Natural Studio Acoustics — Quiet Space',
        layout: 'editorial_quote'
      }
    ];
  } else if (category === 'atelier') {
    // Studio / Process focused post variants
    generatedVariants = [
      {
        id: `gen-${Date.now()}-a`,
        name: 'Variant A: Atelier-Impression & Arbeitsprozess',
        style: 'Fokus auf Licht, Werkzeuge und Material-Entstehung im Atelier',
        caption: `EINBLICK INS ATELIER GAUTING.\n\n${inputData.keywords || 'Der Entstehungsprozess im Dialog zwischen Werkstoff und Form.'}\n\nMaterial & Prozess im Fokus.\nKünstlerin: @syken_broy`,
        hashtags: ['#susanbroy', '#ateliergauting', '#behindthescenes', '#workinprogress', '#sculptorstudio'],
        audio: 'Natural Studio Acoustics — Quiet Space',
        layout: 'fullscreen_clean'
      },
      {
        id: `gen-${Date.now()}-b`,
        name: 'Variant B: Materialkunde & Haptik',
        style: 'Haptische Nahaufnahme der Werkzeuge & Rohstoffe',
        caption: `RAU & PRÄZISE.\n\nVom flüssigen Guss zur massiven Form im Raum.\n\nAtelier Gauting — @syken_broy ${inputData.tags.join(' ')}`,
        hashtags: ['#susanbroy', '#materialart', '#haptic', '#contemporaryprocess'],
        audio: 'Ambient Calm — Deep Resonance',
        layout: 'passepartout_dark'
      },
      {
        id: `gen-${Date.now()}-c`,
        name: 'Variant C: Zitat aus dem Atelier',
        style: 'Philosophisches Zitat über die Arbeit im Atelier',
        caption: `"Im Atelier geht es nicht darum, Formen zu erfinden, sondern das Überflüssige wegzulassen."\n\nSusan Broy — @syken_broy`,
        hashtags: ['#susanbroy', '#artistquote', '#minimalistmindset', '#artphilosophy'],
        audio: 'Pulse of Silence — Atmospheric Beat',
        layout: 'editorial_quote'
      }
    ];
  } else if (category === 'statement') {
    // Artist Statement / Philosophy variants
    generatedVariants = [
      {
        id: `gen-${Date.now()}-a`,
        name: 'Variant A: Raumpräsenz & Philosophie',
        style: 'Klassisches Susan Broy Statement zur minimalistischen Kunst',
        caption: `KUNST DER RAUMGREIFENDEN PRÄSENZ.\n\n${inputData.keywords || 'Formen, die den Raum ausfüllen, ohne ihn zu überfordern.'}\n\nMehr zur Philosophie auf www.susanbroy.com\nKünstlerin: @syken_broy`,
        hashtags: ['#susanbroy', '#minimalistart', '#artphilosophy', '#formimraum'],
        audio: 'Ambient Calm — Deep Resonance',
        layout: 'fullscreen_clean'
      },
      {
        id: `gen-${Date.now()}-b`,
        name: 'Variant B: Kuratorisches Zitat',
        style: 'Typografisches Zitat-Layout mit Broy Watermark',
        caption: `"Die Stille der Form erzeugt die Resonanz im Betrachter."\n\nSusan Broy — Studio Gauting\n@syken_broy`,
        hashtags: ['#susanbroy', '#quote', '#contemporarysculpture', '#minimalart'],
        audio: 'Pulse of Silence — Atmospheric Beat',
        layout: 'passepartout_dark'
      },
      {
        id: `gen-${Date.now()}-c`,
        name: 'Variant C: Monochromes Manifest',
        style: 'Reduziertes Schwarz-Weiß Statement',
        caption: `SUSAN BROY — ATELIER GAUTING.\n\nMinimalismus als klare Haltung im Raum.\n\n@syken_broy ${inputData.tags.join(' ')}`,
        hashtags: ['#susanbroy', '#monochromeart', '#sculptureartist'],
        audio: 'Natural Studio Acoustics — Quiet Space',
        layout: 'editorial_quote'
      }
    ];
  } else {
    // Default Artwork / Sculpture variants
    const medLabel = mediumInfo ? mediumInfo.label : 'Kunstwerk';
    generatedVariants = [
      {
        id: `gen-${Date.now()}-a`,
        name: 'Variant A: Architektur & Materialstille',
        style: 'Langsame, meditative Kameraschwenks über Beton/Metall-Strukturen',
        caption: `${inputData.title.toUpperCase()} — Form & Raum.\n\n${inputData.keywords || 'Reduktion auf das Wesentliche.'} Die Wechselwirkung von scharfer Kante und Schatten erzeugt eine raumgreifende Präsenz.\n\nMaterial: ${medLabel}\nAtelier: @syken_broy ${inputData.tags.join(' ')}`,
        hashtags: ['#susanbroy', '#contemporaryart', '#concreteart', '#metalsculpture', '#minimalism', '#formimraum'],
        audio: 'Ambient Calm — Deep Resonance',
        layout: 'fullscreen_clean'
      },
      {
        id: `gen-${Date.now()}-b`,
        name: 'Variant B: Grafischer Kontrast (BROY Frame)',
        style: 'Rahmen-Design mit BROY-Logo-Wasserzeichen & Farbkontrast',
        caption: `Präzision & Haptik.\n\n"${inputData.keywords}" im Fokus. Minimalismus bedeutet nicht Abwesenheit, sondern die perfekte Balance der Elemente.\n\nPartner: ${inputData.tags.join(' ') || '@galerie_vonundvon'}\nKünstlerin: @syken_broy`,
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
  }

  return {
    id: `post-${Date.now()}`,
    title: inputData.title || (category === 'exhibition' ? 'Ausstellung' : 'Unbenanntes Werk'),
    category,
    medium: inputData.medium || 'mixed',
    date: inputData.date || new Date().toISOString().split('T')[0],
    type: inputData.type || 'reel',
    mediaUrl: inputData.mediaUrl || PRESET_IMAGES[category] || PRESET_IMAGES.concrete,
    keywords: inputData.keywords,
    tags: inputData.tags || ['@syken_broy'],
    location: inputData.location,
    hours: inputData.hours,
    accentColor: inputData.accentColor || '#E2F518',
    status: 'review_ready',
    variants: generatedVariants,
    assetList: inputData.assetList || []
  };
}
