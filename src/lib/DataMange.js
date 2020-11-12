const {GAME_STATUS}=require("../common/const");
const GAME_CONFIG=require('../config/config');

//形成单例对象
class DataMange{
    static instance=null;
    constructor(){
        if(DataMange.instance){
            return DataMange.instance;
        }
        this.source=0;  //所得分数
        this.gameStatus=GAME_STATUS.INIT_GAME;   //游戏状态
        this.shapeList=[]  //图形列表
        this.dynamicMap=[];     //游戏动态映射表
        this.rows=0;
        this.cols=0;
        DataMange.instance=this;
    }

    init(ctx,canvas){
        this.ctx=ctx;
        this.canvas=canvas;
        this.rows=this.canvas.height/GAME_CONFIG.unitSize;
        this.cols=this.canvas.width/GAME_CONFIG.unitSize;
        this.initDynamicMap();
    }

    initDynamicMap(){
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<this.cols;j++){
                this.dynamicMap[i*this.cols+j]=0;
            }
        }
    }

    updateDynamicMap(shape){
        let _this=this;
        shape.squareList.forEach(square=>{
            let row=square.y/GAME_CONFIG.unitSize;
            let col=square.x/GAME_CONFIG.unitSize;
            this.dynamicMap[row*_this.cols+col]=1;
        });
    }
}

module.exports=DataMange;