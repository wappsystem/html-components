//----------------------------------------------------------
var _res={}; try{ _res=JSON.parse(`_vm_res_`);}catch(e){console.log(e);} 
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
//-------------------------------------
m.load=function(){
    $('#F__ID')[0].reset();
    $('#submit__ID').show();
    if(record!=undefined) $vm.deserialize(record,form);
    else{
        if($vm.params['name']) form.querySelector('input[name="Participant_uid"]').value=$vm.params['uid']; 
        if($vm.params['uid'])  form.querySelector('input[name="Participant"]').value=$vm.params['name']; 
    }
}
//-------------------------------
m.submit=function(event){
    //--------------------------------------------------------
    event.preventDefault();
    $('#submit__ID').hide();
    //--------------------------------------------------------
    var data={};
    var data=$vm.serialize(document.getElementById('F__ID'));
    console.log(data)
    var r=true;
    if(m.before_submit!=undefined) r=m.before_submit(data,{});
    if(r==false){$('#submit__ID').show(); return;}
    
    var req={cmd:'json-data-add', form_values:data, sid:_res.sid }
    console.log(req)
    $vm.request(req).then((res)=>{
        if(res.status=="ok"){
            alert("Successfully submitted.");
            const answerDiv = form.closest('.vm-answer');
            answerDiv.remove();
        }
    });
    //--------------------------------------------------------
}
//--------------------------------------------------------
$('#F__ID').submit(function(event){
    m.submit(event);}
)
//--------------------------------------------------------
m.before_submit=function(data,{}){}
//--------------------------------------------------------
