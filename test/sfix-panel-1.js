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

