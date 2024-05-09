// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import toastify css
// import './FeedbackForm.css'; // Import custom CSS file for styling

// const FeedbackForm = () => {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [editingFeedback, setEditingFeedback] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//   useEffect(() => {
//     fetchFeedbacks();
//   }, []);

//   const fetchFeedbacks = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/feedback');
//       setFeedbacks(response.data);
//     } catch (error) {
//       console.error('Error fetching feedback data:', error);
//       toast.error('Error fetching feedback data');
//     }
//   };

//   const openEditModal = (feedback) => {
//     setEditingFeedback(feedback);
//     setIsEditModalOpen(true);
//   };

//   const closeEditModal = () => {
//     setEditingFeedback(null);
//     setIsEditModalOpen(false);
//   };

//   const validationSchema = Yup.object().shape({
//     name: Yup.string().required('Name is required'),
//     email: Yup.string().email('Invalid email address').required('Email is required'),
//     message: Yup.string().required('Message is required'),
//     rating: Yup.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5').required('Rating is required')
//   });

//   const initialValues = {
//     name: '',
//     email: '',
//     message: '',
//     rating: ''
//   };

//   const handleSubmit = async (values, { resetForm }) => {
//     try {
//       if (editingFeedback) {
//         await axios.put(`http://localhost:5000/api/feedback/${editingFeedback._id}`, values);
//         toast.success('Feedback updated successfully');
//       } else {
//         await axios.post('http://localhost:5000/api/feedback', values);
//         toast.success('Feedback added successfully');
//       }
//       resetForm();
//       fetchFeedbacks();
//       closeEditModal();
//     } catch (error) {
//       console.error('Error submitting feedback:', error);
//       toast.error('Error submitting feedback');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/feedback/${id}`);
//       toast.success('Feedback deleted successfully');
//       fetchFeedbacks();
//     } catch (error) {
//       console.error('Error deleting feedback:', error);
//       toast.error('Error deleting feedback');
//     }
//   };

