import express from 'express';
import { engine } from 'express-handlebars';
import homeController from './controllers/homeController.js';
import movieController from './controllers/movieController.js';
import routes from './routes.js';
 

const app = express();

app.engine('hbs', engine(
    { extname: 'hbs' }
));
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(express.static('./src/public'));

app.use(express.urlencoded( { extended: false })); //to be able in req.body to read form values in post request

app.use(routes);


app.listen(5000, () => console.log('Server is running at http://localhost:5000...'));