
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FaUsers, FaEnvelope, FaSms, FaClock, FaCheckCircle, FaTimesCircle, FaEye, FaReply, FaChartBar, FaBell } from 'react-icons/fa';
import { useAdminAuth } from '../context/AdminAuthContext';
import ApplicationResponseModal from '../components/ApplicationResponseModal';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    today: 0,
    thisWeek: 0
  });
  const [contactStats, setContactStats] = useState({
    total: 0,
    new: 0,
    read: 0,
    replied: 0,
    closed: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [activeTab, setActiveTab] = useState('applications');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');
  const [appStatusFilter, setAppStatusFilter] = useState('all');
  const [appProgramFilter, setAppProgramFilter] = useState('all');
  const [contactStatusFilter, setContactStatusFilter] = useState('all');
  const { getAdminToken } = useAdminAuth();

  const fetchApplications = useCallback(async () => {
    try {
      const token = getAdminToken();
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

      const response = await fetch(`${API_BASE}/admin/applications?limit=100`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications || []);
        
        // Calculate additional stats
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const thisWeek = new Date();
        thisWeek.setDate(thisWeek.getDate() - 7);
        
        const todayCount = data.applications.filter(app => 
          new Date(app.createdAt) >= today
        ).length;
        
        const weekCount = data.applications.filter(app => 
          new Date(app.createdAt) >= thisWeek
        ).length;
        
        setStats({
          ...data.stats,
          today: todayCount,
          thisWeek: weekCount
        });
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  }, [getAdminToken]);

  const fetchContacts = useCallback(async () => {
    try {
      const token = getAdminToken();
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

      const response = await fetch(`${API_BASE}/admin/contacts?limit=100`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts || []);
        setContactStats(data.stats || { total: 0, new: 0, read: 0, replied: 0, closed: 0 });
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  }, [getAdminToken]);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchApplications(), fetchContacts()]);
    setLoading(false);
  }, [fetchApplications, fetchContacts]);

  useEffect(() => {
    fetchAllData();
    
    // Refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchAllData, 30000);
    return () => clearInterval(interval);
  }, [fetchAllData]);

  const handleRespond = (application) => {
    setSelectedApplication(application);
    setShowResponseModal(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'accepted':
        return <FaCheckCircle className="text-green-500" />;
      case 'rejected':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const normalize = (value) => (value || '').toString().toLowerCase();

  const filteredSortedApplications = useMemo(() => {
    const bySearch = (app) => {
      const hay = `${app.firstName} ${app.lastName} ${app.email} ${app.phone} ${app.program}`;
      return normalize(hay).includes(normalize(searchQuery));
    };
    const byStatus = (app) => (appStatusFilter === 'all' ? true : app.status === appStatusFilter);
    const byProgram = (app) => (appProgramFilter === 'all' ? true : app.program === appProgramFilter);

    const items = (applications || []).filter((a) => bySearch(a) && byStatus(a) && byProgram(a));

    const compare = (a, b) => {
      let av = a[sortBy];
      let bv = b[sortBy];
      if (sortBy === 'name') {
        av = `${a.firstName} ${a.lastName}`;
        bv = `${b.firstName} ${b.lastName}`;
      }
      if (sortBy === 'createdAt') {
        av = new Date(a.createdAt).getTime();
        bv = new Date(b.createdAt).getTime();
      }
      if (typeof av === 'string') av = av.toLowerCase();
      if (typeof bv === 'string') bv = bv.toLowerCase();
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    };

    return items.sort(compare);
  }, [applications, searchQuery, appStatusFilter, appProgramFilter, sortBy, sortDir]);

  const filteredSortedContacts = useMemo(() => {
    const bySearch = (c) => {
      const hay = `${c.name} ${c.email} ${c.subject} ${c.message}`;
      return normalize(hay).includes(normalize(searchQuery));
    };
    const byStatus = (c) => (contactStatusFilter === 'all' ? true : c.status === contactStatusFilter);

    const items = (contacts || []).filter((c) => bySearch(c) && byStatus(c));

    const compare = (a, b) => {
      let av = a[sortBy];
      let bv = b[sortBy];
      if (sortBy === 'name') {
        av = a.name;
        bv = b.name;
      }
      if (sortBy === 'createdAt') {
        av = new Date(a.createdAt).getTime();
        bv = new Date(b.createdAt).getTime();
      }
      if (typeof av === 'string') av = av.toLowerCase();
      if (typeof bv === 'string') bv = bv.toLowerCase();
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    };

    return items.sort(compare);
  }, [contacts, searchQuery, contactStatusFilter, sortBy, sortDir]);

  const setSort = (column) => {
    if (sortBy === column) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortDir('asc');
    }
  };

  const getProgramColor = (program) => {
    const colors = {
      education: 'bg-blue-100 text-blue-800',
      fashion: 'bg-pink-100 text-pink-800',
      photography: 'bg-purple-100 text-purple-800',
      leather: 'bg-orange-100 text-orange-800',
      fitness: 'bg-green-100 text-green-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[program] || colors.other;
  };

  const getContactStatusIcon = (status) => {
    switch (status) {
      case 'new':
        return <FaBell className="text-blue-500" />;
      case 'read':
        return <FaEye className="text-yellow-500" />;
      case 'replied':
        return <FaReply className="text-green-500" />;
      case 'closed':
        return <FaCheckCircle className="text-gray-500" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  const getContactStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-yellow-100 text-yellow-800';
      case 'replied':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1 leading-tight">Manage applications and contact submissions with real-time updates</p>
            </div>
            {/* controls removed */}
          </div>
        </div>

        {/* Tabs */}
        <div className="hidden">
          <nav className="flex space-x-2">
            <button
              onClick={() => setActiveTab('applications')}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === 'applications'
                  ? 'bg-gradient-to-r from-pink-600 to-pink-700 text-white shadow-md'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <FaUsers className="h-4 w-4 mr-2 inline" />
              Applications ({stats.total})
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === 'contacts'
                  ? 'bg-gradient-to-r from-pink-600 to-pink-700 text-white shadow-md'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <FaEnvelope className="h-4 w-4 mr-2 inline" />
              Contacts ({contactStats.total})
            </button>
          </nav>
        </div>

        {/* Stats Cards */}
        <div className="hidden">
          {activeTab === 'applications' ? (
            <>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600">
                    <FaUsers className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-600">
                    <FaClock className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-gradient-to-br from-green-100 to-green-200 text-green-600">
                    <FaCheckCircle className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Approved</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-gradient-to-br from-red-100 to-red-200 text-red-600">
                    <FaTimesCircle className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Rejected</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-600">
                    <FaChartBar className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Today</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.today}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600">
                    <FaChartBar className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">This Week</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.thisWeek}</p>
                  </div>
                </div>
              </div>
          </>
          ) : (
            <>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600">
                    <FaEnvelope className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-gray-900">{contactStats.total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600">
                    <FaBell className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">New</p>
                    <p className="text-2xl font-bold text-gray-900">{contactStats.new}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-600">
                    <FaEye className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Read</p>
                    <p className="text-2xl font-bold text-gray-900">{contactStats.read}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-gradient-to-br from-green-100 to-green-200 text-green-600">
                    <FaReply className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Replied</p>
                    <p className="text-2xl font-bold text-gray-900">{contactStats.replied}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600">
                    <FaCheckCircle className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Closed</p>
                    <p className="text-2xl font-bold text-gray-900">{contactStats.closed}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-600">
                    <FaChartBar className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Response Rate</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {contactStats.total > 0 ? Math.round((contactStats.replied / contactStats.total) * 100) : 0}%
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {activeTab === 'applications' ? 'All Applications' : 'All Contacts'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {activeTab === 'applications' 
                    ? 'Complete list of all program applications' 
                    : 'Complete list of all contact form submissions'
                  }
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${activeTab === 'applications' ? 'name, email, phone, program' : 'name, email, subject'}`}
                  className="w-64 max-w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                {activeTab === 'applications' ? (
                  <>
                    <select
                      value={appProgramFilter}
                      onChange={(e) => setAppProgramFilter(e.target.value)}
                      className="px-3 py-2 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="all">All Programs</option>
                      <option value="education">Education</option>
                      <option value="fashion">Fashion</option>
                      <option value="photography">Photography</option>
                      <option value="leather">Leather</option>
                      <option value="fitness">Fitness</option>
                      <option value="other">Other</option>
                    </select>
                    <select
                      value={appStatusFilter}
                      onChange={(e) => setAppStatusFilter(e.target.value)}
                      className="px-3 py-2 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </>
                ) : (
                  <select
                    value={contactStatusFilter}
                    onChange={(e) => setContactStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="closed">Closed</option>
                  </select>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10 text-xs uppercase text-gray-500">
                <tr>
                {activeTab === 'applications' ? (
                  <>
                    <th onClick={() => setSort('name')} className="px-4 py-2 text-left font-medium tracking-wider cursor-pointer select-none">
                      Applicant {sortBy === 'name' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                    </th>
                    <th onClick={() => setSort('program')} className="px-4 py-2 text-left font-medium tracking-wider cursor-pointer select-none">
                      Program {sortBy === 'program' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                    </th>
                    <th onClick={() => setSort('status')} className="px-4 py-2 text-left font-medium tracking-wider cursor-pointer select-none">
                      Status {sortBy === 'status' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                    </th>
                    <th className="px-4 py-2 text-left font-medium tracking-wider">
                      Contact
                    </th>
                    <th onClick={() => setSort('createdAt')} className="px-4 py-2 text-left font-medium tracking-wider cursor-pointer select-none">
                      Applied {sortBy === 'createdAt' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                    </th>
                    <th className="px-4 py-2 text-left font-medium tracking-wider">
                      Actions
                    </th>
                  </>
                ) : (
                  <>
                    <th onClick={() => setSort('name')} className="px-4 py-2 text-left font-medium tracking-wider cursor-pointer select-none">
                      Contact {sortBy === 'name' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                    </th>
                    <th onClick={() => setSort('subject')} className="px-4 py-2 text-left font-medium tracking-wider cursor-pointer select-none">
                      Subject {sortBy === 'subject' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                    </th>
                    <th onClick={() => setSort('status')} className="px-4 py-2 text-left font-medium tracking-wider cursor-pointer select-none">
                      Status {sortBy === 'status' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                    </th>
                    <th className="px-4 py-2 text-left font-medium tracking-wider">
                      Message
                    </th>
                    <th onClick={() => setSort('createdAt')} className="px-4 py-2 text-left font-medium tracking-wider cursor-pointer select-none">
                      Submitted {sortBy === 'createdAt' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                    </th>
                    <th className="px-4 py-2 text-left font-medium tracking-wider">
                      Actions
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activeTab === 'applications' ? (
                filteredSortedApplications.map((application, index) => (
                  <tr key={application._id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center shadow-sm">
                            <span className="text-sm font-semibold text-pink-700">
                              {application.firstName.charAt(0).toUpperCase()}{application.lastName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {application.firstName} {application.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            Age: {application.age} • {application.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getProgramColor(application.program)}`}>
                        {application.program}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1 capitalize">{application.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <FaEnvelope className="h-4 w-4 text-gray-400 mr-2" />
                          {application.email}
                        </div>
                        <div className="flex items-center mt-1">
                          <FaSms className="h-4 w-4 text-gray-400 mr-2" />
                          {application.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(application.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRespond(application)}
                          className="bg-pink-100 text-pink-700 hover:bg-pink-200 px-3 py-1 rounded-md text-xs font-medium transition-colors duration-200 flex items-center"
                          title="Send Response"
                        >
                          <FaReply className="h-3 w-3 mr-1" />
                          Respond
                        </button>
                        <button
                          className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-md text-xs font-medium transition-colors duration-200 flex items-center"
                          title="View Details"
                        >
                          <FaEye className="h-3 w-3 mr-1" />
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                filteredSortedContacts.map((contact, index) => (
                  <tr key={contact._id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-sm">
                            <span className="text-sm font-semibold text-blue-700">
                              {contact.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {contact.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            <FaEnvelope className="h-3 w-3 inline mr-1" />
                            {contact.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {contact.subject}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getContactStatusColor(contact.status)}`}>
                        {getContactStatusIcon(contact.status)}
                        <span className="ml-1 capitalize">{contact.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {contact.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(contact.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-md text-xs font-medium transition-colors duration-200 flex items-center"
                          title="View Details"
                        >
                          <FaEye className="h-3 w-3 mr-1" />
                          View
                        </button>
                        <button
                          className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-md text-xs font-medium transition-colors duration-200 flex items-center"
                          title="Mark as Read"
                        >
                          <FaCheckCircle className="h-3 w-3 mr-1" />
                          Mark Read
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {((activeTab === 'applications' && applications.length === 0) || 
            (activeTab === 'contacts' && contacts.length === 0)) && (
            <div className="text-center py-16">
              <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                {activeTab === 'applications' ? (
                  <FaUsers className="h-8 w-8 text-gray-400" />
                ) : (
                  <FaEnvelope className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {activeTab} found
              </h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                {activeTab === 'applications' 
                  ? 'No applications have been submitted yet. They will appear here once users start applying.' 
                  : 'No contact form submissions have been received yet. They will appear here once users start contacting you.'
                }
              </p>
            </div>
          )}
          </div>
        </div>

        {/* Response Modal */}
        <ApplicationResponseModal
          application={selectedApplication}
          isOpen={showResponseModal}
          onClose={() => {
            setShowResponseModal(false);
            setSelectedApplication(null);
          }}
          onResponseSent={() => {
            fetchApplications(); // Refresh the applications list
          }}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;