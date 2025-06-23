import { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [newProject, setNewProject] = useState({
    title: '', description: '', liveLink: '', githubLink: '', techStack: ''
  });
  const [newSkill, setNewSkill] = useState('');
  const [tweetLoading, setTweetLoading] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [editProjectData, setEditProjectData] = useState<any>({});
  const [editSkillName, setEditSkillName] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/auth/check');
        if (!res.data.isAuthenticated) navigate('/akshu-secret-login');
        else fetchData();
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

  const handleAddProject = async () => {
    await axios.post('/projects', {
      ...newProject,
      techStack: newProject.techStack.split(',').map((s) => s.trim()),
    });
    fetchData();
    setNewProject({ title: '', description: '', liveLink: '', githubLink: '', techStack: '' });
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
    } catch {
      alert("Failed to fetch tweets");
    } finally {
      setTweetLoading(false);
    }
  };

  const startEditingProject = (project: any) => {
    setEditingProjectId(project._id);
    setEditProjectData({
      title: project.title,
      description: project.description,
      liveLink: project.liveLink,
      githubLink: project.githubLink,
      techStack: project.techStack?.join(', ') || ''
    });
  };

  const saveProjectChanges = async () => {
    if (!editingProjectId) return;
    await axios.put(`/projects/${editingProjectId}`, {
      ...editProjectData,
      techStack: editProjectData.techStack.split(',').map((s: string) => s.trim())
    });
    setEditingProjectId(null);
    fetchData();
  };

  const startEditingSkill = (skill: any) => {
    setEditingSkillId(skill._id);
    setEditSkillName(skill.name);
  };

  const saveSkillChanges = async () => {
    if (!editingSkillId) return;
    await axios.put(`/skills/${editingSkillId}`, { name: editSkillName });
    setEditingSkillId(null);
    fetchData();
  };

  if (loading) return <div className="text-white p-6">Authenticating...</div>;

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white px-4 md:px-8 py-8">
      <div className="flex justify-between items-center mb-10 border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold text-orange-400">🛠️ Admin Dashboard</h1>
        <button onClick={() => { axios.post('/auth/logout'); navigate('/'); }} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition">
          Logout
        </button>
      </div>

      <div className="mb-10">
        <button onClick={fetchLatestTweets} disabled={tweetLoading} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition">
          {tweetLoading ? 'Fetching Tweets...' : '📥 Fetch Latest Tweets'}
        </button>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-orange-300">➕ Add Project</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {['title', 'description', 'liveLink', 'githubLink', 'techStack'].map((key, idx) => (
            <input
              key={idx}
              placeholder={key}
              value={newProject[key as keyof typeof newProject] || ''}
              onChange={(e) =>
                setNewProject({ ...newProject, [key]: e.target.value })
              }
              className="bg-gray-900 border border-gray-700 p-2 rounded-md"
            />
          ))}
        </div>
        <button onClick={handleAddProject} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium transition">
          Add Project
        </button>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-orange-300">📦 Projects</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project._id} className="bg-gray-900 border border-gray-700 p-4 rounded-md space-y-3 shadow-lg">
              {editingProjectId === project._id ? (
                <>
                  {['title', 'description', 'liveLink', 'githubLink', 'techStack'].map((key, i) => (
                    <input
                      key={i}
                      className="w-full bg-gray-800 p-2 rounded-md border border-gray-600"
                      placeholder={key}
                      value={editProjectData[key] || ''}
                      onChange={(e) =>
                        setEditProjectData({ ...editProjectData, [key]: e.target.value })
                      }
                    />
                  ))}
                  <button onClick={saveProjectChanges} className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-sm mt-2 transition">
                    Save
                  </button>
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

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-orange-300">➕ Add Skill</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            className="bg-gray-900 border border-gray-700 p-2 rounded-md w-full sm:w-auto"
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
