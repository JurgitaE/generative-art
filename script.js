window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d'); //canvas 2D API
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;

    // canvas settings
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'yellow'; //line color
    ctx.lineWidth = 30;
    ctx.lineCap = 'round'; //rounds line corners

    // ctx.fillRect(10, 10, 100, 100); //(x,y. widht, height) draw rectangle

    // EFFECT SETTINGS
    let size = 200;
    let sides = 7;
    //styles must be applied BEFORE a figurine is drawn
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2); //rotation center change
    ctx.scale(1, 1);
    ctx.rotate(0);
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < sides; i++) {

        ctx.beginPath();
        ctx.moveTo(0, 0); //starting point coordinates
        ctx.lineTo(size, 0);
        ctx.stroke();

        ctx.rotate(Math.PI * 2 / sides); //takes value in radians/ one radian = 57.3deg. full circle Math.PI*2 radians

    }

    ctx.restore(); //removes all styling for the proceeding elements


});