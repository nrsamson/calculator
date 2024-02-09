const calculator = {
    currentValue: null,
    previousValue: null,
    operator: null,
    clear() {
        this.currentValue = null;
        this.previousValue = null;
        this.operator = null;
    },
    operate(a, b, operator) {
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
            case '^':
                return Math.pow(a, b);
            default:
                return 'D';
        }
    }
};

function updateDisplay(text) {
    display.textContent = text;
}

function getDisplayText() {
    return display.textContent;
}

function getDisplayValue() {
    return Number(display.textContent);
}

function roundOutput(text) {
    if (text.length <= 12) {
        return text;
    } else {
        return Number(text).toExponential();
    }
}

function processInput(text) {
    let output;

    if (!isNaN(text)) {
        output = numbers(text);
        lastSelected = text;
    } else if (text === 'CE') {
        output = clear();
        lastSelected = 'C';
    } else if (text === '<') {
        output = backspace();
        lastSelected = 'B';
    } else if (text === '+/-') {
        output = signSwitch();
        lastSelected = 'S';
    } else if (text === '=') {
        output = equals();
        lastSelected = 'E';
    } else if (text === 'D') {
        showDebug = !showDebug;
    } else if (text === '.') {
        output = decimal();
        lastSelected = text;
    } else if (text === 'xy') {
        output = setOperator('^');
        lastSelected = '^';
    } else if (operators.includes(text)) {
        output = setOperator(text);
        lastSelected = text;
    }

    roundedOutput = roundOutput(output);
    updateDisplay(roundedOutput);
    updateInfo();
}

function setOperator(text) {
    let output;
    if (operators.includes(lastSelected)) {
        output = display.textContent;
    } else {
        output = equals();
    }
    calculator.operator = text;
    return output;
}

function decimal() {
    let current = getDisplayText();
    let output = current;
    if (current && !current.includes('.')) {
        output = current + '.';
    }
    return output;
}

function equals() {
    let current = getDisplayValue();
    output = current;

    if (calculator.previousValue && calculator.currentValue && calculator.operator) {
        if (lastSelected !== 'E') {
            output = calculator.operate(calculator.previousValue, calculator.currentValue, calculator.operator);
            calculator.previousValue = calculator.currentValue;
            calculator.currentValue = output;
        } else {
            let temp = calculator.previousValue;
            calculator.previousValue = calculator.currentValue;
            calculator.currentValue = temp;
            output = calculator.operate(calculator.previousValue, calculator.currentValue, calculator.operator);
            calculator.previousValue = calculator.currentValue;
            calculator.currentValue = output;
        }
    }
    return String(output);
}

function numbers(text) {
    let current = getDisplayText();
    let output;

    if (operators.includes(lastSelected)) {
        calculator.previousValue = getDisplayValue();
        calculator.currentValue = Number(text);
        output = text;
    } else {
        output = current += text;
        calculator.currentValue = Number(output);
    }
    return output;
}

function backspace() {
    let current = getDisplayText();
    let output;
    if (Math.abs(getDisplayValue()) < 10) {
        output = '';
    } else {
        output = current.slice(0, -1);
    }
    return output;
}

function clear() {
    calculator.clear();
    return '';
}

function signSwitch() {
    let current = getDisplayText();
    let output = current;
    if (current) {
        if (current.charAt(0) === '-') output = current.substring(1);
        else output = '-' + output;
    }
    return output;
}

function updateInfo() {
    if (showDebug === true) {
        testing.innerHTML = `previousValue: ${calculator.previousValue}<br>currentValue: ${calculator.currentValue}<br>operator: ${calculator.operator}<br>lastSelected: ${lastSelected}`;
    } else {
        testing.innerHTML = '';
    }
}

const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');
const testing = document.querySelector('.testing');
const operators = '+-*/^';
const digits = '0123456789';

let lastSelected;
showDebug = true;

updateInfo();

buttons.forEach(button => {
    button.addEventListener('click', function () {
        processInput(button.textContent)
    })
});

document.addEventListener('keydown', function (event) {
    switch (event.key) {
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
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            processInput(event.key);
            break;
        case 'Backspace':
            processInput('<');
            break;
        case 'Enter':
            processInput('=');
            break;
        case 'Shift':
            showDebug = !showDebug;
            updateInfo();
            break;
        case ' ':
            processInput('CE');
            break;
        default:
            break;
    }
});