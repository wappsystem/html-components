
(function(){
    //Form
    //**********************************************************
    new ResizeObserver($vm.responsive).observe(vm_form_container__vmID);
    //**********************************************************
    vm_submit__vmID.addEventListener('click', (e) =>  { 
        var _id="_vm_id";
        e.preventDefault(); e.stopPropagation(); 
        var formValues=$vm.serialize(vm_F__vmID)
		var req={cmd:'html-module',action:"add", form_values:formValues, _id:_id }
        console.log(req);
        $vm.request(req).then((res)=>{
            console.log(res);
            if(res.status=="ok"){
                alert("Successfully Added.");
                document.getElementById("vm_F__vmID").reset();
            }
        });
    });
    //**********************************************************
})();    
