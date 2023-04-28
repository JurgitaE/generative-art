function thirdVersion() {
    document.querySelector('input[name="spread"]').min = '-0.3';
    document.querySelector('input[name="spread"]').max = '0.3';
    document.querySelector('input[name="spread"]').step = '0.01';
    document.querySelector('input[name="sides"]').max = '22';

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

        let size = canvas.width < canvas.height ? canvas.width * 0.1 : canvas.height * 0.1;
        const maxLevel = 10;
        const branches = 1;

        let sides = 10;
        let scale = 0.85;
        let spread = -0.2;
        let color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
        let lineWidth = 30;

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

        let pointX = 0;
        let pointY = size;
        function drawBranch(level) {
            if (level > maxLevel) return;
            ctx.beginPath();
            ctx.moveTo(pointX, pointY); //starting point coordinates
            ctx.bezierCurveTo(0, size * spread * -3, size * 5, size * 10 * spread, 0, 0);
            ctx.stroke();

            for (let i = 0; i < branches; i++) {
                ctx.save();
                ctx.translate(pointX, pointY);
                ctx.scale(scale, scale);

                ctx.save();
                ctx.rotate(spread);//full circle 2*Math.PI
                drawBranch(level + 1);
                ctx.restore();

                ctx.restore();
            }
            ctx.beginPath();
            ctx.arc(-size / 2, 0, 40, 0, Math.PI * 2);
            ctx.fill();

        }

        function drawFractal() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            //styles must be applied BEFORE a figurine is drawn
            ctx.save();
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.translate(canvas.width / 2, canvas.height / 2); //rotation center change
            for (let i = 0; i < sides; i++) {
                ctx.scale(0.95, 0.95);
                ctx.rotate(Math.PI * 6 / sides); //takes value in radians/ one radian = 57.3deg. full circle Math.PI*2 radians
                drawBranch(0);

            }
            ctx.restore(); //removes all styling for the proceeding elements
            randomizeButton.style.backgroundColor = color;
        }
        drawFractal();
        updateSliders(); //initial update

        function randomizeFractal() {
            sides = Math.floor(Math.random() * 18) + 2;
            spread = Math.random() * 0.6 - 0.3;
            color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
            lineWidth = Math.floor(Math.random() * 30 + 20);
            randomizeButton.style.backgroundColor = color;
        }
        randomizeButton.addEventListener('click', function () {
            randomizeFractal();
            updateSliders();
            drawFractal();
        });

        function resetFractal() {
            sides = 15;
            scale = 0.85;
            spread = 0.2;
            color = 'hsl(290, 100%, 50%)';
            lineWidth = 30;
        }

        resetButton.addEventListener('click', function () {
            resetFractal();
            updateSliders();
            drawFractal();
        });

        function updateSliders() {
            slider_spread.value = spread;
            label_spread.innerText = 'Spread: ' + (+spread).toFixed(1);
            slider_sides.value = sides;
            label_sides.innerText = 'Sides: ' + sides;
        }
        window.addEventListener('resize', function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            size = canvas.width < canvas.height ? canvas.width * 0.1 : canvas.height * 0.1;
            ctx.shadowColor = 'rgba(0, 0 , 0 , 0.7)';
            ctx.shadowOffsetX = 10;
            ctx.shadowOffsetY = 5;
            ctx.shadowBlur = 10;
            drawFractal();
        });
    });
}

export { thirdVersion };