// Time hide minus buttons
let HideTimer;

// coordinates
let localColumn , localRow;

const table = document.querySelector(".tablefirst");

//Buttons 
const plusrow = document.querySelector(".plus-row"); 
const pluscell = document.querySelector(".plus-column");
const minusrow = document.querySelector(".minus-row");
const minuscell = document.querySelector(".minus-column");

class MyTable {
    constructor(){}
    createTable(x){
        for (let i = 0; i < x; i++) {
        let addRow = table.insertRow(i);
    
        for (let k = 0; k < x; k++) {
            addRow.insertCell(k);
        }}
    }    
}

// При загрузке страницы создаёт таблицу 4х4
window.onload = new MyTable() ;
window.onload.createTable(4);
    
table.onmouseover = function (event) {   
    VisibleButton();
    clearTimeout(HideTimer);
    
    let target = event.target;
    if (target.tagName != 'TD') return; // Не на TD ? Тогда не интересует

    // Select coordinates
    localColumn = target.cellIndex;
    localRow = target.parentNode.rowIndex;
    // Moving Coordinates
    minuscell.style.left = target.offsetLeft + 'px';
    minusrow.style.top = target.offsetTop + 'px';   
};

//Add col
pluscell.addEventListener('click' , addcol);
function addcol () {
    for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].insertCell();
    }
};

// Add row
plusrow.addEventListener('click', addrow);
function addrow() {
    table.insertRow();
    for (let i = 0; i < table.rows[0].cells.length; i++) {
        table.rows[table.rows.length-1].insertCell(i);
    }
};

function concealButton() {
    minusrow.style.visibility = "hidden";
    minuscell.style.visibility = "hidden";
};

// Delete column
minuscell.addEventListener('click' , removecell);
function removecell () { 
    if (table.rows[0].cells.length != 1) {
        for (let i = 0; i < table.rows.length; i++) {
            table.rows[i].deleteCell(localColumn); 
        }  
    }
    minuscell.style.display = 'none';
};

// Delete row
minusrow.addEventListener('click', removerow );
function removerow () {
    if (table.rows.length != 1) {table.deleteRow(localRow);}
    minusrow.style.display = 'none';
};

// Если не наведено на таблицу скривает кнопки удаления
table.onmouseout = function() { HideTimer = setTimeout(concealButton, 500) }

// Если навели на кнопку минуса строки - отменяет таймер
minusrow.onmouseover = function() {
    clearTimeout(HideTimer);
    VisibleButton();
}

// Если навели на кнопку минуса колонки - отменяет таймер
minuscell.onmouseover =  function() {
    clearTimeout(HideTimer);
    VisibleButton();
}

function VisibleButton () {
    if (table.rows.length != 1) {
        minusrow.style.visibility = "visible";
        minusrow.style.display = "";
    }
    if (table.rows[0].cells.length != 1) {
        minuscell.style.display = "";
        minuscell.style.visibility = "visible";
    }
};
