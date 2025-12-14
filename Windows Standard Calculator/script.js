const keypad_numbers = document.querySelectorAll('.num');
const display_Output = document.querySelector('.output');
const keypad_operator = document.querySelectorAll('.op');
const history = document.querySelector('.history');
const equalsButton = document.querySelector('#ans');

const clearButton = document.querySelector('.func:nth-child(3)');
const decimalButton = document.querySelector('.key-grid > .func:last-child');

let previousValue = "";
let currentValue = "";
let operator = "";
let resultDisplayed = false;


/**
 * Helper function to perform the calculation.
 * @param {number} prev - The first operand.
 * @param {number} curr - The second operand.
 * @param {string} op - The operator (+, −, ×, ÷).
 * @returns {number|string} The result or "Error".
 */
function calculate(prev, curr, op) {
    let result = 0;

    if (op === "+") {
        result = prev + curr;
    } else if (op === "−") {
        result = prev - curr;
    } else if (op === "×") {
        result = prev * curr;
    } else if (op === "÷") {
        if (curr === 0) {
            return "Error: Div by 0";
        }
        result = prev / curr;
    }

    // Handle floating point precision issues by rounding result
    return parseFloat(result.toFixed(10));
}

// --- EVENT LISTENERS ---

// NUMBER BUTTON CLICK
keypad_numbers.forEach((btn) => {
    btn.addEventListener('click', () => {
        let num = btn.textContent;

        if (resultDisplayed) {
            // Start a new calculation after a result is displayed
            display_Output.textContent = num;
            currentValue = num;
            resultDisplayed = false;
            return;
        }

        if (display_Output.textContent === "0") {
            display_Output.textContent = num;
            currentValue = num;
        } else {
            display_Output.textContent += num;
            currentValue += num;
        }
    });
});

// DECIMAL BUTTON CLICK
if (decimalButton) {
    decimalButton.addEventListener('click', () => {
        if (resultDisplayed) {
            // Start a new number with 0.
            display_Output.textContent = "0.";
            currentValue = "0.";
            resultDisplayed = false;
        } else if (!currentValue.includes('.')) {
            // Only allow one decimal point
            display_Output.textContent += ".";
            currentValue += ".";
        }
    });
}


// OPERATOR BUTTON CLICK
keypad_operator.forEach(btn => {
    btn.addEventListener('click', () => {

        // 1. If previousValue is empty, set the current display as the first operand
        if (previousValue === "") {
            previousValue = display_Output.textContent;
            currentValue = "";
        }

        // 2. If both values exist (chaining), calculate the running total
        else if (currentValue !== "") {
            let prev = Number(previousValue);
            let curr = Number(currentValue);

            let result = calculate(prev, curr, operator);

            if (typeof result === 'string') {
                display_Output.textContent = result;
                // Reset state upon error
                previousValue = "";
                currentValue = "";
                operator = "";
                history.textContent = "";
                resultDisplayed = true;
                return;
            }

            display_Output.textContent = result;
            previousValue = String(result); // Use result as the new previousValue
            currentValue = "";
            resultDisplayed = true;
        }

        // 3. Set the new operator
        operator = btn.textContent;

        // 4. Update history and prepare for next input
        history.textContent = previousValue + " " + operator;
        display_Output.textContent = "0"; // Reset output for the next number
        resultDisplayed = false;
    });
});


// EQUALS BUTTON CLICK
equalsButton.addEventListener('click', () => {

    // Only calculate if all parts are available (e.g., 5 + 3)
    if (previousValue === "" || currentValue === "" || operator === "") {
        return;
    }

    let prev = Number(previousValue);
    let curr = Number(currentValue);

    let result = calculate(prev, curr, operator);

    // Update history for the completed calculation
    history.textContent = previousValue + " " + operator + " " + currentValue + " =";

    if (typeof result === 'string') {
        display_Output.textContent = result;
        // Reset all state upon error
        previousValue = "";
        currentValue = "";
        operator = "";
    } else {
        display_Output.textContent = result;

        // Prepare for the next operation
        previousValue = String(result); // Keep result to allow immediate chaining/operator press
        currentValue = "";
        operator = "";
    }

    resultDisplayed = true;
});


// CLEAR/RESET FUNCTION ('C' button)
if (clearButton) {
    clearButton.addEventListener('click', () => {
        previousValue = "";
        currentValue = "";
        operator = "";
        resultDisplayed = false;
        display_Output.textContent = "0";
        history.textContent = "";
    });
}