
(function(){
    //----------------------------------------------------------
    var _res={}; try{ _res=JSON.parse(`_vm_res_`);}catch(e){console.log(e);} 
    //----------------------------------------------------------
    var edit=$vm.get_file_name(_res.a,"edit").split('.')[0];
    var headers=[];
    var fields=[];
    var formats=[];
    var items=[];
    var total=0;
    var data=[];
    //----------------------------------------------------------
    //get fields
    console.log(_res.a)
    _res.a.split('\n').forEach(line=>{
        if(line.endsWith(".field")){
            var fs=line.replace(".field",'').split(',');
            for (var i=0; i<fs.length; i++){
                ps=fs[i].split('|');
                fields.push(ps[0].trim());
                if(ps.length>1) formats.push(ps[1]); else formats.push("");
                if(ps.length>2) items.push(ps[2]); else items.push("");
            }
        }
    })
    if(fields.length!=0) headers=fields;
    //console.log(fields)
    //----------------------------------------------------------
    var record_edit=function(event){
        const rid = event.target.getAttribute('_id');
        //------------------------------
        var record={}
        data.forEach((r)=>{
            if(r["id"]==rid){
                record=r;
            }
        })                
        //------------------------------
        $vm._vm_grid_refresh=load;
        $vm.query(edit,_res.sid,{rid:rid,record,record,fields:fields,formats:formats,items:items,sid:_res.sid,title:_res.title,refresh:"_vm_grid_refresh"});
    }
    //----------------------------------------------------------
    var record_delete=function(event){
        const rid = event.target.getAttribute('_id');
        //------------------------------
        if (window.confirm("Are you sure you want to delete this? \r\nid:  "+rid)) {
            //------------------------------
            var req={cmd:'json-data-delete', rid:rid, sid: _res.sid ,title:_res.title}
            console.log('%c Request:', "color:rgb(255, 255, 0)",req)    
            $vm.request(req).then((res)=>{
                console.log('%c Response:', "color:rgb(0, 255, 0)",res);
                if(res.status=="ok"){
                    //alert("Successfully deleted.");
                    load(fn);
                }
            });
            //------------------------------
        } 
        //------------------------------
    }
    //----------------------------------------------------------
    var render=function(fn){
        document.getElementById("vm_table__vmID").innerHTML=$vm.to_grid_trs_edit_delete_d(headers,data,fn);
        document.getElementById("vm_total__vmID").textContent="Total: "+total;

        var icons=document.getElementById("vm_table__vmID").querySelectorAll('i.fa-edit');
        icons.forEach(icon => {
            icon.addEventListener('click', (event) => {
                record_edit(event);
            });
        });   
        
        var icons=document.getElementById("vm_table__vmID").querySelectorAll('i.fa-trash-alt');
        icons.forEach(icon => {
            icon.addEventListener('click', (event) => {
                record_delete(event);
            });
        });   
        $vm.scroll();
    }
    //----------------------------------------------------------
    var load=function(){
        var keyword=document.getElementById("vm_keyword__vmID").value;
        var page=document.getElementById("vm_page__vmID").value;
        var req={cmd:'json-data-grid', kw:keyword, pg:page, sid:_res.sid ,title:_res.title}
        console.log('%c Request:', "color:rgb(255, 255, 0)",req)    
        $vm.request(req).then((res)=>{
            console.log('%c Response:', "color:rgb(0, 255, 0)",res);
            if(res.status=="ok"){
                data=res.data;
                if(data.length>0 && headers.length==0) headers = Object.keys(data[0]);
                total=res.total;
                render(fn);
            }
        });
    }
    //----------------------------------------------------------
    var fn=100;
    var add=document.getElementById("vm_add__vmID");
    if(add) add.addEventListener('click', (e) =>  {  $vm._vm_grid_refresh=load; $vm.query(edit,_res.sid,{sid:_res.sid,fields:fields,formats:formats,items:items,refresh:"_vm_grid_refresh"})})
    document.getElementById("vm_3all__vmID").addEventListener('click', (e) =>  {    if(fn==3) fn=100; else fn=3;  render(fn);   })
    document.getElementById("vm_load__vmID").addEventListener('click', (e) =>  {    load();    })
    document.getElementById("vm_export__vmID").addEventListener('click', (e) =>  {   $vm.download_csv($vm.get_file_name(_res.a,"json").replace('.json','')+".csv",headers,rows);  })
    document.getElementById("vm_keyword__vmID").addEventListener("keyup", function(e){  if (e.keyCode === 13) { load(fn); }   })
    document.getElementById("vm_page__vmID").addEventListener("keyup", function(e){     if (e.keyCode === 13) { load(fn); }   })
    //----------------------------------------------------------
    load(fn);
    //----------------------------------------------------------
})();    
