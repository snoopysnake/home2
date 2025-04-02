import type { Route } from "./+types/order";
import { useState, useEffect, useRef } from 'react';
import katex from 'katex';
import { orderOfOperationsProblem } from "~/math-problem";
import '../maths.css';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Alex Chiang | Order of Operations" },
    { name: "description", content: "Alex Chiang Website Order of Operations" },
  ];
}

export default function OrderOfOperations() {
  const [questionNum, setQuestionNum] = useState(5);
  const [options, setOptions] = useState({
    addition: true,
    subtraction: false,
    multiplication: false,
    division: false
  });
  const [worksheet, setWorksheet] = useState<any>(null);
  const renderRefs = useRef<any[]>([]);

  useEffect(() => {
    renderRefs.current.filter(ref => ref).forEach(ref => katex.render(orderOfOperationsProblem(options), ref, { throwOnError: false }));
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
          Array.from({ length: questionNum }, (x, i) => <li ref={ref => { renderRefs.current[i] = ref }} key={i}></li>)
        }
      </ol>
    );
  }

  const checkOption = (e: any) => {
    const { name, checked } = e.target;
    if (Object.values(options).filter(check => check).length !== 1 || checked)
      setOptions({ ...options, [name]: checked });
  }

  return (
    <main className="content">
      <h1>alex chiang.</h1>
      <h2>order of operations practice.</h2>
      <form onSubmit={createWorkSheet}>
        <label>number of questions (1-25):</label>
        <input type="number" name="questionNum" value={questionNum} min="1" max="25"
          onChange={(e: any) => setQuestionNum(+e.target.value)}
          onBlur={() => setSelection(1, 25)}
          onKeyDown={(e: any) => inputNumber(e, 1, 25)}
        />
        <div>
          <input type="checkbox" id="addition" name="addition" checked={options.addition} onChange={checkOption} />
          <label htmlFor="addition">Addition</label>
        </div>
        <div>
          <input type="checkbox" id="subtraction" name="subtraction" checked={options.subtraction} onChange={checkOption} />
          <label htmlFor="subtraction">Subtraction</label>
        </div>
        <div>
          <input type="checkbox" id="multiplication" name="multiplication" checked={options.multiplication} onChange={checkOption} />
          <label htmlFor="multiplication">Multiplication</label>
        </div>
        <input className="create" type="submit" value="create worksheet" />
        {worksheet}
      </form>
    </main>
  );
}
