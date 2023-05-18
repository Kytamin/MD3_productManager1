const http = require('http')
const fs = require('fs')


let server = http.createServer( (req, res)=> {
    let dataFile='';
    let html = '';
    fs.readFile('./data/data.json','utf8',  (err, data) =>{
        dataFile=JSON.parse(data)
        console.log(dataFile)
        dataFile.forEach((element,index) => {
            html += '<tr>';
            html += `<td>${index+1}</td>`
            html += `<td>${element.name}</td>`
            html += `<td>${element.price}</td>`
            html += `<td><button class="btn btn-danger">Delete</button></td>`
            html += `<td><button class="btn btn-danger">Update</button></td>`
            html += '</tr>';
        });
    });

    fs.readFile('./view/index.html','utf8', (err, data)=> {
        res.writeHead(200, {'Content-Type': 'text/html'});
        data = data.replace('{list-user}', html)
        res.write(data)
        res.end()
    });
})

server.listen('8080', function (){
    console.log('Serve running port 8080')
})
