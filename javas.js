class MyTable {
    constructor(size){

        this.plusRow = document.querySelector(".plus-row"); 
        this.plusCell = document.querySelector(".plus-column");
        this.minusRow = document.querySelector(".minus-row");
        this.minusCell = document.querySelector(".minus-column");
        this.table = document.querySelector(".tablefirst");

        this.plusCell.addEventListener('click', this.addCol.bind(this));
        this.plusRow.addEventListener('click', this.addRow.bind(this));
        this.minusCell.addEventListener('click' , this.removeCell.bind(this));
        this.minusRow.addEventListener('click', this.removeRow.bind(this));
        this.table.addEventListener ('mousemove',this.movingTable.bind(this));
        this.table.addEventListener ('mousemove',this.visibleButton.bind(this));
        this.table.addEventListener('mousemove',this.hideTimers.bind(this)) ;
        this.minusRow.addEventListener ('mousemove',this.cancelRow.bind(this));
        this.minusCell.addEventListener ('mousemove',this.cancelCell.bind(this));
        this.table.addEventListener('mousemove',this.hideTimers.bind(this)); 

        for (let i = 0; i < size; i++) {
            let addRow = this.table.insertRow(i);
        
            for (let k = 0; k < size; k++) {
                addRow.insertCell(k);
        }};    
    } 

    movingTable (event) {         
        clearTimeout(this.hideTimers);
        let target = event.target;
        if (target.tagName != 'TD') return; // Не на TD ? Тогда не интересует
        // Select coordinates
        this.localColumn = target.cellIndex;
        this.localRow = target.parentNode.rowIndex;
        // Moving Coordinates

        this.minusCell.style.left = target.offsetLeft + 'px';
        this.minusRow.style.top = target.offsetTop + 'px'; 
    };
    addCol () {
        for (let i = 0; i < this.table.rows.length; i++) {
            this.table.rows[i].insertCell();
        }
    };  
    addRow() {
        this.table.insertRow();
        for (let i = 0; i < this.table.rows[0].cells.length; i++) {
            this.table.rows[this.table.rows.length-1].insertCell(i);
        }
    };
    //  Если не наведено на таблицу скривает кнопки удаления 
    hideTimers(){
        this.hideTimer = setTimeout(this.concealButton.bind(this), 300)};
        
    concealButton() {
        if (!this.minusRow){
            this.minusRow.style.visibility = "hidden";
        }
        //  this.minusRow.style.visibility = "hidden";
         if (!this.minusCell){
            this.minusCell.style.visibility = "hidden";
        }
        //  this.minusCell.style.visibility = "hidden";
     };
    removeCell () { 
        if (this.table.rows[0].cells.length !== 1) {
            for (let i = 0; i < this.table.rows.length; i++) {
                this.table.rows[i].deleteCell(this.localColumn); 
            }  
        }
        this.minusCell.style.display = 'none';
    };
    removeRow () {
        if (this.table.rows.length !== 1) {this.table.deleteRow(this.localRow);}
        this.minusRow.style.display = 'none';
    };

    

    // Если навели на кнопку минуса строки - отменяет таймер
    cancelRow(){
        clearTimeout(this.hideTimer);
        this.visibleButton();
    };
    cancelCell () {   

        clearTimeout(this.hideTimer);
        this.visibleButton();
        
    };
    visibleButton () {
        if (this.table.rows.length !== 1) {
            this.minusRow.style.visibility = "visible";
            this.minusRow.style.display = "block";
        }
        if (this.table.rows[0].cells.length !== 1) {
            this.minusCell.style.display = "block";
            this.minusCell.style.visibility = "visible";
        }
        
    };
}
window.onload = new MyTable(4) ;
