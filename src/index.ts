import { Iframe } from "./iframe-builder";
// import 'subjx/dist/style/subjx.css';

async function main() {
    const data = await window.prompt('请输入地址');
    // const data = 'http://localhost:5173/main/task-center';
    if (data) {
        const iframe = new Iframe();
        (window as any).currentIframe = iframe;
        iframe.setSrc(data);
    }
}
main();