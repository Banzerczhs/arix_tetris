const GAME_CONFIG=require('../config/config');
const DataMange=require('./DataMange');

const dataMange=new DataMange();

class Shape{
    constructor({color,name,deg,x,y,w,h}){
        this.color=color||"yellow";
        this.name=name||"OrangeRicky";
        this.deg=deg||0;
        this.x=x||0;
        this.y=y||0;
        this.w=w||0;
        this.h=h||0;
        this.squareList=[];
        this.status='start';
        this.downStop=false;
        this.leftStop=false;
        this.rightStop=false;
    }

    shapeFactory(Square){
        this.x=150;
        this.y=0-this.h;
        let square_info=this.computed({widthX:this.x,heightY:this.y,deg:this.deg});
        this.squareList=square_info.map(item=>{
            return new Square({
                color:this.color,
                x : item.x,
                y : item.y,
                w : this.unitSize,
                h : this.unitSize
            });
        });
    }

    //碰撞检测
    collision(method){
        let shape=this;
        let collisionStatus=null;
        for(let i=0;i<shape.squareList.length;i++){
            let square=shape.squareList[i];
            let row=square.y/GAME_CONFIG.unitSize;
            let col=square.x/GAME_CONFIG.unitSize;
            
            let pos=row*dataMange.cols+col;
            if(method=="Left"&&col!==0&&dataMange.dynamicMap[pos-1]==1){
                collisionStatus="Left";
            }

            if(method=="Right"&&col!==(dataMange.cols-1)&&dataMange.dynamicMap[pos+1]==1){
                collisionStatus="Right";
            }

            if(method=="Down"&&row!==(dataMange.rows-1)&&dataMange.dynamicMap[(row+1)*dataMange.cols+col]==1){
                collisionStatus="Down";
            }
        }
        return collisionStatus;
    }

    //边界判断
    boundary(){
        if(this.y>=global.canvas.height-this.h){
            return 'maxH';
        }
        
        if(this.x>=GAME_CONFIG.ctxWidth-this.w){
            return 'maxL';
        }

        if(this.x<=0){
            return 'minL';
        }

        return '';
    }

    moveDown(){
        if(!this.downStop){
            this.y+=GAME_CONFIG.unitSize;
        }
    }

    moveLeft(){
        if(!this.leftStop){
            this.x-=GAME_CONFIG.unitSize;
        }
    }

    moveRight(){
        if(!this.rightStop){
            this.x+=GAME_CONFIG.unitSize;
        }
    }

    moveUp(){
        this.deg+=GAME_CONFIG.deg;
        this.deg%=360;
    }
    
    collisionHandle(method){
        let collisionStatus=this.collision(method);
        this.leftStop=false;
        this.rightStop=false;
        if(collisionStatus=="Down"){
            this.downStop=true;
            this.stop();
        }
        if(collisionStatus=="Left"){
            this.leftStop=true;
        }
        if(collisionStatus=="Right"){
            this.rightStop=true;
        }
    }

    updateHandle(method){
        let opdir='move'+method;
        this[opdir]();
        let boundaryState=this.boundary();
        if(boundaryState=="maxH"){
            this.y=global.canvas.height-this.h;
        }else if(boundaryState=="minL"){
            this.x=0;
        }else if(boundaryState=="maxL"){
            this.x=GAME_CONFIG.ctxWidth-this.w;
        }
        
        this.reComputed();
    
        if(boundaryState=="maxH"){
            this.stop();
        }
    }

    update(method){
        this.collisionHandle(method);
        this.updateHandle(method);
    }

    reComputed(){
        let newsquare_info=this.computed({widthX:this.x,heightY:this.y,deg:this.deg});
        this.squareList.forEach((shape,index)=>{
            shape.x=newsquare_info[index].x;
            shape.y=newsquare_info[index].y;
        });
    }

    stop(){
        dataMange.updateDynamicMap(this);
        this.status='end';
    }

    draw(ctx){
        ctx.beginPath();
        this.squareList.forEach(shape=>{
            shape.draw(ctx);
        });
        ctx.closePath();
    }
}

module.exports=Shape;