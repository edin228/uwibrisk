/**
 * Black-and-white photography for the redesign (generated for the Paper mockups,
 * stored grayscale). Import from here so every photo carries its alt text.
 */
import type { ImageMetadata } from 'astro';
import breakfast from '../assets/photos/breakfast.jpg';
import building from '../assets/photos/building.jpg';
import coffeeCup from '../assets/photos/coffee-cup.jpg';
import coffeeShop from '../assets/photos/coffee-shop.jpg';
import constructionTruck from '../assets/photos/construction-truck.jpg';
import corridor from '../assets/photos/corridor.jpg';
import coworkers from '../assets/photos/coworkers.jpg';
import dumpTruck from '../assets/photos/dump-truck.jpg';
import hands from '../assets/photos/hands.jpg';
import hotelExterior from '../assets/photos/hotel-exterior.jpg';
import house from '../assets/photos/house.jpg';
import hvacTechnician from '../assets/photos/hvac-technician.jpg';
import manReviewing from '../assets/photos/man-reviewing.jpg';
import porch from '../assets/photos/porch.jpg';
import road from '../assets/photos/road.jpg';
import towTruck from '../assets/photos/tow-truck.jpg';

export interface Photo {
  src: ImageMetadata;
  alt: string;
}

export const photos = {
  breakfast: { src: breakfast, alt: 'Two people sharing coffee and breakfast at a sunlit kitchen table' },
  building: { src: building, alt: 'Modern apartment building with landscaped terraces at dusk' },
  coffeeCup: { src: coffeeCup, alt: 'Steaming cup of coffee on a café table in window light' },
  coffeeShop: { src: coffeeShop, alt: 'Neighborhood coffee shop with an espresso bar and café tables' },
  constructionTruck: {
    src: constructionTruck,
    alt: 'Blueprints and a hard hat on a tailgate at a residential construction site at sunset',
  },
  corridor: { src: corridor, alt: 'Aisle between rows of server racks in a data center' },
  coworkers: { src: coworkers, alt: 'Three colleagues walking down a glass-walled office hallway' },
  dumpTruck: { src: dumpTruck, alt: 'Dump truck on a dirt road at an excavation site' },
  hands: { src: hands, alt: 'Person checking a phone beside a laptop and paperwork' },
  hotelExterior: { src: hotelExterior, alt: 'Spanish-style boutique hotel entrance with a wrought-iron balcony at dusk' },
  house: { src: house, alt: 'Modern hillside home lit up at dusk' },
  hvacTechnician: { src: hvacTechnician, alt: 'HVAC technician servicing an outdoor air-conditioning unit' },
  manReviewing: { src: manReviewing, alt: 'Shop owner standing in the open bay door of an auto repair garage' },
  porch: { src: porch, alt: 'Front porch with a rocking chair, potted flowers and a bicycle' },
  road: { src: road, alt: 'Empty highway under a dark storm sky' },
  towTruck: { src: towTruck, alt: 'Tow truck on a wet highway at dusk' },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
