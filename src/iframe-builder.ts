import './classes';
import { initHeight, initWidth } from "./const";
import subjx from 'subjx';

let id = 0;

export class Iframe {
    private id = 0;
    private iframe: HTMLIFrameElement
    private container: HTMLDivElement
    private moveEle: HTMLDivElement
    xElem: any;
    private src = '';

    style = {
        opacity: 1,
    }

    get ratio() {
        return initWidth / initHeight;
    }

    private addWidth = 0;

    private get addHeight() {
        return this.addWidth * this.ratio;
    }

    constructor(src?: string) {
        this.src = src;
        this.id === ++id;
        this.container = document.createElement('div');
        this.moveEle = document.createElement('div');
        this.iframe = document.createElement('iframe');
        this.iframe.id = `ele-${id}`;
        this.moveEle.id = `move-${id}`;
        this.container.id = `container-${id}`;
        this.initStyle();
        this.insert();
        // this.addEventMove();
        this.addResize();
        this.addReset();
    }

    public async setSrc(src: string) {
        this.src = src;
        return new Promise((res) => {
            this.iframe.src = this.src;
            this.iframe.onload = () => {
                res(this.iframe);
            }
        })
    }

    private initStyle() {
        this.moveEle.classList.add('check-move-ele');
        this.container.classList.add('check-origin-container');
        this.iframe.classList.add('check-origin-iframe');
    }
    private insert() {
        this.container.append(this.iframe);
        this.container.append(this.moveEle);
        document.body.append(this.container);
        this.xElem = subjx("#" + this.container.id);
        this.xElem.drag({}, {});
    }

    update() {
        for (const key in this.style) {
            if (Object.prototype.hasOwnProperty.call(this.style, key)) {
                const element = this.style[key];
                this.container.style[key] = element;
            }
        }
    }

    addEventMove() {
        let offsetX, offsetY, isDragging = false;
        const { container } = this;
        container.addEventListener('mousedown', (event) => {
            isDragging = true;
            // 获取鼠标相对于div左上角的偏移量
            offsetX = event.clientX - container.getBoundingClientRect().left;
            offsetY = event.clientY - container.getBoundingClientRect().top;

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', () => {
                isDragging = false;
                document.removeEventListener('mousemove', handleMouseMove);
            });
        });

        function handleMouseMove(event) {
            if (isDragging) {
                // 计算新的div位置
                const newLeft = event.clientX - offsetX;
                const newTop = event.clientY - offsetY;

                // 设置div的新位置
                container.style.left = `${newLeft}px`;
                container.style.top = `${newTop}px`;
            }
        }
    }

    addResize() {
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key == "≠") {
                this.addWidth++;
            } else if (e.altKey && e.key === "–") {
                this.addWidth--;
            }
            this.container.style.setProperty('--check-container-width-add', `${this.addWidth}px`)
            this.container.style.setProperty('--check-container-height-add', `${this.addHeight}px`)
            this.xElem.disable();
        });
    }


    addReset() {
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key == '®') {
                this.initStyle();
            }
        })
    }
}