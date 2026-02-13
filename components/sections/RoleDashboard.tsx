import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RoleProfile, GithubRepo, Certification } from '../../types';
import { BackButton } from '../ui/BackButton';
import { SkeletonCard } from '../ui/Loading';
import { 
    ResponsiveContainer, 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    Tooltip, 
    CartesianGrid, 
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar
} from 'recharts';
import { Github, Linkedin, Mail, ExternalLink, Award, Star, BookOpen } from 'lucide-react';
import { SOCIAL_LINKS } from '../../constants';

interface RoleDashboardProps {
  profile: RoleProfile;
  onBack: () => void;
}

export const RoleDashboard: React.FC<RoleDashboardProps> = ({ profile, onBack }) => {
  const Icon = profile.icon;
  const [githubProjects, setGithubProjects] = useState<GithubRepo[]>([]);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);
  
  // State for simulated async fetch of certifications
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isLoadingCerts, setIsLoadingCerts] = useState(true);

  // Fetch GitHub Data
  useEffect(() => {
    const fetchGithubData = async () => {
        setIsLoadingGithub(true);
        try {
            // Fetch repositories sorted by stars
            const response = await fetch('https://api.github.com/users/AshrafMorningstar/repos?sort=stars&direction=desc&per_page=4');
            if (response.ok) {
                const data = await response.json();
                setGithubProjects(data);
            } else {
                console.error("Failed to fetch GitHub data");
                // Fallback to empty to ensure UI doesn't break
                setGithubProjects([]);
            }
        } catch (error) {
            console.error("Error fetching GitHub data:", error);
            setGithubProjects([]);
        } finally {
            setIsLoadingGithub(false);
        }
    };

    fetchGithubData();
  }, []);

  // Simulate LinkedIn Data Fetch
  // NOTE: Real LinkedIn API requires OAuth 2.0 and backend proxying. 
  // We simulate the async delay here to demonstrate the Skeleton Loading UI as requested.
  useEffect(() => {
    setIsLoadingCerts(true);
    const timer = setTimeout(() => {
        setCertifications(profile.certifications);
        setIsLoadingCerts(false);
    }, 1500); // 1.5s simulated delay

    return () => clearTimeout(timer);
  }, [profile]);

  // Custom coloring based on profile
  const getThemeColor = (opacity = 1) => {
    const colors: Record<string, string> = {
      cyan: `rgba(6, 182, 212, ${opacity})`,
      emerald: `rgba(16, 185, 129, ${opacity})`,
      purple: `rgba(168, 85, 247, ${opacity})`,
      amber: `rgba(245, 158, 11, ${opacity})`,
    };
    return colors[profile.color] || colors.cyan;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen relative overflow-y-auto overflow-x-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="flex items-center gap-4">
             <div className={`p-4 rounded-2xl bg-${profile.color}-500/10 border border-${profile.color}-500/20 shadow-[0_0_20px_rgba(0,0,0,0.3)]`}>
                <Icon className={`w-8 h-8 text-${profile.color}-400`} />
             </div>
             <div>
                <h2 className="text-3xl md:text-4xl font-bold">{profile.title}</h2>
                <p className={`text-${profile.color}-400 text-sm font-medium tracking-wide uppercase mt-1`}>
                    {profile.tagline}
                </p>
             </div>
          </div>
          <BackButton onClick={onBack} />
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* About Card */}
          <motion.div variants={itemVariants} className="md:col-span-8 p-6 md:p-8 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4 text-slate-200">About the Role</h3>
            <p className="text-slate-400 leading-relaxed text-lg">
                {profile.description}
            </p>
            <div className="mt-8 flex gap-4">
                <a 
                    href={SOCIAL_LINKS.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-3 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors hover:scale-110"
                    aria-label="GitHub Profile"
                >
                    <Github className="w-5 h-5" />
                </a>
                <a 
                    href={SOCIAL_LINKS.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-3 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors hover:scale-110"
                    aria-label="LinkedIn Profile"
                >
                    <Linkedin className="w-5 h-5 text-blue-400" />
                </a>
                <a 
                    href={SOCIAL_LINKS.email} 
                    className="p-3 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors hover:scale-110"
                    aria-label="Send Email"
                >
                    <Mail className="w-5 h-5 text-emerald-400" />
                </a>
            </div>
          </motion.div>

          {/* Stats / Visualization Card */}
          <motion.div variants={itemVariants} className="md:col-span-4 p-6 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-sm flex flex-col justify-center">
             <h3 className="text-sm font-semibold mb-4 text-slate-500 uppercase tracking-wider">Skill Proficiency</h3>
             <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={profile.skills}>
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Skill Level"
                            dataKey="level"
                            stroke={getThemeColor(1)}
                            fill={getThemeColor(0.4)}
                            fillOpacity={0.6}
                        />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }}
                            itemStyle={{ color: '#e2e8f0' }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
             </div>
          </motion.div>

          {/* Featured Projects (Static) */}
          <motion.div variants={itemVariants} className="md:col-span-12">
             <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className={`w-2 h-8 rounded-full bg-${profile.color}-500`}></span>
                Featured Projects
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile.projects.map((project) => (
                    <div key={project.id} className="group relative p-6 rounded-2xl bg-slate-800/30 border border-white/5 hover:border-white/10 transition-all hover:bg-slate-800/50">
                        <div className="flex justify-between items-start mb-4">
                            <h4 className="text-xl font-bold group-hover:text-white transition-colors">{project.title}</h4>
                            <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                        </div>
                        <p className="text-slate-400 mb-4 h-12 line-clamp-2">{project.description}</p>
                        
                        {project.metric && (
                            <div className={`inline-block mb-4 px-3 py-1 rounded-md bg-${profile.color}-500/10 text-${profile.color}-400 text-xs font-bold border border-${profile.color}-500/20`}>
                                {project.metric}
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.techStack.map(tech => (
                                <span key={tech} className="text-xs px-2 py-1 rounded bg-slate-900 text-slate-400 font-mono">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
             </div>
          </motion.div>

          {/* GitHub Live Data Section */}
          <motion.div variants={itemVariants} className="md:col-span-12 mt-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Github className="w-6 h-6 text-slate-400" />
                Popular Repositories
            </h3>
            
            {isLoadingGithub ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {githubProjects.length > 0 ? (
                        githubProjects.map((repo) => (
                            <a 
                                key={repo.id} 
                                href={repo.html_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 block h-full flex flex-col"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <BookOpen className={`w-5 h-5 text-${profile.color}-400`} />
                                    <div className="flex items-center gap-1 text-slate-500 text-xs">
                                        <Star className="w-3 h-3" /> {repo.stargazers_count}
                                    </div>
                                </div>
                                <h4 className="font-bold text-white mb-2 truncate group-hover:text-${profile.color}-400 transition-colors">
                                    {repo.name}
                                </h4>
                                <p className="text-sm text-slate-400 line-clamp-2 mb-4 flex-grow">
                                    {repo.description || "No description provided."}
                                </p>
                                <div className="text-xs text-slate-600 font-mono mt-auto">
                                    {repo.language}
                                </div>
                            </a>
                        ))
                    ) : (
                        <div className="col-span-full p-6 text-center text-slate-500 bg-slate-900/20 rounded-xl">
                            No public repositories found or rate limit exceeded.
                        </div>
                    )}
                </div>
            )}
          </motion.div>

          {/* Experience Timeline */}
          <motion.div variants={itemVariants} className="md:col-span-6 p-6 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-sm">
             <h3 className="text-xl font-semibold mb-6 text-slate-200">Recent Experience</h3>
             <div className="space-y-8 relative">
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-800" />
                {profile.experience.map((exp, i) => (
                    <div key={i} className="relative pl-8">
                        <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-slate-900 bg-${profile.color}-500`} />
                        <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                        <div className="text-sm text-slate-400 mb-2">{exp.company} • {exp.period}</div>
                        <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
                    </div>
                ))}
             </div>
          </motion.div>

          {/* Licenses & Certifications (Async Simulated) */}
          <motion.div variants={itemVariants} className="md:col-span-6 p-6 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-sm">
             <h3 className="text-xl font-semibold mb-6 text-slate-200 flex items-center gap-2">
                 <Award className="w-5 h-5 text-yellow-500" />
                 Licenses & Certifications
             </h3>
             <div className="space-y-6">
                {isLoadingCerts ? (
                    <>
                        <div className="animate-pulse flex gap-4">
                            <div className="w-12 h-12 bg-slate-800 rounded-lg"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                                <div className="h-3 bg-slate-800 rounded w-1/2"></div>
                            </div>
                        </div>
                        <div className="animate-pulse flex gap-4">
                            <div className="w-12 h-12 bg-slate-800 rounded-lg"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                                <div className="h-3 bg-slate-800 rounded w-1/2"></div>
                            </div>
                        </div>
                    </>
                ) : (
                    certifications.map((cert, i) => (
                        <div key={i} className="flex gap-4 items-start p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                             <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                 <span className="text-lg font-bold text-slate-500">{cert.issuer.charAt(0)}</span>
                             </div>
                             <div>
                                 <h4 className="font-bold text-white leading-tight">{cert.name}</h4>
                                 <p className="text-sm text-slate-400 mt-1">{cert.issuer}</p>
                                 <p className="text-xs text-slate-500 mt-1">Issued {cert.date}</p>
                                 {cert.credentialUrl && (
                                     <a href={cert.credentialUrl} className="inline-flex items-center gap-1 mt-2 text-xs text-blue-400 hover:text-blue-300">
                                         Show Credential <ExternalLink className="w-3 h-3" />
                                     </a>
                                 )}
                             </div>
                        </div>
                    ))
                )}
             </div>
          </motion.div>

          {/* Technical Deep Dive Chart */}
          <motion.div variants={itemVariants} className="md:col-span-12 p-6 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-sm">
             <h3 className="text-xl font-semibold mb-6 text-slate-200">Technical Breakdown</h3>
             <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={profile.skills.filter(s => s.category === 'technical')} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis hide domain={[0, 100]} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }}
                            itemStyle={{ color: '#e2e8f0' }}
                            cursor={{fill: 'rgba(255,255,255,0.05)'}}
                        />
                        <Bar dataKey="level" fill={getThemeColor(0.8)} radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
             </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};