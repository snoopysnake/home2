import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router';
import './welcome.css';

export function Welcome() {
  const [fontSize, setFontSize] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const observer = new ResizeObserver(entries => {
        const { width } = entries[0].contentRect;
        setFontSize(width / 12);
      });

      observer.observe(containerRef.current);

      return () => observer.disconnect();
    }
  }, []);

  return (
    <main className="welcome" ref={containerRef}>
      <h1 style={{ fontSize }}><NavLink to="/maths" end>alex chiang.</NavLink></h1>
    </main>
  );
}
