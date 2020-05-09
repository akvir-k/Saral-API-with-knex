const fs = require('fs');
const knex= require('../knex')
var User= new knex();

module.exports=(create_router)=>{

    create_router
        .post('/courese_create/insert',(req,res)=>{
            var data= JSON.parse(fs.readFileSync('/home/aman/Desktop/Saral_Api/file.txt'));
            dict_list=[]
            for (value of data){
                dict={}
                dict.id= value.id;
                dict.name= value.name;
                dict.description=value.description;
    
                dict_list.push(dict)
            }
            // console.log(dict_list)
            User.create(dict_list,function(result){
                if (result){
                    res.send('created')
                }else{
                    res.send('not created')
                }
            })
        })
    
        .post('/exercise/create',(req,res)=>{
            User.exercise_create((result)=>{
                if (result){
                    res.send('Exercise table create successfully')
                }else{
                    res.send('Exercise table not created')
                }
            })
        })
        
        .post('/exercise/chapter/create',(req,res)=>{
            User.chapter_create((result)=>{
                if (result){
                    res.send('chapter table create successfully')
                }else{
                    res.send('chapter table not created')
                }
            })
        })

}