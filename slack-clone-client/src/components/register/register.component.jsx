import React, { useState } from 'react'
// import { Container, Typography, FormControl, InputLabel, FormHelperText, Input } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { Form, Button } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import './register.styles.css';
import { REGISTER_USER_MUTATION } from '../../services/schema';


const Register = ({ history }) => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [inputError, setInputError] = useState({})
    const [buttonState, setButtonState] = useState(true)

    const [registerUser, { data }] = useMutation(REGISTER_USER_MUTATION);

    const handleClick = async (e) => {

        setButtonState(false); //disable button untill this functions executed
        e.preventDefault(); // stops default browser behviour including auto redirect.
        const form = document.querySelector('form'); // trigger default form validation.
        if (!form.reportValidity()) {
            setButtonState(true)
            return;
        }
        console.log('registering')
        const response = await registerUser({
            variables: {
                username: username,
                email: email,
                password: password
            }
        })
        setPassword('')
        console.log(response)
        const { ok, errors } = response.data.registerUser;
        console.log(errors)
        if (ok) {
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
                        className={`register__FormControl ${inputError.email ? 'input-error' : ''}`}
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

                <Form.Group controlId="formBasicUserName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        className={`register__FormControl ${inputError.username ? 'input-error' : ''}`}
                        as="input"
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Text className="text-danger">
                        <ul style={{ paddingLeft: '20px' }}>
                            {inputError.username ? inputError.username.map((err, i) => <li key={i}> {err} </li>) : null}
                        </ul>
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        className={`register__FormControl ${inputError.password ? 'input-error' : null}`}
                        type="password"
                        placeholder="Password"
                        as="input"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-4"
                    />
                </Form.Group>
                <Button className="register__FormButton" disabled={!(email && username && password && buttonState)} variant="primary" type="submit" onClick={handleClick}>
                    Submit
                </Button>
            </Form>
            <p>already a user ? <span><Link to="/">Sign-in here</Link></span></p>
        </div>

    )
}

export default withRouter(Register)