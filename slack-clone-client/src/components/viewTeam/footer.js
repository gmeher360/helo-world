import React from 'react'
import styled from 'styled-components'
import { Form, Button } from 'react-bootstrap'
import { ReactComponent as SendIcon } from '../../static/send.svg';
export default function Footer() {
    return (
        <StyledFooter>

            <Form>
                <FormWrapper>
                    <Form.Group style={{ flexGrow: 1 }} controlId="formBasicMessage">
                        <Form.Control as="input" type="text" placeholder="" />
                    </Form.Group>
                    <ButtonWrapper type="submit">
                        <SendIcon />
                    </ButtonWrapper>
                </FormWrapper>

            </Form>
        </StyledFooter>
    )
}


const StyledFooter = styled.div`
    grid-column: 2/3;
    grid-row: 12/13;
    background-color: #E6F0E6;
`
const FormWrapper = styled.div`
padding-top: 10px;
    display: flex;
    align-items:baseline;
    justify-content:center;
    height: 100%;
`
const ButtonWrapper = styled.button`
    font-size: 20px;
    width: 40px;
    margin: 0px 10px;
    border: none;
    &:active{
        transform: scale(0.90);
        border: none;
    }
    &:focus{
        border:none;
        outline:none;
    }
`