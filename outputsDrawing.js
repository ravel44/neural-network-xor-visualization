function OutputsDrawing(x, y, r, g, b){
    this.x=x;
    this.y=y;
    this.r=r;
    this.g=g;
    this.b=b;

  this.show=function(){
    stroke(255, 255, 255);
    strokeWeight(1);
    fill(this.r, this.g, this.b);
    ellipse(this.x, this.y, 80, 80);
    }

}
