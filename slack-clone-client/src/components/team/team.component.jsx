import React, { useState } from 'react'
// import { Container, Typography, FormControl, InputLabel, FormHelperText, Input } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { Form, Button } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import './team.styles.css';
import { CREATE_TEAM_MUTATION } from '../../services/schema';


const Team = ({ history }) => {

    const [team, setTeam] = useState('')
    const [inputError, setInputError] = useState({})
    const [buttonState, setButtonState] = useState(true)

    const [createTeam, { data }] = useMutation(CREATE_TEAM_MUTATION);

    const handleClick = async (e) => {

        setButtonState(false); //disable button untill this functions executed
        e.preventDefault(); // stops default browser behviour including auto redirect.
        const form = document.querySelector('form'); // trigger default form validation.
        if (!form.reportValidity()) {
            setButtonState(true)
            return;
        }
        console.log('creating Team')
        const response = await createTeam({
            variables: {
                name: team,
            }
        })
        console.log(response)
        const { ok, errors } = response.data.createTeam;
        console.log(errors)
        if (ok) {
            history.push('/')
        } else if (!errors) {
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
                    <Form.Label>Team name</Form.Label>
                    <Form.Control
                        className={`team__FormControl ${inputError.email ? 'input-error' : ''}`}
                        as="input"
                        type="text"
                        placeholder="Enter team name"
                        name="team"
                        value={team}
                        onChange={(e) => setTeam(e.target.value)}
                    />
                    <Form.Text className="text-danger">
                        <ul style={{ paddingLeft: '20px' }}>
                            {inputError.name ? inputError.name.map((err, i) => <li key={i}> {err} </li>) : null}
                        </ul>
                    </Form.Text>
                </Form.Group>

                <Button className="team__FormButton" disabled={!(team && buttonState)} variant="primary" type="submit" onClick={handleClick}>
                    Sign in
                </Button>
            </Form>
            {/* <p>new to Slack ? <span><Link to="/get-started">Sign-up here</Link></span></p> */}
        </div>

    )
}

export default withRouter(Team)