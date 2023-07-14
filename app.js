const display = document.querySelector(".display")
const equalsButton = document.querySelector(".equals-button")
const numbers = document.querySelectorAll(".number-button")
const operators = document.querySelectorAll(".operator-button")
const clearButton = document.querySelector(".clear-button")

let firstNumber = ""
let secondNumber = ""
let operator = ""
let isOperatorChosen = false




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
}




numbers.forEach(number => {
    number.addEventListener("click", event => {
        if (firstNumber != "" || display.textContent != Number) {
            display.textContent = "";
        }
        display.textContent += number.value
    })
})

operators.forEach(button => {
    button.addEventListener("click", event => {
        if (firstNumber == "") {
            firstNumber = parseInt(display.textContent);      
        } else {
            secondNumber = parseInt(display.textContent);
            display.textContent = operate(operator,firstNumber,secondNumber);
            firstNumber = parseInt(display.textContent);      
        }  
        operator = button.value;
    })
} )

equalsButton.addEventListener("click", event => {
    if ( firstNumber == "" || secondNumber == "") {
        display.textContent = "Please enter numbers"
    } else {
        secondNumber =  parseInt(display.textContent);
        display.textContent = operate(operator,firstNumber,secondNumber);
        operator = ""
        firstNumber = ""
    }
})

clearButton.addEventListener("click", clear)




clear()