import Layout from "../components/Layouts/Layout";

const Aboutus = () => {
  return (
    <Layout title={"About Us"}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-10 text-center">
            <h1 className="mb-4 fw-bold">About Us</h1>
            <p className="text-muted fs-5">
              Welcome to our platform! We are committed to providing
              high-quality products and an excellent shopping experience
              for our customers.
            </p>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-6">
            <h3 className="fw-semibold mb-3">Who We Are</h3>
            <p className="text-secondary">
              We are a passionate team focused on delivering reliable,
              affordable, and innovative solutions. Our goal is to make
              online shopping easy, secure, and enjoyable for everyone.
            </p>
          </div>

          <div className="col-md-6">
            <h3 className="fw-semibold mb-3">Our Mission</h3>
            <p className="text-secondary">
              Our mission is to build trust with our customers by offering
              genuine products, fast delivery, and responsive customer
              support while continuously improving our services.
            </p>
          </div>
        </div>

        <div className="row mt-5 text-center">
          <div className="col-md-4">
            <h4 className="fw-bold">✔ Quality Products</h4>
            <p className="text-muted">
              Carefully selected items to ensure top quality.
            </p>
          </div>

          <div className="col-md-4">
            <h4 className="fw-bold">✔ Secure Payments</h4>
            <p className="text-muted">
              Safe and trusted payment methods.
            </p>
          </div>

          <div className="col-md-4">
            <h4 className="fw-bold">✔ Customer Support</h4>
            <p className="text-muted">
              Friendly support whenever you need help.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Aboutus;
