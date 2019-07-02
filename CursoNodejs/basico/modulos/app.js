const mio=require('../daniel.js');

let rsp=mio.sumar(20,30);
console.log(rsp);

setTimeout(()=>{
    console.log('termine');
}, 2000);

//console.log(mio.suscriptores);

//mio.saludo;

/*const od=require('os');

let cpu=od.cpus();

//console.log(cpu);

let sistema=od.platform();
//console.log(sistema);

let usuario=od.hostname();
//console.log(usuario);

const fs=require('fs');

let cpu_string=JSON.stringify(cpu);
fs.appendFile('Daniel.txt', `Informacion de cpu: ${cpu_string}`, function(error){
    if (error) {
        console.log('ocurrio un error al crear el archivo');
    }
});*/