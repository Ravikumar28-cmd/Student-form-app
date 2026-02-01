import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5000/api/students';

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
  const navigate = useNavigate();

  // Debounce search term to prevent excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Access Denied: You must be logged in as Admin.");
      navigate('/login');
      return;
    }

    setIsLoading(true);
    const searchParam = debouncedSearchTerm ? `&search=${encodeURIComponent(debouncedSearchTerm)}` : '';
    fetch(`${API_URL}?page=${currentPage}&limit=10${searchParam}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (res.status === 401) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then(data => {
        if (data.students) {
          setStudents(data.students);
          setTotalPages(data.totalPages);
          setTotalStudents(data.totalStudents);
        } else if (Array.isArray(data)) {
          setStudents(data);
          setTotalStudents(data.length);
        } else {
          setStudents([]); // Fallback to empty array to prevent crash
          setTotalStudents(0);
        }
      })
      .catch(err => {
        if (err.message === "Unauthorized") {
          localStorage.removeItem('token');
          localStorage.removeItem('isAdmin');
          navigate('/login');
        }
        console.error("Error fetching students:", err);
      })
      .finally(() => setIsLoading(false));
  }, [navigate, currentPage, debouncedSearchTerm]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const token = localStorage.getItem('token');
        await fetch(`${API_URL}/${id}`, { 
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setStudents(students.filter((student) => student._id !== id));
        setTotalStudents(prev => prev - 1);
        toast.success("Student deleted successfully");
      } catch (err) {
        toast.error("Error deleting student");
      }
    }
  };

  const toggleStatus = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/status/${id}`, { 
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const updatedStudent = await response.json();
        setStudents(students.map((s) => (s._id === id ? updatedStudent : s)));
        toast.success("Student status updated");
      }
    } catch (err) {
      toast.error("Error updating status");
    }
  };

  // Calculate stats
  const total = totalStudents;
  const accepted = students.filter(s => s.status === 'Accepted').length;
  const pending = students.filter(s => s.status === 'Pending').length;

  if (isLoading) {
    return (
      <div className="container mt-5 loading-container">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Admin Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
      {/* Stats Cards */}
      <div className="row mb-4 g-3">
        <div className="col-md-4">
          <div className="card text-white bg-primary h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <h6 className="card-title text-uppercase opacity-75">Total Applications</h6>
              <h2 className="display-4 fw-bold mb-0">{total}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <h6 className="card-title text-uppercase opacity-75">Accepted</h6>
              <h2 className="display-4 fw-bold mb-0">{accepted}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-dark bg-warning h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <h6 className="card-title text-uppercase opacity-75">Pending</h6>
              <h2 className="display-4 fw-bold mb-0">{pending}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-secondary mb-0">Recent Applications</h3>
        <input 
          type="text" 
          className="form-control w-25" 
          placeholder="Search by name or email..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="card shadow-sm border-0 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="py-3 ps-4">Name</th>
                <th className="py-3">Email</th>
                <th className="py-3">Course</th>
                <th className="py-3">Mobile</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student._id}>
                    <td className="ps-4 fw-bold">{student.name}</td>
                    <td>{student.email}</td>
                    <td><span className="badge bg-light text-dark border">{student.course}</span></td>
                    <td>{student.mobile}</td>
                    <td>
                      <button 
                        onClick={() => toggleStatus(student._id)}
                        className={`btn btn-sm rounded-pill ${student.status === 'Accepted' ? 'btn-success' : 'btn-warning'}`}
                        style={{ minWidth: '80px' }}
                      >
                        {student.status}
                      </button>
                    </td>
                    <td className="text-end pe-4">
                      <button 
                        className="btn btn-outline-info btn-sm me-2" 
                        data-bs-toggle="modal" 
                        data-bs-target="#studentModal"
                        onClick={() => setSelectedStudent(student)}
                      >
                        View
                      </button>
                      <button 
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => navigate('/register', { state: { student } })}
                      >
                        Edit
                      </button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(student._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-5">
                    No applications found matching "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button 
          className="btn btn-secondary" 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span className="text-muted">Page {currentPage} of {totalPages}</span>
        <button 
          className="btn btn-secondary" 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>

      {/* Student Details Modal */}
      <div className="modal fade" id="studentModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Student Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {selectedStudent && (
                <div className="vstack gap-2">
                  {selectedStudent.photo && (
                    <div className="text-center mb-3">
                      <img 
                        src={selectedStudent.photo.startsWith('data:') || selectedStudent.photo.startsWith('http') 
                          ? selectedStudent.photo 
                          : `http://localhost:5000/${selectedStudent.photo}`} 
                        alt="Student" 
                        className="rounded-circle shadow-sm" 
                        style={{ width: '120px', height: '120px', objectFit: 'cover' }} 
                      />
                    </div>
                  )}
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <strong>Full Name:</strong> <span>{selectedStudent.name}</span>
                  </div>
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <strong>Email:</strong> <span>{selectedStudent.email}</span>
                  </div>
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <strong>Course:</strong> <span>{selectedStudent.course}</span>
                  </div>
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <strong>Mobile:</strong> <span>{selectedStudent.mobile}</span>
                  </div>
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <strong>Gender:</strong> <span>{selectedStudent.gender || 'N/A'}</span>
                  </div>
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <strong>Date of Birth:</strong> <span>{selectedStudent.dob || 'N/A'}</span>
                  </div>
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <strong>Father's Name:</strong> <span>{selectedStudent.fatherName || 'N/A'}</span>
                  </div>
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <strong>Mother's Name:</strong> <span>{selectedStudent.motherName || 'N/A'}</span>
                  </div>
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <strong>Category:</strong> <span>{selectedStudent.category || 'N/A'}</span>
                  </div>
                  <div className="d-flex flex-column border-bottom pb-2">
                    <strong>Address:</strong> <span className="text-muted small">{selectedStudent.address || 'N/A'}</span>
                  </div>
                  <div className="d-flex justify-content-between pt-2">
                    <strong>Status:</strong> 
                    <span className={`badge ${selectedStudent.status === 'Accepted' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {selectedStudent.status}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
