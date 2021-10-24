const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
require('./config/database').connect();
require('dotenv').config();

const User = require('./models/user');
const auth = require('./models/auth');

app.use(express.json());

app.post('/register',async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
          }
        
          const userfound = await User.findOne({email});

          if(userfound)
          {
              return res.status(409).send("User Already Registered");
          }

          encryptedPassword = await bcrypt.hash(password, 10);

          const user = await User.create({
              name,
              email,
              encryptedPassword
          });

          const token = jwt.sign(
              {user_id: user._id,email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        user.token = token;

        res.send(user);
      
    }
    catch(err){
        console.log(err);
    }
});