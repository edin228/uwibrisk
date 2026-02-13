import * as React from "react";
import { memo, useRef, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Title } from "./Title";
import { BlogImage } from "./BlogImage";
import { openSpring, closeSpring } from "./animations";
import Link from "next/link";
import {
  useInvertedBorderRadius,
  useScrollConstraints,
  useWheelScroll,
} from "../../../utils/utils";
import { Placeholder } from "./Placeholder";
import { useRouter } from "next/router";

// Distance in pixels a user has to scroll a card down before we recognise
// a swipe-to dismiss action.
const dismissDistance = 150;

// eslint-disable-next-line react/display-name
export const BlogCard = memo(
  ({
    id,
    featuredImage,
    excerpt,
    slug,
    title,
    blogCategories,
    publishedAt,
  }) => {
    const [isSelected, setIsSelected] = useState(false);
    const router = useRouter();
    const y = useMotionValue(0);
    const zIndex = useMotionValue(isSelected ? 99999 : 0);

    // Maintain the visual border radius when we perform the layoutTransition by inverting its scaleX/Y
    const inverted = useInvertedBorderRadius(10);

    // We'll use the opened card element to calculate the scroll constraints
    const cardRef = useRef(null);
    const constraints = useScrollConstraints(cardRef, isSelected);

    function checkSwipeToDismiss() {
      y.get() > dismissDistance && router.replace("/");
    }

    function checkZIndex(latest) {
      if (isSelected) {
        zIndex.set(99999);
      } else if (!isSelected) {
        zIndex.set(0);
      }
    }

    useEffect(() => {
      if (isSelected) {
        zIndex.set(99999);
      } else if (!isSelected) {
        zIndex.set(0);
      }
    }, [isSelected]);

    // When this card is selected, attach a wheel event listener
    const containerRef = useRef(null);
    useWheelScroll(
      containerRef,
      y,
      constraints,
      checkSwipeToDismiss,
      isSelected
    );
    const Overlay = () => (
      <motion.div
        initial={false}
        animate={{ opacity: isSelected ? 1 : 0 }}
        style={{ pointerEvents: isSelected ? "auto" : "none" }}
        className="overlay"
        onClick={() => setIsSelected(false)}
      ></motion.div>
    );

    return (
      <li ref={containerRef} className="blog-card py-1 lg:p-2">
        <Overlay />
        <div
          className={`blog-card-content-container ${isSelected && "blog-open"}`}
        >
          <motion.div
            ref={cardRef}
            className="blog-card-content cursor-pointer"
            style={{ ...inverted, zIndex, y }}
            layout={true}
            transition={isSelected ? openSpring : closeSpring}
            drag={isSelected ? "y" : false}
            dragConstraints={constraints}
            onDrag={checkSwipeToDismiss}
            onUpdate={checkZIndex}
            onClick={() => setIsSelected(!isSelected)}
          >
            <div className="text-sm text-gray-500/0">
              Published on:{" "}
              {new Date(publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <BlogImage
              id={id}
              image={featuredImage.url}
              isSelected={isSelected}
            />
            <Title
              title={title}
              category={blogCategories}
              isSelected={isSelected}
            />
            <Placeholder id={id} excerpt={excerpt} slug={slug} />
          </motion.div>
        </div>
      </li>
    );
  },
  (prev, next) => prev.isSelected === next.isSelected
);
