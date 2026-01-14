function Footer() {
  return (
    <footer className="bg-dark text-light pt-4 mt-5">
      <div className="container">
        <div className="row">

          {/* ABOUT */}
          <div className="col-md-3 mb-3">
            <h5 className="fw-bold">MyShop</h5>
            <p className="small">
              Your one-stop online store for quality products at best prices.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="col-md-3 mb-3">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/categories" className="text-light text-decoration-none">Categories</a></li>
              <li><a href="/cart" className="text-light text-decoration-none">Cart</a></li>
              <li><a href="/login" className="text-light text-decoration-none">Login</a></li>
            </ul>
          </div>

          {/* CUSTOMER SERVICE */}
          <div className="col-md-3 mb-3">
            <h6 className="fw-bold">Customer Service</h6>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-light text-decoration-none">About Us</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
              <li><a href="/policy" className="text-light text-decoration-none">Privacy Policy</a></li>
              <li><a href="/terms" className="text-light text-decoration-none">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-md-3 mb-3">
            <h6 className="fw-bold">Contact</h6>
            <p className="small mb-1">📞 +91 98765 43210</p>
            <p className="small mb-1">✉️ support@myshop.com</p>
            <p className="small">📍 New Delhi, India</p>
          </div>
        </div>

        <hr className="border-secondary" />

        {/* BOTTOM */}
        <div className="text-center pb-3 small">
          © {new Date().getFullYear()} MyShop. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
