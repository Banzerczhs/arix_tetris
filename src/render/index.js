const {ipcRenderer}=require('electron');
const GAME_CONFIG=require('./src/config/config');
const Runtime=require('./src/lib/RunTime');

var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');
canvas.width=GAME_CONFIG.ctxWidth;

const runtime=new Runtime();

//监听从主进程发送出来的高度数据
ipcRenderer.on('size',function(event,...rest){
    rest=JSON.parse(rest);
    let height=rest.pop();
    canvas.height=Math.floor(height/GAME_CONFIG.unitSize)*GAME_CONFIG.unitSize;
    runtime.init(ctx,canvas);
});