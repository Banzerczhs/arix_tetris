const ShapeMange=require("./ShapeMange");
const DataMange=require('./DataMange');
const GAME_CONFIG=require('../config/config');

const shapeMange=new ShapeMange();
const dataMange=new DataMange();

//游戏运行类
class Runtime{
    init(ctx,canvas){
        this.ctx=ctx;
        this.canvas=canvas;
        dataMange.init(ctx,canvas);
        this.bindEvent();     //绑定事件
        this.run();
    }
    run(){
        let _this=this;
        setInterval(function(){
            _this.update('Down');
            _this.render();
        },1000);
    }
    render(){
        dataMange.shapeList.forEach(shape=>{
            shape.draw(this.ctx);
        });
    }
    update(method){
        if(!dataMange.shapeList.length
            ||shapeMange.currentShape.status=="end"){
            shapeMange.generate();
        }
        this.watchLine();
        this.ctx.clearRect(0,0,GAME_CONFIG.ctxWidth,GAME_CONFIG.winHeight);
        shapeMange.currentShape.update(method,shapeMange.currentShape);
    }
    watchLine(){
        // let map={...dataMange.dynamicMap};
        // for (const phase in map) {
        //     if (map[phase].val==10){
        //         console.log(phase,map[phase].shapes);
        //     }
        // }
    }
    bindEvent(){
        let _this=this;
        window.onkeydown=function(ev){
            if(ev.key.indexOf('Arrow')!=-1){
                let dir=ev.key.split('Arrow').slice(-1)[0];
                _this.update(dir);
                _this.render();
            }
        }
    }
    setCtx(ctx){
        this.ctx=ctx;
    }
}

module.exports=Runtime;