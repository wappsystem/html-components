import express	    from 'express';
import http         from 'http'; 
import fs           from 'fs';
import  url  from 'url';
import  path from 'path';
import { fileURLToPath } from 'url';
import { dirname }  from 'path';
//------------------------------------------------------------
var $vm={};
//------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//const web_root = path.join(__dirname, './');
console.log(__dirname)
//----------------------------------------------------------
$vm.request_get=function(req,res){
	const parsedUrl = url.parse(req.url, true);
	let pathName = parsedUrl.pathname;
	pathName=pathName.replace(/%20/g,' ');
	pathName=pathName.replace(/\.\./g,' ');
	const file = path.join(__dirname, pathName);
	//------------------------------------------------------------
	const responseContentType = getContentType(file);
	res.setHeader('Content-Type', responseContentType);
	fs.readFile(file, (error, data) => {
		if (!error) {
			res.writeHead(200);
			res.end(data);
		} else {
			res.writeHead(404);
			res.end('404 - File Not Found');
		}
	});
}
//----------------------------------------------------------
const mimeTypes = {
    '.html': 'text/html',
    '.jpg': 'image/jpeg',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.ico': 'image/x-icon',
};
//------------------------------------------------------------
const getContentType = pathName => {
    let contentType = 'application/octet-stream';
    for (var key in mimeTypes) {
        if (mimeTypes.hasOwnProperty(key)) {
            if (pathName.indexOf(key) > -1) {
                contentType = mimeTypes[key];
            }
        }
    }
    return contentType;
};
//------------------------------------------------------------
$vm.process=function(req, res, next){
	//-------------------------------------------------
	var dt1=new Date().getTime();
	//-------------------------------------------------
	var r_data='';
	req.on('data',function(data){r_data+=data;});
	req.on('end',function(){
		//-------------------------------------------------
		if(req.method=='GET')		    { 	$vm.request_get(req,res);				}
		else if(req.method=='POST')     {   res.send(""); res.end(); 		        }
		else if(req.method=="OPTIONS")	{	res.send(""); res.end();		  		}
		else if(req.method=="HEAD")		{	res.send(""); res.end();			  	}
		//-------------------------------------------------
	})
}
//------------------------------------------------------------
const server=express();
server.use($vm.process);
//------------------------------------------------------------
http.createServer(
    server
).listen(
    8080,
    () => console.log("The server is listening on port 8080") 
);
//------------------------------------------------------------
