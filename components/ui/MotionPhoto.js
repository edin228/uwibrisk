import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const MotionPhoto = ({
  photos = [],
  fallback,
  alt = "Team member",
  // new props:
  staggerIndex = 0,      // usually the map index
  staggerStepSec = 0.25, // delay per index (seconds)
  intervalMs = 5500,     // time each image stays on screen
  jitterSec = 0          // optional tiny randomness to avoid perfect sync
}) => {
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

  // Phase-shifted cycle timer
  React.useEffect(() => {
    if (!hasCycle || paused) return;

    // per-card start delay = index * step + tiny jitter (optional)
    const startDelayMs =
      (Math.max(0, staggerIndex) * staggerStepSec +
        (jitterSec ? Math.random() * jitterSec : 0)) * 1000;

    let intervalId;
    const timeoutId = setTimeout(() => {
      // advance once at start to trigger first fade with delay
      setIdx((i) => (i + 1) % imgs.length);

      // then keep cycling with a stable interval (keeps the phase offset)
      intervalId = setInterval(() => {
        setIdx((i) => (i + 1) % imgs.length);
      }, intervalMs);
    }, startDelayMs);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [imgs.length, hasCycle, paused, staggerIndex, staggerStepSec, intervalMs, jitterSec]);

  const fallbackSrc = imgs[0] || fallback || "/placeholder.png";

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