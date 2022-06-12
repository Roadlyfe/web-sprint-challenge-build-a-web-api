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
  
  router.get('/projects/:id/actions', (req, res, next) => {
    Projects.getProjectActions(req.params.id)
    .then(result => {
        if(result == null) {
            res.status(404).json({ message: 'cannot find project!' });
            return;
        }
        
        res.json(result);
      });
    });

 
router.post('/projects', (req, res) => { //this needs a project_id which I don't really understand
    Projects.insert(req.body) //also maybe need a const newAction  = ?
        .then(result => {
            res.status(201).json(result);
        })
        .catch(result => {
            res.status(400).json({ message: 'required field missing' });
        });
});



router.put('/projects/:id', (req, res, next) => {
    const project = req.body
    if (project['name'] && project['description'] && project['completed']) {
        Projects.update(req.params.id, req.body).then(result => {
            if (result == null) {
                res.status(404).json({ message: 'project not found!' });
                return;
            }
            res.json(result);
        })
    } else {
        res.status(400).json({ message: 'required field missing' });
     }
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
});

  router.delete('/projects/:id', (req, res, next) => {
      Projects.get(req.params.id)
      .then(result => {
          if (result == null) {
            res.status(404).json({ message: 'project not found!'});
            return;
          } else {
            Projects.remove(req.params.id)
            .then(result => {
                    if(result == undefined) {
                        res.status(404).json({ message: 'project not found!'});
                        return;
                    }
                    res.json(result);
             });
          }
      })
    
  });


    
    module.exports = router;
