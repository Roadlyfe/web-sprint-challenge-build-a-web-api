// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const Actions = require('../actions/actions-model');
const router = express.Router();

const { validateProject, validateUserId } = require('./projects-middleware.js')

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
});

router.get('/:id', validateUserId, (req, res, next) => {
    res.json(req.project)
});

//   router.get('/projects/:id/actions', (req, res, next) => {
//     Projects.getProjectActions(req.params.id)
//     .then(result => {
//         if(result == null) {
//             res.status(404).json({ message: 'cannot find project!' });
//             return;
//         }

//         res.json(result);
//       });
//     });


router.post('/', validateProject, (req, res, next) => { //this needs a project_id which I don't really understand
    Projects.insert(req.body) //also maybe need a const newAction  = ?
        .then(newProject => {
            res.status(201).json(newProject);
        })
        .catch(next)
});

router.put('/:id', validateUserId, validateProject, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(updateProject => {
            res.status(200).json({
                description: updateProject.description,
                name: updateProject.name,
                completed: updateProject.completed,
            })
        })
        .catch(next)
})

// router.put('/projects/:id', (req, res, next) => {
//     const project = req.body
//     if (project['name'] && project['description'] && project['completed']) {
//         Projects.update(parseInt(req.params.id), req.body).then(result => {
//             if (result == null) {
//                 res.status(404).json({ message: 'project not found!' });
//                 return;
//             }
//             res.json(result);
//         })
//     } else {
//         res.status(400).json({ message: req.body });
//     }
// Projects.update(req.params.id, req.body).then(result => {
//     if (result == null) {
//         res.status(404).json({ message: 'project not found!' });
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
        await Projects.remove(req.params.id)
        res.json(req.project)
    } catch (err) {
        next(err)
    }
});



module.exports = router;
