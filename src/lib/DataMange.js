const {GAME_STATUS}=require("../common/const");


//形成单例对象
class DataMange{
    static instance=null;
    constructor(){
        if(DataMange.instance){
            return DataMange.instance;
        }
        this.shapeList=[];  //图形列表
        this.source=0;  //所得分数
        this.gameStatus=GAME_STATUS.INIT_GAME;   //游戏状态
        DataMange.instance=this;
    }
}

module.exports=DataMange;