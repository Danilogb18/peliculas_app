import Router from 'express';
import path, { dirname } from 'path';
import {db} from './database_config.js'

export const router = Router()

const viewsPath = path.join(process.cwd(), '/src/views');

router.set('views', viewsPath);


router.get('/watch', (req, res) => {
    return res.render('main')
})

router.get('/movies', async (req, res) => {
    const [movies] = (await db.query('SELECT * FROM movies'))
    return res.render('movies', {
        movies
    })
})


router.get('*', (req, res) => {
    res.status(404).redirect('/movies')
})
