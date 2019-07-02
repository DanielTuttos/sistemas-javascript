const controller={};
controller.list=(req,res)=>{
    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM customer', (err, customers)=>{
            if (err) {
                //next(err);
                res.json(err);
            }
            //console.log(customers);
            res.render('customers',{
                data:customers
            });
        });
    });
};

controller.save=(req,res)=>{
    const data=req.body;
    req.getConnection((err,conn)=>{
        conn.query('INSERT INTO customer set ?',[data],(err, customer)=>{
            
            res.redirect('/');
        });
    });
};

controller.edit=(req,res)=>{
    const id=req.params.id;
    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM customer WHERE id=?',[id], (err, columna)=>{
            res.render('customer_edit',{
               data:columna[0]
            });
        });
    });
};
controller.update=(req,res)=>{
    const id=req.params.id;
    const newcustomer=req.body;
    req.getConnection((err,conn)=>{
        conn.query('UPDATE customer set ? WHERE id=?',[newcustomer, id], (err, rows)=>{
            res.redirect('/');
        });
    });
};

controller.delete=(req,res)=>{
    const id=req.params.id;
    req.getConnection((err,conn)=>{
        conn.query('DELETE FROM customer WHERE id=?', [id],(err, rows)=>{
            res.redirect('/');
        });
        
    });
    
};

module.exports=controller;