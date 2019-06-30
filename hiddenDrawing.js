function HiddenDrawing(x,y, r, g, b){
    this.x=x;
    this.y=y;
    this.r=r;
    this.g=g;
    this.b=b;

  this.show=function(){
      fill(this.r, this.g, this.b);
      ellipse(this.x, this.y, 80, 80);
  }
}
