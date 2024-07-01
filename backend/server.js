const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(cookieParser());



// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/registration', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
app.post('/register', async (req, res) => {
  const { name, dateOfBirth, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ name, dateOfBirth, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {

          const token = jwt.sign({ email: user.email }, "jwt-secret-key", { expiresIn: "1d" })
          res.cookie("token", token);

          res.json('Login successfully')
        } else {
          res.json('Incorrect password')
        }
      })
    } else {
      res.json('Please enter valid Email')
    }
  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
});


const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json('The token was not available')
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) return res.json("Token is wrong")
      next()      
    })
  }
}

app.get('/home', verifyUser, (req , res) => {
   return res.json("Success")
})

// get data from database 
app.get('/usersdata' , async(req , res) => {

  try{
    const data = await User.find();
    res.json(data);
    // console.log(usersData);
  }catch(err){
    res.json(err)
  }
  

})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
