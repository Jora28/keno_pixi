export class ScreenUtils  {

   // static  resize(){
   //      console.log(window.innerHeight)
   //      console.log(window.innerWidth)
   //  }
    static getH(height){
       return height
           // *
           //    ((window.innerHeight / window.devicePixelRatio) / 1080);
   }
    static getW(width){
        return width
            // *
            // ((window.innerWidth / window.devicePixelRatio) / 1920);
    }

    static scaleFactor(sprite,size){
        // const newWidth = window.innerWidth;
        // const newHeight = window.innerHeight;
        //
        // // Update the application's screen size
        //
        // // Calculate the new scale for the square based on the screen size
        // const scaleFactor = Math.min(newWidth, newHeight) / Math.min(window.screen.width, window.screen.height);
        //
        // // Update the square's position and scale
        // // sprite.x = (newWidth - size * scaleFactor) / 2;
        // // sprite.y = (newHeight - size * scaleFactor) / 2;
        // sprite.scale.set(scaleFactor);
    }

}
//
// Number.prototype.HSc = function () {
//     return 100;
// };
// Number.prototype.WSc = function () {
//     return 100;
// };