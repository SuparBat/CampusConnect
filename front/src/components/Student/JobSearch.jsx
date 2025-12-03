


import React, { useState, useEffect } from 'react';
import { X, Heart, Briefcase, MapPin, Clock, DollarSign, Award, Building2, ChevronDown, ChevronUp } from 'lucide-react';

const dummyJobs = [
  {
    _id: '1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    company: { name: 'Tech Innovations Inc.' },
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $160,000',
    experience: '3-5 years',
    description: 'Join our dynamic team to build cutting-edge web applications using modern technologies. You will work on challenging projects that impact millions of users worldwide.',
    requirements: ['Bachelor\'s degree in Computer Science', '4+ years of React experience', 'Strong understanding of modern JavaScript', 'Experience with state management'],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Redux', 'GraphQL', 'Jest'],
  },
  {
    _id: '2',
    title: 'Backend Engineer',
    department: 'Platform',
    company: { name: 'Data Solutions Corp' },
    location: 'Remote',
    type: 'Full-time',
    salary: '₹110,000 - ₹150,000',
    experience: '3-5 years',
    description: 'Build scalable backend systems and APIs that power our data analytics platform. Work with cutting-edge cloud technologies and microservices architecture.',
    requirements: ['Strong Node.js experience', 'Database design expertise', 'API development', 'Cloud platform knowledge'],
    skills: ['Node.js', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes'],
  },
  {
    _id: '3',
    title: 'Product Designer',
    department: 'Design',
    company: { name: 'Creative Studio' },
    location: 'New York, NY',
    type: 'Full-time',
    salary: '₹90,000 - ₹130,000',
    experience: '1-3 years',
    description: 'Create beautiful, intuitive user experiences for web and mobile applications. Collaborate with product and engineering teams to bring ideas to life.',
    requirements: ['Portfolio demonstrating UX/UI work', 'Proficiency in design tools', 'Understanding of user-centered design', 'Experience with design systems'],
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'Design Systems'],
  },
];

