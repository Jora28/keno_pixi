import * as PIXI from "../pixi/pixi.min.mjs";

export class Constants {
    static   rowCount = 10;
    static  columCount = 8;
    static  containerSize = 45;
    static  marginX = 5;
    static  marginY = 8;
    static tiketLength = 10
    static kenoContainerSize = Constants.rowCount*(Constants.containerSize);
    static kenoContainerSizeWithMargin = Constants.rowCount*(Constants.containerSize+Constants.marginX);
    static kenoContainerHeightMargin = Constants.columCount*(Constants.containerSize+Constants.marginY);




    /** Minimum screen width before the resizing function shrinks the view. */
    static minWidth = 428;
    /** Minimum screen height before the resizing function shrinks the view. */
    static minHeight = 925;

    /** Object to store all configuration values for the out of gameplay design logic. */

}

export const designConfig = {
    content: {
        width: Constants.minWidth,
        height: Constants.minHeight,
    },
    /** Enable to be able to see the collision bodies of the bubbles. */
    debugBody: false,
    /** Tile scale for the background elements found in each screen. */
    backgroundTileScale: 2,
    /** To prevent the background decor visuals from spawning too close to the sides of the screen. */
    decorEdgePadding: 100,
    /** To prevent the background decor visuals from spawning too close to one another. */
    decorMinDistance: 150,
    /** How many background decor visuals are allowed to be created on desktop. */
    decorCountDesktop: 6,
    /** How many background decor visuals are allowed to be created on mobile. */
    decorCountMobile: 3,
    /** The url used to redirect the user to the open games github page */
    forkMeURL: 'https://github.com/pixijs/open-games',
};


export class Utils {

    static unSelectedGradient = ["#B2F2FF", '#4798A7', '#7CC4D2'];
    static selectedGradient = ["#FFFDEA", '#F0F022', '#BEA024'];
    Texture;

    static scaleToWindow(canvas, backgroundColor) {
        var scaleX, scaleY, scale, center;

        //1. Scale the canvas to the correct size
        //Figure out the scale amount on each axis
        scaleX = window.innerWidth / canvas.offsetWidth;
        scaleY = window.innerHeight / canvas.offsetHeight;

        //Scale the canvas based on whichever value is less: `scaleX` or `scaleY`
        scale = Math.min(scaleX, scaleY);
        canvas.style.transformOrigin = "0 0";
        canvas.style.transform = "scale(" + scale + ")";

        //2. Center the canvas.
        //Decide whether to center the canvas vertically or horizontally.
        //Wide canvases should be centered vertically, and
        //square or tall canvases should be centered horizontally
        if (canvas.offsetWidth > canvas.offsetHeight) {
            if (canvas.offsetWidth * scale < window.innerWidth) {
                center = "horizontally";
            } else {
                center = "vertically";
            }
        } else {
            if (canvas.offsetHeight * scale < window.innerHeight) {
                center = "vertically";
            } else {
                center = "horizontally";
            }
        }

        //Center horizontally (for square or tall canvases)
        var margin;
        if (center === "horizontally") {
            margin = (window.innerWidth - canvas.offsetWidth * scale) / 2;
            canvas.style.marginTop = 0 + "px";
            canvas.style.marginBottom = 0 + "px";
            canvas.style.marginLeft = margin + "px";
            canvas.style.marginRight = margin + "px";
        }

        //Center vertically (for wide canvases)
        if (center === "vertically") {
            margin = (window.innerHeight - canvas.offsetHeight * scale) / 2;
            canvas.style.marginTop = margin + "px";
            canvas.style.marginBottom = margin + "px";
            canvas.style.marginLeft = 0 + "px";
            canvas.style.marginRight = 0 + "px";
        }

        //3. Remove any padding from the canvas  and body and set the canvas
        //display style to "block"
        canvas.style.paddingLeft = 0 + "px";
        canvas.style.paddingRight = 0 + "px";
        canvas.style.paddingTop = 0 + "px";
        canvas.style.paddingBottom = 0 + "px";
        canvas.style.display = "block";

        //4. Set the color of the HTML body background
        document.body.style.backgroundColor = backgroundColor;

        //Fix some quirkiness in scaling for Safari
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("safari") !== -1) {
            if (ua.indexOf("chrome") > -1) {
                // Chrome
            } else {
                // Safari
                //canvas.style.maxHeight = "100%";
                //canvas.style.minHeight = "100%";
            }
        }

        //5. Return the `scale` value. This is important, because you'll nee this value
        //for correct hit testing between the pointer and sprites
        return scale;
    }

    static  createGradTexture = (listColoros) => {
        const quality = 256;
        const canvas = document.createElement('canvas');

        const ctx = canvas.getContext('2d');
        const grd = ctx.createRadialGradient(0, 0, 0, 45, 45, 45);
        grd.addColorStop(0.1, listColoros[0]);//"#B2F2FF"
        grd.addColorStop(0.5, listColoros[1]);//'#4798A7'
        grd.addColorStop(0.9, listColoros[2]);//'#7CC4D2'

        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 90, 90);

        // ctx.roundRect(400, 150, 90, 90, [0, 30, 50, 60]);

        return PIXI.Texture.from(canvas);
    }
}
