const {SHAPE_TYPE}=require('../common/const');
const fs=require('fs');
const path=require('path');
let classification=fs.readdirSync(path.resolve(__dirname));

let shapes=Object.keys(SHAPE_TYPE).map(key=>SHAPE_TYPE[key]);
let shapeClass={};
classification.forEach(item=>{
    item=item.slice(0,-3);
    if(shapes.includes(item)){
        shapeClass[item]=require(path.resolve(__dirname)+'/'+item+'.js');
    }
});


module.exports=shapeClass;