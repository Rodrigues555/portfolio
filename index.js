const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/portfolio', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the Contact schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// API endpoint to save contact details
app.post('/api/contact', (req, res) => {
  const newContact = new Contact(req.body);
  newContact.save((err) => {
    if (err) {
      res.status(500).send('Error saving contact details.');
    } else {
      res.status(200).send('Contact details saved successfully.');
    }
  });
});

// API endpoint to get contact details
app.get('/api/contacts', (req, res) => {
  Contact.find({}, (err, contacts) => {
    if (err) {
      res.status(500).send('Error retrieving contact details.');
    } else {
      res.status(200).json(contacts);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});