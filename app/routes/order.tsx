import type { Route } from "./+types/order";
import { NavLink } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import katex from 'katex';
import { orderOfOperationsProblem, answerProblem } from "~/math-problem";
import { Logo } from "~/logo/logo";
import '../maths.css';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Alex Chiang | Order of Operations" },
    { name: "description", content: "Alex Chiang Website Order of Operations" },
  ];
}

export default function OrderOfOperations() {
  const [questionNum, setQuestionNum] = useState(10);
  const [options, setOptions] = useState({
    addition: true,
    subtraction: false,
    multiplication: false,
    division: false,
    negative: false,
    exponent: false
  });
  const [wsOptions, setWsOptions] = useState({
    new: true,
    answers: false
  });
  const [worksheet, setWorksheet] = useState<any>([]);
  const [answerKey, setAnswerKey] = useState<any>([]);
  const questionRefs = useRef<any[]>([]);
  const answerRefs = useRef<any[]>([]);

  useEffect(() => {
    if (worksheet.length > 0) {
      for (let i = 0; i < questionNum; i++) {
        const problem = orderOfOperationsProblem(options);
        const answer = answerProblem(problem);
        katex.render(problem, questionRefs.current[i], { throwOnError: false });
        katex.render(answer, answerRefs.current[i], { throwOnError: false });
      }
    }
  }, [worksheet]);

  const inputNumber = (e: any, min: number, max: number) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
      setSelection(min, max);
      createWorkSheet(e);
    }
    if (e.key === "Escape") {
      e.currentTarget.blur();
    }
    if (e.key === "ArrowUp") {
      setQuestionNum(+questionNum + 1);
    }
    if (e.key === "ArrowDown") {
      setQuestionNum(+questionNum - 1);
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
    const newWorksheet = Array.from({ length: questionNum }, (x, i) => <li
      ref={ref => { questionRefs.current[i] = ref }}
      key={i + (wsOptions.new ? 0 : worksheet.length)}></li>);
    setWorksheet(wsOptions.new ? newWorksheet : [...worksheet, ...newWorksheet]);
    const newAnswerKey = Array.from({ length: questionNum }, (x, j) => <li ref={
      ref => { answerRefs.current[j] = ref }}
      key={j + (wsOptions.new ? 0 : answerKey.length)}></li>);
    setAnswerKey(wsOptions.new ? newAnswerKey : [...answerKey, ...newAnswerKey]);
  }

  const checkOption = (e: any) => {
    const { name, checked } = e.target;
    const newOptions = { ...options, [name]: checked };
    if (Object.values(newOptions).slice(0, 3).filter(check => check).length >= 1)
      setOptions(newOptions);
  }

  const checkWsOption = (e: any) => {
    const { name, checked } = e.target;
    setWsOptions({ ...wsOptions, [name]: checked });
  }

  return (
    <main className="content">
      <Logo />
      <div className="nes-container with-title is-centered is-dark no-print">
        <h1 className="title">Order of Operations Practice</h1>
        <div className="content-box">
          <form onSubmit={createWorkSheet}>
            <div className="nes-field">
              <label htmlFor="name_field">Number of questions (1-25)</label>
              <input type="number" className="nes-input is-dark" name="questionNum" value={questionNum} min="1" max="25"
                onChange={(e: any) => setQuestionNum(e.target.value)}
                onBlur={() => setSelection(1, 25)}
                onKeyDown={(e: any) => inputNumber(e, 1, 25)} />
            </div>
            <label>
              <input type="checkbox" className="nes-checkbox is-dark" id="addition" name="addition" checked={options.addition} onChange={checkOption} />
              <span>Addition</span>
            </label>
            <label>
              <input type="checkbox" className="nes-checkbox is-dark" id="subtraction" name="subtraction" checked={options.subtraction} onChange={checkOption} />
              <span>Subtraction</span>
            </label>
            <label>
              <input type="checkbox" className="nes-checkbox is-dark" id="multiplication" name="multiplication" checked={options.multiplication} onChange={checkOption} />
              <span>Multiplication</span>
            </label>
            <label>
              <input type="checkbox" className="nes-checkbox is-dark" id="negative" name="negative" checked={options.negative} onChange={checkOption} />
              <span>Negatives</span>
            </label>
            <label>
              <input type="checkbox" className="nes-checkbox is-dark" id="exponent" name="exponent" checked={options.exponent} onChange={checkOption} />
              <span>Exponents</span>
            </label>
            <button className="nes-btn create">Create</button>
            <label>
              <input type="checkbox" className="nes-checkbox is-dark" id="new" name="new" checked={wsOptions.new} onChange={checkWsOption} />
              <span>New Worksheet</span>
            </label>
            {/* <div>
            <input type="checkbox" id="answers" name="answers" checked={wsOptions.answers} onChange={checkWsOption} />
            <label htmlFor="answers">answer key</label>
          </div> */}
          </form>
        </div>
      </div>
      {
        worksheet.length > 0 && <div className="worksheet">
          <h2>Order of Operations Worksheet</h2>
          {
            Array.from({ length: Math.ceil(worksheet.length / 39) }).map((page, i) =>
              <ol start={i * 39 + 1} key={i}>{worksheet.slice(i * 39, (i + 1) * 39)}</ol>
            )
          }
        </div>
      }
      <span className="break"></span>
      {
        answerKey.length > 0 && <div className="worksheet">
          <h2>Answer Key</h2>
          {
            Array.from({ length: Math.ceil(answerKey.length / 39) }).map((page, i) =>
              <ol start={i * 39 + 1} key={i}>{answerKey.slice(i * 39, (i + 1) * 39)}</ol>
            )
          }
        </div>
      }
    </main>
  );
}
