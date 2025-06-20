import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  // Check auth on mount
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
    navigate('/admin');
  };

  if (loading) return <div className="text-white p-6">Authenticating...</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">🛠️ Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">📦 Projects</h2>
        <div className="space-y-3">
          {projects.map((project: any) => (
            <div key={project._id} className="bg-gray-800 p-4 rounded">
              <h3 className="text-lg font-bold">{project.title}</h3>
              <p>{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  className="text-blue-400 underline"
                >
                  Live Link
                </a>
              )}
              <p className="text-sm text-gray-400 mt-1">
                Tech Stack: {project.techStack?.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">💡 Skills</h2>
        <ul className="space-y-2">
          {skills.map((skill: any) => (
            <li
              key={skill._id}
              className="bg-gray-800 p-3 rounded-md text-white"
            >
              {skill.name}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