const JobSearch = ({ appliedJobs = [], setAppliedJobs }) => {
  const [jobs, setJobs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(null);

  const activeJob = jobs[currentIndex];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/company/all');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setJobs(data.length ? data : dummyJobs);
      } catch (err) {
        console.error(err);
        setJobs(dummyJobs);
      }
    };
    fetchJobs();
  }, []);

  const handleSwipeAction = (direction) => {
    if (!activeJob || animatingOut) return;

    setAnimatingOut(direction);

    if (direction === 'right') {
      if (!appliedJobs.find(j => j._id === activeJob._id)) {
        setAppliedJobs([
          { ...activeJob, appliedDate: new Date().toISOString().split('T')[0], status: 'pending' },
          ...appliedJobs,
        ]);
      }
    }

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setAnimatingOut(null);
      setExpandedDetails(false);
      setDragOffset({ x: 0, y: 0 });
    }, 400);
  };

  const handleMouseDown = (e) => {
    if (animatingOut) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || animatingOut) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    if (!isDragging || animatingOut) return;
    setIsDragging(false);

    if (Math.abs(dragOffset.x) > 100) {
      handleSwipeAction(dragOffset.x > 0 ? 'right' : 'left');
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleTouchStart = (e) => {
    if (animatingOut) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    if (!isDragging || animatingOut) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStart.x;
    const deltaY = touch.clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleTouchEnd = () => {
    if (!isDragging || animatingOut) return;
    setIsDragging(false);

    if (Math.abs(dragOffset.x) > 100) {
      handleSwipeAction(dragOffset.x > 0 ? 'right' : 'left');
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const resetJobs = () => {
    setCurrentIndex(0);
    setDragOffset({ x: 0, y: 0 });
    setExpandedDetails(false);
  };

  const rotation = isDragging ? (dragOffset.x / 20) : (animatingOut === 'left' ? -20 : animatingOut === 'right' ? 20 : 0);
  const translateX = animatingOut === 'left' ? -500 : animatingOut === 'right' ? 500 : dragOffset.x;
  const translateY = animatingOut ? 50 : dragOffset.y * 0.1;
  const opacity = animatingOut ? 0 : Math.max(0.5, 1 - Math.abs(dragOffset.x) / 300);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Find Your Dream Job</h1>
        <p className="text-slate-600">Swipe right to apply, left to skip</p>
      </div>

      <div className="relative w-full max-w-md h-[600px] mb-8">
        {currentIndex < jobs.length ? (
          <div
            className="absolute inset-0 select-none"
            style={{
              transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg)`,
              opacity: opacity,
              transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 h-full overflow-hidden flex flex-col">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                <h2 className="text-2xl font-bold mb-1">{activeJob.title}</h2>
                <div className="flex items-center gap-2 text-blue-100 mb-3">
                  <Building2 size={16} />
                  <span className="font-medium">{activeJob.company?.name || activeJob.department}</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-slate-700 bg-slate-50 rounded-lg p-3">
                    <MapPin size={18} className="text-blue-600 flex-shrink-0" />
                    <span className="text-sm font-medium truncate">{activeJob.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-700 bg-slate-50 rounded-lg p-3">
                    <Clock size={18} className="text-blue-600 flex-shrink-0" />
                    <span className="text-sm font-medium truncate">{activeJob.type}</span>
                  </div>

                  {activeJob.salary && (
                    <div className="flex items-center gap-2 text-slate-700 bg-slate-50 rounded-lg p-3">
                      <DollarSign size={18} className="text-green-600 flex-shrink-0" />
                      <span className="text-sm font-medium truncate">{activeJob.salary}</span>
                    </div>
                  )}

                  {activeJob.experience && (
                    <div className="flex items-center gap-2 text-slate-700 bg-slate-50 rounded-lg p-3">
                      <Award size={18} className="text-blue-600 flex-shrink-0" />
                      <span className="text-sm font-medium truncate">{activeJob.experience}</span>
                    </div>
                  )}

                  {activeJob.department && (
                    <div className="flex items-center gap-2 text-slate-700 bg-slate-50 rounded-lg p-3 col-span-2">
                      <Briefcase size={18} className="text-blue-600 flex-shrink-0" />
                      <span className="text-sm font-medium">{activeJob.department}</span>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-2">About the Role</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">{activeJob.description}</p>
                </div>

                {activeJob.skills && activeJob.skills.length > 0 && (
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {activeJob.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeJob.requirements && activeJob.requirements.length > 0 && (
                  <div>
                    <button
                      onClick={() => setExpandedDetails(!expandedDetails)}
                      className="flex items-center justify-between w-full font-bold text-slate-900 mb-2 hover:text-blue-600 transition-colors"
                    >
                      <span>Requirements</span>
                      {expandedDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedDetails && (
                      <ul className="space-y-2">
                        {activeJob.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-700 text-sm">
                            <span className="text-blue-600 mt-0.5">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              <div className="absolute top-20 left-0 right-0 pointer-events-none">
                {dragOffset.x > 50 && (
                  <div
                    className="ml-8 inline-block px-6 py-3 bg-green-500 text-white rounded-xl font-bold text-xl shadow-lg transform rotate-12"
                    style={{ opacity: Math.min(dragOffset.x / 150, 1) }}
                  >
                    APPLY
                  </div>
                )}
                {dragOffset.x < -50 && (
                  <div
                    className="mr-8 float-right inline-block px-6 py-3 bg-red-500 text-white rounded-xl font-bold text-xl shadow-lg transform -rotate-12"
                    style={{ opacity: Math.min(Math.abs(dragOffset.x) / 150, 1) }}
                  >
                    SKIP
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Briefcase size={40} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No More Jobs</h2>
            <p className="text-slate-600 mb-6">You've reviewed all available positions</p>
            <button
              onClick={resetJobs}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start Over
            </button>
          </div>
        )}
      </div>

      {currentIndex < jobs.length && (
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleSwipeAction('left')}
            disabled={animatingOut}
            className="w-16 h-16 flex items-center justify-center bg-white text-red-500 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-200 border-2 border-red-200 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={32} strokeWidth={2.5} />
          </button>

          <div className="text-center">
            <div className="text-sm font-semibold text-slate-600">
              {currentIndex + 1} / {jobs.length}
            </div>
          </div>

          <button
            onClick={() => handleSwipeAction('right')}
            disabled={animatingOut}
            className="w-16 h-16 flex items-center justify-center bg-white text-green-500 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-200 border-2 border-green-200 hover:border-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Heart size={32} strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  );
};

export default JobSearch;