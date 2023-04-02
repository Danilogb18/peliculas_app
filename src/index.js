import express from 'express';
import {router} from './routes/routes.js'
import path, { dirname } from 'path';

const app = express();
const publicDir = path.join(process.cwd(), '/src/public');

app.use(express.text())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.set('public', publicDir)
app.use(express.static(app.get('public')))

app.set('view engine', 'ejs');

app.use(router)



app.listen(4000);

