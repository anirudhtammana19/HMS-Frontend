import React, { useRef } from 'react';
import './Contact.css';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  
  let navigate = useNavigate();
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    notification.success({
      message: "Message Sent",
      description: "Thank you for your feedback! We will contact you soon if necessary.",
      placement: "top",
    });
    if (formRef.current) {
      formRef.current.reset();
    }
    navigate('/');
  };

  return (
    <section className="contact-form">
      <h2>Send Us a Message</h2>
      <form ref={formRef}>
        <div className="form-row">
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
        </div>
        <div className="form-row">
          <input type="text" placeholder="Mobile Number" required />
          <input type="email" placeholder="Email" required />
        </div>
        <textarea placeholder="Message"></textarea>
        <button onClick={handleSubmit} type="submit">Send</button>
      </form>
    </section>
  );
};

export default Contact;
