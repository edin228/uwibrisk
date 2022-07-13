import React from "react";
import { BlogCard } from "./BlogCard";

const cardData = [
  // Photo by ivan Torres on Unsplash
  {
    id: "c",
    image:'house-2.jpeg',
    category: "Pizza",
    title: "5 Food Apps Delivering the Best of Your City",
    pointOfInterest: 120,
    backgroundColor: "#814A0E",
  },
  // Photo by Dennis Brendel on Unsplash
  {
    id: "f",
    image:'laskyline.jpg',
    category: "How to",
    title: "Arrange Your Apple Devices for the Gram",
    pointOfInterest: 550,
    backgroundColor: "#959684",
  },
  // Photo by Alessandra Caretto on Unsplash
  {
    id: "a",
    image:'office1-1.jpg',
    category: "Pedal Power",
    title: "Map Apps for the Superior Mode of Transport",
    pointOfInterest: 260,
    backgroundColor: "#5DBCD2",
  },
  // Photo by Taneli Lahtinen on Unsplash
  {
    id: "g",
    image:'cars-1.jpeg',
    category: "Holidays",
    title: "Our Pick of Apps to Help You Escape From Apps",
    pointOfInterest: 400,
    backgroundColor: "#8F986D",
  },
  
];

function BlogContainer() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full justify-center text-center items-center uppercase tracking-widest font-semibold pl-4">
        See whats new
      </div>
      <ul className="flex flex-wrap items-start">
        {cardData.map((card) => (
          <BlogCard
            key={card.id}
            {...card}
          />
        ))}
      </ul>
    </div>
  );
}

export default BlogContainer;
