const display = document.querySelector(".display")
const operation = document.querySelector(".operation")
const equalsButton = document.querySelector(".equals-button")
const numbers = document.querySelectorAll(".number-button")
const operators = document.querySelectorAll(".operator-button")
const clearButton = document.querySelector(".clear-button")
const decimalButton = document.querySelector(".decimal-button")

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
    if (op == "/" && b == 0) {
        return "Captain we have a problem"
    }

    result = operations[op](a, b);
    formatNumberWithDecimals(result,6)
    return result;
  }


function formatNumberWithDecimals(number, maxDecimals) {
    const result = number.toFixed(maxDecimals); 

    if (Number.isInteger(number) || result.length <= maxDecimals + 2) {
        return result; 
    } else {
        return parseFloat(result).toFixed(maxDecimals); 
    }
}


function clear() {
    firstNumber = ""
    secondNumber = ""
    operator = ""
    display.textContent = ""
    operation.textContent = ""
}



numbers.forEach(number => {
    number.addEventListener("click", () => {
        if (firstNumber !== "" && display.textContent == firstNumber || display.textContent.includes("Please") || isOperationDone === true) {
            display.textContent = "";
        } 
        display.textContent += number.value
    })
})

operators.forEach(button => {
    button.addEventListener("click", () => {
        if (firstNumber === "" || isOperationDone === true) {
            firstNumber = parseInt(display.textContent); 
        } else {
            secondNumber = parseInt(display.textContent);
            display.textContent = operate(operator,firstNumber,secondNumber);
            firstNumber = parseInt(display.textContent);   
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
        secondNumber =  parseInt(display.textContent);
        operation.textContent += ` ${secondNumber}`;
        display.textContent = operate(operator,firstNumber,secondNumber);
        operator = "";
        firstNumber = parseInt(display.textContent);
        secondNumber = "";
        isOperationDone = true
    }
})

decimalButton.addEventListener("click", () => {
    if (Number.isInteger(parseFloat(display.textContent))) {
      display.textContent += ",";
    }
  })


clearButton.addEventListener("click", clear)




clear()