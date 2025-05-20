
(function(){
    var headers=[];
    var rows=[]
    var total=0;
    var fn=3;
    var nm="data.csv";
    var render=function(){
        var trs=$vm.to_grid_trs(headers,rows,fn)
        document.getElementById("vm_table__vmID").innerHTML=trs;
        document.getElementById("vm_total__vmID").textContent=total;
    }
    var load=function(keyword, page){
        var req={cmd:'html-web-module',action:"grid", kw:keyword, pg:page, sid:"_vm_sid_" }
        console.log(req)    
        $vm.request(req).then((res)=>{
            console.log(res);
            if(res.status=="ok"){
                nm="_vm_sid_".split('|')[0].split('\\').pop().split('-')[0].replace('.txt','')+".csv";
                headers=res.headers;
                rows=res.rows;
                total=res.total;
                render();
            }
        });
    }
    load("","1/20");
    vm_3all__vmID.addEventListener('click', (e) =>  { 
        if(fn==3) fn=100;
        else fn=3;
        render();
    })
    vm_load__vmID.addEventListener('click', (e) =>  { 
        var kw=document.getElementById("vm_keyword__vmID").value;
        var pg=document.getElementById("vm_page__vmID").value;
        load(kw,pg);
    })
    vm_export__vmID.addEventListener('click', (e) =>  { 
        $vm.download_csv(nm,headers,rows);
    })
})();    
