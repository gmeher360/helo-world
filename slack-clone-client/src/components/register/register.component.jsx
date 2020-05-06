import React, { useState } from 'react'
// import { Container, Typography, FormControl, InputLabel, FormHelperText, Input } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import { Form, Button } from 'react-bootstrap';


export default function Register() {

    const REGISTER_USER_MUTATION = gql`
        mutation($username: String!, $email: String!, $password: String!) {
            registerUser(username:$username, email:$email, password:$password)
        }
    `;

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [registerUser, { data }] = useMutation(REGISTER_USER_MUTATION);

    const handleClick = async (e) => {
        e.preventDefault();
        const response = await registerUser({
            variables: {
                username: username,
                email: email,
                password: password
            }
        })
        setPassword('')
        console.log(response)
    }
    return (

        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}  >
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        as="input"
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicUserName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        as="input"
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        as="input"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleClick}>
                    Submit
                </Button>
            </Form>
        </div>

    )
}
