const fs=require('fs');

/*fs.readFile('data.txt','utf-8',(error,data)=>{
    if(error){
        console.log(`Error ${error}`);
    }else{
        console.log(data);
    }
});

fs.rename('data.txt','data_renombrado.txt', (error)=>{
    if (error) throw error;
    console.log('renombrado');
});*/

fs.createReadStream('data.txt').pipe(fs.createWriteStream('data3.txt'));