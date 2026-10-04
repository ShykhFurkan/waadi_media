export interface ArtSlot {
  id: string;
  name: string;
  description: string;
  src?: string;
  alt: string;
}

export const artSlots: Record<string, ArtSlot> = {
  heroMascot: {
    id: 'hero-mascot',
    name: 'Valley Mascot',
    description: 'Playful illustrated character for hero section',
    alt: 'Waadi Media mascot illustration',
  },
  chinarLeafSticker: {
    id: 'chinar-sticker',
    name: 'Chinar Leaf Sticker',
    description: 'Hand-drawn autumn chinar leaf sticker',
    alt: 'Chinar leaf sticker',
  },
  crocusSticker: {
    id: 'crocus-sticker',
    name: 'Kashmir Saffron Crocus',
    description: 'Purple crocus flower with saffron stigmas',
    alt: 'Saffron flower sticker',
  },
  shikaraSticker: {
    id: 'shikara-sticker',
    name: 'Dal Lake Shikara',
    description: 'Iconic Kashmiri traditional boat',
    alt: 'Kashmir shikara boat sticker',
  },
  appleSticker: {
    id: 'apple-sticker',
    name: 'Kashmir Red Apple',
    description: 'Valley red delicious apple',
    alt: 'Kashmir apple sticker',
  },
};
