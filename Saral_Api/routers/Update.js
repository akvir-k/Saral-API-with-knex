const fs = require('fs');   
const knex= require('../knex')
var User= new knex();

module.exports=(update)=>{
    update
        .put('/update/course',(req,res)=>{
            var body= req.body;
            User.update_course(body,(result)=>{
                if (result){
                    res.send("update successfully")
                }else{
                    res.send('Not update')
                }
            })

        })

        
        
}