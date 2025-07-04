
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
        return true;
    }
    //----------------------------------------------------------
    const checkbox = document.forms["vm_F__vmID"]["ethnicity_10"]
    const e_other=document.forms["vm_F__vmID"]["ethnicity_other"];
    checkbox.addEventListener('click', function () {
        if(checkbox.checked) e_other.style.display = "block"; else e_other.style.display = "none";
    });    
    //----------------------------------------------------------
})();    


    
        /*
        if (checkbox.checked) {
            console.log('Checkbox is checked');
        } else {
            console.log('Checkbox is unchecked');
        }
            */
    /*
    function check__vmID(checkbox){
        var e=document.forms["vm_F__vmID"]["ethnicity_other"];
        if(checkbox.checked) e.style.display = "block"; else e.style.display = "none";
    }
        */
