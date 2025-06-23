import { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

interface Project {
  _id: string;
  title: string;
  description: string;
  liveLink?: string;
  githubLink?: string;
  techStack: string[];
}

interface NewProjectInput {
  title: string;
  description: string;
  liveLink: string;
  githubLink: string;
  techStack: string; // comma-separated for input
}

interface Skill {
  _id: string;
  name: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newProject, setNewProject] = useState<NewProjectInput>({
    title: '', description: '', liveLink: '', githubLink: '', techStack: ''
  });
  const [newSkill, setNewSkill] = useState('');
  const [tweetLoading, setTweetLoading] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [editProjectData, setEditProjectData] = useState<NewProjectInput>({
    title: '', description: '', liveLink: '', githubLink: '', techStack: ''
  });
  const [editSkillName, setEditSkillName] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/auth/check');
        if (!res.data.isAuthenticated) {
          navigate('/akshu-secret-login');
        } else {
          fetchData();
        }
      } catch {
        navigate('/akshu-secret-login');
      }
    };
    checkAuth();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [projectsRes, skillsRes] = await Promise.all([
        axios.get('/projects'),
        axios.get('/skills'),
      ]);
      setProjects(projectsRes.data);
      setSkills(skillsRes.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleLogout = async () => {
    await axios.post('/auth/logout');
    navigate('/');
  };

  const handleAddProject = async () => {
    try {
      await axios.post('/projects', {
        ...newProject,
        techStack: newProject.techStack.split(',').map(s => s.trim()).filter(Boolean),
      });
      fetchData();
      setNewProject({ title: '', description: '', liveLink: '', githubLink: '', techStack: '' });
    } catch (err) {
      console.error("❌ Add project failed", err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    await axios.delete(`/projects/${id}`);
    fetchData();
  };

  const handleAddSkill = async () => {
    await axios.post('/skills', { name: newSkill });
    fetchData();
    setNewSkill('');
  };

  const handleDeleteSkill = async (id: string) => {
    await axios.delete(`/skills/${id}`);
    fetchData();
  };

  const fetchLatestTweets = async () => {
    try {
      setTweetLoading(true);
      const res = await axios.post('/tweets/fetch-latest');
      alert(res.data.message);
    } catch (error) {
      alert("Failed to fetch tweets");
    } finally {
      setTweetLoading(false);
    }
  };

  const startEditingProject = (project: Project) => {
    setEditingProjectId(project._id);
    setEditProjectData({
      title: project.title,
      description: project.description,
      liveLink: project.liveLink || '',
      githubLink: project.githubLink || '',
      techStack: project.techStack.join(', ')
    });
  };

  const saveProjectChanges = async () => {
    if (!editingProjectId) return;
    await axios.put(`/projects/${editingProjectId}`, {
      ...editProjectData,
      techStack: editProjectData.techStack.split(',').map(s => s.trim()).filter(Boolean),
    });
    setEditingProjectId(null);
    fetchData();
  };

  const startEditingSkill = (skill: Skill) => {
    setEditingSkillId(skill._id);
    setEditSkillName(skill.name);
  };

  const saveSkillChanges = async () => {
    if (!editingSkillId) return;
    await axios.put(`/skills/${editingSkillId}`, { name: editSkillName });
    setEditingSkillId(null);
    fetchData();
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    isEdit = false
  ) => {
    const { placeholder, value } = e.target;
    const key = placeholder.toLowerCase().replace(/ /g, '') as keyof NewProjectInput;

    if (isEdit) {
      setEditProjectData(prev => ({ ...prev, [key]: value }));
    } else {
      setNewProject(prev => ({ ...prev, [key]: value }));
    }
  };

  if (loading) return <div className="text-white p-6">Authenticating...</div>;

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white px-4 md:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold text-orange-400">🛠️ Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition"
        >
          Logout
        </button>
      </div>

      {/* Tweet Button */}
      <div className="mb-10">
        <button
          onClick={fetchLatestTweets}
          disabled={tweetLoading}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition"
        >
          {tweetLoading ? 'Fetching Tweets...' : '📥 Fetch Latest Tweets'}
        </button>
      </div>

      {/* Add Project */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-orange-300">➕ Add Project</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {['Title', 'Description', 'Live Link', 'GitHub Link', 'Tech Stack'].map((label, idx) => (
            <input
              key={idx}
              placeholder={label}
              value={newProject[label.toLowerCase().replace(/ /g, '') as keyof NewProjectInput]}
              onChange={(e) => handleInputChange(e, false)}
              className="bg-gray-900 border border-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          ))}
        </div>
        <button onClick={handleAddProject} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium transition">Add Project</button>
      </section>

      {/* Project List */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-orange-300">📦 Projects</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project._id} className="bg-gray-900 border border-gray-700 p-4 rounded-md space-y-3 shadow-lg">
              {editingProjectId === project._id ? (
                <>
                  {['Title', 'Description', 'Live Link', 'GitHub Link', 'Tech Stack'].map((label, i) => (
                    <input
                      key={i}
                      className="w-full bg-gray-800 p-2 rounded-md border border-gray-600"
                      placeholder={label}
                      value={editProjectData[label.toLowerCase().replace(/ /g, '') as keyof NewProjectInput]}
                      onChange={(e) => handleInputChange(e, true)}
                    />
                  ))}
                  <button onClick={saveProjectChanges} className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-sm mt-2 transition">Save</button>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-orange-400">{project.title}</h3>
                  <p className="text-sm text-gray-300">{project.description}</p>
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-blue-400 underline text-sm">
                      Live Link
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-blue-400 underline text-sm block">
                      GitHub
                    </a>
                  )}
                  <p className="text-sm text-gray-400">Tech Stack: {project.techStack?.join(', ')}</p>
                  <div className="flex gap-3 mt-2">
                    <button onClick={() => startEditingProject(project)} className="text-yellow-400 hover:underline text-sm">Edit</button>
                    <button onClick={() => handleDeleteProject(project._id)} className="text-red-400 hover:underline text-sm">Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Add Skill */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-orange-300">➕ Add Skill</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            className="bg-gray-900 border border-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-auto transition"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Skill name"
          />
          <button
            onClick={handleAddSkill}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition"
          >
            Add Skill
          </button>
        </div>
      </section>

      {/* Skill List */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-orange-300">💡 Skills</h2>
        <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {skills.map((skill) => (
            <li key={skill._id} className="bg-gray-900 border border-gray-700 p-3 rounded-md flex justify-between items-center shadow">
              {editingSkillId === skill._id ? (
                <>
                  <input
                    className="bg-gray-800 p-2 rounded-md border border-gray-600 w-full mr-2"
                    value={editSkillName}
                    onChange={(e) => setEditSkillName(e.target.value)}
                  />
                  <button onClick={saveSkillChanges} className="text-green-400 text-sm hover:underline ml-2">Save</button>
                </>
              ) : (
                <>
                  <span>{skill.name}</span>
                  <div className="flex gap-2">
                    <button onClick={() => startEditingSkill(skill)} className="text-yellow-400 text-sm hover:underline">Edit</button>
                    <button onClick={() => handleDeleteSkill(skill._id)} className="text-red-400 text-sm hover:underline">Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
