const GAME_CONFIG=require('../config/config');

class Shape{
    constructor({color,name,deg,x,y,w,h}){
         this.color=color||"yellow";
         this.name=name||"OrangeRicky";
         this.deg=deg||0;
         this.x=x||0;
         this.y=y||0;
         this.w=w||0;
         this.h=h||0;
    }

    collision(){
        if(this.y>global.canvas.height-this.h){
            return true;
        }else{
            return false;
        }
    }

    draw(){
        
    }
}

module.exports=Shape;