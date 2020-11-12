const Shape=require('../lib/Shape');
const Square=require('../shapes/Square');
const GAME_CONFIG=require('../config/config');

class OrangeRicky extends Shape{
    constructor(config){
        super(config);
        this.unitSize=GAME_CONFIG.unitSize;
        this.initShape();
    }

    initShape(){
        this.h=2*this.unitSize;
        this.w=3*this.unitSize;
        this.shapeFactory(Square);
    }

    computed(){
        

        
    }

    computed({widthX,heightY,deg}){
        let square_info=[];
        if(deg==0||deg==360){
            this.h=2*this.unitSize;
            this.w=3*this.unitSize;
            square_info=[{
                x : widthX+=this.unitSize*2,
                y : heightY
            },{
                x : widthX-=this.unitSize*2,
                y : heightY+=this.unitSize
            },{
                x : widthX+=this.unitSize,
                y : heightY
            },{
                x : widthX+=this.unitSize,
                y : heightY
            }];
        }

        if(deg==90){
            this.w=2*this.unitSize;
            this.h=3*this.unitSize;
            square_info=[{
                x : widthX,
                y : heightY
            },{
                x : widthX,
                y : heightY+=this.unitSize
            },{
                x : widthX,
                y : heightY+=this.unitSize
            },{
                x : widthX+=this.unitSize,
                y : heightY
            }];
        }

        if(deg==180){
            this.w=3*this.unitSize;
            this.h=2*this.unitSize;
            square_info=[{
                x : widthX,
                y : heightY
            },{
                x : widthX,
                y : heightY+=this.unitSize
            },{
                x : widthX+=this.unitSize,
                y : heightY-=this.unitSize
            },{
                x : widthX+=this.unitSize,
                y : heightY
            }];
        }

        if(deg==270){
            this.w=2*this.unitSize;
            this.h=3*this.unitSize;
            square_info=[{
                x : widthX,
                y : heightY
            },{
                x : widthX+=this.unitSize,
                y : heightY
            },{
                x : widthX,
                y : heightY+=this.unitSize
            },{
                x : widthX,
                y : heightY+=this.unitSize
            }];
        }

        return square_info;
    }
}

module.exports=OrangeRicky;