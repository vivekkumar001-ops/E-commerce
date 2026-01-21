import Layout from "../components/Layouts/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h1 className="fw-bold text-center mb-4">
              Privacy Policy
            </h1>

            <p className="text-muted fs-5 text-center mb-5">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your personal information.
            </p>

            <h4 className="fw-semibold mt-4">1. Information We Collect</h4>
            <p className="text-secondary">
              We may collect personal details such as your name, email
              address, phone number, and delivery address when you
              register or place an order on our website.
            </p>

            <h4 className="fw-semibold mt-4">2. How We Use Your Information</h4>
            <p className="text-secondary">
              Your information is used to process orders, provide customer
              support, improve our services, and communicate important
              updates related to your account or orders.
            </p>

            <h4 className="fw-semibold mt-4">3. Data Security</h4>
            <p className="text-secondary">
              We take appropriate security measures to protect your
              personal data from unauthorized access, alteration, or
              disclosure.
            </p>

            <h4 className="fw-semibold mt-4">4. Cookies</h4>
            <p className="text-secondary">
              Our website may use cookies to enhance user experience and
              analyze website traffic. You can choose to disable cookies
              through your browser settings.
            </p>

            <h4 className="fw-semibold mt-4">5. Third-Party Services</h4>
            <p className="text-secondary">
              We do not sell or share your personal information with
              third parties, except where required by law or for service
              delivery purposes.
            </p>

            <h4 className="fw-semibold mt-4">6. Changes to This Policy</h4>
            <p className="text-secondary">
              We may update this policy from time to time. Any changes
              will be posted on this page.
            </p>

            <p className="text-center text-muted mt-5">
              Last updated: January 2026
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
