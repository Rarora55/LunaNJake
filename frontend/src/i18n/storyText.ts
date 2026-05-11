import type { Lang } from '../config/storySequence'

const STORY_TEXT = {
  en: {
    story: {
      theFirstTime: 'The first time they saw each other',
      itWas10Am: 'It was 10 am and Luna was still wearing her night-before attire and makeup.',
      facingTheMorning: "Facing the morning after staying over at Jake's flat following a party where she had met his flatmates.",
      readyWallOfShame: 'Ready to face the walk of shame, Jake asked her "who are you?"',
      yourNewFlatmate: 'and Luna replied, "your new flatmate".',
      sheWasNotWrong: 'She was not wrong...!',
    },
    address: {
      venue: "Pelham House, Saint Andrew's Lane, Lewes, UK",
      detailsHover: 'Hover for details',
      detailsTap: 'Tap for details',
      busFrontTime: '11:00am',
      busFrontLabel: 'Shuttle Bus',
      busBackTitle: '11:00am Shuttle Bus',
      busBackDescription:
        'Shuttle buses will depart from Lewes station and head straight to the wedding. Don’t be late!',
      busLocation: 'Lewes Station Car Park, Lewes, UK',
      ceremonyFrontTime: '13:00pm',
      ceremonyFrontLabel: 'Ceremony and Reception',
      ceremonyBackTitle: '13:00pm Ceremony and Reception',
      ceremonyBackDescription:
        'We’re tying the knot! We’d love to say a few words to everyone. Dinner, drinks, and dancing to follow!',
      dressCodeLabel: 'Cocktail Attire',
      ceremonyLocation: "Pelham House, Saint Andrew's Lane, Lewes, UK",
      brunchFrontTime: 'TBA',
      brunchFrontLabel: 'Post-Wedding Brunch',
      brunchBackTitle: 'Post-Wedding Brunch TBA',
      brunchBackDescription:
        'For anyone staying an extra day, we’ll be putting on a breakfast, watch this space for details.',
      brunchLocation: "Pelham House, Saint Andrew's Lane, Lewes, UK",
    },
    abroad: {
      leftTitle: 'To Gatwick',
      rightTitle: 'Then',
      leftCard: 'We recommend flying into London, Gatwick International Airport!',
      rightCard: 'From Gatwick Airport, either a Taxi or a direct train to Lewes (29 minutes).',
    },
    london: {
      leftTitle: 'Traveling From London',
      rightTitle: 'What are the local Taxi numbers?',
      leftCard: 'Direct train from London Victoria to Lewes (1h 02 mins).',
      rightCard: 'Local taxi contacts:',
      taxi1: 'GM Taxis — 01273 473737',
      taxi2: 'Lewes and District Taxis — 01273 483232',
      taxi3: 'Lewes County Cars — 01273 474444',
      taxi4: 'Green Taxi — 01273 472323',
      taxiLocationLabel: 'Lewes, UK',
    },
    stay: {
      title: 'Where to stay',
      intro: 'A few lovely options near Lewes and Brighton.',
      mapTitle: 'Hotels map',
      ctaLabel: 'Visit hotel',
      mapOptionsLabel: 'More map options:',
      mapOptions: [
        { label: 'Lewes hotels', href: 'https://www.google.com/maps/search/hotels+in+Lewes+UK' },
        { label: 'Brighton hotels', href: 'https://www.google.com/maps/search/hotels+in+Brighton+UK' },
        { label: 'Near Lewes station', href: 'https://www.google.com/maps/search/hotels+near+Lewes+Station' },
        { label: 'The Old Ship Hotel', href: 'https://www.google.com/maps/search/The+Old+Ship+Hotel+Brighton' },
      ],
      hotels: [
        {
          name: 'Pelham House',
          description: 'Elegant Georgian property in central Lewes with rooms at the wedding venue itself.',
          price: 'Approx. GBP160-GBP300/night',
          location: 'Lewes, UK',
          link: 'https://www.pelhamhouse.com/',
          imageSrc: 'https://pelhamhouse.co.uk/static/uploads/sites/5/2025/12/Pelham-House-confetti-shot-Samantha-Pells-Photography-1536x1024.webp',
        },
        {
          name: 'The White Hart Hotel',
          description: 'Historic coaching inn on Lewes High Street, recently refurbished.',
          price: 'Approx. GBP120-GBP240/night',
          location: 'Lewes, UK',
          link: 'https://whitehartlewes.com/',
          imageSrc: 'https://cms.heartwoodcollection.com/whitehartlewes/wp-content/uploads/sites/30/2025/05/the-white-hart-lewes-exterior-1024x1024.jpg',
        },
        {
          name: 'The Old Ship Hotel',
          description: 'Historic seafront Brighton hotel, close to The Lanes and the pier.',
          price: 'Approx. GBP100-GBP240/night',
          location: 'Brighton, UK',
          link: 'https://www.oldshipbrighton.co.uk/',
          imageSrc: 'https://webbox.imgix.net/images/lxxtciwwseoiziow/300c4888-f037-4a58-81f4-badbfbd96878.jpg?auto=format,compress&fit=crop&crop=entropy&w=750&h=600',
        },
        {
          name: 'The Grand Brighton',
          description: 'Iconic seafront hotel with easy access to central Brighton.',
          price: 'Approx. GBP170-GBP320/night',
          location: 'Brighton, UK',
          link: 'https://www.grandbrighton.co.uk/',
          imageSrc: 'https://www.grandbrighton.co.uk/image/fit/440x276/cms/grandbrighton/images/new/50531925078_feef5503c7_o.jpg',
        },
        {
          name: 'Hotel du Vin Brighton',
          description: 'Boutique stay in The Lanes, moments from the seafront.',
          price: 'Approx. GBP140-GBP280/night',
          location: 'Brighton, UK',
          link: 'https://www.hotelduvin.com/locations/brighton/',
          imageSrc: 'https://www.hotelduvin.com/media/5gne4flj/hdv-brighton-seaview-suite-1.jpg?width=1440&height=720&format=webp&v=1da2de000488d90',
        },
        {
          name: 'Leonardo Hotel Brighton',
          description: 'Convenient modern option next to Brighton railway station.',
          price: 'Approx. GBP100-GBP220/night',
          location: 'Brighton, UK',
          link: 'https://www.leonardo-hotels.com/brighton/leonardo-hotel-brighton',
          imageSrc: 'https://media.leonardo-hotels.com/static.leonardo-hotels.com/image/leonardo-brighton_reception_04_small_05da3d63cec20f91c7189cb30be5075f.jpg?width=2000',
        },
      ],
    },
    message: {
      title: 'Message to the guests',
      intro: 'Leave a note for Luna and Jake.',
      nameLabel: 'Name',
      messageLabel: 'Message',
      sendLabel: 'Send',
      paperAlt: 'Message paper board',
    },
  },
  it: {
    story: {
      theFirstTime: 'La prima volta che si sono visti',
      itWas10Am: 'Erano le 10 e Luna indossava ancora il look della sera prima.',
      facingTheMorning: "Affrontava il mattino dopo aver dormito da Jake, dopo una festa in cui aveva conosciuto i suoi coinquilini.",
      readyWallOfShame: 'Pronta per la walk of shame, Jake le chiese "chi sei?"',
      yourNewFlatmate: 'e Luna rispose: "la tua nuova coinquilina".',
      sheWasNotWrong: 'Non aveva torto...!',
    },
    address: {
      venue: "Pelham House, Saint Andrew's Lane, Lewes, UK",
      detailsHover: 'Passa il mouse per i dettagli',
      detailsTap: 'Tocca per i dettagli',
      busFrontTime: '11:00am',
      busFrontLabel: 'Shuttle Bus',
      busBackTitle: '11:00am Shuttle Bus',
      busBackDescription:
        'I bus navetta partiranno dalla stazione di Lewes e andranno direttamente al matrimonio. Non fate tardi!',
      busLocation: 'Lewes Station Car Park, Lewes, UK',
      ceremonyFrontTime: '13:00pm',
      ceremonyFrontLabel: 'Cerimonia e Ricevimento',
      ceremonyBackTitle: '13:00pm Cerimonia e Ricevimento',
      ceremonyBackDescription:
        'Ci sposiamo! Ci piacerebbe dire qualche parola a tutti. A seguire: cena, drink e balli!',
      dressCodeLabel: 'Cocktail Attire',
      ceremonyLocation: "Pelham House, Saint Andrew's Lane, Lewes, UK",
      brunchFrontTime: 'TBA',
      brunchFrontLabel: 'Brunch post-matrimonio',
      brunchBackTitle: 'Brunch post-matrimonio TBA',
      brunchBackDescription:
        'Per chi si fermerà un giorno in più, organizzeremo una colazione, maggiori dettagli in arrivo.',
      brunchLocation: "Pelham House, Saint Andrew's Lane, Lewes, UK",
    },
    abroad: {
      leftTitle: 'Per Gatwick',
      rightTitle: 'Poi',
      leftCard: "Consigliamo di volare su Londra, all'aeroporto internazionale di Gatwick!",
      rightCard: "Dall'aeroporto di Gatwick, puoi prendere un taxi oppure un treno diretto per Lewes (29 minuti).",
    },
    london: {
      leftTitle: 'In Arrivo da Londra',
      rightTitle: 'Quali sono i numeri dei taxi locali?',
      leftCard: 'Treno diretto da London Victoria a Lewes (1h 02 min).',
      rightCard: 'Contatti taxi locali:',
      taxi1: 'GM Taxis — 01273 473737',
      taxi2: 'Lewes and District Taxis — 01273 483232',
      taxi3: 'Lewes County Cars — 01273 474444',
      taxi4: 'Green Taxi — 01273 472323',
      taxiLocationLabel: 'Lewes, UK',
    },
    stay: {
      title: 'Dove soggiornare',
      intro: 'Ecco alcune opzioni consigliate vicino a Lewes e Brighton.',
      mapTitle: 'Mappa hotel',
      ctaLabel: 'Visita hotel',
      mapOptionsLabel: 'Altre opzioni sulla mappa:',
      mapOptions: [
        { label: 'Hotel a Lewes', href: 'https://www.google.com/maps/search/hotels+in+Lewes+UK' },
        { label: 'Hotel a Brighton', href: 'https://www.google.com/maps/search/hotels+in+Brighton+UK' },
        { label: 'Vicino a Lewes Station', href: 'https://www.google.com/maps/search/hotels+near+Lewes+Station' },
        { label: 'The Old Ship Hotel', href: 'https://www.google.com/maps/search/The+Old+Ship+Hotel+Brighton' },
      ],
      hotels: [
        {
          name: 'Pelham House',
          description: 'Elegante struttura georgiana nel centro di Lewes, proprio presso la location del matrimonio.',
          price: 'Circa GBP160-GBP300/notte',
          location: 'Lewes, UK',
          link: 'https://www.pelhamhouse.com/',
          imageSrc: 'https://pelhamhouse.co.uk/static/uploads/sites/5/2025/12/Pelham-House-confetti-shot-Samantha-Pells-Photography-1536x1024.webp',
        },
        {
          name: 'The White Hart Hotel',
          description: 'Storica locanda in Lewes High Street, recentemente rinnovata.',
          price: 'Circa GBP120-GBP240/notte',
          location: 'Lewes, UK',
          link: 'https://whitehartlewes.com/',
          imageSrc: 'https://cms.heartwoodcollection.com/whitehartlewes/wp-content/uploads/sites/30/2025/05/the-white-hart-lewes-exterior-1024x1024.jpg',
        },
        {
          name: 'The Old Ship Hotel',
          description: 'Storico hotel sul lungomare di Brighton, vicino a The Lanes e al molo.',
          price: 'Circa GBP100-GBP240/notte',
          location: 'Brighton, UK',
          link: 'https://www.oldshipbrighton.co.uk/',
          imageSrc: 'https://webbox.imgix.net/images/lxxtciwwseoiziow/300c4888-f037-4a58-81f4-badbfbd96878.jpg?auto=format,compress&fit=crop&crop=entropy&w=750&h=600',
        },
        {
          name: 'The Grand Brighton',
          description: 'Storico hotel sul lungomare, con accesso comodo al centro di Brighton.',
          price: 'Circa GBP170-GBP320/notte',
          location: 'Brighton, UK',
          link: 'https://www.grandbrighton.co.uk/',
          imageSrc: 'https://www.grandbrighton.co.uk/image/fit/440x276/cms/grandbrighton/images/new/50531925078_feef5503c7_o.jpg',
        },
        {
          name: 'Hotel du Vin Brighton',
          description: 'Hotel boutique a The Lanes, a due passi dal lungomare.',
          price: 'Circa GBP140-GBP280/notte',
          location: 'Brighton, UK',
          link: 'https://www.hotelduvin.com/locations/brighton/',
          imageSrc: 'https://www.hotelduvin.com/media/5gne4flj/hdv-brighton-seaview-suite-1.jpg?width=1440&height=720&format=webp&v=1da2de000488d90',
        },
        {
          name: 'Leonardo Hotel Brighton',
          description: 'Soluzione moderna e comoda accanto alla stazione ferroviaria di Brighton.',
          price: 'Circa GBP100-GBP220/notte',
          location: 'Brighton, UK',
          link: 'https://www.leonardo-hotels.com/brighton/leonardo-hotel-brighton',
          imageSrc: 'https://media.leonardo-hotels.com/static.leonardo-hotels.com/image/leonardo-brighton_reception_04_small_05da3d63cec20f91c7189cb30be5075f.jpg?width=2000',
        },
      ],
    },
    message: {
      title: 'Messaggio agli ospiti',
      intro: 'Lascia un pensiero per Luna e Jake.',
      nameLabel: 'Nome',
      messageLabel: 'Messaggio',
      sendLabel: 'Invia',
      paperAlt: 'Bacheca messaggi',
    },
  },
} as const

