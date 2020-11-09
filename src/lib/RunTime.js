const ShapeMange=require("./ShapeMange");
const DataMange=require('../lib/DataMange');
const GAME_CONFIG=require('../config/config');

const shapeMange=new ShapeMange();
const dataMange=new DataMange();

//游戏运行类
class Runtime{
    constructor(){
        this.init();       //游戏初始化
    }
    init(){
        // this.bindEvent();     //绑定事件
        this.run();
    }
    run(){
        let _this=this;
        setInterval(function(){
            _this.update();
            _this.render();
        },1000);
    }
    render(){
        dataMange.shapeList.forEach(shape=>{
            shape.draw(this.ctx);
        });
    }
    update(){
        this.ctx.clearRect(0,0,GAME_CONFIG.ctxWidth,GAME_CONFIG.winHeight);
        shapeMange.generate();     //每过一秒生成一个形状
        dataMange.shapeList.forEach(shape=>{
            shape.update({x : shape.x,y:shape.y+=GAME_CONFIG.unitSize,deg:0});
        });
    }
    bindEvent(){
        
    }
    setCtx(ctx){
        this.ctx=ctx;
    }
}

module.exports=Runtime;