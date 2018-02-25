const { mongoose } = require('./db/mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const { Parent } = require('./models/parent');
const { Post } = require('./models/post');

const app = express(); //App is now an instance of our express server
const PORT = process.env.PORT || 3000;

//Body Parser it parses the body of our clients requires
//Everytime our client sends some sor of information to our server
//It'll transform it into JSON for our db
app.use(bodyParser.json());
//This middleware allows our form data to be used in our server
app.use(bodyParser.urlencoded({ extended: true }));

//lets make a simple get request to get some sort of response from our server
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/parent', (req, res) => {
  //req.body is = theJSON body information from client
  //req.body comes from bodyParser middleware
  const parent = new Parent(req.body);
  parent
    .save()
    .then(parent => {
      res.send(parent);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.get('/parent', (req, res) => {
  Parent.find({})
    .then(parents => {
      res.send(parents);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.get('/parent/:id', (req, res) => {
  Parent.findById({
    _id: req.params.id
  })
    .then(parent => {
      res.send(parent);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.patch('/parent/:id', (req, res) => {
  Parent.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  )
    .then(parent => {
      res.status(200).send(parent);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

//Update the post field on the parent document

app.patch('/parent/post/:id', (req, res) => {
  let id = req.params.id;
  Parent.findByIdAndUpdate({ _id: id }, { $push: { posts: req.body.posts } })
    .then(parent => {
      res.status(200).send('Successfully updated');
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

//Update the post and remove one
app.patch('/parent/posts/remove/:id', (req, res) => {
  let id = req.params.id;
  Parent.findByIdAndUpdate({ _id: id }, { $pull: { posts: req.body.posts } })
    .then(parent => {
      res.status(200).send('Successfully removed');
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.delete('/parent/:id', (req, res) => {
  Parent.findById({ _id: req.params.id }).then(parent => {
    if (!parent) {
      return res.status(404).send('No parent with that ID found');
    } else {
      Parent.findOneAndRemove({ _id: req.params.id })
        .then(() => {
          res.status(200).send(`'Successfuly deleted ${req.params.id}'`);
        })
        .catch(err => {
          res.status(400).send(err);
        });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
