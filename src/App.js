import './App.css';
import Button from '@restart/ui/esm/Button';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Col, Form, Row } from 'react-bootstrap';
import initializeAuthentication from './Firebase/firebase.initialize';

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();


function App() {
  const auth = getAuth();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleSignUp = e => {
    console.log('Sign Up Bhai');
    e.preventDefault();
  }
  const handleEmailChange = e => {
    console.log(e.target.value);
  }

  return (
    <div>
      <Form onSubmit={handleSignUp} className="mt-5 me-5 ms-5">
        <h3 className="my-4 text-primary">Please Sign Up</h3>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control onChange={handleEmailChange} type="email" placeholder="Email" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="password" placeholder="Password" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check label="Remember me" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" className="btn btn-primary">Sign in</Button>
          </Col>
        </Form.Group>
      </Form>
      <div>
        <br /><br /><br /> <br /><br /><br />
      </div>
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
    </div>
  );
}

export default App;
