const express = require('express');
const mongoose=require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors library

const app = express();
const PORT = 5500;

const corsOptions = {
  origin: 'http://localhost:8080', // Allow requests from the Vue.js development server
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));



// Connect to MongoDB
mongoose.connect("mongodb+srv://aydinselvioglu:ym22021977@cluster0.ysvlpb7.mongodb.net/fep", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Define a schema and model for your user data
const userSchema = new mongoose.Schema({
  nameSurname: String,
  email: String,
  password: String,
  confirmedPassword: String,
  invitationCode: String
});

const User = mongoose.model('User', userSchema);



// Handle signup POST request
app.post('/signup', async (req, res) => {
  try {
    const { nameSurname, email, password, confirmedPassword,invitationCode } = req.body;
    
    const newUser = new User({ nameSurname, email, password, confirmedPassword, invitationCode});
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
