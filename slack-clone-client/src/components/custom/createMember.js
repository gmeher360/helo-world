import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { CREATE_MEMBER, CREATE_CHANNEL } from '../../services/schema';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

function CreateMemberModal({ currentTeam, ...props }) {
    const [createMember, { data }] = useMutation(CREATE_MEMBER);
    const [memberEmail, setMemberEmail] = useState('')
    const [inputError, setInputError] = useState({})
    const [buttonState, setButtonState] = useState(true)
    const history = useHistory()
    const inputEl = useRef(null)
    useEffect(() => {
        if (props.show) {
            inputEl.current.focus();
        }
    }, [props.show])

    const handleClick = async (e) => {

        setButtonState(false); //disable button untill this functions executed
        e.preventDefault(); // stops default browser behviour including auto redirect.
        const form = document.querySelector('#create-member__form'); // trigger default form validation.
        if (!form.reportValidity()) {
            setButtonState(true)
            return;
        }
        console.log('creating Member')
        const response = await createMember({
            variables: {
                teamId: currentTeam.id,
                email: memberEmail
            }
        })
        const { ok, errors } = response.data.createMember;
        console.log(response)
        if (ok) {
            setMemberEmail('')
            props.onHide()
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
                    Add Member
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ border: 'none' }} >
                <Form id="create-member__form">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            className={`team__FormControl }`}
                            as="input"
                            type="email"
                            placeholder="Enter member's Email"
                            name="member-email"
                            ref={inputEl}
                            value={memberEmail}
                            onChange={(e) => setMemberEmail(e.target.value)}
                        />
                        <Form.Text className="text-danger">
                            <ul style={{ paddingLeft: '20px' }}>
                                {inputError.email ? inputError.email.map((err, i) => <li key={i}> {err} </li>) : null}
                            </ul>
                        </Form.Text>
                    </Form.Group>
                    <Button className="team__FormButton" disabled={!(memberEmail && buttonState)} variant="primary" type="submit" onClick={handleClick}>
                        Add Member
                     </Button>
                </Form>
            </Modal.Body>
        </Modal >
    );
}

export default CreateMemberModal