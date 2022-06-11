const express = require('express');
const { validateUserId, validateUser } = require('./actions-middlware')

const Actions = require('./actions-model')
const router = express.Router();

router.get('/actions',  (req, res, next) => {
    Actions.get()
    .then(actions => {
      if(actions) {
          res.json(actions)
      } if(!actions){
          return []
      }
    })
    .catch(next)
});

router.get('/actions/:id', (req, res, next) => {
    Actions.get(req.params.id)
    .then(result => {
        if(result == null) {
            res.status(404).json({ message: 'action not found!' });
            return;
        }
        
        res.json(result);
    });
  });
 
     router.delete('/actions/:id', (req, res, next) => {
      Actions.remove(req.params.id)
      .then(result => {
          if(result == null) {
              res.status(404).json({ message: 'action not found!'});
              return;
          }
          res.json(result);
      });
    });

    
    module.exports = router;

    

// router.delete('/:id', validateUserId, async (req, res) => {
//     try {
//       await Actions.remove(req.params.id)
//       res.json(req.actions)
//     }
//     catch (err) {
//       next(err)
//     }
//   });





    // Write your "actions" router here!

    // const { logHello } = require('./actions-middlware')

//     Actions.get()
//     .then(actions => {
//         if(actions>1) {res.status(200).json(users)}
//     })
//     .catch(err => console.log(err.message))
//     try {
//         const actions = await Actions.get()
//         if(actions.length>1) {
//         console.log(actions)
//         res.status(200).json(actions)
//         }
//         res.status(400).json({ message: "nope" })
//    }catch(error) {
//        console.log(error.message)
//    }

// router.get('/', logHello, (req, res) => {
//     res.status(200).json({
//         status: "200 OK", 
//         message: "middleware server running, you got this!"
//     })
//     })
