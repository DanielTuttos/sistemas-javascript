const express=require('express');
const app=express();
const path=require('path');


app.set('port', 3000);
app.set('views', path.join(__dirname,'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine','ejs');


//archivos estaticos

app.use(express.static(path.join(__dirname,'public')))

//rutas
app.use(require('./routes/index'));
//servidor a utilizar
app.listen(app.get('port'),()=>{
    console.log('servidor en puerto', app.get('port'));
});