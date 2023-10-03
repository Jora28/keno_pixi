import * as PIXI from "../pixi/pixi.min.mjs";
import {Container} from "../pixi/pixi.min.mjs";


export class Icons extends Container {
    constructor(iconPath,width,height,withBack = true) {
        super();
        this.sprite = PIXI.Sprite.from(PIXI.Texture.from(iconPath))
        // this.sprite.anchor.set(0.5);
        const size =97/2
        const radius =26/2
        this.sprite.width = width/2;
        this.sprite.height = height/2;
        this.sprite.x =(size/2) - (this.sprite.width/2);
        this.sprite.y =(size/2) - (this.sprite.height/2);
        if(withBack){
            const mask = new PIXI.Graphics();
            mask.beginFill(0x455260)
            mask.drawRoundedRect(0, 0,size, size,radius)
            mask.endFill();
            this.addChild(mask)
        }
        this.interactive = true;

        this.addChild(this.sprite)
    }
}