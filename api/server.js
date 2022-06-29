const express = require('express');
const server = express();
//const morgan = require('morgan');
//const {  } = require('./actions/actions-middlware');
server.use(express.json());
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')






//server.use(morgan('dev'));
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter)

 server.get('/', (req, res) => {
     res.status(200).json({
         status: "200 OK", 
         message: "middleware server running, you got this!",
         user:req.user
     })
     });

 

module.exports = server;

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

// server.get('/', (req,res) => {
//     res.send(`<h1>${process.env.MESSAGE}</h1>`)
// })

// const logHello = (req, res, next) => {
//     console.log("hello web 54!")
//     next();
// }

// logHello, count, gaurd, testLog