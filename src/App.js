import './App.css';
import Button from '@restart/ui/esm/Button';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { Col, Form } from 'react-bootstrap';
import initializeAuthentication from './Firebase/firebase.initialize';
import { useState } from 'react';


initializeAuthentication();
const googleProvider = new GoogleAuthProvider();


function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // default value string
  const [isLogin, setIsLogin] = useState(false);
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
    e.preventDefault();

    if (password.length < 6) {
      setError('*** Password must be at least 6 characters long')
      return;
    }
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError('Ensure your password has two uppercase letters')
      return;
    }
    isLogin ? processLogin(email, password) : createNewUser(email, password);
    
  }

  const createNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(user);
        setError('');
        verifyEmail();
        setUserName();
      })
      .catch(error => {
        setError(error.message);
    })
  }

  const processLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(user);
        setError('');
      })
      .catch(error => {
        setError(error.message);
    })
  }

  const handleNameChange = e => {
    setName(e.target.value);
  }
  const handleEmailChange = e => {
    setEmail(e.target.value);
  }

  const handlePassword = e => {
    setPassword(e.target.value);
  }

  const toggleLogin = e => {
    setIsLogin(e.target.checked);
  }

  const setUserName = () => {
    updateProfile(auth.currentUser, { displayName: name })
      .then()
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {

      })
      .catch(error => {
        setError(error.message);
      })
  }

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError('');
      })
      .catch(error => {
        setError(error.message);
      })
  }

  return (
    <div>
      <Form onSubmit={handleSignUp} className="mt-5 me-5 ms-5">
        <h3 className="my-4 text-primary">Please {isLogin ? 'Log In' : 'Sign Up'}</h3>
        {
          !isLogin &&
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Name</Form.Label>
              <Form.Control onBlur={handleNameChange} placeholder="Your Name" />
            </Form.Group>
        }
        <Form.Group className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column>
            Email
          </Form.Label>
          <Col>
            <Form.Control onBlur={handleEmailChange} type="email" placeholder="Email" required/>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formHorizontalPassword">
          <Form.Label column>
            Password
          </Form.Label>
          <Col>
            <Form.Control onBlur={handlePassword} type="password" placeholder="Password" required/>
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formHorizontalCheck">
          <Col>
            <Form.Check onChange={toggleLogin} label="Already Registered?" />
            <p className="text-danger fw-bold">{error}</p>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3">
          <Col>
            <Button type="submit" className="btn btn-primary">{isLogin ? 'Log In' : 'Sign Up'}</Button>
            <Button onClick={handleResetPassword} className="mx-2 btn" size="sm"> reset password </Button>
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
