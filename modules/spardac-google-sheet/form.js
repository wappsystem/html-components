//----------------------------------------------------------
var arr=_arr;
var tagA=arr[3];
var gid=tagA.getAttribute('gid')
var form=document.getElementById("F__ID");
//----------------------------------------------------------
var m={};
m.input={}
if(m.prefix==undefined) m.prefix="";
if(m.change_status==undefined) m.change_status=0;
m.options={self:m.self};
if(!gid) alert("No google sheet id is setup.")
//-------------------------------------
m.load=function(){ 
    $('#F__ID')[0].reset();
    $('#submit__ID').show();
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
    
    var req={cmd:'google-sheet-add', gid:gid, form_values:data}
    $vm.request(req).then((res)=>{
        if(res.status=="ok"){
            const answerDiv = form.closest('.vm-answer');
            answerDiv.remove();
            $vm.rag({
                q:"",
                a:["","rag","Successfully submitted"]
            });
        }
    });
    //--------------------------------------------------------
}
//--------------------------------------------------------
$('#F__ID').submit(function(event){  m.submit(event);} )
//--------------------------------------------------------
m.before_submit=function(data,{}){return true;}
//--------------------------------------------------------
m.load();