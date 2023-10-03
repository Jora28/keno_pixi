import * as PIXI from "../pixi/pixi.min.mjs";
import {Container} from "../pixi/pixi.min.mjs";
import {Constants} from "../utils/utils.js";
import {Icons} from "./icons.js";

export class KenoHeader extends Container{
    constructor() {
        super();
        this.user = new Icons('icons/user.png',49.53,49.53);
        this.info = new Icons('icons/info.png',19.05,50.81);
        this.home = new Icons('icons/home.png',52.88,48.81);
        this.y = 16
        this.user.x = 17
        this.info.x=Constants.kenoContainerSize-17 - this.home.width-17
        this.home.x=Constants.kenoContainerSize-17
        this.style = new PIXI.TextStyle({
            fontFamily: 'Roboto',
            fontSize: 30,
            // fontStyle: 'Regular',
            fontWeight: 'bold',
            fill: ['#FFFFFF'], // gradient
            // stroke: '#4a1850',
            // strokeThickness: 5,
            // dropShadow: true,
            // dropShadowColor: '#000000',
            // dropShadowBlur: 4,
            // dropShadowAngle: Math.PI / 6,
            // dropShadowDistance: 6,

            align:"center",
            wordWrap: false,
            wordWrapWidth: 280,
            lineJoin: 'round',
        });
        this.basicText = new PIXI.Text('Balance:1000000000000', this.style);
        this.basicText.style.fontSize = Math.min(30, (280 / this.basicText.width) * 30);

        this.basicText.x = 70
        this.width =100
        this.height=50;
        this.addChild(this.user,this.info,this.home,this.basicText)
        this.basicText.y = this.height/2-this.basicText.height/2;
        this.interactive = true;
    }

    setBalance = (balance)=>{
        console.log(this.basicText.width)
        this.basicText.text = 'Balance:'+ (10000000000000000000).toString()
        this.adjustTextSize()
    }
    adjustTextSize() {
        const currentWidth = this.basicText.width;
        this.basicText.style.fontSize = Math.min(this.basicText.style.fontSize, (280 / currentWidth) *this.basicText.style.fontSize);
        this.basicText.y = this.height/2-this.basicText.height/2;
    }

}