type StoryKey = keyof (typeof STORY_TEXT)['en']['story']

function translationKeyToField(key: string): StoryKey {
  const field = key.replace('story.', '')
  return (field.charAt(0).toLowerCase() + field.slice(1)) as StoryKey
}

export function resolveStoryText(lang: Lang, translationKey: string): string {
  const field = translationKeyToField(translationKey)
  return STORY_TEXT[lang].story[field]
}

type AddressKey = keyof (typeof STORY_TEXT)['en']['address']
type AbroadKey = keyof (typeof STORY_TEXT)['en']['abroad']
type LondonKey = keyof (typeof STORY_TEXT)['en']['london']
type MessageKey = keyof (typeof STORY_TEXT)['en']['message']

export function getAddressText(lang: Lang): string {
  return STORY_TEXT[lang].address.venue
}

export function resolveAddressTimelineText(lang: Lang, key: AddressKey): string {
  return STORY_TEXT[lang].address[key]
}

export function resolveAbroadText(lang: Lang, key: AbroadKey): string {
  return STORY_TEXT[lang].abroad[key]
}

export function resolveLondonText(lang: Lang, key: LondonKey): string {
  return STORY_TEXT[lang].london[key]
}

export function resolveStayContent<L extends Lang>(lang: L): (typeof STORY_TEXT)[L]['stay'] {
  return STORY_TEXT[lang].stay
}

export function resolveMessageText(lang: Lang, key: MessageKey): string {
  return STORY_TEXT[lang].message[key]
}
