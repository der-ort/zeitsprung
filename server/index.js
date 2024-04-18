const Koa = require ( 'koa' );
const app = new Koa();

const bodyParser = require('koa-bodyparser');
const router = require('./router');

const PORT = 3000;

app.use(bodyParser());
app.use(router.routes());

app.listen(PORT, () => {
    console.log(`Zeitsprung server running at http://localhost:${PORT}`); 
});