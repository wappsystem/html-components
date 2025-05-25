
(function(){
    //----------------------------------------------------------
    var _res={}; try{ _res=JSON.parse(`_vm_res_`);}catch(e){console.log(e);} 
    //----------------------------------------------------------
    console.log(_res);
    var ask=$vm.get_file_name(_res.a,"form").split('.')[0];
    var headers=[];
    var rows=[]
    var total=0;
    //----------------------------------------------------------
    var record_edit=function(event){
        const rid = event.target.getAttribute('_id');
        //------------------------------
        var record={}
        rows.forEach((r)=>{
            if(r[0]==rid){
                for(var i=0;i<headers.length;i++){
                    record[headers[i]]=r[i]
                }
            }
        })                
        //------------------------------
        $vm.query(ask,{rid:rid,record,record});
    }
    //----------------------------------------------------------
    var record_delete=function(event){
        const rid = event.target.getAttribute('_id');
        //------------------------------
        if (window.confirm("Are you sure you want to delete this? \r\nid:  "+rid)) {
            //------------------------------
            var req={cmd:'json-data-delete', rid:rid, sid: _res.sid }
            console.log(req);
            $vm.request(req).then((res)=>{
                console.log(res);
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
        document.getElementById("vm_table__vmID").innerHTML=$vm.to_grid_trs_edit_delete(headers,rows,fn);
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

    }
    //----------------------------------------------------------
    var load=function(fn){
        var keyword=document.getElementById("vm_keyword__vmID").value;
        var page=document.getElementById("vm_page__vmID").value;
        var req={cmd:'json-data-grid', kw:keyword, pg:page, sid:_res.sid }
        console.log(req)    
        $vm.request(req).then((res)=>{
            console.log(res);
            if(res.status=="ok"){
                headers=res.headers;
                rows=res.rows;
                total=res.total;
                render(fn);
            }
        });
    }
    //----------------------------------------------------------
    var fn=3;
    document.getElementById("vm_3all__vmID").addEventListener('click', (e) =>  {    if(fn==3) fn=100; else fn=3;  render(fn);   })
    document.getElementById("vm_load__vmID").addEventListener('click', (e) =>  {    load(fn);    })
    document.getElementById("vm_export__vmID").addEventListener('click', (e) =>  {   $vm.download_csv($vm.get_file_name(_res.a,"json").replace('.json','')+".csv",headers,rows);  })
    //----------------------------------------------------------
    load(fn);
    //----------------------------------------------------------
})();    
