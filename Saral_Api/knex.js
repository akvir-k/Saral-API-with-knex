const knex=require('./middleware/connection')

function user(){};
user.prototype= {

create: (body, callback)=>{ 
    knex.schema.hasTable('courses')
    .then((exits)=>{
        if (exits){
            console.log('already created');
        }else{
            knex.schema.createTable('courses',(table)=>{
                table.increments('id').primary();
                table.string('name');
                table.string('description');
            })
            
            .then(()=> console.log('table created sucessfully'))
            .catch((err)=>{console.log(err); throw err})
            
            knex('courses').insert(body)
            .then((result)=> callback(result))
            .catch((err)=> {console.log(err); throw err})
            
        }

    })
    
},


allfind:(callback)=>{
    knex.from('courses').select('*')
    .then((result)=> callback(result))
    .catch((err)=>{
        console.log(err);
        throw err;
    })
},



select:(id,callback)=>{
    knex.from('courses').select('*').where('id','=',id)
    .then((result)=> callback(result))
    .catch((err)=>{console.log(err); throw err})
    
},


exercise_create:(callback)=>{

    knex.schema.hasTable('exercise')
    .then((exists)=>{
        if (exists){
        console.log('already created')
    }else{
        knex.schema.createTable('exercise',(table)=>{
            table.integer('id').unsigned().references('id').inTable('courses');
            table.integer('course_id');
            table.string('name');
            table.string('description');
        })
        .then((result)=>callback(result))  
        .catch((err)=>{console.log(err); throw err})       
        }
     
    })
},
    
exercise_insert:(id,data,callback)=>{
    knex.from('exercise').select('id').where('id','=',id)
        .then((exists)=>{
            if (exists.length>=1){
                callback(1)
            }else
            {
                knex('exercise').insert(data)
                .then((result)=>callback(result))
                .catch((err)=>{console.log(err); throw err;})
            }
    }) 
}, 


fullexercise:(callback)=>{
    knex.select('*').from('exercise')
        .then((result)=>{
            callback(result)
    }).catch((err)=>{console.log(err); throw err})
},

exercise_by_id:(id,callback)=>{
    knex.select('*').from('exercise').where({'id':id})
    .then((result)=>callback(result))
    .catch((err)=>{console.log(err); throw err})
},


find_course_by_id:(id,courseid,callback)=>{

    knex.from('exercise').select('*').where({'id':id,'course_id':courseid})
    .then((result)=>callback(result))
    .catch((err)=>{console.log(err); throw err})
},  

chapter_create: (callback)=>{
    knex.schema.hasTable('chapter')
    .then((exists)=>{
        if (exists){
            callback(exists)
        }else{
            knex.schema.createTable('chapter',(table)=>{
                table.integer('id').unsigned().references('id').inTable('courses');
                table.integer('course_id');
                table.string('username');
                table.string('usersubmissions');
            })
            .then((result)=>{
                callback(result)
            })
            .catch((err)=>{console.log(err); throw err})
        }
    })
},


chapter_insert:(id, data,callback)=>{
    knex.from('chapter').select('id').where('id','=',id)
    .then((exists)=>{
        if (exists.length>=1){
            callback(1)
        }else{
            
            knex('chapter').insert(data)
            .then((result)=> callback(result))
            .catch((err)=>{console.log(err); throw err})
        }
    })
},

fullchapter:(callback)=>{
    knex.from('chapter').select('*').then((result)=>callback(result))
    .catch((err)=>{console.log(err); throw err})
},

chapter_by_id:(id,courseid, user,callback)=>{
    
    console.log(id,courseid,user)  
    knex.from('chapter').select('*').where({'id':id,'course_id':courseid,'username':user})
    .then((result)=>callback(result))
    .catch((err)=>{console.log(err); throw err})
},

update_course: (body,callback)=>{
    knex('courses').insert(body).then((result)=>callback(result))
    .catch((err)=>{console.log(err); throw err})
}

};

module.exports= user;