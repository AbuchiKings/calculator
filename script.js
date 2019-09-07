(function () {
    const display = document.querySelector('#display');
    const td = document.querySelectorAll('.calc');
    const allowed_keys = ['Enter', 'Backspace', 'Shift', '/', '+', '*', '-', '.'];
    const operators = ['/', '+', '*', '-'];
    let curInput = '';

    const updateCurInput = (num) => {
        if (operators.includes(num)) {
            curInput = '';
        } else if (num === 'Backspace') {
            curInput = curInput.slice(0, curInput.length - 1);
        } else {
            curInput += num;
        }
    };

    const checkPrevValue = () => {
        let value = display.value;
        let prevValue = value.charAt(value.length - 1);
        return operators.includes(prevValue);
    };

    /**
     * @description Function that checks for wrong inputs before calculating input
     * @param value Strings of numbers(display.value)
     * @param prevValue Last char of value
     * @returns Void
     */
    const calc = (prevValue, value) => {
        if (operators.includes(prevValue) || prevValue === '.') { return; }
        else if (value.length > 1) {
            const arr = value.split('.')

            if (arr.includes('')) {
                return;
            }
            let result = eval(value) * 1e6
            result = Math.round(result, 6);
            result = result / 1e6;
            display.value = result;
            curInput = '';
        }
        return;
    }

    const updateNum = (event) => {
        let num = event.target.id;
        let value = display.value;
        let prevValue = value.charAt(value.length - 1);
        if (event.target !== event.currentTarget || event.target.id !== "") {

            if (num == '.') {
                if (checkPrevValue() || curInput.indexOf('.') !== -1) {
                    console.log('hit')
                    return
                        ;
                } else {
                    display.value += num;
                    updateCurInput(num);

                }
            } else if (operators.includes(num) && checkPrevValue()) {
                return;
            } else {
                display.value += num;
                updateCurInput(num);
            }

        } else if (event.target.classList.contains('del')) {
            display.value = value.slice(0, value.length - 1);
            curInput = curInput.slice(0, curInput.length - 1);

        } else if (event.target.classList.contains('clear')) {
            display.value = '';
            curInput = ''

        } else if (event.target.classList.contains('eval')) {
            calc(prevValue, value);
        }
    }





    td.forEach(cell => {
        cell.addEventListener('click', updateNum)
    });


    // for keyboard
    display.addEventListener('keydown', function (event) {
        const allowed_key = allowed_keys.includes(event.key);
        if ((event.key >= '0' && event.key <= '9') || allowed_key || operators.includes(event.key)) {
            if ((event.key >= '0' && event.key <= '9') || event.key === '.') {
                if (event.key === '.') {
                    if (curInput.indexOf('.') !== -1 || checkPrevValue()) return event.preventDefault();
                }

            }

            updateCurInput(event.key);

            if (event.key === "Enter") {
                let value = display.value;
                let prevValue = value.charAt(value.length - 1);
                calc(prevValue, value);
            }
        }
        else {
            event.preventDefault();
        }
    });
})();

