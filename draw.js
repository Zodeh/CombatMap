var drawObj = {
    canvas : null, 
    ctx : null,
    flag : false,
    prevX : 0, currX : 0,
    prevY : 0, currY : 0,
    dot_flag : false,
    
    lineColor : "black",
    lineWidth : "2",

    init : function() {
        this.canvas = document.getElementById("can");
        this.ctx = this.canvas.getContext("2d");

        this.canvas.addEventListener("mousemove", function (e) {
            drawObj.findxy("move", e);
        });
        
        this.canvas.addEventListener("mousedown", function (e) {
            drawObj.findxy("down", e);
        });

        this.canvas.addEventListener("mouseup", function (e) {
            drawObj.findxy("up", e);
        });

        this.canvas.addEventListener("mouseout", function (e) {
            drawObj.findxy("out", e);
        });
    },

    findxy : function(action, e) {
        if (action == "down") {
            this.prevX = this.currX;
            this.prevY = this.currY;
            this.currX = e.clientX - this.canvas.offsetLeft;
            this.currY = e.clientY - this.canvas.offsetTop;

            this.flag = true;
            this.dot_flag = true;

            if (this.dot_flag) {
                this.ctx.beginPath();
                this.ctx.fillStyle = this.lineColor;
                this.ctx.fillRect(this.currX, this.currY, 2, 2);
                this.ctx.closePath();
                this.dot_flag = false;
            }
        }
        if (action == "up" || action == "out") {
            this.flag = false;
        }

        if (action == "move") {
            if (this.flag) {
                this.prevX = this.currX;
                this.prevY = this.currY;
                this.currX = e.clientX - this.canvas.offsetLeft;
                this.currY = e.clientY - this.canvas.offsetTop;
                this.draw();
            }
        }
    },
    
    draw : function() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.prevX, this.prevY);
        this.ctx.lineTo(this.currX, this.currY);
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.stroke();
        this.ctx.closePath();
    },

    changeColor : function(colorEl) {
        switch (colorEl.id) {
            case "green":
                this.lineColor = "green";
                break;
            case "blue":
                this.lineColor = "blue";
                break;
            case "red":
                this.lineColor = "red";
                break;
            case "yellow":
                this.lineColor = "yellow";
                break;
            case "orange":
                this.lineColor = "orange";
                break;
            case "black":
                this.lineColor = "black";
                break;
        }
        this.lineWidth = 2;
    }
}