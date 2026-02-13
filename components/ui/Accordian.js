import React, { useState, useRef, useEffect } from "react";

export default function Accordian({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (isOpen) {
      const full = el.scrollHeight + "px";
      setHeight(full);
      const onEnd = () => setHeight("auto");
      el.addEventListener("transitionend", onEnd, { once: true });
      return () => el.removeEventListener("transitionend", onEnd);
    } else {
      if (height === "auto") {
        const full = el.scrollHeight + "px";
        setHeight(full);
        requestAnimationFrame(() => setHeight("0px"));
      } else {
        setHeight("0px");
      }
    }
  }, [isOpen]);

  return (
    <div className="faq-item">
      <button
        className="faq-button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((o) => !o)}
      >
        {question}
        <span className={`faq-icon ${isOpen ? "open" : ""}`}>▼</span>
      </button>
      <div
        className="faq-panel"
        style={{ height }}
        ref={contentRef}
      >
        <div className="faq-content">
          {typeof answer === "string" ? <p>{answer}</p> : answer}
        </div>
      </div>
    </div>
  );
}