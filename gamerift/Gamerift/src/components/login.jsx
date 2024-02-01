import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Admin from './Admin';
import { Link } from 'react-router-dom';

class Login extends Component {

    state={
        email: "",
        password: "",
    }

    handleEmailChange(evt){
        this.setState({email: evt.target.value});
      }

      handlePasswordChange(evt){
        this.setState({password: evt.target.value});
      }

      handleLogin = async (event) => {
        event.preventDefault();

        const email = this.state.email;
        const password = this.state.password;

        // Adicione a lógica para verificar se é o login do admin
        if (email === "admin" && password === "123") {
          // Se for admin, redirecione para a rota de admin
          this.setState({ isAdmin: true });
          return;
        }

        const token = false;

        const body = {
            folha1: {
              email: email,
              password: password,
            }
          };

        let url = 'https://api.sheety.co/182b17ec2dcc0a8d3be919b2baff9dfc/gamerift/folha1';
                
        fetch(url)
        .then(async (response) => {
        if (response.ok) {
            try {
            const usersText = await response.text();
            const users = JSON.parse(usersText);
            const userss = users.folha1;
            console.log(users);
            for (const user of userss) {
                console.log(user);
                if (user.email === this.state.email && user.password === this.state.password) {
                    window.location.replace('/');
                  break;
                }
              }
            } catch (jsonError) {
                console.error('Error parsing JSON:', jsonError.message);
              }

              return token;
        } else {
            throw new Error('Authentication failed');
        }
        
        })
        .then(async (json) => {
        console.log(json.folha1);
        })
        .catch((error) => {
        console.error('Error during authentication:', error.message);
        });}


  render() {

    if (this.state.isAdmin) {
      return <Admin />;
    }

    return (
      <div className="main_div">
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: 'transparent', marginTop: '3%' }}>
          <Row>
            <Col xs={12} md={12} className="bg-light rounded p-5">
            <Link to="/">
                <Button variant="secondary" className="exitBtn">Exit</Button>
              </Link>
              <h1 className="text-center mb-5" style={{ textAlign: 'center' }}>Iniciar Sessão</h1>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" onChange={this.handleEmailChange.bind(this)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter your password" onChange={this.handlePasswordChange.bind(this)}/>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={this.handleLogin}>
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


export default Login;
