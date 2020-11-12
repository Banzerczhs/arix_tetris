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
        this.ctx.clearRect(0,0,GAME_CONFIG.ctxWidth,GAME_CONFIG.winHeight);
        shapeMange.currentShape.update(method,shapeMange.currentShape);
        this.watchLine();
    }
    watchLine(){
        let rows=dataMange.rows;
        let cols=dataMange.cols;
        let lineMap={};
        for(let i=0;i<rows;i++){
            lineMap[i]=0;
            for(let j=0;j<cols;j++){
                if(dataMange.dynamicMap[i*dataMange.cols+j]==1){
                    lineMap[i]++;
                }
            }
        }
        let result=Object.keys(lineMap).filter(line=>{
            return lineMap[line]==10;
        });
        result=result.map(item=>item*GAME_CONFIG.unitSize);
        if(result.length){
            this.removeLine(result);
        }
    }
    removeLine(result){
        let throhs=[...result];
        dataMange.shapeList.forEach(shape=>{
            shape.squareList=shape.squareList.filter(square=>{
                if(!throhs.includes(square.y)){
                    return true;
                }else{
                    let row=square.y/GAME_CONFIG.unitSize;
                    let col=square.x/GAME_CONFIG.unitSize;
                    dataMange.dynamicMap[row*dataMange.cols+col]=0;
                }
            });
            let reference=throhs.slice(-1)[0];
            if(shape.y<reference){
                shape.y+=(GAME_CONFIG.unitSize*throhs.length);
                shape.squareList.forEach(square=>{
                    let row=square.y/GAME_CONFIG.unitSize;
                    let col=square.x/GAME_CONFIG.unitSize;
                    dataMange.dynamicMap[row*dataMange.cols+col]=0;
                    square.y+=(GAME_CONFIG.unitSize*throhs.length);
                });
                dataMange.updateDynamicMap(shape);
            }
        });
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
}

module.exports=Runtime;