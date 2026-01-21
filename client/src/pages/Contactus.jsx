import Layout from "../components/Layouts/Layout";

const Contactus = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className="container py-5">
        <div className="row justify-content-center text-center">
          <div className="col-md-8">
            <h1 className="fw-bold mb-3">Contact Us</h1>
            <p className="text-muted fs-5">
              We’d love to hear from you! Feel free to reach out to us
              for any queries, support, or feedback.
            </p>
          </div>
        </div>

        <div className="row mt-5">
          {/* Contact Info */}
          <div className="col-md-6 mb-4">
            <h4 className="fw-semibold mb-3">Get in Touch</h4>
            <p className="text-secondary">
              Have questions or need assistance? Our team is always ready
              to help you.
            </p>

            <ul className="list-unstyled fs-6">
              <li className="mb-2">
                📍 <strong>Address:</strong> New Delhi, India
              </li>
              <li className="mb-2">
                📞 <strong>Phone:</strong> +91 98765 43210
              </li>
              <li className="mb-2">
                ✉️ <strong>Email:</strong> support@example.com
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="col-md-6">
            <h4 className="fw-semibold mb-3">Send Us a Message</h4>

            <form>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                />
              </div>

              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Your Message"
                ></textarea>
              </div>

              <button className="btn btn-primary w-100">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contactus;
