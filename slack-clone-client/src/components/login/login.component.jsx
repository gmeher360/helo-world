import React, { useState } from 'react'
// import { Container, Typography, FormControl, InputLabel, FormHelperText, Input } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { Form, Button } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import './login.styles.css';
import { LOGIN_USER_MUTATION } from '../../services/schema';


const Login = ({ history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [inputError, setInputError] = useState({})
    const [buttonState, setButtonState] = useState(true)

    const [loginUser, { data }] = useMutation(LOGIN_USER_MUTATION);

    const handleClick = async (e) => {

        setButtonState(false); //disable button untill this functions executed
        e.preventDefault(); // stops default browser behviour including auto redirect.
        const form = document.querySelector('form'); // trigger default form validation.
        if (!form.reportValidity()) {
            setButtonState(true)
            return;
        }
        console.log('logging in')
        const response = await loginUser({
            variables: {
                email: email,
                password: password
            }
        })
        setPassword('')
        console.log(response)
        const { ok, errors, currentToken, refreshToken } = response.data.loginUser;
        console.log(errors)
        if (ok) {
            localStorage.setItem("token", currentToken)
            localStorage.setItem('refreshToken', refreshToken)
            history.push('/about')
        } else {
            const err = {}
            errors.forEach(({ path, message }) => {
                if (err[path] == null) {
                    err[path] = []
                }
                err[path] = [...err[path], message]
            });

            setInputError(err)

        }
        setButtonState(true)
    }

    return (

        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', maxWidth: '400px' }}  >
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        className={`login__FormControl ${inputError.email ? 'input-error' : ''}`}
                        as="input"
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-danger">
                        <ul style={{ paddingLeft: '20px' }}>
                            {inputError.email ? inputError.email.map((err, i) => <li key={i}> {err} </li>) : null}
                        </ul>
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        className={`login__FormControl ${inputError.password ? 'input-error' : null}`}
                        type="password"
                        placeholder="Password"
                        as="input"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-4"
                    />
                </Form.Group>
                <Button className="login__FormButton" disabled={!(email && password && buttonState)} variant="primary" type="submit" onClick={handleClick}>
                    Sign in
                </Button>
            </Form>
            <p>new to Slack ? <span><Link to="/get-started">Sign-up here</Link></span></p>
        </div>

    )
}

export default withRouter(Login)