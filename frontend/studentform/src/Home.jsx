import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section text-center text-white">
        <div className="container">
          <h1 className="fw-bold display-5 mb-3">
            Student Application System
          </h1>
          <p className="lead mb-4">
            A smart, fast and paperless admission platform
          </p>

          <div className="d-flex justify-content-center gap-3">
            <Link to="/register" className="btn btn-success btn-lg">
              Apply Now
            </Link>
            <Link to="/login" className="btn btn-outline-light btn-lg">
              Admin Login
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img 
                src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="About Campus" 
                className="img-fluid rounded-3 shadow" 
              />
            </div>
            <div className="col-lg-6 mt-4 mt-lg-0 ps-lg-5">
              <h6 className="text-primary text-uppercase fw-bold">About Us</h6>
              <h2 className="fw-bold mb-4">Building Future Leaders Since 1995</h2>
              <p className="lead text-muted">
                We are dedicated to providing world-class education that fosters innovation, critical thinking, and ethical leadership.
              </p>
              <p className="text-muted">
                Our institution offers a vibrant campus life, state-of-the-art laboratories, and a curriculum designed by industry experts. With a focus on holistic development, we ensure our students are ready to tackle global challenges.
              </p>
              <div className="row mt-4">
                <div className="col-6">
                  <h3 className="fw-bold text-dark">25+</h3>
                  <p className="small text-muted">Years of Excellence</p>
                </div>
                <div className="col-6">
                  <h3 className="fw-bold text-dark">15k+</h3>
                  <p className="small text-muted">Alumni Network</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="container my-5">
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="card p-4 h-100">
              <h5 className="fw-bold">📄 Easy Application</h5>
              <p className="text-muted">
                Simple and user-friendly online application form
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4 h-100">
              <h5 className="fw-bold">🔒 Secure Data</h5>
              <p className="text-muted">
                Student information stored safely and securely
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4 h-100">
              <h5 className="fw-bold">⚡ Fast Processing</h5>
              <p className="text-muted">
                Admin can verify and process applications quickly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">How It Works</h2>
          <div className="row text-center">
            <div className="col-md-3">
              <div className="display-4 text-primary mb-3">📝</div>
              <h5>1. Register</h5>
              <p className="small text-muted">Fill out the application form with your details.</p>
            </div>
            <div className="col-md-3">
              <div className="display-4 text-primary mb-3">🎓</div>
              <h5>2. Select Course</h5>
              <p className="small text-muted">Choose the program that fits your career goals.</p>
            </div>
            <div className="col-md-3">
              <div className="display-4 text-primary mb-3">⏳</div>
              <h5>3. Wait for Review</h5>
              <p className="small text-muted">Admins will review your application status.</p>
            </div>
            <div className="col-md-3">
              <div className="display-4 text-primary mb-3">✅</div>
              <h5>4. Get Admitted</h5>
              <p className="small text-muted">Receive your acceptance and start learning.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
