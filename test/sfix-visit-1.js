(async ()=>{
    //------------------------------------
    //app start from here
    if(!$vm.wappsystem) $vm.wappsystem={}
    $vm.wappsystem.item_list=[]
    //------------------------------------
    var build_items_base=async function(){
        var link="https://wappsystem.github.io/html-components/test/sfix-visit-1.txt";
        var all_items=await $vm.fetch(link);
        all_items=all_items.replace(/\r/g,'');
        var items=all_items.split("\n----------------------------------------------------------------------------------------------------\n");
        items.forEach(item=>{
            var lines = item.split('\n').map(line => line.trim());
            $vm.wappsystem.item_list.push({name:lines[0],content:lines});
        })
    }
    await build_items_base();
    //------------------------------------
    //the logic is call first module, then the first module call the second module.... untill the last module
    var item_list=$vm.wappsystem.item_list;
    var Participant="";
    var Participant_uid="";
    var I=0;
    $vm.wappsystem.callback=function(cParticipant, cParticipant_uid){
        if(I==item_list.length){
            //the last module, so finished
            console.log("Finished!");   
        }
        else{
            console.log("Module: "+I+"  "+item_list[I].name)
            if(I==1){
                $vm.wappsystem.Participant    =cParticipant;
                $vm.wappsystem.Participant_uid=cParticipant_uid;
            }
            var res={_source:{content:item_list[I].content}}
            $vm.item(res);
            I++;
        }
    }
    //--------------------------------
    var load_0th_module=function(){
        //the next module is the first module, that is the login module
        $vm.wappsystem.callback("","");
    }
    //--------------------------------
    load_0th_module();
    //--------------------------------
})()

/*


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



(async ()=>{
    //------------------------------------
    //app start from here
    if(!$vm.wappsystem) $vm.wappsystem={}
    $vm.wappsystem.item_list=[]
    //------------------------------------
    var build_items_base=async function(){
        var link="https://wappsystem.github.io/html-components/test/sfix-panel-1.txt";
        var all_items=await $vm.fetch(link);
        all_items=all_items.replace(/\r/g,'');
        var items=all_items.split("\n----------------------------------------------------------------------------------------------------\n");
        items.forEach(item=>{
            var lines = item.split('\n').map(line => line.trim());
            $vm.wappsystem.item_list.push({name:lines[0],content:lines});
        })
    }
    await build_items_base();
    //------------------------------------
    var load_first_module=function(){
        var res={_source:{content:$vm.wappsystem.item_list[0].content}}
        $vm.item(res);
    }
    //------------------------------------
    load_first_module();
    //------------------------------------
})()
*/
