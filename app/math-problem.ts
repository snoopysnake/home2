export const orderOfOperationsProblem = (options: any) => {
  let expression = '';
  const termsMin = 3;
  const termsMax = 6 - termsMin;
  const numMin = 1;
  const numMax = 20;
  let terms = Array.from({ length: Math.floor(Math.random() * termsMax) + termsMin }, () => randomNum(numMin, numMax, options)); // find random num here to avoid 0
  expression += terms[0];
  for (let i = 1; i < terms.length; i++) {
    let operand = setOperand(options);
    if (operand === '*') {
      if (terms[i] === '1')
        terms[i] = recreateRandomNum(numMin, numMax); // do not multiply by one (too easy)
      expression += !terms[i].startsWith('(') ? `(${terms[i]})` : terms[i]; // do not add extra parentheses
    }
    else expression += operand + terms[i];
  }
  expression = expression.replaceAll(/\*\*\d/g, num => `^{${num.slice(2)}}`);
  // expression = expression.replaceAll('*', '\\cdot');
  return expression;
}

const randomNum = (min: number, max: number, options: any) => {
  // RETURNS STRING
  let num;
  const expOptions = [0, 2, 3, 4];
  const randomExp = expOptions[Math.floor(Math.random() * expOptions.length)];
  do {
    num = (Math.random() > 0.7 && options.negative ? -1 : 1) * Math.floor(Math.random() * max) + min;
  } while (num === 0);
  if (num > 0) {
    if (options.exponent && Math.random() < 0.25) {
      if (num === 1)
        return randomNum(min, max, options); // no exponents with base 1
      else return `${num}**${randomExp}`;
    }
    else return num + '';
  }
  else {
    if (!options.exponent)
      return `(${num})`;
    else {
      if (Math.random() < 0.5)
        return `(${num})**${randomExp}`;
      else return `(${num}**${randomExp})`;
    }
  }
}

const recreateRandomNum = (min: number, max: number) => {
  let num;
  do {
    num = Math.floor(Math.random() * max) + min;
  } while (num === 0 || num === 1);
  return num + '';
}

const setOperand = (options: any) => {
  const replaceOperand: { [key: string]: string } = {
    addition: '+',
    subtraction: '-',
    multiplication: '*',
    // division: '/'
  }
  const selectedOperands = Object.keys(options).filter(key => options[key]).map(key => replaceOperand[key]).filter(key => key);
  return selectedOperands[Math.floor(Math.random() * selectedOperands.length)];
}