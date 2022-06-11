// Write your "projects" router here!
const express = require('express');
// const { logHello } = require('./projects-middlware')

const Projects = require('./projects-model')
const router = express.Router();

router.get('/projects', (req, res, next) => {
    Projects.get()
    .then(projects => {
      if(projects) {
          res.json(projects)
      } if(!projects){
          return []
      }
    })
    .catch(next)
});

router.get('/projects/:id', (req, res, next) => {
  Projects.get(req.params.id)
  .then(result => {
      if(result == null) {
          res.status(404).json({ message: 'cannot find project!' });
          return;
      }
      
      res.json(result);
    });
  });
    
// router.delete('/:id', async (req, res, next) => {
//     try {
//       await projects.remove(req.params.id)
//       res.json(req.action)
//     }
//     catch (err) {
//       next(err)
//     }
//   });
    
    module.exports = router;
