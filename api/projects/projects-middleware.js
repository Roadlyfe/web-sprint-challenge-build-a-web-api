// add middlewares here related to projects
const Projects = require('./projects-model')

// const { OPEN_READWRITE } = require('sqlite3')
//const Actions = require('./actions-model')

async function validateUserId(req, res, next) {
  try {
    const project = await Projects.get(req.params.id)
    if (!project) {
      res.status(404).json({ message: "project not found" })
    } else {
      req.project = project
      next()
    }
  } catch (error) {
    res.status(500).json({ message: "problem finding project" });
  }
}

function validateProject(req, res, next) {
  const { name, description, completed } = req.body
  if (name == null || description == null || completed == null) {
    res.status(400).json({ message: "missing required name" })
  } else {
    req.description = description.trim()
    req.name = name.trim()
    req.completed = true
    next()
  }
}

module.exports = {
  validateUserId,
  validateProject
}
