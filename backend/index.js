const express = require('express');
const app = express();

const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


mongoose.connect("mongodb+srv://happydays111:dummy123@cluster0.2as0t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
, {useNewUrlParser: true}) // connect to the database

mongoose.connection.once('open', function() {
    console.log("CONNECTED TO DB");
})

const CookbookSchema = new Schema({
    author: String,
    category: String,
    isbn: String,
    title: String,
    ingredients: []

})

const CookbookModel = mongoose.model("Cookbook", CookbookSchema);

app.get('/', async function(req, res) {
    const cookbooks = await CookbookModel.find();
    console.log("Cookbooks: ", cookbooks)
    res.json(cookbooks);  
//   res.send({cookbooks});

})

app.post('/post', function(req, res) {
    console.log("Req: ", req.body);

    let cookbookObj = {
        author: req.body.author,
        category: req.body.category,
        isbn: req.body.isbn,
        title: req.body.title,
        ingredients: req.body.ingredients

    }

    const cookbook = CookbookModel.create(cookbookObj);
    console.log("cookbook OBJ: ", cookbook)
    res.send({post: "Info posted"});

})

app.delete('/delete', function(req,res) {
    console.log("Req: req.body.ids", req.query.ids);
     CookbookModel.findByIdAndRemove(req.query.ids, function(err) {
        if(err) {
            res.send({message: "error"})
        } else {
            res.send({message: "success"})
        }
     })

})

app.get('/find', function(req, res) {
    console.log("REQ QUERY: ", req.query);
    CookbookModel.findById(req.query.id, function(err) {
        if (err){
            console.log(err);
            res.send({message: err})
        }
        else {
            console.log("Result: ", cookbook);
            res.send(cookbook);
        }
    })
})

app.put('/update', function(req, res) {
    console.log("ids: ", req.query.id);
    console.log("ids: ", req.body.id);
    let cookbookObj = {
        author: "modified",
        category: "modified",
        isbn: "modified",
        title: "modified",
        ingredients: "modified"
    }
    CookbookModel.findByIdAndUpdate(req.body.id, cookbookObj, function(err){
        if(err) {
            res.send({message: "error"});
        } else {
            res.send({message: "success"});
        }
    })
})

app.listen("3402", () => {
    console.log("App listening on port 3402");
})