//   return (
//     <>
//       <div className="feedback-form-container">
//         <ToastContainer />
//         <h2>Feedback Form</h2>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ values, setFieldValue }) => (
//             <Form className="feedback-form">
//               <div className="form-group">
//                 <label htmlFor="name">Name</label>
//                 <Field type="text" id="name" name="name" />
//                 <ErrorMessage name="name" component="div" className="error-message" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <Field type="email" id="email" name="email" />
//                 <ErrorMessage name="email" component="div" className="error-message" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="rating">Share your experience (1-5 stars)</label>
//                 <div className="star-rating">
//                   {[...Array(5)].map((_, index) => (
//                     <span
//                       key={index}
//                       className={values.rating >= index + 1 ? 'filled' : ''}
//                       onClick={() => setFieldValue('rating', index + 1)}
//                     >
//                       ★
//                     </span>
//                   ))}
//                 </div>
//                 <ErrorMessage name="rating" component="div" className="error-message" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="message">Message</label>
//                 <Field as="textarea" id="message" name="message" />
//                 <ErrorMessage name="message" component="div" className="error-message" />
//               </div>
//               <button type="submit" className="submit-button">Submit</button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//       {/* Feedback List */}
//       <div className="feedback-table">
//         <h2>Feedback List</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>No</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Rating</th>
//               <th>Message</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {feedbacks.map((feedback, index) => (
//               <tr key={feedback._id}>
//                 <td>{index + 1}</td>
//                 <td>{feedback.name}</td>
//                 <td>{feedback.email}</td>
//                 <td>{feedback.rating}</td>
//                 <td>{feedback.message}</td>
//                 <td>
//                   <button onClick={() => openEditModal(feedback)}>Edit</button>
//                   <button onClick={() => handleDelete(feedback._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {/* Edit Modal */}
//       {isEditModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <div className="modal-content">
//               <h2>Edit Feedback</h2>
//               <Formik
//                 initialValues={editingFeedback || initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={handleSubmit}
//               >
//                 {({ values, setFieldValue }) => (
//                   <Form className="feedback-form">
//                     <div className="form-group">
//                       <label htmlFor="name">Name</label>
//                       <Field type="text" id="name" name="name" />
//                       <ErrorMessage name="name" component="div" className="error-message" />
//                     </div>
//                     <div className="form-group">
//                       <label htmlFor="email">Email</label>
//                       <Field type="email" id="email" name="email" />
//                       <ErrorMessage name="email" component="div" className="error-message" />
//                     </div>
//                     <div className="form-group">
//                       <label htmlFor="rating">Share your experience (1-5 stars)</label>
//                       <div className="star-rating">
//                         {[...Array(5)].map((_, index) => (
//                           <span
//                             key={index}
//                             className={values.rating >= index + 1 ? 'filled' : ''}
//                             onClick={() => setFieldValue('rating', index + 1)}
//                           >
//                             ★
//                           </span>
//                         ))}
//                       </div>
//                       <ErrorMessage name="rating" component="div" className="error-message" />
//                     </div>
//                     <div className="form-group">
//                       <label htmlFor="message">Message</label>
//                       <Field as="textarea" id="message" name="message" />
//                       <ErrorMessage name="message" component="div" className="error-message" />
//                     </div>
//                      <div>
//                     <button type="submit" className="submit-button">Update</button>
//                     <button onClick={closeEditModal} className="cancel-button">Cancel</button>
//                     </div>
//                   </Form>
//                 )}
//               </Formik>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default FeedbackForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('form');

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/feedback');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedback data:', error);
      toast.error('Error fetching feedback data');
    }
  };

  const openEditModal = (feedback) => {
    setEditingFeedback(feedback);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingFeedback(null);
    setIsEditModalOpen(false);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    message: Yup.string().required('Message is required'),
    rating: Yup.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5').required('Rating is required')
  });


  const [loggedInUserEmail, setLoggedInUserEmail] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data.email : '');
  const [loggedInUsername, setLoggedInUsername] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data.username : '');

  // useEffect(() => {
  //   // Retrieve login state and email from localStorage
  //   const token = localStorage.getItem('token');
  //   const user = localStorage.getItem('user');
  //   if (token && user) {
  //     const userData = JSON.parse(user);
  //     setLoggedInUserEmail(userData.data.email);
  //     setLoggedInUsername(userData.data.username);
   
  //   }

  // }, []);

  const initialValues = {
    name: loggedInUsername,
    email: loggedInUserEmail,
    message: '',
    rating: ''
  };
 
  
  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (editingFeedback) {
        await axios.put(`http://localhost:5000/api/feedback/${editingFeedback._id}`, values);
        toast.success('Feedback updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/feedback', values);
        toast.success('Feedback added successfully');
      }
      resetForm();
      fetchFeedbacks();
      closeEditModal();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Error submitting feedback');
    }
  
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${id}`);
      toast.success('Feedback deleted successfully');
      fetchFeedbacks();
    } catch (error) {
      console.error('Error deleting feedback:', error);
      toast.error('Error deleting feedback');
    }
  };

  const c=0;

  return (
    <>
      <div className="tab-container">
        <button className={activeTab === 'form' ? 'active' : ''} onClick={() => setActiveTab('form')}>Feedback Form</button>
        <button className={activeTab === 'list' ? 'active' : ''} onClick={() => setActiveTab('list')}>Feedback List</button>
      </div>
      {activeTab === 'form' && (
        <div className="feedback-form-container">
          <ToastContainer />
          <h2>Feedback Form</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className="feedback-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <Field type="text" id="name" name="name" value={loggedInUsername} readOnly />
                  <ErrorMessage name="name" component="div" className="error-message" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field type="email" id="email" name="email" value={loggedInUserEmail} readOnly />
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
      )}
      {activeTab === 'list' && (
        <div className="feedback-table">
          <ToastContainer />
          <h2>Feedback List</h2>
       
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Rating</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {/* {feedbacks.length === 0 && activeTab === 'list' && (
                <p>No feedback available.</p>
              )} */}
            {feedbacks.filter(feedback => feedback.email === loggedInUserEmail).length === 0 && activeTab === 'list' && (
              <p>No feedback available.</p>
            )}

              {/* {feedbacks.map((feedback, index) => (
             
                   feedback.email === loggedInUserEmail && ( */}
                     {feedbacks
                  .filter(feedback => feedback.email === loggedInUserEmail)
                  .map((feedback, index) => (
                    
                <tr key={feedback._id}>
                  <td>{index + 1}</td>
                  <td>{feedback.name}</td>
                  <td>{feedback.email === loggedInUserEmail ? loggedInUserEmail : 'Anonymous'}</td>
                  <td>{feedback.rating}</td>
                  <td className='message'>{feedback.message}</td>
                  <td>
                    <button onClick={() => openEditModal(feedback)}>Edit</button>
                    <button onClick={() => handleDelete(feedback._id)}>Delete</button>
                  </td>
                </tr>
                  // )
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h2>Edit Feedback</h2>
              <Formik
                initialValues={editingFeedback || initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue }) => (
                  <Form className="feedback-form">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <Field type="text" id="name" name="name" value={loggedInUsername} readOnly />
                      <ErrorMessage name="name" component="div" className="error-message" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field type="email" id="email" name="email" value={loggedInUserEmail} readOnly/>
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
                    <div>
                      <button type="submit" className="submit-button">Update</button>
                      <button onClick={closeEditModal} className="cancel-button">Cancel</button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackForm;

