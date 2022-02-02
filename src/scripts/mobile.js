export default class Mobile {

    constructor(x, y, deltaX, deltaY, srcImage, imageWidht) {
        this.x = x;
        this.y = y;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
        this.imageWidht = imageWidht;
        this.srcImage = srcImage;
        this.image = this.createImage();
    }

    createImage() {
        const ballImg = new Image();
        ballImg.width = this.imageWidht;
        ballImg.src = this.srcImage;
        return ballImg;
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y);
    }

    move() {
        this.x = this.x + this.deltaX;
        this.y = this.y + this.deltaY;
    }
}