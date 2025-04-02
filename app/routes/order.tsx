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
  const [worksheet, setWorksheet] = useState<any>(null);
  const renderRefs = useRef<any[]>([]);

  useEffect(() => {
    renderRefs.current.forEach(ref => katex.render('a \\cdot b', ref, { throwOnError: false }));
  }, [worksheet]);

  const inputNumber = (e: any, min: number, max: number) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
      setSelection(min, max);
      createWorkSheet(e);
    }
    if (e.key === "ArrowUp") {
      setQuestionNum(questionNum + 1);
    }
    if (e.key === "ArrowDown") {
      setQuestionNum(questionNum - 1);
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

  const createWorkSheet = (e: any) => {
    e.preventDefault();
    setWorksheet(
      <ol>
        {
          Array.from(Array(questionNum), (x, i) => <li ref={ref => { renderRefs.current[i] = ref }} key={i}></li>)
        }
      </ol>
    );
  }

  return (
    <main className="content">
      <h1>order of operations practice.</h1>
      <form onSubmit={createWorkSheet}>
        <label>number of questions (1-25):</label>
        <input type="number" name="questionNum" value={questionNum} min="1" max="25"
          onChange={(e: any) => setQuestionNum(+e.target.value)}
          onBlur={() => setSelection(1, 25)}
          onKeyDown={(e: any) => inputNumber(e, 1, 25)}
        />
        <input className="create" type="submit" value="create worksheet" />
        {worksheet}
      </form>
    </main>
  );
}
