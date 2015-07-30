const PORT = 3000;
var Express = require('express');
var app = Express();

app.use(Express.static('public'));
app.listen(PORT);

console.info("Server running at %d", PORT);