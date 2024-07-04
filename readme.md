const path = require('path')
app.use('./static',express.static(path.join(__dirname,'public')))




app.use('path', express.use('foldername'))