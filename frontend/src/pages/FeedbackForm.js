import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './FeedbackForm.css'; // Import custom CSS file for styling

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  message: Yup.string().required('Message is required'),
  rating: Yup.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5').required('Rating is required')
});

const FeedbackForm = () => {
  // Initial form values
  const initialValues = {
    name: '',
    email: '',
    message: '',
    rating: ''
  };

  // Form submission handler
  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission logic here (e.g., send data to backend)
    console.log('Form values:', values);
    resetForm(); // Reset form after submission
  };

  return (
    <div className="feedback-form-container">
      <h2>Feedback Form</h2>
      {/* Formik component to handle form state and validation */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {/* Render form using Formik components */}
        {({ values, setFieldValue }) => (
          <Form className="feedback-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="rating">Share your experience (1-5 stars)</label>
              <div className="star-rating">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={values.rating >= index + 1 ? 'filled' : ''}
                    onClick={() => setFieldValue('rating', index + 1)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <ErrorMessage name="rating" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <Field as="textarea" id="message" name="message" />
              <ErrorMessage name="message" component="div" className="error-message" />
            </div>
       
            <button type="submit" className="submit-button">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FeedbackForm;
