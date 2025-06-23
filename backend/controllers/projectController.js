const Project = require('../models/Project');

// GET all projects (public)
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

// POST new project
exports.createProject = async (req, res) => {
  try {
    const { title, description, liveLink, githubLink, techStack } = req.body;

    if (!title || !description || !techStack || !Array.isArray(techStack)) {
      return res.status(400).json({ message: 'Missing or invalid fields' });
    }

    const newProject = new Project({ title, description, liveLink, githubLink, techStack });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create project', error: err.message });
  }
};

// PUT update project
exports.updateProject = async (req, res) => {
  try {
    const { title, description, liveLink, githubLink, techStack } = req.body;

    if (!title || !description || !techStack || !Array.isArray(techStack)) {
      return res.status(400).json({ message: 'Missing or invalid fields' });
    }

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, liveLink, githubLink, techStack },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Project not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update project', error: err.message });
  }
};

// DELETE project
exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete project' });
  }
};
