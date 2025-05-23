
(function(){
    //----------------------------------------------------------
    var _res={}; try{ _res=JSON.parse(`_vm_res_`);}catch(e){console.log(e);} 
    new ResizeObserver($vm.responsive).observe(vm_form_container__vmID);
    //----------------------------------------------------------
    var rid=undefined; try{ rid=_res.qp.rid;}catch(e){} 
    var record=undefined; try{ record=_res.qp.record;}catch(e){} 
    //----------------------------------------------------------
    document.getElementById("vm_submit__vmID").addEventListener('click', (e) =>  { 
        e.preventDefault(); e.stopPropagation(); 
        var formValues=$vm.serialize(vm_F__vmID)
		var req={cmd:'json-data-add', rid:rid, form_values:formValues, sid:_res.sid }
        console.log(req);
        $vm.request(req).then((res)=>{
            console.log(res);
            if(res.status=="ok"){
                document.getElementById("vm_submit__vmID").style.display = "none";
                document.getElementById("vm_message__vmID").textContent="Successfully submitted.";
            }
        });
    });
    //----------------------------------------------------------
    if(record!=undefined){
        $vm.deserialize(record,vm_F__vmID);
    }
    //----------------------------------------------------------
})();    
