var map = {
    width : 0,
    height : 0,
    mapBackground : null,
    
    createMap : function() {
        var table = document.querySelector("#combatMap");
        var tableBody = document.querySelector("tbody");
        var drawCanvas = document.querySelector("#drawCanvas");
        var charCanvas = document.querySelector("#charCanvas");
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

        // set drawCanvas size (for drawing on table)
        drawCanvas.height = table.offsetHeight;
        drawCanvas.width = table.offsetWidth;

        // set charCanvas size (for adding character icons)
        charCanvas.height = table.offsetHeight;
        charCanvas.width = table.offsetWidth;

        // set drawCanvas offset
        drawCanvas.style.marginLeft = tableStyle.marginLeft;
        drawCanvas.style.marginRight = tableStyle.marginRight;

        // set charCanvas offset
        charCanvas.style.marginLeft = tableStyle.marginLeft;
        charCanvas.style.marginRight = tableStyle.marginRight;
    }
}