
export default class Mobile{

  constructor(srcImg, width, height, x, y, deltaX=0, deltaY=0){
    this.x =x;
    this.y = y;
    this.deltaX = deltaX;
    this.deltaY = deltaY;
    this.image = this.createImage(srcImg, width, height);
  }

  draw(context){
    context.drawImage(this.image, this.x, this.y);
  }

  move(canvas){
    this.x += this.deltaX;
    this.y += this.deltaY;
  }

  createImage(srcImg, width, height){
    const img = new Image();
    img.width = width;
    img.height = height;
    img.src = srcImg;
    return img;
  }

}
