const express = require("express");
const app = express();
const expressSesion = require("express-session");

// Practtical use case of express sessions // Tracking session
// We use some compatible store in production level for storing sessions
// In development phase we use temporary javascript based memory store


// resave forces the session to be save back to the session store // saveUninitialized a session that uninitialized to be saved to the store
let sessionOption = { 
    secret: "mysecret",
    resave: false,
    saveUninitialized: true
}

// Use session as a Middleware
app.use(expressSesion(sessionOption)); 

app.get("/test", (req, res)=>{
    res.send("Test successfull!")
});

app.get("/register", (req, res)=>{
    let {name} = req.query;
    req.session.name = name;
    console.log(req.session.name);  // Will print the name
    res.redirect("/hello");  // Redirect to /hello
});

// We can store information in a single session
app.get("/hello", (req, res)=>{
    res.send(`hello, ${req.session.name}`);
})

app.get("/reqcount", (req, res)=>{
    // req.session.count = 1;  // For tracking x
    if(req.session.count){
        req.session.count++;
    }else {
        req.session.count = 1;
    }
    res.send(`You sent a request ${req.session.count} time`);
    
})

app.listen(8080, ()=>{
    console.log("server is running!");
})