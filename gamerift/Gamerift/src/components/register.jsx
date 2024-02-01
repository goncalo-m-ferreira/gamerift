import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './registerdec.css';

class Register extends Component {

  state = {
    email: "",
    password: "",
  }

  handleEmailChange(evt) {
    this.setState({ email: evt.target.value });
  }

  handlePasswordChange(evt) {
    this.setState({ password: evt.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const email = this.state.email;
    const password = this.state.password;

    console.log('Email:', email);
    console.log('Password:', password);

    const url = 'https://api.sheety.co/182b17ec2dcc0a8d3be919b2baff9dfc/gamerift/folha1';
    const body = {
      folha1: {
        email: email,
        password: password,
      }
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const json = await response.json();
        console.log(json.folha1);
      } else {
        // Handle error response
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  render() {
    return (
      <div className="main_div">
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: 'transparent', marginTop: '3%' }}>
          <Row>
            <Col xs={12} md={12} className="bg-light rounded p-5">
              <Link to="/">
                <Button variant="secondary" className="exitBtn">Exit</Button>
              </Link>
              <h1 className="text-center mb-5" style={{ textAlign: 'center' }}>Register</h1>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" onChange={this.handleEmailChange.bind(this)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter your password" onChange={this.handlePasswordChange.bind(this)} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
