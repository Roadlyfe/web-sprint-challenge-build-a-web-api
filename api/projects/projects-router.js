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
    
router.delete('/:id', async (req, res) => {
    try {
      await projects.remove(req.params.id)
      res.json(req.action)
    }
    catch (err) {
      next(err)
    }
  });
    
    module.exports = router;
