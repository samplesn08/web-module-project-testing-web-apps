import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    const page = render(<ContactForm />)
    const header = page.queryByText(/contact form/i)
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    const page = render(<ContactForm />)
    const firstName = page.getByLabelText('First Name*')
    userEvent.type(firstName, 'nick')
    const error = page.getByText(/error/i)
    expect(error).toBeInTheDocument()
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    const page = render(<ContactForm />)
    const button = page.getByRole('button')
    userEvent.click(button)
    const error1 = page.getByText(/error: firstName/i)
    expect(error1).toBeInTheDocument()
    const error2 = page.getByText(/error: lastName/i)
    expect(error2).toBeInTheDocument()
    const error3 = page.getByText(/error: email/i)
    expect(error3).toBeInTheDocument()
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    const page = render(<ContactForm />)
    const firstName = page.getByLabelText('First Name*')
    userEvent.type(firstName, 'nicholas')
    const lastName = page.getByLabelText('Last Name*')
    userEvent.type(lastName, 'samples')
    const button = page.getByRole('button')
    userEvent.click(button)
    const errorEmail = page.getByText(/error: email/i)
    expect(errorEmail).toBeInTheDocument()
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    const page = render(<ContactForm />)
    const email = page.getByLabelText('Email*')
    userEvent.type(email, 'asfbasjfk')
    const errorEmail = page.getByText(/error: email/i)
    expect(errorEmail).toBeInTheDocument()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    const page = render(<ContactForm />)
    const button = page.getByRole('button')
    userEvent.click(button)
    const errorLastName = page.getByText(/error: lastName/i)
    expect(errorLastName).toBeInTheDocument()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    const page = render(<ContactForm />)
    const firstName = page.getByLabelText('First Name*')
    userEvent.type(firstName, 'nicholas')
    const lastName = page.getByLabelText('Last Name*')
    userEvent.type(lastName, 'samples')
    const email = page.getByLabelText('Email*')
    userEvent.type(email, 'nick@nick.com')
    const button = page.getByRole('button')
    userEvent.click(button)
    const resultFirstName = page.getByTestId('firstnameDisplay')
    expect(resultFirstName).toBeInTheDocument()
    const message = page.queryByTestId('messageDisplay')
    expect(message).not.toBeInTheDocument()
});

test('renders all fields text when all fields are submitted.', async () => {
    const page = render(<ContactForm />)
    const firstName = page.getByLabelText('First Name*')
    userEvent.type(firstName, 'nicholas')
    const lastName = page.getByLabelText('Last Name*')
    userEvent.type(lastName, 'samples')
    const email = page.getByLabelText('Email*')
    userEvent.type(email, 'nick@nick.com')
    const message = page.getByLabelText('Message')
    userEvent.type(message, 'hello from the message')
    const button = page.getByRole('button')
    userEvent.click(button)
    const resultFirstName = page.getByTestId('firstnameDisplay')
    expect(resultFirstName).toBeInTheDocument()
    const resultLastName = page.getByTestId('lastnameDisplay')
    expect(resultLastName).toBeInTheDocument()
    const resultEmail = page.getByTestId('emailDisplay')
    expect(resultEmail).toBeInTheDocument()
    const resultMessage = page.getByTestId('messageDisplay')
    expect(resultMessage).toBeInTheDocument()
});