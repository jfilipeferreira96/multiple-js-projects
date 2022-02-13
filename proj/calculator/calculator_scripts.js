const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;


const sendNumberValue = (number) =>{
    //replace current display value if first value is entered
    if(awaitingNextValue){
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    }else{
        const currentNumberFlag = calculatorDisplay.textContent;

        //if current value is 0, then replace it. If it's not zero, add number.
        calculatorDisplay.textContent = currentNumberFlag === '0' ? number : currentNumberFlag + number;
    }
    
}

const addDecimal = () => {
    //if operator pressed, dont add decimal
    if(awaitingNextValue) return;

    //if no decimal
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

//Calculate first and second values using the operators
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  
    '=': (firstNumber, secondNumber) => secondNumber,
};

const sendOperator = (operator) => {
    const currentValue = Number(calculatorDisplay.textContent);

    //prevent multiple operators 
    if(operatorValue && awaitingNextValue){
        operatorValue = operator;
        return;
    };
    //asign firstValue if there's no value
    if(!firstValue){
        firstValue = currentValue;
    }else{
        const calculationResult = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculationResult;
        firstValue = calculationResult;
    }
    //after pressing the operator, we are ready to recieve the second value
    awaitingNextValue = true;
    operatorValue = operator;

}

//Event listerns for operators, numbers and decimals
inputBtns.forEach((inputButton) =>{

    //if a number is clicked
    if(inputButton.classList.contains('number')){
        inputButton.addEventListener('click', () => sendNumberValue(inputButton.value));
    }else if(inputButton.classList.contains('operator')){
        inputButton.addEventListener('click', () => sendOperator(inputButton.value));
    }else if(inputButton.classList.contains('decimal')){
        inputButton.addEventListener('click', () => addDecimal());
    }

});

//Clear button - reset display
const resetAll = () =>{
    calculatorDisplay.textContent = '0';
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
}

clearBtn.addEventListener('click', () => resetAll());