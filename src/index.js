import "dotenv/config";
import express from 'express';
import { engine } from 'express-handlebars';
import routes from './routes.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import cookieParser from "cookie-parser";
import * as helpers from './views/helpers'

const app = express();

app.engine('hbs', engine({
    extname: 'hbs',
    helpers
}
));
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(express.static('./src/public'));

app.use(express.urlencoded({ extended: false })); //to be able in req.body to read form values in post request

app.use(cookieParser());

app.use(authMiddleware);

app.use(routes);


app.listen(5000, () => console.log('Server is running at http://localhost:5000...'));