import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function useStablePhase({ staggerIndex = 0, staggerStepSec = 0.25, jitterSec = 0 }) {
  // Compute once per instance
  const jitterMsRef = React.useRef(jitterSec ? Math.random() * jitterSec * 1000 : 0);
  const phaseMsRef = React.useRef(Math.max(0, staggerIndex) * staggerStepSec * 1000 + jitterMsRef.current);
  return phaseMsRef.current;
}

const MotionPhoto = ({
  photos = [],
  fallback,
  alt = "Team member",
  staggerIndex = 0,
  staggerStepSec = 0.25,
  intervalMs = 5500,
  jitterSec = 0,
}) => {
  const imgs = React.useMemo(
    () => (photos || []).map((p) => p?.url).filter(Boolean),
    [photos]
  );
  const hasCycle = imgs.length > 1;

  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  // Stable timing refs
  const phaseMs = useStablePhase({ staggerIndex, staggerStepSec, jitterSec });
  const startedRef = React.useRef(false);
  const startAtRef = React.useRef(null);        // epoch ms when cycle would have started (with phase)
  const intervalIdRef = React.useRef(null);
  const timeoutIdRef = React.useRef(null);

  // Preload images
  React.useEffect(() => {
    imgs.forEach((src) => {
      const i = new Image();
      i.src = src;
    });
  }, [imgs]);

  const clearTimers = React.useCallback(() => {
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    timeoutIdRef.current = null;
    intervalIdRef.current = null;
  }, []);

  // Start cycle aligned to original phase and interval
  const startAlignedCycle = React.useCallback(() => {
    if (!hasCycle) return;

    if (!startedRef.current) {
      startedRef.current = true;
      startAtRef.current = Date.now() + phaseMs;
    }

    const now = Date.now();
    const base = startAtRef.current;
    const elapsed = Math.max(0, now - base);
    const untilNext = elapsed <= 0 ? -elapsed : intervalMs - (elapsed % intervalMs);

    timeoutIdRef.current = setTimeout(() => {
      setIdx((i) => (i + 1) % Math.max(1, imgs.length));

      intervalIdRef.current = setInterval(() => {
        setIdx((i) => (i + 1) % Math.max(1, imgs.length));
      }, intervalMs);
    }, untilNext);
  }, [hasCycle, imgs.length, intervalMs, phaseMs]);

  // Pause/resume without changing phase
  React.useEffect(() => {
    clearTimers();
    if (hasCycle && !paused) startAlignedCycle();
    return clearTimers;
  }, [hasCycle, paused, startAlignedCycle, clearTimers]);

  // Keep idx in range if list changes
  React.useEffect(() => {
    setIdx((i) => (imgs.length ? i % imgs.length : 0));
  }, [imgs.length]);

  const fallbackSrc = imgs[0] || fallback || "/placeholder.png";

  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={imgs[idx] || fallbackSrc}
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
