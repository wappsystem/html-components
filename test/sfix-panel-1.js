(async ()=>{
    var link="https://wappsystem.github.io/html-components/test/sfix-panel-1.txt";
    var content=await $vm.fetch(link);
    content=content.replace(/\r/g,'');
    var m=[];
    var start=function(){
        var modules=content.split("\n----------------------------------------------------------------------------------------------------\n");
        modules.forEach(a=>{
            var ss=a.split('\n-\n');
            if(ss.length==3){
                var o={}
                o.title=ss[0];
                o.format=ss[1];
                o.content=ss[2];
                m.push(o);
            }
        })
    }
    var load_panel=function(){
        var res={}
        res._source=m[0];
        res.sid="";
        res.q="";
        res.m=m;
        $vm.html_web_module(res);
    }
    //--------------------------------
    start();
    load_panel();
    //--------------------------------
})()
