import React, { useState } from "react";
import { Form, Button, Container, Col, Row, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      console.log(response);
      setMessage(response.data.message);
      alert(response.data);
      if (response.data === "Login successfully") {
        navigate("/home");
      }
    } catch (error) {
      setMessage("Error logging in");
    }
  };

  return (
    <Container className="main-container">
      <Row className="justify-content-md-center">
        <Col md="4">
          <Form className="main-form" onSubmit={handleSubmit}>
            <h2 className="text-center py-2">Login Form</h2>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button className="login-btn" variant="primary" type="submit">
              Login
            </Button>
            <spam>Don't have an account?</spam>
            <Link to="/register">Register</Link>
          </Form>
          {message && <p>{message}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
