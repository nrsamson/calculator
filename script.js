function operate(a, b, operator) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) return 'Error';
            return a / b;
        default:
            return 'Error';
    }
}

function updateDisplay(button) {
    display.textContent = calculateCurrentValue(button.textContent);
}

function showInfo() {
    testing.innerHTML = `(${lastValue}) ${operator} (${currentValue})`;
}

function calculateCurrentValue(input) {
    showInfo();
    switch (input) {
        case 'CE':
            if (currentValue && currentValue !== 0) {
                currentValue = 0;
            }
            else {
                lastValue = '';
                currentValue = '';
                operator = lastValue;
            }
            break;
        case '<':
            currentValue = Math.floor(currentValue / 10);
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            operator = input;
            if (!lastValue) {
                lastValue = currentValue;
                currentValue = '';
                showInfo();
                return lastValue;
            } else {

            }
            break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            if (!lastPressed) {
                currentValue *= 10;
                currentValue += Number(input);
            }
            break;
        case '+/-':
            currentValue = -currentValue;
            break;
        case '=':
            if (lastValue && currentValue) {
                let temp = lastValue;
                lastValue = operate(lastValue, currentValue, operator);
                newSession = false;
                showInfo();
                return lastValue;
            } else if (operator) {
                lastValue = operate(lastValue, currentValue, operator);
                return lastValue;
            }
            break;
        default:
            break;
    }
    showInfo();
    return currentValue;
}

const buttons = document.querySelectorAll('.button');
const backButton = document.querySelector('.back-button');

const display = document.querySelector('.display');
const testing = document.querySelector('.testing');

let lastValue = '';
let currentValue = '';
let lastPressed = '';
let operator = '';

showInfo();

buttons.forEach(button => {
    button.addEventListener('click', function () { updateDisplay(button) })
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Backspace') {
        updateDisplay(backButton);
    }
});