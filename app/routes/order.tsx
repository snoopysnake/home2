import type { Route } from "./+types/order";
import { useState, useEffect, useRef } from 'react';
import katex from 'katex';
import '../maths.css';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Alex Chiang | Order of Operations" },
    { name: "description", content: "Alex Chiang Website Order of Operations" },
  ];
}

export default function OrderOfOperations() {
  const [questionNum, setQuestionNum] = useState(5);
  const renderRef = useRef(null);

  useEffect(() => {
    if (renderRef.current) {
      // katex.render("c = \\pm\\sqrt{a^2 + b^2}", renderRef.current, {
      //   throwOnError: false
      // });
    }
  }, []);

  const inputNumber = (e: any) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
    if (e.key === "ArrowUp") {
      e.current.value++;
    }
    if (e.key === "ArrowDown") {
      e.current.value--;
    }
    if (!/^\d$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
      e.preventDefault();
    }
  }

  const setSelection = (min: number, max: number) => {
    if (questionNum < min)
      setQuestionNum(min);
    else if (questionNum > max)
      setQuestionNum(max);
  }

  return (
    <main className="content">
      <h1>order of operations practice.</h1>
      <label>number of questions (1-25):</label>
      <input type="number" name="questionNum" value={questionNum} min="1" max="25"
        onChange={(e: any) => setQuestionNum(e.target.value)}
        onBlur={() => setSelection(1, 25)}
        onKeyDown={inputNumber}
      />
      <input className="create" type="submit" value="create worksheet" />
      <div ref={renderRef}></div>
    </main>
  );
}
