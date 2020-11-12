const Shape=require('../lib/Shape');
const Square=require('../shapes/Square');
const GAME_CONFIG=require('../config/config');

class Hero extends Shape{
    constructor(config){
        super(config);
        this.unitSize=GAME_CONFIG.unitSize;
        this.initShape();
    }

    initShape(){
        this.h=this.unitSize;
        this.w=4*this.unitSize;
        this.shapeFactory(Square);
    }

    computed({widthX,heightY,deg}){
        let square_info=[];
        if(deg==0||deg==180||deg==360){
            this.h=this.unitSize;
            this.w=4*this.unitSize;
            square_info=[{
                x : widthX,
                y : heightY
            },{
                x : widthX+=this.unitSize,
                y : heightY
            },{
                x : widthX+=this.unitSize,
                y : heightY
            },{
                x : widthX+=this.unitSize,
                y : heightY
            }];
        }

        if(deg==90||deg==270){
            this.h=4*this.unitSize;
            this.w=this.unitSize;
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
                x : widthX,
                y : heightY+=this.unitSize
            }];
        }

        return square_info;
    }
}

module.exports=Hero;