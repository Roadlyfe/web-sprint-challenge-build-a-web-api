// add middlewares here related to actions
const Actions = require('./actions-model')

async function validateUserId(req, res, next) {
    try {
      const user = await User.getById(req.params.id)
      if(!user) {
        res.status(404).json({ message: "user not found"})
      } else {
        req.user = user
        next()
      }
    } catch (error) {
        res.status(500).json({ message: "problem finding user"})
  }
  }
 
  function validateAction(req, res, next) {
    // DO YOUR MAGIC
    const { action } = req.body
    if(!action || !action.trim()) {
      res.status(400).json({ message: "missing required name field" })
    } else {
      req.action = action.trim()
    next();
    }
  }

module.exports = {
    validateUserId,
    validateAction,
}





// const logHello = (req, res, next) => {
//     console.log("hello web 54!")
//     next();
// }

// function count(req, res, next) {
//     console.log(2)
// //    const user = true
//    req.user = true
//     next()
// }

// const testLog = (req, res, next) => {
//     next();
// }

// //this is a gatekeeper
// const gaurd = (req, res, next) => {
//   console.log(req.user)
//     if(req.user)return  next()
//     if(!req.user) return res.status(401).json({ message: "nope, you can't" })
// }