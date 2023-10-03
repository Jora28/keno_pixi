import * as PIXI from "../pixi/pixi.min.mjs";
import {Container} from "../pixi/pixi.min.mjs";
import {Constants} from "../utils/utils.js";
import {ScreenUtils} from "../utils/extensions.js";
// import {DropShadowFilter} from '../filter-drop-shadow/';
const selectedColor = 0xF0F022;
const unSelectedColor = 0x4798A7;
let tempNumber = 1;

export class KenoCircle extends Container {

    constructor(number, X, Y, selected) {

        super();
        this.X = X;
        this.Y = Y;
        if (tempNumber === 81) {
            tempNumber = 1;
        }
        this.drection =  Math.random() * Math.PI * 2
        this.number = number;
        this.isSelected = selected
        this.x = X * (Constants.containerSize + Constants.marginX); // Center horizontally
        this.y = Y * (Constants.containerSize + Constants.marginY); // Center horizontally
        this.style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: Constants.containerSize/2,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#1C2630'], // gradient
            // stroke: '#4a1850',
            // strokeThickness: 5,
            // dropShadow: true,
            // dropShadowColor: '#000000',
            // dropShadowBlur: 4,
            // dropShadowAngle: Math.PI / 6,
            // dropShadowDistance: 6,
            wordWrap: true,
            // wordWrapWidth: 440,
            // lineJoin: 'round',
        });
        this.basicText = new PIXI.Text((tempNumber++).toString(), this.style);
        this.sprite = PIXI.Sprite.from(PIXI.Texture.from('icons/circle_1.png'))
        this.sprite.anchor.set(0.5);
        this.sprite.width = Constants.containerSize;
        this.sprite.height = Constants.containerSize;

        this.basicText.anchor.set(0.5);
        this.x = this.x + ScreenUtils.getW(Constants.containerSize/2); // Center horizontally
        this.y = this.y + ScreenUtils.getH(Constants.containerSize/2); // Cent; // Ce
        this.addChild(this.sprite, this.basicText);
        // this.on('pointerdown', this.onClick);
        this.interactive = true;

    }

    setSprite = (isSelected) => {
        this.removeChildAt(0);
        if (isSelected === false) {
            this.isSelected = true;
            this.sprite = PIXI.Sprite.from(PIXI.Texture.from('icons/circle_2.png'))
            this.sprite.width = Constants.containerSize+14;
            this.sprite.height = Constants.containerSize+14;
        } else {
            this.isSelected = false;
            this.sprite = PIXI.Sprite.from(PIXI.Texture.from('icons/circle_1.png'))
            this.sprite.width = Constants.containerSize;
            this.sprite.height = Constants.containerSize;
        }
        this.sprite.anchor.set(0.5);

        this.addChildAt(this.sprite, 0);
    }

    onClick = () => {
        this.setSprite(this.isSelected)
    }
}