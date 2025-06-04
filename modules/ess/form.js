
(function(){
    //----------------------------------------------------------
    var _res={}; try{ _res=JSON.parse(`_vm_res_`);}catch(e){console.log(e);} 
    new ResizeObserver($vm.responsive).observe(vm_form_container__vmID);
    //----------------------------------------------------------
    var rid=undefined; try{ rid=_res.qp.rid;}catch(e){} 
    var record=undefined; try{ record=_res.qp.record;}catch(e){} 
    var form=document.getElementById("vm_F__vmID");
    var btn=document.getElementById("vm_submit__vmID");
    var msg=document.getElementById("vm_message__vmID");
    if(record!=undefined) $vm.deserialize(record,form);
    //----------------------------------------------------------
    document.getElementById("vm_submit__vmID").addEventListener('click', (e) =>  { 
        e.preventDefault(); e.stopPropagation(); 
        if(process_form()){
            if (form.checkValidity()) {
                var formValues=$vm.serialize(vm_F__vmID)
                var req={cmd:'json-data-add', rid:rid, form_values:formValues, sid:_res.sid }
                $vm.request(req).then((res)=>{
                    if(res.status=="ok"){
                        alert("Successfully submitted.");
                        const form = document.getElementById('vm_F__vmID');
                        const answerDiv = form.closest('.vm-answer');
                        answerDiv.remove();
                    }
                });
            } 
            else form.reportValidity();
        }
    });
    //----------------------------------------------------------
    function process_form(){
        var v1=$vm.get_form_value('vm_F__vmID','ESS_1','float');
        var v2=$vm.get_form_value('vm_F__vmID','ESS_2','float');
        var v3=$vm.get_form_value('vm_F__vmID','ESS_3','float');
        var v4=$vm.get_form_value('vm_F__vmID','ESS_4','float');
        var v5=$vm.get_form_value('vm_F__vmID','ESS_5','float');
        var v6=$vm.get_form_value('vm_F__vmID','ESS_6','float');
        var v7=$vm.get_form_value('vm_F__vmID','ESS_7','float');
        var v8=$vm.get_form_value('vm_F__vmID','ESS_8','float');
        var v=v1+v2+v3+v4+v5+v6+v7+v8;
        $vm.set_form_value('vm_F__vmID','ESS',v);
        return true;
    }
    //----------------------------------------------------------
})();    
