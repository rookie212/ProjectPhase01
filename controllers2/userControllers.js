const express = require("express");
const app = express();

const clientSessions = require("client-sessions");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const User = require('../models2/user');
// const user = require("../models2/user");


// app.use(clientSessions({
//     cookieName: "session",
//     secret:"week12presentation",
//     duration: 3*60*1000, //3 minutes
//     activeDuration: 2*60*1000 //2 minutes for after request

// }));


const welcomePage = async function (req,res){
    res.render("login", {
        title:"Welcome to the restaurant worlds"
    })
}

const registerPage = async function (req,res){
    res.render("register", {
        title:"Create a new account"
    })
}


async function addNewUser(req, res) {
    let uname = req.body.username;
    let email = req.body.email;
    let pwd = req.body.password;
    let pwd2 = req.body.password2;
    let ag = req.body.age;

    if (!email || !pwd || !ag > 18 ||pwd !=pwd2) {
        return res.status(400).render("register",{ 'title': 'email and password is required, and be oler than 18 or passwords are not matching' });
    }
     
    try {
        console.log("adding user")

        

        const alreadyMember = await User.findOne({email})
            if (alreadyMember)
                return res.render("login", {title: "This email is already registered"});
              
        cryptpwd = await bcrypt.hash(pwd, 3);
        const result = await User.create({

            
            username: req.body.username,
            email: req.body.email,
            password: cryptpwd,
            age: req.body.age
        });


        res.status(201).render("insert",
    
        // res.status(201).send(result);

        // })

        //token // cookiee //bcrypt
        //const jwToken = jwt.sign(

        //)
        // {user:req.session.user,
        {title: `welcome to the club you are at restaurant database`}
        );

    } catch (err) {
        console.error(err);
    }
}

const tryingLogin = async function(req, res) {

    const loginemail = req.body.email
    const loginpassword = req.body.password
    try{
    if (!loginemail || !loginpassword) {
        return res.status(400).render("login",{'title': 'Email and password required' });
    }

    const checkEmails = await User.findOne({loginemail}).exec();

        if (!checkEmails) {
            return res.status(204).render("register",
            { "title": "You are not a member please register" });
        }

        if(checkEmails && await bcrypt.compare(loginpassword, cryptpwd)){
            const checkPasswords = await User.findOne({loginemail, 
                loginpassword}).exec();

                if(!checkPasswords){
                    return res.status(204).render("login",
                    { "title": "Your password is wrong" });
                }
                // const sessionUser = {email: req.body.email, password: req.body.password}

                // req.session.sessionUser = {
                //     email : loginmail,
                //     password : loginpassword
                // };
                res.status(201).render("insert",
                {
                    title: "welcome to the club"});
        }
    }catch (err) {
    console.error(err);
    }
}

const forgotMyPassword = async function(req, res) {
    return res.status(200).render("register",
    { "title": "We forgot too create new one ;)" });
}

// function ensureLogin(req, res, next){
//     if (!req.session.user){
//         res.render("login");
//     }else{
//         next();
//     }
//     };


module.exports = {
    welcomePage,
    registerPage,
    addNewUser,
    tryingLogin,
    forgotMyPassword
};