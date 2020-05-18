var map = {
    width : 0,
    height : 0,
    mapBackground : null,
    
    createMap : function() {
        var table = document.querySelector("#combatMap");
        var tableBody = document.querySelector("tbody");
        var canvas = document.querySelector("canvas");
        var tableStyle = getComputedStyle(table);

        // reset table
        if (tableBody) {
            table.removeChild(tableBody);
        }
        
        // set dimensions
        this.width = document.querySelector("#widthInput").value;
        this.height = document.querySelector("#heightInput").value;

        // create map
        if (this.height && this.width) {
            for (let i = 0; i < this.height; i++) {
                let row = table.insertRow();
                for (let  j = 0; j < this.width; j++) {
                    let cell = row.insertCell();
                    let text = document.createTextNode(i.toString() + j.toString());
                    cell.appendChild(text);
                }
            }
        } else {
            console.log("Empty Height or Width Value")
        }

        // clear dimension inputs
        document.querySelector("#widthInput").value = "";
        document.querySelector("#heightInput").value = "";

        // set canvas size (for drawing on table)
        canvas.height = table.offsetHeight;
        canvas.width = table.offsetWidth;

        // set canvas offset
        canvas.style.marginLeft = tableStyle.marginLeft;
        canvas.style.marginRight = tableStyle.marginRight;
    }
}