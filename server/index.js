const Koa = require ( 'koa' );
const app = new Koa();
const cors = require('@koa/cors');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const router = require('./router');

const PORT = 3000;

app.use(cors())
   .use(bodyParser())
   .use(router.routes())
   .use(router.allowedMethods())
   .use(serve('./assets'));

app.listen(PORT, () => {
    console.log(`Zeitsprung server running at http://localhost:${PORT}`); 
});