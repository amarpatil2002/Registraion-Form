import React ,{useState} from 'react'
import { Form, Button, Container,Row , Col } from 'react-bootstrap';
import {Link , useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Register.css'

const Register = () => {
    const [formData, setFormData] = useState({
      name: '',
      dateOfBirth: '',
      email: '',
      password: ''
    });
    const navigate = useNavigate()
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Handle form submission logic here

      try {
        const response = await axios.post('http://localhost:5000/register', formData);
        // console.log(response.data);
        // alert(response.data);
        navigate('/login')
      } catch (error) {
        console.error('Something went wrong', error);
      }

      console.log(formData);
    };
  
    return (
      <Container className='main-container'>
        <Row className='justify-content-md-center '>
          <Col md='4'>
          <Form className='register-form' onSubmit={handleSubmit}>
          <Form.Group controlId="formName" className="mb-2">
          <h1 className="py-1 text-center">Registration Form</h1>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </Form.Group>
  
          <Form.Group controlId="formDateOfBirth" className="mb-2">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </Form.Group>
  
          <Form.Group controlId="formEmail" className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </Form.Group>
  
          <Form.Group controlId="formPassword" className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </Form.Group>
  
          <Button className='register-btn' variant="primary" type="submit">
            Register
          </Button>
          <span>Already have an account </span>
          <Link to='/login' >Login Now</Link>
        </Form>
          </Col>
        </Row>
        
      </Container>
    );
  };

export default Register



