function Connectionho(x, y, x2, y2, r, g, b){
  this.x=x;
  this.y=y;
  this.x2=x2;
  this.y2=y2;
  this.r=r;
  this.g=g;
  this.b=b;

  this.show=function(){
    strokeWeight(2);
    stroke(this.r, this.g, this.b);
    line(this.x, this.y, this.x2, this.y2);
  }

}
