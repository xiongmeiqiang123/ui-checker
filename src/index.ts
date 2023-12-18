import { Iframe } from "./iframe-builder";
// import 'subjx/dist/style/subjx.css';

async function main() {
    const iframe = new Iframe();
    (window as any).currentIframe = iframe;
    const data = await window.prompt('请输入地址');
    if (data) {
        iframe.setSrc(data);
    }
}
main();