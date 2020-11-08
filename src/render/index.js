const {ipcRenderer}=require('electron');
const Runtime=require('./src/lib/RunTime');
const GAME_CONFIG=require('./src/config/config');

var canvas=document.getElementById('canvas');

var ctx=canvas.getContext('2d');

canvas.width=GAME_CONFIG.ctxWidth;

function run(){
    let runtime=new Runtime();

    runtime.setCtx(ctx);
}

//监听从主进程发送出来的高度数据
ipcRenderer.on('size',function(event,...rest){
    rest=JSON.parse(rest);
    canvas.height=rest.pop();
    run();
});