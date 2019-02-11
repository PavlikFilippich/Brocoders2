var table = document.getElementsByClassName('tablefirst')[0];

//Buttons 
var plusrow = document.getElementsByClassName('plus-row')[0]; 

var pluscell = document.getElementsByClassName('plus-column')[0];

var minusrow = document.getElementsByClassName('minus-row')[0];

var minuscell = document.getElementsByClassName('minus-column')[0];

// Time hide minus buttons
var HideTimer;

// coordinates
var localColumn , localRow;

// Количество рядов , Количество ячеек в ряде
var amountRow , amountsquarest;

// При загрузке страницы создаёт таблицу 4х4
window.onload = function () {    
    for (let i = 0; i < 4; i++) {
        table.appendChild(document.createElement('tr'));

        for (let r = 0; r < 4; r++) {
            document.getElementsByTagName('tr')[i].appendChild(document.createElement('td'));
        }
    }
};

table.onmouseover = function (event) {
    
    concealButtons();

    var target = event.target;

    if (target.tagName != 'TD') return; // Не на TD ? Тогда не интересует

    // Select coordinates
    localColumn = target.cellIndex;
    localRow = target.parentNode.rowIndex;
    // Moving Coordinates
    minuscell.style.left = target.offsetLeft + 'px';
    minusrow.style.top = target.offsetTop + 'px';
    clearTimeout(HideTimer);
};

document.onmouseover = function () {
    amountRow = table.getElementsByTagName('tr').length;
    amountsquares = table.getElementsByTagName('tr')[0].getElementsByTagName('td').length;
}

// Add column
pluscell.onclick = function () {
    for (let i = 0; i < amountRow; i++) {
        document.getElementsByTagName('tr')[i].appendChild(document.createElement('td'));
    }
};

// Add row
plusrow.onclick = function () {
    table.appendChild(document.createElement('tr'));
    for (let i = 0; i < amountsquares; i++) {
        document.getElementsByTagName('tr')[amountRow].appendChild(document.createElement('td'));
    }
};

function concealButton() {
    minusrow.style.visibility = "hidden";
    minuscell.style.visibility = "hidden";
}

// Delete column
minuscell.onclick = function () {

    if (amountsquares != 1) {
        for (let i = 0; i < amountRow; i++) {
            let Column = table.getElementsByTagName('tr')[i].getElementsByTagName('td')[localColumn];
            Column.remove();
        }
        minuscell.style.left = table.getElementsByTagName('tr')[0].lastElementChild.offsetLeft + 'px';
        concealButton();
    }
};

// Delete row
minusrow.onclick = function () {
    if (amountRow != 1) {
        let Rows = table.getElementsByTagName('tr')[localRow];
        Rows.remove();

        minusrow.style.top = table.lastElementChild.offsetTop + 'px';

        concealButton();
    }
};

// Если не наведено на таблицу скривает кнопки удаления
table.onmouseout = function () {
    HideTimer = setTimeout(concealButton, 1) ;
}

// Если навели на кнопку минуса строки - отменяет таймер
minusrow.onmouseover = function () {
    clearTimeout(HideTimer);
}

// Если навели на кнопку минуса колонки - отменяет таймер
minuscell.onmouseover = function () {
    clearTimeout(HideTimer);
}

function concealButtons() {
    if (amountRow != 1) {
        minusrow.style.visibility = "visible";
    }
    if (amountsquares != 1) {
        minuscell.style.visibility = "visible";
    }
};