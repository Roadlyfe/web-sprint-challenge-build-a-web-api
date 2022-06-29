// add middlewares here related to actions
//const { OPEN_READWRITE } = require('sqlite3')
const Actions = require('./actions-model')

async function validateUserId(req, res, next) {
  try {
      const action = await Actions.get(req.params.id)
      if (!action) {
          res.status(404).json({ message: "action not found" })
      } else {
          req.action = action
          next()
      }
  } catch (error) {
      res.status(500).json({ message: "problem finding action" })
  }
}

function validateAction(req, res, next) {
  const { project_id, description, notes, completed } = req.body
  if (!project_id) {
      res.status(400).json({ message: "missing required project_id" })
  }
  if (!description || !description.trim()) {
      res.status(400).json({ message: "missing required description" })
  }
  if (!notes || !notes.trim()) {
      res.status(400).json({ message: "missing required notes" })
  }
  else {
      req.project_id = project_id
      req.description = description.trim()
      req.notes = notes.trim()
      req.completed = completed
      next()
  }
}


  //   else {
  //     req.action = action.trim()
  //   next();
  // }

  // const { id } = req.params;
  // get(id)
  //     .then(project => {
  //         if (project) {
  //             next();
  //         } else {
  //             res.status(404).json({ message: "project id is invalid" })
  //         }
  //     })
//}



module.exports = {
  validateUserId,
  validateAction,
}


 // const { action } = req.body
    // if(!action.completed || !action.trim()) {
    //   res.status(400).json({ message: "missing required name field" })
    // } else {
    //   req.action = action.trim()
    // next();
    // }
  // }


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