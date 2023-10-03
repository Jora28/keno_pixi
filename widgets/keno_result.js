import * as PIXI from "../pixi/pixi.min.mjs";
import {Container} from "../pixi/pixi.min.mjs";
import {Constants} from "../utils/utils.js";

export class KenoResult extends Container {
    constructor() {
        super();
        this.isCreted = false
        this.ticketResult = []
        const mask = new PIXI.Graphics();
        mask.beginFill(0x1C2630)
        mask.drawRoundedRect(-5, 0, Constants.kenoContainerSizeWithMargin+5, 100, 18)
        mask.endFill();
        this.addChild(mask)
        this.y = 132 / 2 + 19 / 2
        this.height = 100
    }

    setColorFill() {
        this.isCreted = !this.isCreted;
        if (this.isCreted === true) {
            this.mask.beginFill(0x15CB0D)
        } else {
            this.mask.beginFill(0x1C2630)
        }
    }

    addResultKeno(keno){
        this.addChild(keno);
    }

    cleanResult() {
        let index = this.children.length - 1;
        while (index !== 0) {
            this.removeChildAt(index)
            index--;
        }
    }
}