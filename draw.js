var drawObj = {
    canvas : null, 
    ctx : null,
    flag : false,
    prevX : 0, currX : 0,
    prevY : 0, currY : 0,
    dot_flag : false,
    
    lineColor : "black",
    lineWidth : "2",
    pen : false,
    eraser : false,

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
        if (this.pen || this.eraser) {
            if (action == "down") {
                this.prevX = this.currX;
                this.prevY = this.currY;
                this.currX = e.clientX - this.canvas.offsetLeft;
                this.currY = e.clientY - this.canvas.offsetTop;

                this.flag = true;
                this.dot_flag = true;

                if (this.dot_flag) {
                    this.ctx.beginPath();
                    if (this.pen) {
                        this.ctx.fillStyle = this.lineColor;
                        this.ctx.fillRect(this.currX, this.currY, 2, 2);
                    } else if(this.eraser) {
                        this.ctx.clearRect(this.currX - 7, this.currY - 7, 14, 14);
                    }
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
                    
                    if (this.pen) {
                        this.draw();
                    } else if (this.eraser) {
                        // erase (centered on mouse)
                        this.ctx.clearRect(this.currX - 7, this.currY - 7, 14, 14);
                    }
                }
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

    // enable drawing
    changeColor : function(colorEl) {
        this.pen = true;
        this.eraser = false;
        this.canvas.style.cursor = "crosshair";

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
    },

    enableEraser : function() {
        this.pen = false;
        this.eraser = true;
        this.canvas.style.cursor = "cell";
    }
}