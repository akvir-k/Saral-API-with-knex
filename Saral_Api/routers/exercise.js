const fs = require('fs');   
const knex= require('../knex')
var User= new knex();

module.exports=(exercise)=>{
    exercise
        .post('/courses/:id/exercise/insert',(req,res)=>{
            var id= req.params.id;
            var data= JSON.parse(fs.readFileSync('/home/aman/Desktop/Saral_Api/file.txt'))
            
            data_list=[]
            for (value of data){
                if (value.id==id){
                    for (list of value.submission){
                        dict={}
                        dict.id= list.id;
                        dict.course_id=list.courseid;
                        dict.name=list.name;
                        dict.description= list.description;
                        
                        data_list.push(dict);     
                    }

                    
                }    
            }
            console.log(data_list)
            User.exercise_insert(id,data_list,(result)=>{
                if (result==0)
                {
                    res.send('inserted data successfully');
                }else{
                    res.send('already inserted data')
                }
            })
        })

        .get('/exercise',(req,res)=>{
            User.fullexercise((result)=>{
                if (result){
                    res.send(result)
                }else{
                    res.send('Not available exercise')
                }
            })
        })
        
        .get('/courses/:id/exercise/:course_id',(req,res)=>{
            var id= req.params.id;
            var course_id= req.params.course_id;

            User.find_course_by_id(id,course_id,(result)=>{
                // console.log(result)
                
                if (result){
                    res.send(result)
                }else{
                    res.send("Not course data available")
                }
            })
        })

        .get('/courses/:id/exercise',(req,res)=>{
            var id= req.params.id

            User.exercise_by_id(id,(result)=>{
                if (result){
                    res.send(result)
                }else{
                    res.send('No data available')
                }
            })
        })
}