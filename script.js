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
            default:
                return 'D';
        }
    }
};

function updateDisplay(text) {
    display.textContent = text;
}

function processInput(text) {
    let output;
    let operators = '+-*/';
    if (!isNaN(text)) {
        output = numbers(text);
    } else if (text === 'CE') {
        output = clear();
    } else if (text === '<') {
        output = backspace();
    } else if (text === '+/-') {
        output = signSwitch();
    } else if (text === '=') {
        output = equals(text);
    } else if (operators.includes(text)) {
        output = setOperator(text);
    }
    updateDisplay(output);
    updateInfo();
}

function setOperator(text) {
    if (calculator.currentValue) {
        calculator.operator = text;
    }
    return display.textContent;
}

function equals(text) {
    let current = Number(display.textContent);
    output = current;
    if (calculator.previousValue) {
        output = calculator.operate(calculator.previousValue, calculator.currentValue, calculator.operator);
    }
    return String(output);
}

function numbers(text) {
    let current = Number(display.textContent);
    let output;
    if (!calculator.operator) {
        output = (current === 0 || current === '') ? Number(text) : Number(current += text);
        calculator.currentValue = output;
    } else {
        display.textContent = '';
        calculator.previousValue = calculator.currentValue;
        calculator.currentValue = Number(text);
        output = Number(text);

    }
    return String(output);
}

function backspace() {
    let current = Number(display.textContent);
    let output;
    if (Math.abs(current) <= 9) {
        output = '';
    } else if (current > 0) {
        output = Math.floor(current / 10);
    } else if (current < 0) {
        output = Math.ceil(current / 10)
    }
    return String(output);
}

function clear() {
    calculator.clear();
    return '';
}

function signSwitch() {
    let current = display.textContent;
    let output = current;
    if (display.textContent) {
        output = Number(current) * -1;
    }
    return String(output);
}

function updateInfo() {
    testing.innerHTML = `previousValue: ${calculator.previousValue}, currentValue: ${calculator.currentValue}<br>operator: ${calculator.operator}`;
}

const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');
const testing = document.querySelector('.testing');

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
        case 'Backspace':
            processInput(event.key);
            break;
        case 'Enter':
            processInput('=');
            break;
        case ' ':
            processInput('CE');
            break;
        default:
            break;
    }
});