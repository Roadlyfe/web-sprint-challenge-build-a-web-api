const express = require('express');
const Actions = require('./actions-model')
const router = express.Router();
const { validateUserId, validateAction } = require('./actions-middlware')

router.get('/', (req, res, next) => {
    Actions.get().then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
})

router.get('/:id', validateUserId, (req, res, next) => {
    res.json(req.action)
})


// if (actions) {
//     res.json(actions)
// } if (!actions) {
//     return []
// }

// router.get('/:id', validateUserId, (req, res, next) => {
//   res.json(req.action)
//     // Actions.get(req.params.id)
//     //     .then(result => {
//     //         if (result == null) {
//     //             res.status(404).json({ message: 'action not found!' });
//     //             return;
//     //         }
//     //         res.json(result);
//     //     });
// });



router.post('/', validateAction, (req, res, next) => { //this needs a action_id which I don't really understand
    Actions.insert(req.body) //also maybe need a const createdAction  = ?
    .then(newAction => {
        res.status(201).json(newAction)
    })
    .catch(next)
});

// router.post('/', validateAction, (req, res, next) => {
//     Actions.insert(req.body)
//         .then(newAction => {
//             res.status(201).json(newAction)
//         })
//         .catch(next)
//     })

router.put('/:id', validateUserId, validateAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
         .then(updatedActions => {
             res.status(200).json(
                 {
                     description: updatedActions.description,
                     completed: updatedActions.completed,
                     project_id: updatedActions.project_id,
                     notes: updatedActions.notes,
                     id: updatedActions.id
                 })
         })
         .catch(next)
 })

// router.put('/actions/:id', validateUserId, validateAction, (req, res, next) => {
//     const action = req.body
//     if (action['name'] && action['description'] && action['completed']) {
//         Actions.update(req.params.id, req.body).then(result => {
//             if (result == null) {
//                 res.status(404).json({ message: 'action not found!' });
//                 return;
//             }
//             res.json(result);
//         })
//     } else {
//         res.status(400).json({ message: 'required field missing' });
//      }
  //  })
    // Actions.update(req.params, req.body)
    // .then(updated => {
    //     res.status(200).json({
    //         project_id: updated.project_id,
    //         description: updated.description,
    //         notes: updated.notes,
    //         completed: updated.completed,
    //         id: updated.id,
    //     })
    //})
    
    // const action = req.body
    // if (action['name'] && action['description'] && action['completed']) {
    //     Actions.update(req.params.id, req.body).then(result => {
    //         if (result == null) {
    //             res.status(404).json({ message: 'action not found!' });
    //             return;
    //         }
    //         res.json(result);
    //     })
    // } else {
    //     res.status(400).json({ message: 'required field missing' });
    //  }

    //  router.put('/:id', validateActionsId, validateProjectId, (req, res) => {
    //     const { project_id, description, notes } = req.body
    //     if (!project_id || !description || !notes) {
    //         res.status(400).json({ message: "Missing required fields" })
    //     } else {
    //         update(req.params.id, req.body)
    //             .then(updatedAction => {
    //                 res.status(201).json(updatedAction)
    //             })
    //             .catch(() => {
    //                 res.status(500).json({ message: 'Put not working' })
    //             })
    //     }
    // })

    // actions.update(req.params.id, req.body).then(result => {
    //     if (result == null) {
    //         res.status(404).json({ message: 'action not found!' });
    //         return;
    //     }
    //     res.json(result);
    // })
        // .catch(result => {
        //     res.status(400).json({ message: 'required field missing' });
        // });
//});

router.delete('/:id', validateUserId, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id)
        res.json(req.action)
    } catch (error) {
        next(error)
    }
});


module.exports = router;
