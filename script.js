function updateOperationSign(sign) {
    document.getElementById('operationSign').innerText = sign;
}

function validateInputs(num1, num2, operation) {
    if (isNaN(num1) || (operation !== 'squareRoot' && operation !== 'log' && isNaN(num2))) {
        throw new Error('Please enter valid numbers');
    }
    if (operation === 'divide' && num2 === 0) {
        throw new Error('Division by zero is not allowed');
    }
    if (operation === 'squareRoot' && num1 < 0) {
        throw new Error('Cannot calculate square root of a negative number');
    }
    if (operation === 'log' && num1 <= 0) {
        throw new Error('Cannot calculate logarithm of zero or negative numbers');
    }
}

function formatResult(number) {
    return Number.isInteger(number) ? number : parseFloat(number.toFixed(4));
}

function evaluateOperation() {
    const resultElement = document.getElementById('result');
    try {
        const num1 = parseFloat(document.getElementById('num1').value);
        const num2 = parseFloat(document.getElementById('num2').value);
        const operation = document.querySelector('input[name="operation"]:checked').value;
        
        validateInputs(num1, num2, operation);
        let result;

        switch (operation) {
            case 'add':
                result = num1 + num2;
                break;
            case 'subtract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 * num2;
                break;
            case 'divide':
                result = num1 / num2;
                break;
            case 'modulus':
                result = num1 % num2;
                break;
            case 'exponent':
                result = Math.pow(num1, num2);
                break;
            case 'squareRoot':
                result = Math.sqrt(num1);
                break;
            case 'log':
                result = Math.log(num1);
                break;
            default:
                throw new Error('Invalid operation');
        }
        
        resultElement.style.color = '#764ba2';
        resultElement.innerText = formatResult(result);
    } catch (error) {
        resultElement.style.color = '#dc3545';
        resultElement.innerText = error.message;
    }
}

// Add keyboard support
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        evaluateOperation();
    }
});

// Clear inputs when operation changes
document.querySelectorAll('input[name="operation"]').forEach(radio => {
    radio.addEventListener('change', function() {
        document.getElementById('result').innerText = '';
    });
});