function firstVersion() {

    window.addEventListener('load', function () {
        const canvas = document.getElementById('canvas1');
        const ctx = canvas.getContext('2d'); //canvas 2D API holds all canvas drawing methods and settings
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // canvas settings
        ctx.fillStyle = 'green';
        ctx.lineCap = 'round'; //rounds line corners
        ctx.shadowColor = 'rgba(0, 0 , 0 , 0.7)';
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 5;
        ctx.shadowBlur = 10;

        // ctx.fillRect(10, 10, 100, 100); //(x,y. width, height) draw rectangle
        /* 
            //Draw line
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 30;
            ctx.beginPath(); //starts new path and closes opened before
            ctx.moveTo(200, 200);
            ctx.lineTo(300, 300);
            ctx.stroke();
        
            ctx.save(); //saves entire state of canvas
            ctx.restore(); //removes entire state ofcanvas properties 
         */

        // EFFECT SETTINGS
        let size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
        const maxLevel = 4;
        const branches = 2;

        let sides = 5;
        let scale = 0.5;
        let spread = 0.1;
        let color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
        let lineWidth = Math.floor(Math.random() * 20 + 10);

        //controls
        const randomizeButton = document.getElementById('randomizeButton');
        const resetButton = document.getElementById('resetButton');
        const slider_spread = document.getElementById('spread');
        const label_spread = document.querySelector('[for="spread"]');

        slider_spread.addEventListener('change', (e) => {
            spread = e.target.value;
            updateSliders();
            drawFractal();
        });

        const slider_sides = document.getElementById('sides');
        const label_sides = document.querySelector('[for="sides"]');
        slider_sides.addEventListener('change', (e) => {
            sides = e.target.value;
            updateSliders();
            drawFractal();
        });


        function drawBranch(level) {
            if (level > maxLevel) return;
            ctx.beginPath();
            ctx.moveTo(0, 0); //starting point coordinates
            ctx.lineTo(size, 0);
            ctx.stroke();

            for (let i = 0; i < branches; i++) {
                ctx.save();
                ctx.translate(size - (size / branches) * i, 0);
                ctx.scale(scale, scale);

                ctx.save();
                ctx.rotate(spread);//full circle 2*Math.PI
                drawBranch(level + 1);
                ctx.restore();

                ctx.save();
                ctx.rotate(-spread);
                drawBranch(level + 1);
                ctx.restore();

                ctx.restore();
            }

        }

        function drawFractal() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            //styles must be applied BEFORE a figurine is drawn
            ctx.save();
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = color;
            ctx.translate(canvas.width / 2, canvas.height / 2); //rotation center change
            for (let i = 0; i < sides; i++) {
                ctx.rotate(Math.PI * 2 / sides); //takes value in radians/ one radian = 57.3deg. full circle Math.PI*2 radians
                drawBranch(0);
            }
            ctx.restore(); //removes all styling for the proceeding elements
            randomizeButton.style.backgroundColor = color;
        }
        drawFractal();
        updateSliders(); //initial update

        function randomizeFractal() {
            sides = Math.floor(Math.random() * 7) + 2;
            scale = Math.random() * 0.2 + 0.4;
            spread = Math.random() * 2.9 + 0.1;
            color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
            lineWidth = Math.floor(Math.random() * 20 + 10);
            randomizeButton.style.backgroundColor = color;
        }
        randomizeButton.addEventListener('click', function () {
            randomizeFractal();
            updateSliders();
            drawFractal();
        });

        function resetFractal() {
            sides = 5;
            scale = 0.5;
            spread = 0.7;
            color = 'hsl(290, 100%, 50%)';
            lineWidth = 15;
        }

        resetButton.addEventListener('click', function () {
            resetFractal();
            updateSliders();
            drawFractal();
        });

        function updateSliders() {
            slider_spread.value = spread;
            label_spread.innerText = 'Spread: ' + (+spread).toFixed(2);
            slider_sides.value = sides;
            label_sides.innerText = 'Sides: ' + sides;
        }
    });
}

export { firstVersion };

