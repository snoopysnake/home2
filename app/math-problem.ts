export const orderOfOperationsProblem = (options: any) => {
  let expression = '';
  const termsMin = 3;
  const termsMax = 6 - termsMin;
  const numMin = 1;
  const numMax = 20;
  let terms = Array.from({ length: Math.floor(Math.random() * termsMax) + termsMin }, () => randomNum(numMin, numMax, options));
  expression += terms[0];
  for (let i = 1; i < terms.length; i++) {
    let operand = setOperand(options);
    if (operand === '*') {
      expression += !terms[i].startsWith('(') ? '(' + terms[i] + ')' : '';
    }
    else expression += operand + terms[i];
  }
  expression = expression.replaceAll('**2', '^{2}');
  // expression = expression.replaceAll('*', '\\cdot');
  return expression;
}

const randomNum = (min: number, max: number, options: any) => {
  // RETURNS STRING
  let randomNum;
  do {
    randomNum = (Math.random() > 0.7 && options.negative ? -1 : 1) * Math.floor(Math.random() * max) + min;
  } while (randomNum === 0);
  if (randomNum > 0) {
    return options.exponent && Math.random() < 0.25 ? randomNum + '**2' : randomNum + '';
  }
  else {
    if (!options.exponent)
      return '(' + randomNum + ')';
    else {
      if (Math.random() < 0.5)
        return '(' + randomNum + ')**2';
      else return '(' + randomNum + '**2)';
    }
  }
}

const setOperand = (options: any) => {
  const replaceOperand: { [key: string]: string } = {
    addition: '+',
    subtraction: '-',
    multiplication: '*',
    division: '/'
  }
  const selectedOperands = Object.keys(options).filter(key => options[key]).map(key => replaceOperand[key]).filter(key => key);
  return selectedOperands[Math.floor(Math.random() * selectedOperands.length)];
}