
const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");


const { tokenAuth, sliceToken } = require("./utils");
const { createUser, getUserByUsername, authenticate, getUserByToken } = require("../db/users");
const { createCart } = require("../db");



router.get('/health', async (req, res, next) => {
    res.send({ message: "Healthy Users Route." })
  });

router.post("/register", async (req, res, next) => {
    
    const {username, password} = req.body
    console.log(req.body)


    try{
        
        
        const user = await getUserByUsername({username})
        
        if (user){
            res.send({
                error: "Username Taken",
                message: `User ${username} is already taken.`,
                name: "Username Taken"
            })
        }
        else if (password.length<8){
            res.send({
                error: "Password Too Short!",
                message: "Password Too Short!",
                name: "Password Too Short!"
            })
        } 
       
          const newUser = await createUser({username, password})
          await createCart(newUser.id)
          const token = jwt.sign({id: newUser.id, username: newUser.username}, process.env.JWT_SECRET)
          res.send({
            newUser,
            message: "Username has been registered succesfully",
            token: token,
            user: {
              id: newUser.id,
              username: newUser.username
          }
          })
          
        
      
    } catch (error) {
      console.error(error);
    }
});

router.post('/login', async(req, res, next) => {
  const {username, password} = req.body;
  
  try {
    const {username, password} = req.body;
    const token = await authenticate({username, password});
    const user = await getUserByToken(token)
    res.send({ 
      message: "You're logged in!",
      token: token,
      user
    });
  }
  catch(ex){
    console.log(ex);
    next(ex);
  }

});

router.get('/me', tokenAuth, async (req, res, next) => {

  try{
      res.send(await getUserByToken(req.headers.authorization.slice('Bearer '.length))); 
   } catch (error) {
     next(error);
   }
   
   })
   
   module.exports = router
