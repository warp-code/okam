import placeholderGreen from '@/assets/images/placeholder_green.png';
import placeholderGreen2 from '@/assets/images/placeholder_green_2.png';
import placeholderMix from '@/assets/images/placeholder_mix.png';
import placeholderPink from '@/assets/images/placeholder_pink.png';
import placeholderViolet from '@/assets/images/placeholder_violet.png';
import { StaticImageData } from 'next/image';

export type Dataset = {
  id: number;
  image: string | StaticImageData;
  title: string;
  description: string;
  currentSupply: number;
  categories: number[];
  buyPrice: number;
  sellPrice: number;
  fileCids: string[];
  author: string;
};

export const datasets = [
  {
    id: 1,
    image: placeholderGreen,
    title: "Title training data",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    currentSupply: 20,
    categories: [1, 2, 3],
    buyPrice: 2300,
    sellPrice: 2100,
    fileCids: ["QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR", "QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR", "QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR"],
    author: "0x1c35d2C91E1F2Dc3BA949De78Da32f3FdA5c9863"
  },
  {
    id: 2,
    image: placeholderPink,
    title: "Title training data",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    currentSupply: 20,
    categories: [4, 5, 6],
    buyPrice: 23100,
    sellPrice: 2100,
    fileCids: ["QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR", "QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR", "QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR"],
    author: "0x1c35d2C91E1F2Dc3BA949De78Da32f3FdA5c9863"
  },
  {
    id: 3,
    image: placeholderGreen2,
    title: "Title training data",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    currentSupply: 20,
    categories: [7, 8],
    buyPrice: 3300,
    sellPrice: 2100,
    fileCids: ["QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR", "QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR", "QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR"],
    author: "0x1c35d2C91E1F2Dc3BA949De78Da32f3FdA5c9863"
  },
  {
    id: 4,
    image: placeholderMix,
    title: "Title training data",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    currentSupply: 20,
    categories: [1, 5],
    buyPrice: 5300,
    sellPrice: 2100,
    fileCids: ["QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR", "QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR", "QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR"],
    author: "0x1c35d2C91E1F2Dc3BA949De78Da32f3FdA5c9863"
  },
  {
    id: 5,
    image: placeholderViolet,
    title: "Title training data",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    currentSupply: 20,
    categories: [2, 7],
    buyPrice: 7300,
    sellPrice: 2100,
    fileCids: ["QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR", "QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR", "QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR"],
    author: "0x1c35d2C91E1F2Dc3BA949De78Da32f3FdA5c9863"
  },
] as Dataset[];