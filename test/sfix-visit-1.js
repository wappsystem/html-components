(async ()=>{
    var link="https://wappsystem.github.io/html-components/test/sfix-visit-1.txt";
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
    start();
    callback("","");
    //--------------------------------
})()
