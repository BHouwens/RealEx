export function scrollToPosition(finalPosition, speed = 100) {
    let currentTime = 0,
        PI_D2 = Math.PI / 2,
    	time = Math.max(.1, Math.min(Math.abs(window.scrollY - finalPosition) / speed, .8));

    function tick() {
        currentTime += 1 / 60;

        let currentPos = currentTime / time,
            t = easeOutSine(currentPos);

        if (currentPos < 1) {
            window.requestAnimationFrame(tick);
            window.scrollTo(0, window.scrollY + ((finalPosition - window.scrollY) * t));
        } else {
            window.scrollTo(0, finalPosition);
        }
    }

    tick();
}

function easeOutSine(position){
    return Math.sin(position * (Math.PI / 2));
}