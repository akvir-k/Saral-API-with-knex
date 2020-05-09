const express= require('express');
const app= express();
app.use(express.json());
const router= express.Router()

app.use('/',router);
require('./routers/course')(router);
require('./routers/exercise')(router);
require('./routers/chapter')(router);
require('./routers/create')(router);
require("./routers/Update")(router);
require('./routers/join_tables')(router);
require('./routers/saral')(router);

app.listen(3000, (req,res)=>{
    console.log('server started.... with 3000 port');
});
