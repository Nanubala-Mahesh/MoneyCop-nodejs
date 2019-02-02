const express = require('express'); 
const app = express(); 
const port = 3000; 
const { mongoose } = require('./config/db'); 

const { routes } = require('./config/routes');

app.use(express.json()); 

app.use('/', routes);


// app.get('/', function(request, response){
//     console.log('incoming request', request.url);
//     response.send('<h2>Hello World</h2>');
// });

app.listen(port, function() {
    console.log('listening on port', port); 
}); 