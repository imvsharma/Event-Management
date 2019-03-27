const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const graphQLSchema = require('./graphql/schema/index');
const graphQLResolver = require('./graphql/resolvers/index');

const authMiddleware = require('./middleware/is-auth');
const app = express();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.use(bodyParser.json());
app.use(cors());
app.use(authMiddleware)


app.use('/graphql', 
        graphqlHttp({
            schema: graphQLSchema,
            rootValue: graphQLResolver,
            graphiql: true
        })
);

mongoose.connect(`mongodb://localhost:27017/${process.env.MONGO_DB}`,{ useNewUrlParser: true, useFindAndModify: false })
.then(() => {
    app.listen(5000, (req, res) => {
        console.log('Server running')
    });
}).catch(err => {
    console.log(err);
})
