const fs = require('fs');   
const knex= require('../knex')
var User= new knex();

module.exports=(chapter)=>{
    chapter
        .post('/courses/:id/exercise/chapter/insert',(req,res)=>{
            var id = req.params.id;
            var data= JSON.parse(fs.readFileSync('/home/aman/Desktop/Saral_Api/file.txt'))

            data_list=[]
            for (value of data){
                if (id==value.id){
                for (list_value of value.submission){
                        for (chapter of list_value.usersummision){

                            dict={}
                            dict.id= chapter.id;
                            dict.course_id=chapter.courseid;
                            dict.username=chapter.username;
                            dict.usersubmissions=chapter.usersubmissions[0];
                            
                            data_list.push(dict) 
                    }
                }
            }
            }
            User.chapter_insert(id,data_list,(result)=>{
                if (result==0){
                    res.send('data insert successfully')
                }else{
                    res.send('data already inserted')
                }
            })
        })

        .get('/courses/exercise/chapter',(req,res)=>{

            User.fullchapter((result)=>{
                if (result){
                    res.send(result)
                }else{
                    res.send('chapter data not found')
                }
            })
        })

        .get('/courses/:id/exercise/:course_id/chapter/:username',(req,res)=>{
            
            var id=req.params.id
            var course_id= req.params.course_id
            var user= req.params.username

            User.chapter_by_id(id,course_id,user,(result)=>{
                if (result){
                    res.send(result)
                }else{
                    res.send('data not found')
                }
            })
        })
}