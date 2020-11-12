const ioHook=require('iohook');

ioHook.on('keydown',function(ev){
    console.log(ev);
});