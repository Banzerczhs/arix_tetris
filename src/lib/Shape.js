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
    draw(){
        
    }
}

module.exports=Shape;