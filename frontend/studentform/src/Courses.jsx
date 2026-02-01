function Courses() {
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h6 className="text-primary text-uppercase fw-bold">Academics</h6>
        <h2 className="fw-bold">Explore Our Courses</h2>
        <p className="text-muted">Choose from a wide range of programs tailored for your career.</p>
      </div>

      <div className="row g-4 mb-5">
        {/* Engineering */}
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary me-3">
                  ⚙️
                </div>
                <h4 className="fw-bold mb-0">Engineering</h4>
              </div>
              <ul className="list-unstyled text-muted">
                <li className="mb-2">✓ B.Tech Computer Science</li>
                <li className="mb-2">✓ B.Tech Mechanical</li>
                <li className="mb-2">✓ B.Tech Civil</li>
                <li className="mb-2">✓ B.Tech Electrical (EEE)</li>
                <li className="mb-2">✓ B.Tech Electronics (ECE)</li>
                <li className="mb-2">✓ B.Tech Chemical</li>
                <li className="mb-2">✓ B.Tech Biotechnology</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bachelors */}
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-success bg-opacity-10 p-3 rounded-circle text-success me-3">
                  🎓
                </div>
                <h4 className="fw-bold mb-0">Bachelor's</h4>
              </div>
              <ul className="list-unstyled text-muted">
                <li className="mb-2">✓ BCA (Computer Applications)</li>
                <li className="mb-2">✓ B.Sc Mathematics</li>
                <li className="mb-2">✓ B.Sc Physics</li>
                <li className="mb-2">✓ BBA (Business Admin)</li>
                <li className="mb-2">✓ B.Com (Commerce)</li>
                <li className="mb-2">✓ BA English Literature</li>
                <li className="mb-2">✓ B.Des (Design)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* PG Programs */}
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-warning bg-opacity-10 p-3 rounded-circle text-warning me-3">
                  📜
                </div>
                <h4 className="fw-bold mb-0">Post Graduation</h4>
              </div>
              <ul className="list-unstyled text-muted">
                <li className="mb-2">✓ MCA (Master of Comp. App.)</li>
                <li className="mb-2">✓ MBA (Business Admin)</li>
                <li className="mb-2">✓ M.Tech Computer Science</li>
                <li className="mb-2">✓ M.Sc Data Science</li>
                <li className="mb-2">✓ M.Com</li>
                <li className="mb-2">✓ MA Psychology</li>
                <li className="mb-2">✓ M.Arch (Architecture)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;