import React from "react";

const Footer = () => {
  return (
    <footer className="site-footer custom-border-top bg-danger">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-6">
            <div className="block-7">
              <form action="#" method="post">
                <label htmlFor="email_subscribe" className="footer-heading">
                  Subscribe
                </label>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control py-4"
                    id="email_subscribe"
                    placeholder="Email"
                  />
                  <input
                    type="submit"
                    className="btn btn-sm btn-danger"
                    value="Send"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 col-lg-6">
            <div className="block-5 mb-5">
              <h3 className="footer-heading mb-4">Contact Information</h3>
              <ul className="list-unstyled">
                <li className="address">
                  Breemolah Collection, beside education, opposite Akuka Palace,
                  Wukari, Taraba, Nigeria
                </li>
                <li className="phone">
                  <a href="tel://23923929210">+2 348 068 659 608</a>
                </li>
                <li className="email">breemolahcollection@outlook.com</li>
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-lg-4"></div>
        </div>
      </div>
      <div className="row pt-5 mt-5 text-center footy">
        <div className="col-md-12">
          <h5 className="text-white">
            Copyright &copy; WrashTech
            <script>document.write(new Date().getFullYear());</script>
          </h5>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
