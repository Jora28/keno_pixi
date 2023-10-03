import * as PIXI from "./pixi/pixi.min.mjs";
import {KenoHeader} from "./widgets/keno_header.js";
import {KenoResult} from "./widgets/keno_result.js";
import {CreateTicket} from "./widgets/create_ticket.js";
import {Constants, designConfig} from "./utils/utils.js";
import {KenoCircle} from "./widgets/keno_circle.js";


const width = 1920;
const height = 1080;
console.log(Math.max(window.devicePixelRatio, 0))
const _pixiApp = new PIXI.Application({
    resolution: 2,
    backgroundColor: 0x293746,
    height: innerHeight,
    antialias: true,
    width: innerWidth
});
document.body.appendChild(_pixiApp.view);

const body = new PIXI.Container();

const keno = new PIXI.Container();

const header = new KenoHeader();



const result = new KenoResult();
const createTicket = new CreateTicket();

let kenoCircleForResul
let startPlayValue = false

let counterMargin = -1
let counter = -1

function onClick() {
    header.setBalance(200)
}

createTicket.createTicketBtn.on('pointerdown', startPlay)
createTicket.removeIcon.on("pointerdown", cleanTicket)
body.addChild(header, keno, result, createTicket)
createKenoBody()
body.x = (_pixiApp.screen.width / 2) - (Constants.kenoContainerSizeWithMargin / 2);
keno.y = 220
resize()
window.addEventListener("resize",resize)

window.addEventListener('kku', (s)=>{
    if(kenoCircleForResul === null){
        startPlay()
    }
});

_pixiApp.ticker.add((delta) => {
    if (kenoCircleForResul !== null && result.children.length > 1 && result.children[result.children.length - 1].x <= (Constants.kenoContainerSizeWithMargin - 36) - counterMargin * 50) {
        result.children[result.children.length - 1].x += 10
        result.children[result.children.length - 1].rotation += 0.2 * delta;
    } else if(startPlayValue === true) {
        console.log(startPlayValue)
        kenoCircleForResul = null
        window.dispatchEvent(new CustomEvent('kku',{}))

    }
});
_pixiApp.stage.addChild(body)

function createKenoBody() {
    for (let y = 0; y < Constants.columCount; y++) {
        const tempContainer = new PIXI.Container();
        for (let x = 0; x < Constants.rowCount; x++) {
            const kenoCircle = new KenoCircle(y * x, x, y, false);
            kenoCircle.on('pointerdown', () => {
                if (kenoCircle.isSelected === false && createTicket.ticketIsFull() === false) {
                    kenoCircle.setSprite(kenoCircle.isSelected)
                    createTicket.addNumber(kenoCircle.basicText.text)
                } else if (kenoCircle.isSelected === true) {
                    kenoCircle.setSprite(kenoCircle.isSelected)
                    createTicket.removeNumber(kenoCircle.basicText.text)
                }
                createTicket.setTicketColor()
            });
            tempContainer.addChild(kenoCircle);
        }
        keno.addChild(tempContainer);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// function resize() {
//     Utils.scaleToWindow(_pixiApp.view, "#293746")
// }

//
function resize()
{
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const minWidth = designConfig.content.width;
    const minHeight = designConfig.content.height;

    // Calculate renderer and canvas sizes based on current dimensions
    const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1;
    const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1;
    const scale = scaleX > scaleY ? scaleX : scaleY;
    const width = windowWidth * scale;
    const height = windowHeight * scale;

    // Update canvas style dimensions and scroll window up to avoid issues on mobile resize
    _pixiApp.renderer.view.style.width = `${windowWidth}px`;
    _pixiApp.renderer.view.style.height = `${windowHeight}px`;
    window.scrollTo(0, 0);

    // Update renderer  and navigation screens dimensions
    _pixiApp.renderer.resize(width, height);
    // navigation.init();
    // navigation.resize(width, height);
}

function  startTimeOut(){
    setTimeout(() => {
        console.log("Delayed for 1 second.");
    }, "1000");
}
function startPlay() {
    console.log(counter)
    if(counter===20){
        startPlayValue = false
        setTimeout(() => {
            cleanTicket()
        }, "2000");
        return;
    }
    if (createTicket.ticketIsFull() === false) {
        startPlayValue = false
        return;
    }
    startPlayValue = true;
    counterMargin++
    counter++
    kenoCircleForResul = new KenoCircle(getRandomInt(80), 0, 0, false);

    if (counter > 9) {
        kenoCircleForResul.y = 25;
    } else {
        kenoCircleForResul.y = 75;
    }
    if (counter === 10) {
        counterMargin = 0;
    }
    result.addResultKeno(kenoCircleForResul)
}

function cleanKenoBody() {
    for (let i = 0; i < keno.children.length; i++) {
        for (let j = 0; j < keno.children[i].children.length; j++) {
            keno.children[i].children[j].isSelected = false
            keno.children[i].children[j].setSprite(true)
        }
    }
}

function cleanTicket() {
    cleanKenoBody()
    result.cleanResult()
    createTicket.cleanTicket();
}

