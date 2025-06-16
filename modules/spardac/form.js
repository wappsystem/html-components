//----------------------------------------------------------
//var _res={}; try{ _res=JSON.parse(`_vm_res_`);}catch(e){console.log(e);} 
console.log(_res);
//----------------------------------------------------------
var rid=undefined; try{ rid=_res.qp.rid;}catch(e){} 
var record=undefined; try{ record=_res.qp.record;}catch(e){} 
var form=document.getElementById("F__ID");
//----------------------------------------------------------
var m={};
m.input={}
if(m.prefix==undefined) m.prefix="";
if(m.change_status==undefined) m.change_status=0;
m.options={self:m.self};
var content=_res._source.content;
var jsonFile="";  try{jsonFile=$vm.get_content_line(content,"db").replace(".db","")}catch(e){};
if(jsonFile=="") alert("No database file is setup.")
//-------------------------------------
m.load=function(){ //start point, called by VM
    $('#F__ID')[0].reset();
    $('#submit__ID').show();
    if(record!=undefined) $vm.deserialize(record,form);
    else{
        if(_res.Participant){
            form.querySelector('input[name="Participant_uid"]').value=_res.Participant_uid; 
            form.querySelector('input[name="Participant"]').value=_res.Participant; 
            var f=$vm.get_content_line(content,"db").replace(".db","");
            var req={cmd:"json-data-exist-check", jsonFile:jsonFile, field:"Participant_uid", value:_res.Participant_uid}
            $vm.request(req).then((res2)=>{
                if(res2.status=="ok" && res2.result==1){
                    const answerDiv = form.closest('.vm-answer');
                    answerDiv.remove();
                    try{ if($vm._vm_grid_refresh) $vm._vm_grid_refresh();}catch(e){}
			        if(_res.callback) _res.callback();  
                }
            });

        }
    }
}
//-------------------------------
m.submit=function(event){
    //--------------------------------------------------------
    if(event) event.preventDefault();
    $('#submit__ID').hide();
    //--------------------------------------------------------
    var data={};
    var data=$vm.serialize(document.getElementById('F__ID'));
    var r=true;
    if(m.before_submit!=undefined) r=m.before_submit(data,{});
    if(r==false){$('#submit__ID').show(); return;}
    
    var req={cmd:'json-data-add', rid:rid, form_values:data, jsonFile:jsonFile}
    $vm.request(req).then((res)=>{
        if(res.status=="ok"){
            console.log(res);
            const answerDiv = form.closest('.vm-answer');
            answerDiv.remove();
			if(_res.grid_refresh) _res.grid_refresh();  
        }
    });
    //--------------------------------------------------------
}
//--------------------------------------------------------
$('#F__ID').submit(function(event){  m.submit(event);} )
//--------------------------------------------------------
m.before_submit=function(data,{}){return true;}
//--------------------------------------------------------
