
(function(){
    //----------------------------------------------------------
    var _res={}; try{ _res=JSON.parse(`_vm_res_`);}catch(e){console.log(e);} 
    //----------------------------------------------------------
    var rid=undefined; try{ rid=_res.qp.rid;}catch(e){} 
    var record=undefined; try{ record=_res.qp.record;}catch(e){} 
    var submit=document.getElementById("vm_submit__vmID");
    var close=document.getElementById("vm_close__vmID");
    var msg=document.getElementById("vm_message__vmID");
    var div=document.getElementById("vm__vmID");
    //----------------------------------------------------------
    const container = document.getElementById("vm__vmID");
    const options = {
        mode: "form", // or "tree" if you prefer collapsible structure
        onEditable: function (node) {
        return {
            field: false,  // 🛑 prevent editing key names
            value: true    // ✅ allow editing values
        };
        },
        mainMenuBar: false, // 🛑 disable the menu bar (to prevent mode switching, etc.)
        enableSort: false,  // 🛑 disable sorting keys
        enableTransform: false, // 🛑 disable transforming (e.g., compact/pretty)
    };
    const editor = new JSONEditor(container, options);
    editor.set(record);
    //----------------------------------------------------------
    submit.addEventListener('click', (e) =>  { 
        e.preventDefault(); e.stopPropagation(); 
        const updatedRecord = editor.get();
        if(updatedRecord==undefined) return;
        var req={cmd:'json-data-add', rid:rid, form_values:updatedRecord, sid:_res.qp.sid }
        $vm.request(req).then((res)=>{
            if(res.status=="ok"){
                msg.textContent="Successfully submitted.";
            }
        });
    });
    //----------------------------------------------------------
    close.addEventListener('click', (e) =>  { 
        e.preventDefault(); e.stopPropagation(); 
        const answerDiv = div.closest('.vm-answer');
        answerDiv.remove();
    });
    //----------------------------------------------------------
})();    
