const Shape=require('../lib/Shape');

class RhodeLsland extends Shape{
    constructor(config){
        super(config);
        this.unitSize=GAME_CONFIG.unitSize;
        this.shapeObject=[];
        this.initShape();
    }

    initShape(){
        this.h=2*this.unitSize;
        this.w=3*this.unitSize;
        this.x=Tools.randomNum(0,GAME_CONFIG.ctxWidth-this.w);
        this.y=0-this.h;
        let widthX=this.x;
        let heightY=this.y;
        let square_info=this.computed(widthX,heightY);
        this.shapeFactory(square_info);
    }

    shapeFactory(shapes){
        this.shapeObject=shapes.map(item=>{
            return new Square({
                color:this.color,
                x : item.x,
                y : item.y,
                w : this.unitSize,
                h : this.unitSize
            });
        });
    }

    computed(widthX,heightY){
        let square_info=[{
            x : widthX,
            y : heightY
        },{
            x : widthX+=this.unitSize,
            y : heightY
        },{
            x : widthX,
            y : heightY+=this.unitSize
        },{
            x : widthX+=this.unitSize,
            y : heightY
        }];

        return square_info;
    }

    update({x,y,deg}){
        this.x=x;
        this.y=y;
        this.deg=deg;
        let status=this.collision();
        if(status){
            this.y=global.canvas.height-this.h;
        }
        let newsquare_info=this.computed(this.x,this.y);
        this.shapeObject.forEach((shape,index)=>{
            shape.x=newsquare_info[index].x;
            shape.y=newsquare_info[index].y;
        });
    }

    draw(ctx){
        ctx.beginPath();
        this.shapeObject.forEach(shape=>{
            shape.draw(ctx);
        });
        ctx.closePath();
    }
}

module.exports=RhodeLsland;