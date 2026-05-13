import { Product } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "Midnight Oud",
    price: 189,
    category: "Woody",
    image: "/images/1pic.jpg",
    note: "Woody | Amber",
    description: "A mysterious blend of rare oud, amber, and saffron.",
    longDesc: "Midnight Oud is our signature fragrance for those who appreciate depth and complexity. Opening with spicy saffron and cardamom, it settles into a heart of rose and oud, with a base of amber, sandalwood, and vanilla.",
    rating: 4.8,
    reviews: 124,
    notes: {
      top: ["Saffron", "Cardamom"],
      heart: ["Rose", "Oud"],
      base: ["Amber", "Sandalwood", "Vanilla"]
    }
  },
  {
    id: 2,
    name: "Velvet Rose",
    price: 159,
    category: "Floral",
    image: "/images/3pic.webp",
    note: "Floral | Spicy",
    description: "A romantic bouquet of Turkish rose and pink pepper.",
    longDesc: "Velvet Rose captures the essence of a blooming rose garden at dawn. Fresh rose petals blended with spicy pink pepper and a touch of vanilla create an unforgettable romantic scent.",
    rating: 4.9,
    reviews: 89,
    notes: {
      top: ["Pink Pepper", "Bergamot"],
      heart: ["Turkish Rose", "Peony"],
      base: ["Vanilla", "Musk"]
    }
  },
  {
    id: 3,
    name: "Santal Dream",
    price: 199,
    category: "Woody",
    image: "/images/ba.png",
    note: "Woody | Creamy",
    description: "Creamy sandalwood with hints of iris and cashmere.",
    longDesc: "A dreamy blend of Australian sandalwood, orris butter, and cashmeran. Soft, creamy, and incredibly addictive.",
    rating: 4.7,
    reviews: 56,
    notes: {
      top: ["Milk", "Fig"],
      heart: ["Iris", "Sandalwood"],
      base: ["Cashmeran", "Musk"]
    }
  },
  {
    id: 4,
    name: "Citrus Noir",
    price: 129,
    category: "Citrus",
    image: "/images/red.webp",
    note: "Citrus | Fresh",
    description: "Bright bergamot meets smoky vetiver.",
    longDesc: "A modern take on citrus. Opens with sparkling bergamot and lemon, then darkens with vetiver, patchouli, and black tea.",
    rating: 4.6,
    reviews: 203,
    notes: {
      top: ["Bergamot", "Lemon"],
      heart: ["Black Tea", "Jasmine"],
      base: ["Vetiver", "Patchouli"]
    }
  },
];