let currentInput = '';
let operator = '';
let firstOperand = '';

function appendNumber(number) {
  currentInput += number;
  updateDisplay(firstOperand + ' ' + operator + ' ' + currentInput);
}

function appendOperator(op) {
  if (currentInput === '') {
    showError('Invalid operation. Please use +, -, *, or /'); 
    return;
  }

  if (firstOperand === '') {
    firstOperand = currentInput;
  } else {
    calculateResult(); 
  }
  
  operator = op;
  currentInput = '';  
  updateDisplay(firstOperand + ' ' + operator);
}

function updateDisplay(value) {
  document.getElementById('display').value = value;
}

function clearDisplay() {
  currentInput = '';
  operator = '';
  firstOperand = '';
  updateDisplay('');
  clearError();
}

function clearError() {
  document.getElementById('error-message').innerText = '';
}

function calculateResult() {
  if (firstOperand === '' || operator === '' || currentInput === '') {
    showError('Invalid operation. Please use +, -, *, / , or ÷');
    return;
  }

  const num1 = parseFloat(firstOperand);
  const num2 = parseFloat(currentInput);

  let result;
  if (operator === '/' || operator === '÷') {
    if (num2 === 0) {
      showError('Error: Division by zero is not allowed.');
      clearState();
      return;
    }
  }

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num1 / num2;
      break;
    case '÷':
      result = num1 / num2;
      break;
    default:
      showError('Invalid input. Please enter valid numbers.');
      return;
  }

  firstOperand = result.toString();
  currentInput = '';
  operator = '';
  updateDisplay(result);
  
  console.log('Result:', result);
}

function showError(message) {
  document.getElementById('error-message').innerText = message;
  // Log the error message to the console
  console.error(message);
}

function clearState() {
  firstOperand = '';
  currentInput = '';
  operator = '';
}

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (key === 'Shift') {
    showError('Warning: Shift key detected.');
  } else if (!isNaN(key) || key === '.') {
    appendNumber(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    appendOperator(key);
  } else if (key === 'Enter' || key === '=') {
    calculateResult();
  } else if (key === 'Backspace') {
    clearDisplay();
  } else if (key === 'Escape') {
    clearDisplay();
  } else {
    showError('Invalid operation. Please use +, -, *, /, or ÷');
  }
});

