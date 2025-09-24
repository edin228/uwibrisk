import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const MotionPhoto = ({ photos = [], fallback, alt = "Team member" }) => {
  const imgs = React.useMemo(
    () => (photos || []).map((p) => p?.url).filter(Boolean),
    [photos]
  );
  const hasCycle = imgs.length > 1;

  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  // Preload images once
  React.useEffect(() => {
    imgs.forEach((src) => {
      const i = new Image();
      i.src = src;
    });
  }, [imgs]);

  // Cycle timer (slower)
  React.useEffect(() => {
    if (!hasCycle || paused) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % imgs.length);
    }, 5500); // 2.5s per frame
    return () => clearInterval(id);
  }, [imgs.length, hasCycle, paused]);

  const fallbackSrc =
    imgs[0] || fallback || "/placeholder.png";

  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={imgs[idx] || fallbackSrc} // new key -> smooth crossfade
          src={imgs[idx] || fallbackSrc}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover will-change-[opacity]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          loading="lazy"
          decoding="async"
          fetchpriority="low"
        />
      </AnimatePresence>
    </div>
  );
};

export default MotionPhoto;
