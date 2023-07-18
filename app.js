const display = document.querySelector(".display")
const operation = document.querySelector(".operation")
const numbers = document.querySelectorAll(".number-button")
const operators = document.querySelectorAll(".operator-button")
const clearButton = document.querySelector(".clear-button")
const equalsButton = document.querySelector(".equals-button")
const decimalButton = document.querySelector(".decimal-button")
const deleteButton = document.querySelector(".delete-button")

let firstNumber = ""
let secondNumber = ""
let operator = ""
let isOperationDone = false




function operate(op, a, b) {
    const operations = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => a / b,
    };
  
    if (op === "/" && b === 0) {
      return "Captain, we have a problem";
    }
  
    const result = operations[op](a, b);
    return formatNumberWithDecimals(result, 11);
  }
  


function formatNumberWithDecimals(number, maxDecimals) {
    const roundedResult = parseFloat(number.toFixed(maxDecimals));
    const resultString = roundedResult.toString();
  
    if (resultString.length > maxDecimals + 1) {
      return resultString.slice(0, maxDecimals + 1);
    } else {
      return resultString;
    }
}
  


deleteButton.addEventListener("click", () => {
    const displayText = display.textContent;
    display.textContent = displayText.slice(0, displayText.length - 1);
  });



function clear() {
    firstNumber = ""
    secondNumber = ""
    operator = ""
    display.textContent = "0"
    operation.textContent = ""
    isOperationDone = false
}




numbers.forEach(number => {
    number.addEventListener("click", () => {
        if (firstNumber !== "" && display.textContent == firstNumber || display.textContent === "0" || display.textContent.includes("Please") || isOperationDone === true) {
            display.textContent = "";
        } 
        display.textContent += number.value
    })
})

operators.forEach(button => {
    button.addEventListener("click", () => {
        if (firstNumber === "" || isOperationDone === true) {
            firstNumber = +(display.textContent); 
            isOperationDone = false;
        } else {
            secondNumber = +(display.textContent);
            display.textContent = operate(operator,firstNumber,secondNumber);
            firstNumber = +(display.textContent);   
            isOperationDone = true   
        }  

        operator = button.value;
        
        if (secondNumber === "" || isOperationDone === true) {
            operation.textContent =  `${firstNumber} ${button.textContent}`
            isOperationDone = false;
            secondNumber = ""
        } else {
            operation.textContent +=  ` ${secondNumber}`
        }
    })
} )

equalsButton.addEventListener("click", () => {
    if ( firstNumber === "" || operator !== "" && display.textContent === "") {
        display.textContent = "Please enter numbers";
        operator = "";
        firstNumber = "";
        secondNumber = "";
    } else {
        secondNumber =  +(display.textContent);
        operation.textContent += ` ${secondNumber}`;
        display.textContent = operate(operator,firstNumber,secondNumber);
        operator = "";
        firstNumber = +(display.textContent);
        secondNumber = "";
        isOperationDone = true
    }
})

decimalButton.addEventListener("click", () => {
    if (Number.isInteger(parseFloat(display.textContent))) {
      display.textContent += ".";
    }
  })


clearButton.addEventListener("click", clear)




clear()