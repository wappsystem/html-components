
(function(){
    //----------------------------------------------------------
    var _res={}; try{ _res=JSON.parse(`_vm_res_`);}catch(e){console.log(e);} 
    new ResizeObserver($vm.responsive).observe(vm_form_container__vmID);
    //----------------------------------------------------------
    /*
    var rid=undefined; try{ rid=_res.qp.rid;}catch(e){} 
    var record=undefined; try{ record=_res.qp.record;}catch(e){} 
    var form=document.getElementById("vm_F__vmID");
    var btn=document.getElementById("vm_submit__vmID");
    var msg=document.getElementById("vm_message__vmID");
    if(record!=undefined) $vm.deserialize(record,form);
    */
    var inputs=document.getElementById("vm_F__vmID").querySelectorAll("input");
    var textareas=document.getElementById("vm_F__vmID").querySelectorAll("textarea");
    //----------------------------------------------------------
    document.getElementById("vm_submit__vmID").addEventListener('click', (e) =>  { 
        var req={cmd:'dot-product', vectorA:inputs[0].value,vectorB:textareas[0].value}
        console.log(req)
        $vm.request(req).then((res)=>{
            console.log(res)
            if(res.status=="ok"){
                textareas[1].value=res.a;
            }
            else{
                textareas[1].value=res.msg;
            }
        });
    });
    inputs[0].value ="Who is the IT manager?";
    textareas[0].value ="Who is the IT manager?\nWho is the finance manager?\nWho is the head of IT?\nWho is responsible for IT operations?";
    //----------------------------------------------------------
})();    
