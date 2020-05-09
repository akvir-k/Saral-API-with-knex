const knex= require('../middleware/connection')

module.exports=(saral)=>{
    saral
        .get('/saral',(req,res)=>{

            knex.select('*').from('courses').then((course)=>{
                
                knex.select('*').from('exercise').then((exer)=>{
                    knex.select('*').from('chapter').then((chap)=>{

                        co_list=[]
                        for (co of course){

                            exer_list=[]
                            for (ex of exer){
                                if(ex.id == co.id){
                                    course_list=[]
                                    for (ch of chap){
                                        if (ch.course_id == ex.course_id && ch.id==ex.id){
                                            course_list.push(ch)        
                                    }
                                }
                                ex.chapter=course_list
                                exer_list.push(ex)
                                
                                }
                                                              
                            }
                            co.exercise = exer_list
                            co_list.push(co)       

                        }
                        res.send(co_list)
                    })
                })
            })
        })
}