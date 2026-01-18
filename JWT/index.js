const express=  require('express')
const app = express();
const jwt = require('jsonwebtoken')

const JWT_SECRET = "mysecretkey"

app.use(express.json())

let users = []

app.post('/signup', (req,res)=>{
    const username = req.body.username
    const password = req.body.password

    users.push({
        username: username,
        password:password,
    })

    res.json({
        message: "You are signed up."
    })
})


app.post('/signin', (req,res)=>{
    const username = req.body.username
    const password = req.body.password

    let foundUser = null;

    for (i=0; i<users.length; i++){
        if (users[i].username == username ){
            foundUser = users[i]
        }
        else {
            res.json({
                msg : "User not found"
            })
        }
    }
    if (foundUser){
        token = jwt.sign({
            username: username
        }, JWT_SECRET);
        foundUser.token = token
        res.json({
            Token: token
        })
    }
    console.log(users)

app.get('/me', (req,res)=>{
        let token = req.headers.token
        let decodedinformation = jwt.verify(token, JWT_SECRET) //converting the token back to un // decodedinfo now contains the object which was sent to convert
        const username = decodedinformation.username
        let foundUser = null;

        for(let i=0; i<users.length; i++){
            if (username == users[i].username){
        foundUser = users[i]
                res.json({
                    username: foundUser.username,
                    password: foundUser.password
                })
            }
            else {
                res.json({
                    msg: "invalid token"
                })
            }
        }
    })

})

app.listen(3000)