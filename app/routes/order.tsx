import type { Route } from "./+types/order";
import { NavLink } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import katex from 'katex';
import { orderOfOperationsProblem, answerProblem, parseToLatex } from "~/math-problem";
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
    const questions: any = [];
    const answers: any = [];
    for (let i = 0; i < questionNum; i++) {
      questions.push(orderOfOperationsProblem(options));
      answers.push(answerProblem(questions[i]));
    }
    questionRefs.current.filter(ref => ref).forEach((ref, i) => katex.render(parseToLatex(questions[i]), ref, { throwOnError: false })); // create worksheet here
    answerRefs.current.filter(ref => ref).forEach((ref, j) =>
      katex.render(wsOptions.answers ? answers[j] : '--', ref, { throwOnError: false })); // create answer key here
  }, [worksheet]);

  const inputNumber = (e: any, min: number, max: number) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
      setSelection(min, max);
      createWorkSheet(e);
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
    const newWorksheet = Array.from({ length: questionNum }, (x, i) => <li ref={ref => { questionRefs.current[i] = ref }} key={i}></li>);
    setWorksheet(wsOptions.new ? newWorksheet : [...worksheet, newWorksheet]);
    if (wsOptions.answers || !wsOptions.new) {
      if (answerKey.length > 0 || wsOptions.new) {
        const newAnswerKey = Array.from({ length: questionNum }, (x, i) => <li ref={ref => { answerRefs.current[i] = ref }} key={i}></li>);
        setAnswerKey(wsOptions.new ? newAnswerKey : [...answerKey, newAnswerKey]);
      }
    }
    else setAnswerKey([]);
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
      <h1><NavLink to="/" end>alex chiang.</NavLink></h1>
      <h2>order of operations practice.</h2>
      <form onSubmit={createWorkSheet}>
        <label>number of questions (1-25):</label>
        <input type="number" name="questionNum" value={questionNum} min="1" max="25"
          onChange={(e: any) => setQuestionNum(e.target.value)}
          onBlur={() => setSelection(1, 25)}
          onKeyDown={(e: any) => inputNumber(e, 1, 25)}
        />
        <div>
          <input type="checkbox" id="addition" name="addition" checked={options.addition} onChange={checkOption} />
          <label htmlFor="addition">addition</label>
        </div>
        <div>
          <input type="checkbox" id="subtraction" name="subtraction" checked={options.subtraction} onChange={checkOption} />
          <label htmlFor="subtraction">subtraction</label>
        </div>
        <div>
          <input type="checkbox" id="multiplication" name="multiplication" checked={options.multiplication} onChange={checkOption} />
          <label htmlFor="multiplication">multiplication</label>
        </div>
        <div>
          <input type="checkbox" id="negative" name="negative" checked={options.negative} onChange={checkOption} />
          <label htmlFor="negative">has negatives</label>
        </div>
        <div>
          <input type="checkbox" id="exponent" name="exponent" checked={options.exponent} onChange={checkOption} />
          <label htmlFor="exponent">has exponents</label>
        </div>
        <input className="create" type="submit" value="create questions" />
        <div>
          <input type="checkbox" id="new" name="new" checked={wsOptions.new} onChange={checkWsOption} />
          <label htmlFor="new">new worksheet</label>
        </div>
        <div>
          <input type="checkbox" id="answers" name="answers" checked={wsOptions.answers} onChange={checkWsOption} />
          <label htmlFor="answers">answer key</label>
        </div>
      </form>
      {
        worksheet.length > 0 && <div className="worksheet"><ol>{worksheet}</ol></div>
      }
      {
        answerKey.length > 0 && <div className="worksheet"><ol>{answerKey}</ol></div>
      }
    </main>
  );
}
