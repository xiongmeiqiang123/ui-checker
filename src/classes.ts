import { initHeight, initWidth } from "./const";

const classes = `
    .check-move-ele {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 4px;
        height: 4px;
        background: red;
        cursor: move;
    }

    .check-origin-container {
        position: absolute;
        opacity: 0.5;
        background: #000000;
        padding: 10px;
        width: calc(${initWidth}px + var(--check-container-width-add, 0px));
        height: calc(${initHeight}px + var(--check-container-height-add, 0px));
        top:${(window.innerHeight - initHeight) / 2}px;
        left:${(window.innerWidth - initWidth) / 2}px;
    }

    .check-origin-iframe {
        position: relative;
        left: 0px;
        top: 0px;
        border: none;
        width: 100%;
        height: 100%;
    }
`;






const style = document.createElement('style');
style.innerHTML = classes;

document.body.append(style);