import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Layout from '../../components/layout/Layout';
import './DashboardPage.css';

// Mock data for projects
const mockProjects = [
  {
    id: 'proj-1',
    name: 'Portfolio Website',
    description: 'Personal portfolio website built with React',
    language: 'JavaScript',
    lastEdited: '2023-06-15T14:30:00Z',
    collaborators: 3
  },
  {
    id: 'proj-2',
    name: 'E-Commerce App',
    description: 'Online store with product listings and checkout',
    language: 'TypeScript',
    lastEdited: '2023-06-12T09:15:00Z',
    collaborators: 2
  },
  {
    id: 'proj-3',
    name: 'Weather App',
    description: 'Weather forecasting application with location services',
    language: 'JavaScript',
    lastEdited: '2023-06-10T11:45:00Z',
    collaborators: 1
  }
];

const DashboardPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [projects, setProjects] = useState(mockProjects);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '', language: 'JavaScript' });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Handle creating a new project
  const handleCreateProject = (e) => {
    e.preventDefault();
    
    const project = {
      id: `proj-${projects.length + 1}`,
      name: newProject.name,
      description: newProject.description,
      language: newProject.language,
      lastEdited: new Date().toISOString(),
      collaborators: 0
    };
    
    setProjects([project, ...projects]);
    setNewProject({ name: '', description: '', language: 'JavaScript' });
    setShowModal(false);
  };
  
  // Filter projects based on search term and active tab
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'recent') {
      const date = new Date(project.lastEdited);
      const now = new Date();
      const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
      return matchesSearch && diffDays < 7;
    }
    if (activeTab === 'personal') return matchesSearch && project.collaborators === 0;
    if (activeTab === 'collaborative') return matchesSearch && project.collaborators > 0;
    
    return matchesSearch;
  });
  
  return (
    <Layout>
      <div className="dashboard-page">
        <div className="container">
          <div className="dashboard-header">
            <div className="dashboard-welcome">
              <h1>Welcome, {user?.firstName || user?.username || 'Developer'}!</h1>
              <p>Manage your projects and start coding collaboratively.</p>
            </div>
            
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              Create New Project
            </button>
          </div>
          
          <div className="dashboard-tools">
            <div className="dashboard-tabs">
              <button 
                className={`tab ${activeTab === 'all' ? 'active' : ''}`} 
                onClick={() => setActiveTab('all')}
              >
                All Projects
              </button>
              <button 
                className={`tab ${activeTab === 'recent' ? 'active' : ''}`} 
                onClick={() => setActiveTab('recent')}
              >
                Recent
              </button>
              <button 
                className={`tab ${activeTab === 'personal' ? 'active' : ''}`} 
                onClick={() => setActiveTab('personal')}
              >
                Personal
              </button>
              <button 
                className={`tab ${activeTab === 'collaborative' ? 'active' : ''}`} 
                onClick={() => setActiveTab('collaborative')}
              >
                Collaborative
              </button>
            </div>
            
            <div className="dashboard-search">
              <input 
                type="text" 
                placeholder="Search projects..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="projects-grid">
            {filteredProjects.length > 0 ? (
              filteredProjects.map(project => (
                <div className="project-card" key={project.id}>
                  <div className="project-header">
                    <h3 className="project-name" onClick={() => navigate(`/editor`)}>
                      {project.name}
                    </h3>
                    <div className="project-language">
                      <span className={`language-dot ${project.language.toLowerCase()}`}></span>
                      {project.language}
                    </div>
                  </div>
                  
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-meta">
                    <div className="project-date">
                      Last edited: {formatDate(project.lastEdited)}
                    </div>
                    <div className="project-collaborators">
                      {project.collaborators > 0 ? (
                        <>{project.collaborators} collaborator{project.collaborators > 1 ? 's' : ''}</>
                      ) : (
                        'Personal project'
                      )}
                    </div>
                  </div>
                  
                  <div className="project-actions">
                    <button className="btn btn-primary" onClick={() => navigate(`/editor`)}>
                      Open Project
                    </button>
                    <button className="btn btn-outline">
                      Invite
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-projects">
                <h3>No projects found</h3>
                <p>Try adjusting your search or create a new project to get started.</p>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                  Create New Project
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Create Project Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Project</h2>
            <form onSubmit={handleCreateProject}>
              <div className="form-group">
                <label htmlFor="project-name">Project Name</label>
                <input 
                  type="text" 
                  id="project-name" 
                  required
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="project-description">Description</label>
                <textarea 
                  id="project-description" 
                  rows="3"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                ></textarea>
              </div>
              
              <div className="form-group">
                <label htmlFor="project-language">Primary Language</label>
                <select 
                  id="project-language"
                  value={newProject.language}
                  onChange={(e) => setNewProject({...newProject, language: e.target.value})}
                >
                  <option value="JavaScript">JavaScript</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="Go">Go</option>
                  <option value="Rust">Rust</option>
                  <option value="C++">C++</option>
                  <option value="PHP">PHP</option>
                  <option value="Ruby">Ruby</option>
                </select>
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DashboardPage; 