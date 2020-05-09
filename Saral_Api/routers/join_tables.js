const fs = require('fs');   
const knex= require('../middleware/connection')

module.exports=(join_tables)=>{
    join_tables
        .get('/saral/:id',(req,res)=>{
            id= req.params.id
            
            knex.select("*").from("courses").where("id",id).then((data)=>{
                // console.log(data)
                if (data.length>0){
                    knex.select('*').from('exercise').where('id',id).then((exer)=>{   
                    
                        knex.select('*').from('chapter').where('id',id).then((chap)=>{
                            if (exer.length>1){   
                                exar_list=[]
                                for (d of exer){
                                    if (chap.length>=1){
                                        console.log(chap)
                                        list=[]
                                        for (ch of chap){
                                            if (ch.course_id==d.course_id){
                                                list.push(ch)  
                                                }
                                            }
                                        d['chapter']=list
                                        exar_list.push(d)
                                    }else{
                                        exar_list.push(d)
                                    }
                                    // console.log(exar_list)
                                // console.log(exar_list)
                                }
                                
                                data[0].exercise=exar_list
                                res.send(data)
                            }else{
                                res.send(data)
                            }
                        })

                    })
                }else{
                    res.send('data not available')
                }
            })
        })
    }
     
               