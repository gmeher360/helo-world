import React, { useState } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { CREATE_CHANNEL } from '../../services/schema';
import { useMutation } from '@apollo/client';
import { withRouter } from 'react-router-dom';

function MyVerticallyCenteredModal({ currentTeam, history, ...props }) {
    const [createChannel, { data }] = useMutation(CREATE_CHANNEL);
    const [channelName, setChannelName] = useState('')
    const [inputError, setInputError] = useState({})
    const [buttonState, setButtonState] = useState(true)
    const handleClick = async (e) => {

        setButtonState(false); //disable button untill this functions executed
        e.preventDefault(); // stops default browser behviour including auto redirect.
        const form = document.querySelector('form'); // trigger default form validation.
        if (!form.reportValidity()) {
            setButtonState(true)
            return;
        }
        console.log('creating Channel')
        const response = await createChannel({
            variables: {
                teamId: currentTeam.id,
                name: channelName
            }
        })
        console.log(response)
        const { ok, errors, channel } = response.data.createChannel;
        console.log(errors)
        if (ok && channel) {
            props.onHide()
            history.push(`/view-team/${currentTeam.id}/${channel.id}`)
        }
        if (errors) {
            console.log(errors)
            const err = {}
            if (errors[0].path == 'auth') {
                // alert(ERROR.AUTH_ERROR);
                history.push('/login')
            }
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
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header style={{ border: 'none' }} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Channel
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ border: 'none' }} >
                <Form>
                    <Form.Group controlId="formBasicChannel">
                        <Form.Control
                            className={`team__FormControl }`}
                            as="input"
                            type="text"
                            placeholder="Enter channel name"
                            name="channel-name"
                            value={channelName}
                            onChange={(e) => setChannelName(e.target.value)}
                        />
                        {/* <Form.Text className="text-danger">
                            <ul style={{ paddingLeft: '20px' }}>
                                {inputError.name ? inputError.name.map((err, i) => <li key={i}> {err} </li>) : null}
                            </ul>
                        </Form.Text> */}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer style={{ border: 'none' }}>
                <Button className="team__FormButton" disabled={!(channelName && buttonState)} variant="primary" type="submit" onClick={handleClick}>
                    Create Channel
                </Button>
            </Modal.Footer>
        </Modal >
    );
}

export default withRouter(MyVerticallyCenteredModal)