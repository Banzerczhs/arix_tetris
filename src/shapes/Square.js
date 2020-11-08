const Shape=require('../lib/Shape');

class Square extends Shape{
    constructor({color,x,y,w,h}){
        super({color,x,y,w,h,name:"Square"});
    }

    draw(ctx){
        ctx.fillStyle=this.color;
        ctx.strokeStyle="#fff";
        ctx.rect(this.x,this.y,this.w,this.h);
        ctx.fill();
        ctx.stroke();
    }
}


module.exports=Square;