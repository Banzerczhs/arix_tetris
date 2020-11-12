const Shape=require('../lib/Shape');
const Square=require('../shapes/Square');
const GAME_CONFIG=require('../config/config');

class Smashboy extends Shape{
    constructor(config){
        super(config);
        this.unitSize=GAME_CONFIG.unitSize;
        this.initShape();
    }

    initShape(){
        this.h=2*this.unitSize;
        this.w=2*this.unitSize;
        this.shapeFactory(Square);
    }

    computed({widthX,heightY}){
        let square_info=[{
            x : widthX,
            y : heightY
        },{
            x : widthX+=this.unitSize,
            y : heightY
        },{
            x : widthX-=this.unitSize,
            y : heightY+=this.unitSize
        },{
            x : widthX+=this.unitSize,
            y : heightY
        }];

        return square_info;
    }
}

module.exports=Smashboy;