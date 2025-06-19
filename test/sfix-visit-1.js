(async ()=>{
    var link="https://wappsystem.github.io/html-components/test/sfix-visit-1.txt";
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
    //--------------------------------
    var Participant="";
    var Participant_uid="";
    var I=0;
    var callback=function(cParticipant, cParticipant_uid){
        if(I==m.length){
            console.log("Finished!");   
        }
        else{
            console.log("Module: "+I+"  "+m[I].title)
            if(I==1){
                Participant=cParticipant;
                Participant_uid=cParticipant_uid;
            }
            var res={}
            res._source=m[I];
            res.a=m[I].content;
            res.sid="";
            res.q="";
            res.callback=callback;
            res.Participant=Participant;
            res.Participant_uid=Participant_uid;
            if(m[I].format=="html-web-module")  $vm.html_web_module(res);
            else if(m[I].format=="spardac")  $vm.spardac(res);
            I++;
        }
    }
    //--------------------------------
    var load_first_module=function(){
        callback("","");
    }
    //--------------------------------
    process_configuration();
    load_first_module();
    //--------------------------------
})()
