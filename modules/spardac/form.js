//----------------------------------------------------------
var arr=_arr;
var qp=_qp;
var rid=undefined; try{ rid=qp.rid;}catch(e){} 
var record=undefined; try{ record=qp.record;}catch(e){} 
var form=document.getElementById("F__ID");
//----------------------------------------------------------
var m={};
m.input={}
if(m.prefix==undefined) m.prefix="";
if(m.change_status==undefined) m.change_status=0;
m.options={self:m.self};
var jsonFile="";  try{jsonFile=$vm.get_file_name_from_array(arr,"db").replace(".db","")}catch(e){};
if(jsonFile=="") alert("No database file is setup.")
//-------------------------------------
m.load=function(){ //start point, called by VM
    $('#F__ID')[0].reset();
    $('#submit__ID').show();
    if(record!=undefined) $vm.deserialize(record,form);
    else{
        if($vm.wappsystem.Participant){
            form.querySelector('input[name="Participant_uid"]').value=$vm.wappsystem.Participant_uid; 
            form.querySelector('input[name="Participant"]').value=$vm.wappsystem.Participant; 
            var req={cmd:"json-data-exist-check", jsonFile:jsonFile, field:"Participant_uid", value:$vm.wappsystem.Participant_uid}
            $vm.request(req).then((res2)=>{
                if(res2.status=="ok" && res2.result==1){
                    const answerDiv = form.closest('.vm-answer');
                    answerDiv.remove();
                    try{ 
                        //if($vm._vm_grid_refresh) $vm._vm_grid_refresh();
                        if($vm.wappsystem.callback) $vm.wappsystem.callback();  
                    }catch(e){}
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
            const answerDiv = form.closest('.vm-answer');
            answerDiv.remove();
            try{ 
                if($vm._vm_grid_refresh) $vm._vm_grid_refresh();
                if($vm.wappsystem.callback) $vm.wappsystem.callback();  
            }catch(e){}
        }
    });
    //--------------------------------------------------------
}
//--------------------------------------------------------
$('#F__ID').submit(function(event){  m.submit(event);} )
//--------------------------------------------------------
m.before_submit=function(data,{}){return true;}
//--------------------------------------------------------
