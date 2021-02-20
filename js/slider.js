(function () {

    const slider = document.querySelector('.slider');
    const sliderWidth = slider.offsetWidth;
    const rangeLine = document.querySelector('.range-line');
    const rangeControl = document.querySelector('.range-control');
    const image = document.querySelector('.image-wrapper__before');
    const rangeWidth = rangeLine.offsetWidth;
    const rangeControlWidth = rangeControl.offsetWidth;
    const LOCATION_TOGGLE_MIN_X = 0;
    const LOCATION_TOGGLE_MAX_X = rangeWidth;
    const STEP_KEY = 10;
    const MIN_WIDTH_IMG = (sliderWidth - rangeWidth) / 2;
    const CONTROL_HALF_WIDTH = rangeControlWidth / 2;
    const KEY_ARROW_LEFT = 37;
    const KEY_ARROW_RIGHT = 39;

    let currentX = null;

    function calculateControlPosition(shift) {
        let newX = rangeControl.offsetLeft - shift;
        if (newX < LOCATION_TOGGLE_MIN_X) {
            newX = LOCATION_TOGGLE_MIN_X;
        }
        if (newX > LOCATION_TOGGLE_MAX_X - rangeControlWidth) {
            newX = LOCATION_TOGGLE_MAX_X - rangeControlWidth;
        }
        return newX
    }

    function updateControlPosition(x) {
        rangeControl.style.left = x + 'px';
    }

    function updateImageWidth(x) {
        image.style.width = MIN_WIDTH_IMG + x + CONTROL_HALF_WIDTH + 'px';
    }

    function dragControlHandler(event) {
        event.preventDefault();
        if (!event.target.closest('div.range-control')) {
            return
        }
        currentX = event.clientX;
        rangeLine.addEventListener('mousemove', mouseMoveHandler);
        rangeLine.addEventListener('mouseup', mouseUpHandler);
    }

    function mouseMoveHandler(event) {
        event.preventDefault();
        const shift = currentX - event.clientX;
        currentX = event.clientX;
        let newX = calculateControlPosition(shift);
        updateControlPosition(newX);
        updateImageWidth(newX);
    }

    function mouseUpHandler(event) {
        event.preventDefault();
        rangeLine.removeEventListener('mousemove', mouseMoveHandler);
        rangeLine.removeEventListener('mouseup', mouseUpHandler);
    }

    function rangeClickHandler(event) {
        event.preventDefault();
        if (event.target === rangeControl) return;
        const newX = event.offsetX - CONTROL_HALF_WIDTH;
        rangeControl.style.left = newX+ 'px';
        updateImageWidth(newX);
    }

    function keyUpHandler(event) {
        event.preventDefault();
        let newX;
        rangeLine.blur();
        rangeControl.focus();
        if (event.keyCode === KEY_ARROW_LEFT) {
            newX = calculateControlPosition(STEP_KEY)
        } else if (event.keyCode === KEY_ARROW_RIGHT) {
            newX = calculateControlPosition(-STEP_KEY)
        }
        updateControlPosition(newX);
        updateImageWidth(newX);
    }

    if(window.matchMedia("(min-width: 768px)").matches) {
        rangeLine.addEventListener('mousedown', dragControlHandler);
        rangeLine.addEventListener('click', rangeClickHandler);
        rangeLine.addEventListener('keyup', keyUpHandler);
    }
})();
