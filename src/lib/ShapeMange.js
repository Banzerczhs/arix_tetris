const shapes=require('../shapes/index');
const {Tools}=require('../common/utils');
const DataMange=require('../lib/DataMange');

let ShapeKey=Object.keys(shapes);

let dataMange=new DataMange();

class ShapeMange{
    constructor(){
        this.currentShape=null;
    }
    generate(){
        let name=ShapeKey[Tools.randomNum(0,ShapeKey.length-1)];
        let shape=shapes[name];
        this.currentShape=new shape({deg:0,name,color:'yellow'});
        dataMange.shapeList.push(this.currentShape);
    }
}

module.exports=ShapeMange;