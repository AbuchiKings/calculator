
const display = document.querySelector('#display');
const equals = document.querySelector('.eval');
const del = document.querySelector('.del');
const clear = document.querySelector('.clear');
const td = document.querySelectorAll('.calc')

let digits = display.value;


const updateNum = () => {
    let num = event.target.id;
    if (event.target !== event.currentTarget || event.target.id !== "") {
        if (num == '.') {
            if (display.value.indexOf('.') !== -1) {
                ;
            } else {
                display.value += num;
            }
        } else {
            display.value += num;
        }
    }
};
td.forEach(cell => {
    cell.addEventListener('click', updateNum)
});
