export const orderOfOperationsProblem = (options: any) => {
  let expression = '';
  let terms = Array.from({length: Math.floor(Math.random() * 3) + 3}, () => Math.floor(Math.random() * 20) + 1);
  expression += terms[0];
  for (let i = 1; i < terms.length; i++) {
    expression += setOperand(options) + terms[i];
  }
  expression = expression.replaceAll('*', '\\cdot');
  return expression;
}

const setOperand = (options: any) => {
  const replaceOperand: { [key: string]: string } = {
    addition: '+',
    subtraction: '-',
    multiplication: '*',
    division: '/'
  }
  const selectedOperands = Object.keys(options).filter(key => options[key]).map(key => replaceOperand[key]);
  return selectedOperands[Math.floor(Math.random() * selectedOperands.length)];
}