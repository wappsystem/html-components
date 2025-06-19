(async ()=>{
    var link="https://wappsystem.github.io/html-components/test/sfix-panel-1.txt";
    var configuration=await $vm.fetch(link);
    configuration=configuration.replace(/\r/g,'');
    var m=[];
    var process_configuration=function(){
        var modules=configuration.split("\n----------------------------------------------------------------------------------------------------\n");
        modules.forEach(a=>{
            var lines = a.split('\n').map(line => line.trim());
            var o={}
            o.title=lines[0].trim();
            o.format=lines[1].trim();
            o.content=lines.slice(2).join('\n');
            o.module=o.content;
            m.push(o);
        })
    }
    var load_first_module=function(){
        var res={}
        res.q="";
        res._source=m[0];
        res.m=m;
        $vm.html_web_module(res);
    }
    //--------------------------------
    process_configuration();
    load_first_module();
    //--------------------------------
})()
