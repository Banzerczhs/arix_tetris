const Shape=require('../lib/Shape');
const Square=require('../shapes/Square');
const GAME_CONFIG=require('../config/config');
const {Tools}=require('../common/utils');

class BlueRicky extends Shape{
    constructor(config){
        super(config);
        this.unitSize=GAME_CONFIG.unitSize;
        this.shapeObject=[];
        this.initShape();
    }
    
    initShape(){
        this.height=2*this.unitSize;
        this.width=3*this.unitSize;
        this.x=Tools.randomNum(0,GAME_CONFIG.ctxWidth-this.width);
        this.y=0-this.height;
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
            y : heightY+=this.unitSize
        },{
            x : widthX,
            y : heightY+=this.unitSize
        },{
            x : widthX+=this.unitSize,
            y : heightY
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
    }
}


module.exports=BlueRicky;