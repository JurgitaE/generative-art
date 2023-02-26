window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d'); //canvas 2D API
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // canvas settings
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'yellow'; //line color
    ctx.lineWidth = 50;
    ctx.lineCap = 'round'; //rounds line corners
    ctx.shadowColor = 'rgba(0, 0 , 0 , 0.7)';
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;

    // ctx.fillRect(10, 10, 100, 100); //(x,y. widht, height) draw rectangle

    // EFFECT SETTINGS
    let size = 200;
    let sides = 5;
    let maxLevel = 3;
    let scale = 0.5;
    let spread = 0.5;
    let branches = 2;


    function drawBranch(level) {
        if (level > maxLevel) return;
        ctx.beginPath();
        ctx.moveTo(0, 0); //starting point coordinates
        ctx.lineTo(size, 0);
        ctx.stroke();

        for (let i = 0; i < branches; i++) {
            ctx.save();
            ctx.translate(size - (size / branches) * i, 0);
            ctx.rotate(spread);
            ctx.scale(scale, scale);
            drawBranch(level + 1);
            ctx.restore();

            ctx.save();
            ctx.translate(size - (size / branches) * i, 0);
            ctx.rotate(-spread);
            ctx.scale(scale, scale);
            drawBranch(level + 1);
            ctx.restore();
        }

    }

    function drawFractal() {
        //styles must be applied BEFORE a figurine is drawn
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2); //rotation center change


        for (let i = 0; i < sides; i++) {
            ctx.rotate(Math.PI * 2 / sides); //takes value in radians/ one radian = 57.3deg. full circle Math.PI*2 radians
            drawBranch(0);


        }
        ctx.restore(); //removes all styling for the proceeding elements
    }
    drawFractal();
});