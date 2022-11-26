const express = require('express')
const app = express()
require('./config/db')
require('dotenv').config({ path: './config/.env' })
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const helmet = require('helmet')
const cors = require("cors")


app.use(helmet());
app.use(cors())
app.use(express.json());

/////Middlware de définition des headers
app.use((req, res, next) => {
res.setHeader('Cross-Origin-Resource-Policy', 'same-site');//seule les demande provenant du même site
res.setHeader('Access-Control-Allow-Origin', '*');// Accéder à notre API depuis n'importe quelle origine
res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, x-access-token');// Ajouter les headers mentionnés aux requêtes envoyées vers notre API
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');// Envoyer des requêtes avec les méthodes mentionnées
next();
})


app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})