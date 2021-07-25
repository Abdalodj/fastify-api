const fastify = require('fastify');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/noteRoutes');
const contentRangeHook = require('./hooks/contentRangeHook');
const cred = require('../credentials');

const app = fastify();

mongoose.connect("mongodb+srv://"+cred.credentials.uName+":"+cred.credentials.uPassword+"@cluster0.ystg4.mongodb.net/todo?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connection successful !'))
    .catch(() => console.log("MongoDB connection failed !")
);

app.addHook('preHandler', contentRangeHook);
noteRoutes(app);

app.listen(5000, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server running on ${address}`);
});