import {Container} from "../pixi/pixi.min.mjs";
import * as PIXI from "../pixi/pixi.min.mjs";
import {AppColors} from "../utils/colors.js";
import {Constants} from "../utils/utils.js";
import {Icons} from "./icons.js";


export class CreateTicket extends Container {
    constructor() {
        super();
        this.bk = new PIXI.Graphics();
        this.list = [];
        this.ticketFull = false
        this.bk.beginFill(AppColors.yellow)
        this.bk.drawRoundedRect(0, 0, Constants.kenoContainerSizeWithMargin - Constants.marginX, 53, 53 / 2)
        this.bk.endFill();
        this.addChild(this.bk)
        this.y = Constants.kenoContainerHeightMargin + 230
        this.removeIcon = new Icons("icons/clean.png", 41.15, 53, false)
        this.removeIcon.x = Constants.kenoContainerSize - 5

        this.addChild(this.removeIcon)
        this.list = []
        const style = new PIXI.TextStyle({
            fontFamily: 'Roboto',
            fontSize: 25,
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

            align: "center",
            wordWrap: false,
            wordWrapWidth: 280,
            lineJoin: 'round',
        });
        const btnTextStyle = new PIXI.TextStyle({
            fontFamily: 'Roboto',
            fontSize: 25,
            // fontStyle: 'Regular',
            fontWeight: 'bold',
            fill: ['#293746'], // gradient
            // stroke: '#4a1850',
            // strokeThickness: 5,
            // dropShadow: true,
            // dropShadowColor: '#000000',
            // dropShadowBlur: 4,
            // dropShadowAngle: Math.PI / 6,
            // dropShadowDistance: 6,

            align: "center",
            wordWrap: false,
            wordWrapWidth: 280,
            lineJoin: 'round',
        });

        this.kenoList = new PIXI.Container()
        for (let i = 1; i <= Constants.tiketLength; i++) {
            const tempContainer = new PIXI.Container()
            const item = new PIXI.Graphics();
            item.beginFill(0x293746)
            item.drawCircle(0, 53 / 2, 20)
            item.endFill()
            this.basicText = new PIXI.Text("", style);
            this.basicText.y = 12;

            tempContainer.addChild(item, this.basicText)
            tempContainer.x = i * 85 / 2;
            this.kenoList.addChild(tempContainer)
        }
        this.kenoList.x = -10;
        this.addChild(this.kenoList);
        this.createTicketBtn = new PIXI.Container();
        this.btBg = new PIXI.Graphics();
        this.btBg.beginFill(AppColors.yellow)
        this.btBg.drawRoundedRect(0, 0, Constants.kenoContainerSizeWithMargin - Constants.marginX, 53, 10)
        this.btBg.endFill();
        this.createTicketBtn.addChild(this.btBg)
        this.createTicketBtn.y = 70
        this.createTicketBtnText = new PIXI.Text("Create ticket", btnTextStyle);
        this.createTicketBtn.addChild(this.createTicketBtnText);
        this.createTicketBtn.interactive = true;
        // removeIcon.on("pointerdown",this.cleanTicket)
        this.addChild(this.createTicketBtn)
        this.setCentreBtText()
    }

    setCentreBtText(){
        this.createTicketBtnText.x = Constants.kenoContainerSizeWithMargin/2 - this.createTicketBtnText.width/2 - Constants.marginX
        this.createTicketBtnText.y = 53/2 - this.createTicketBtnText.height/2
    }

    cleanTicket=()=>{
        for (let i = 0; i < this.kenoList.children.length; i++) {
            this.kenoList.children[i].children[1].text = ""
        }
        this.setTicketColor()
    }
    ticketIsFull() {
        let value = true;
        for (let i = 0; i < this.kenoList.children.length; i++) {
            if (this.kenoList.children[i].children[1].text === "") {
                value = false;
                return value;
            } else {
                value = true;
            }
        }
        return value;
    }

    addNumber(number) {
        for (let i = 0; i < this.kenoList.children.length; i++) {
            if (this.kenoList.children[i].children[1].text === "") {
                this.kenoList.children[i].children[1].text = number;
                this.kenoList.children[i].children[1].x = -this.kenoList.children[i].children[1].width / 2;
                return;
            }
        }
    }

    setTicketColor() {
        this.removeChild(this.bk)
        this.createTicketBtn.removeChild(this.btBg)
        this.bk = new PIXI.Graphics()
        this.btBg = new PIXI.Graphics()
        if (this.ticketIsFull() === true) {
            this.bk.beginFill(AppColors.ticketFullColor)
            this.bk.drawRoundedRect(0, 0, Constants.kenoContainerSizeWithMargin - Constants.marginX, 53, 53 / 2)
            this.bk.endFill();

            this.btBg.beginFill(AppColors.ticketFullColor)
            this.btBg.drawRoundedRect(0, 0, Constants.kenoContainerSizeWithMargin - Constants.marginX, 53, 10)
            this.btBg.endFill();
            this.createTicketBtnText.text = "Ticket created";

        } else {
            this.bk.beginFill(AppColors.yellow)
            this.bk.drawRoundedRect(0, 0, Constants.kenoContainerSizeWithMargin - Constants.marginX, 53, 53 / 2)
            this.bk.endFill();

            this.btBg.beginFill(AppColors.yellow)
            this.btBg.drawRoundedRect(0, 0, Constants.kenoContainerSizeWithMargin - Constants.marginX, 53, 10)
            this.btBg.endFill();
            this.createTicketBtnText.text = "Create ticket";


        }
        this.addChildAt(this.bk, 0);
        this.createTicketBtn.addChildAt(this.btBg, 0);
    }

    removeNumber(number) {
        for (let i = 0; i < this.kenoList.children.length; i++) {
            if (this.kenoList.children[i].children[1].text === number) {
                this.kenoList.children[i].children[1].text = "";
                this.kenoList.children[i].children[1].x = -this.kenoList.children[i].children[1].width / 2;
                return;
            }
        }
    }
}
