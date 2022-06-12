const express = require('express');
const { validateUserId, validateUser } = require('./actions-middlware')

const Actions = require('./actions-model')
const router = express.Router();

router.get('/actions', (req, res, next) => {
    Actions.get()
        .then(actions => {
            if (actions) {
                res.json(actions)
            } if (!actions) {
                return []
            }
        })
        .catch(next)
});

router.get('/actions/:id', (req, res, next) => {
    Actions.get(req.params.id)
        .then(result => {
            if (result == null) {
                res.status(404).json({ message: 'action not found!' });
                return;
            }
            res.json(result);
        });
});



router.post('/actions', (req, res) => { //this needs a project_id which I don't really understand
    Actions.insert(req.body) //also maybe need a const newAction  = ?
        .then(result => {
            res.status(201).json(result);
        })
        .catch(result => {
            res.status(400).json({ message: 'required field missing' });
        });
});



router.put('/api/actions/:id', (req, res) => {
    Actions.update(req.params.id, req.body).then(result => {
        if (result == null) {
            res.status(404).json({ message: 'action not found!' });
            return;
        }
        res.json(result);
    })
        .catch(result => {
            res.status(400).json({ message: 'required field missing' });
        });
});

router.delete('/actions/:id', (req, res, next) => {
    Actions.remove(req.params.id)
        .then(result => {
            if (result == null) {
                res.status(404).json({ message: 'action not found!' });
                return;
            }
            res.json(result);
        });
});


module.exports = router;
