import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const ContactForm = () => {
  const form = useRef();
  const [done, setDone] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (response) => {
          form.reset();
          toast.success("Message Sent", { autoClose: 2000 });
          setDone(true);
        },
        (error) => {
          toast.error(`${error.text}`, { autoClose: 2000 });
        }
      );
  };

  return (
    <div className="site-section">
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <form ref={form} onSubmit={sendEmail}>
              <div className="p-3 p-lg-5 border">
                <div className="container p-5 mb-4 bg-danger">
                  <h2 className="h3 mb-3 text-white">Contact Us</h2>
                </div>
                <div className="form-group row">
                  <div className="col-md-12">
                    <label htmlFor="c_lname" className="text-black">
                      Fullname <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="c_lname"
                      name="user_name"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-12">
                    <label htmlFor="c_email" className="text-black">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      className="form-control"
                      id="c_email"
                      name="user_email"
                      placeholder=""
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-12">
                    <label htmlFor="c_message" className="text-black">
                      Message{" "}
                    </label>
                    <textarea
                      name="message"
                      id="c_message"
                      cols="30"
                      required
                      rows="7"
                      className="form-control"
                    ></textarea>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <span>{done && "Thanks for Contacting me"}</span>
                    <input
                      type="submit"
                      className="btn btn-danger btn-lg btn-block"
                      value="Send Message"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-5 ml-auto">
            <div className="p-4 border mb-3">
              <span className="d-block text-danger h6 text-uppercase">
                Wukari, Taraba
              </span>
              <p className="mb-0">
                Breemolah Collection, beside education, opposite Akuka Palace,
                Wukari, Taraba, Nigeria
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
