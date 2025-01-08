import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import './form.css';


function Form() {
  const [formData, setFormData] = useState({
    company_name: '',
    company_type: '',
    company_reg_number: '',
    pan: '',
    gst_number: '',
    first_name: '',
    last_name: '',
    designation: '',
    email: '',
    mobile: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zip_code: '',
  });

  const [errors, setErrors] = useState({
    company_name: '',
    pan: '',
    email: '',
    mobile: '',
  });

  const [formError, setFormError] = useState(''); // Global form error message

  // Regular expressions for validation
  const nameRegex = /^[a-zA-Z\s]+$/; // Allows only letters and spaces
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Standard email pattern
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // PAN format
  const mobileRegex = /^[0-9]{10}$/; // 10-digit mobile number

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate each field when its value changes
    switch (name) {
      case 'company_name':
        setErrors({
          ...errors,
          company_name: value ? '' : 'Company name is required.',
        });
        break;
      case 'email':
        setErrors({
          ...errors,
          email: emailRegex.test(value) ? '' : 'Enter a valid email address.',
        });
        break;
      case 'pan':
        setErrors({
          ...errors,
          pan: panRegex.test(value) ? '' : 'PAN should be in the format: ABCDE1234F.',
        });
        break;
      case 'mobile':
        setErrors({
          ...errors,
          mobile: mobileRegex.test(value) ? '' : 'Mobile should be a 10-digit number.',
        });
        break;
      default:
        break;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are valid before submission
    const isValid =
      !errors.company_name &&
      !errors.email &&
      !errors.pan &&
      !errors.mobile &&
      formData.company_name &&
      formData.pan &&
      formData.email &&
      formData.mobile &&
      formData.company_type &&
      formData.company_reg_number &&
      formData.gst_number &&
      formData.first_name &&
      formData.last_name &&
      formData.designation &&
      formData.address &&
      formData.country &&
      formData.state &&
      formData.city &&
      formData.zip_code;

    if (isValid) {
      setFormError(''); // Clear form error if everything is valid

      try {
        // Use axios to send the POST request
        const response = await axios.post('http://localhost:5000/submit-form', formData);

        if (response.status === 200) {
          alert('Form submitted successfully!');
        } else {
          alert(response.data.message || 'Failed to submit form');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error submitting the form. Please try again later.');
      }
    } else {
      setFormError('Please fill out all fields correctly.');
    }
  };

  return (
    <div className="form_container">
      <form onSubmit={handleSubmit}>
        <h3>Company details</h3>

        <div className="form_group">
          <label htmlFor="company_name">Company Name:</label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
          />
          {errors.company_name && <div style={{ color: 'red' }}>{errors.company_name}</div>}
        </div>

        <div className="form_group">
          <label htmlFor="company_type">Company Type:</label>
          <input
            type="text"
            id="company_type"
            name="company_type"
            value={formData.company_type}
            onChange={handleChange}
          />
        </div>

        <div className="form_group">
          <label htmlFor="company_reg_number">Company Registration Number:</label>
          <input
            type="text"
            id="company_reg_number"
            name="company_reg_number"
            value={formData.company_reg_number}
            onChange={handleChange}
          />
        </div>

        <div className="form_group">
          <label htmlFor="pan">PAN:</label>
          <input
            type="text"
            id="pan"
            name="pan"
            value={formData.pan}
            onChange={handleChange}
          />
          {errors.pan && <div style={{ color: 'red' }}>{errors.pan}</div>}
        </div>

        <div className="form_group">
          <label htmlFor="gst_number">GST Number:</label>
          <input
            type="text"
            id="gst_number"
            name="gst_number"
            value={formData.gst_number}
            onChange={handleChange}
          />
        </div>

        <h3>Contact Details</h3>

        <div className="form_group">
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>

        <div className="form_group">
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>

        <div className="form_group">
          <label htmlFor="designation">Designation:</label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
          />
        </div>

        <div className="form_group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </div>

        <div className="form_group">
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <div style={{ color: 'red' }}>{errors.mobile}</div>}
        </div>

        <h3>Address</h3>

        <div className="form_group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="form_group">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <div className="form_group">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>

        <div className="form_group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div className="form_group">
          <label htmlFor="zip_code">Zip Code:</label>
          <input
            type="number"
            id="zip_code"
            name="zip_code"
            value={formData.zip_code}
            onChange={handleChange}
          />
        </div>

        {/* Display global error message if form is invalid */}
        {formError && <div style={{ color: 'red' }}>{formError}</div>}

        <button type="submit" disabled={!!formError}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
