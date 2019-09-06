(function () {
    const display = document.querySelector('#display');
    const td = document.querySelectorAll('.calc');
    const allowed_keys = ['Enter', 'Backspace', 'Shift', 'Delete', '/', '+', '*', '-'];
    const operators = ['/', '+', '*', '-'];


    const updateNum = (event) => {
        let num = event.target.id;
        let value = display.value;
        let prevValue = value.charAt(value.length - 1);

        if (event.target !== event.currentTarget || event.target.id !== "") {
            if (num == '.') {
                if (value.indexOf('.') !== -1 ||
                    (prevValue && operators.includes(prevValue))) {
                    ;
                } else {
                    display.setSelectionRange(0, 0);
                    display.value += num;

                }
            } else if (operators.includes(num) && operators.includes(prevValue)) {
                return;
            }

            else {
                display.setSelectionRange(0, 0);
                display.value += num;
            }

        } else if (event.target.classList.contains('del')) {
            display.value = value.slice(0, value.length - 1);

        } else if (event.target.classList.contains('clear')) {
            display.value = '';

        } else if (event.target.classList.contains('eval')) {
            if (operators.includes(prevValue)) { return; }
            else if (value.length > 1) {
                result = eval(value) * 1e6
                result = Math.round(result, 6);
                result = result / 1e6;
                display.value = result;
            }
        }


    };


    td.forEach(cell => {
        cell.addEventListener('click', updateNum)
    });


    display.addEventListener('keydown', function (event) {
        const allowed_key = allowed_keys.includes(event.key);
        if ((event.key >= '0' && event.key <= '9') || allowed_key) {
        }
        else {
            event.preventDefault();
        }
    });
})();