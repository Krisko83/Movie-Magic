import express from 'express';
import { engine } from 'express-handlebars';
 

const app = express();

app.engine('hbs', engine(
    { extname: 'hbs'}
));
app.set('view engine', 'hbs');
app.set('views', './src/views')

app.use(express.static('./src/public'));

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/search', (req, res) => {
    res.render('search')
})


app.get('/create', (req, res) => {
    res.render('create')
})


app.get('*url', (req, res) => {
    res.render('404')
})
app.listen(5000, () => console.log('Server is running at http://localhost:5000...'));