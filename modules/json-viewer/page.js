
(function(){
    //----------------------------------------------------------
    var _res={}; try{ _res=JSON.parse(`_vm_res_`);}catch(e){console.log(e);} 
    //----------------------------------------------------------
    var rid=undefined; try{ rid=_res.qp.rid;}catch(e){} 
    var record=undefined; try{ record=_res.qp.record;}catch(e){} 
    //----------------------------------------------------------
    const container = document.getElementById("vm__vmID");
    const options = {
        mode: "form", // or "tree" if you prefer collapsible structure
        onEditable: function (node) {
        return {
            field: false,
            value: false
        };
        },
        mainMenuBar: false, // 🛑 disable the menu bar (to prevent mode switching, etc.)
        enableSort: false,  // 🛑 disable sorting keys
        enableTransform: false, // 🛑 disable transforming (e.g., compact/pretty)
    };
    const editor = new JSONEditor(container, options);
    editor.set(record);
    //----------------------------------------------------------
})();    
