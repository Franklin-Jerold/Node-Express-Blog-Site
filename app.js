const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

mongoose.set('strictQuery', false);
const dbURI = 'mongodb://0.0.0.0:27017/nodejs';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


app.set('view engine', 'ejs');



app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));




app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.use('/blogs', blogRoutes)

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});