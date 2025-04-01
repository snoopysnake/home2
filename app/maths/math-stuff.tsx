import { useState, useEffect, useRef } from 'react';
import katex from 'katex';
import './maths.css';

export function MathStuff() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      katex.render("c = \\pm\\sqrt{a^2 + b^2}", containerRef.current, {
        throwOnError: false
      });
    }

  }, []);


  return (
    <main>
      <h1>alex chiang math stuff.</h1>
      <div ref={containerRef}></div>
    </main>
  );
}
