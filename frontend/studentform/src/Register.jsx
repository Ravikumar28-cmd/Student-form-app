import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const studentToEdit = location.state?.student;
  const API_URL = 'http://localhost:5000/api/students';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '', email: '', course: '', mobile: '', gender: '', dob: '',
    fatherName: '', motherName: '', address: '', category: '', photo: ''
  });

  // Populate or clear form when studentToEdit changes
  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        name: studentToEdit.name || '',
        email: studentToEdit.email || '',
        course: studentToEdit.course || '',
        mobile: studentToEdit.mobile || '',
        gender: studentToEdit.gender || '',
        dob: studentToEdit.dob || '',
        fatherName: studentToEdit.fatherName || '',
        motherName: studentToEdit.motherName || '',
        address: studentToEdit.address || '',
        category: studentToEdit.category || '',
        photo: studentToEdit.photo || ''
      });
    } else {
      setFormData({
        name: '', email: '', course: '', mobile: '', gender: '', dob: '',
        fatherName: '', motherName: '', address: '', category: '', photo: ''
      });
    }
  }, [studentToEdit]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({ ...formData, photo: files[0] });
    } else {
      let errorMessage = '';

      // Real-time validation
      if (name === 'mobile') {
        // Enforce max length 10 and numeric only
        if (/[^0-9]/.test(value) || value.length > 10) {
          return;
        }
        if (value.length > 0 && !/^[6-9]/.test(value)) {
          errorMessage = "Mobile number must enter valid Indian number";
        }
      }

      if (name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value.length > 0 && !emailRegex.test(value)) {
          errorMessage = "Invalid email format";
        }
      }

      if (name === 'dob') {
        if (new Date(value) > new Date()) {
          errorMessage = "Date of Birth cannot be in the future";
        }
      }

      setErrors(prev => ({ ...prev, [name]: errorMessage }));
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- Form Validation ---

    // 1. Mobile Number Validation (Must be exactly 10 digits)
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      toast.error("Invalid Mobile Number! Please enter a valid 10-digit Indian number starting with 6-9.");
      return;
    }

    // 2. Email Validation (Standard format check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid Email Address! Please enter a valid email.");
      return;
    }

    // 3. Date of Birth Validation (Cannot be in the future)
    if (new Date(formData.dob) > new Date()) {
      toast.error("Invalid Date of Birth! It cannot be in the future.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const url = studentToEdit 
        ? `${API_URL}/${studentToEdit._id}`
        : `${API_URL}/apply`;
      
      const method = studentToEdit ? 'PUT' : 'POST';

      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const headers = {};
      const token = localStorage.getItem('token');
      if (studentToEdit && token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success(studentToEdit ? 'Student Updated Successfully!' : 'Application Submitted Successfully!');
        if (studentToEdit) {
          navigate('/dashboard');
        } else {
          setFormData({ name: '', email: '', course: '', mobile: '', gender: '', dob: '', fatherName: '', motherName: '', address: '', category: '', photo: '' });
        }
      } else {
        toast.error('Failed to submit application.');
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error submitting application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '800px' }}>
      <div className="card shadow p-4">
        <h2 className="text-center mb-4 text-primary">{studentToEdit ? 'Edit Student Details' : 'Student Application Form'}</h2>
        
        <form onSubmit={handleSubmit}>
          <h5 className="mb-3 text-secondary border-bottom pb-2">Personal Information</h5>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Student Name</label>
              <input type="text" name="name" className="form-control" placeholder="Enter Name" required 
                value={formData.name} onChange={handleChange} />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Date of Birth</label>
              <input type="date" name="dob" className="form-control" required max={new Date().toISOString().split("T")[0]}
                value={formData.dob} onChange={handleChange} />
              {errors.dob && <div className="text-danger small mt-1">{errors.dob}</div>}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Gender</label>
              <select name="gender" className="form-select" required 
                value={formData.gender} onChange={handleChange}>
                <option value="">-- Select Gender --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Mobile Number</label>
              <input type="tel" name="mobile" className="form-control" placeholder="Enter Mobile" required 
                value={formData.mobile} onChange={handleChange} />
              {errors.mobile && <div className="text-danger small mt-1">{errors.mobile}</div>}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Email Address</label>
              <input type="email" name="email" className="form-control" placeholder="Enter Email" required 
                value={formData.email} onChange={handleChange} />
              {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
            </div>
          </div>

          <h5 className="mb-3 mt-4 text-secondary border-bottom pb-2">Family Details</h5>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Father's Name</label>
              <input type="text" name="fatherName" className="form-control" placeholder="Enter Father's Name" required 
                value={formData.fatherName} onChange={handleChange} />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Mother's Name</label>
              <input type="text" name="motherName" className="form-control" placeholder="Enter Mother's Name" required 
                value={formData.motherName} onChange={handleChange} />
            </div>
          </div>

          <h5 className="mb-3 mt-4 text-secondary border-bottom pb-2">Academic & Address</h5>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Select Course</label>
              <select name="course" className="form-select" required 
                value={formData.course} onChange={handleChange}>
                <option value="">-- Select Course --</option>
                <optgroup label="Engineering">
                  <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                  <option value="B.Tech Mechanical">B.Tech Mechanical</option>
                  <option value="B.Tech Civil">B.Tech Civil</option>
                  <option value="B.Tech Electrical (EEE)">B.Tech Electrical (EEE)</option>
                  <option value="B.Tech Electronics (ECE)">B.Tech Electronics (ECE)</option>
                  <option value="B.Tech Chemical">B.Tech Chemical</option>
                  <option value="B.Tech Biotechnology">B.Tech Biotechnology</option>
                </optgroup>
                <optgroup label="Bachelor's">
                  <option value="BCA">BCA (Computer Applications)</option>
                  <option value="B.Sc Mathematics">B.Sc Mathematics</option>
                  <option value="B.Sc Physics">B.Sc Physics</option>
                  <option value="BBA">BBA (Business Admin)</option>
                  <option value="B.Com">B.Com (Commerce)</option>
                  <option value="BA English">BA English Literature</option>
                  <option value="B.Des">B.Des (Design)</option>
                </optgroup>
                <optgroup label="Post Graduation">
                  <option value="MCA">MCA (Master of Comp. App.)</option>
                  <option value="MBA">MBA (Business Admin)</option>
                  <option value="M.Tech CS">M.Tech Computer Science</option>
                  <option value="M.Sc Data Science">M.Sc Data Science</option>
                  <option value="M.Com">M.Com</option>
                  <option value="MA Psychology">MA Psychology</option>
                  <option value="M.Arch">M.Arch (Architecture)</option>
                </optgroup>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Category</label>
              <select name="category" className="form-select" required 
                value={formData.category} onChange={handleChange}>
                <option value="">-- Select Category --</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Upload Photo</label>
              <input type="file" name="photo" className="form-control" accept="image/*" 
                onChange={handleChange} />
            </div>

            <div className="col-12 mb-3">
              <label className="form-label">Address</label>
              <textarea name="address" className="form-control" rows="3" placeholder="Enter Full Address" required
                value={formData.address} onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="text-center mt-3">
            <button type="submit" className="btn btn-success px-5" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Processing...
                </>
              ) : (
                studentToEdit ? 'Update Student' : 'Submit Application'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
