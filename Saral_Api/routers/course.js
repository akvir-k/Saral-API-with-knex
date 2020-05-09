const fs = require('fs');   
const knex= require('../knex')
var User= new knex();

module.exports=(course)=>{
    course
        .get('/courses',(req,res)=>{
            User.allfind(function(result){
                if (result){
                    res.send(result)
                    console.log('Full course available')
                }else{
                    res.send('No course available')
                }
            });
        })
        .get('/courses/:id',(req,res)=>{
            var id= req.params.id;
            User.select(id,(result)=>{
                if (result.length>=1){
                res.send(result)
                console.log(result)
            }else{
                res.send('no data available of this id')
                }
            })
        })
        


}