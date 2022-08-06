import { useState } from 'react'
import FormMessaging from './formMessaging'

function ContactForm() {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSuccess, setIsSuccess] = useState(true)
    const [name, setName ] = useState('')
    const [email, setEmail] = useState('')
    const [ isValid, setIsValid ] = useState(false)

    function validateForm() {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (
            !email.match(emailRegex) || email.length < 3 || name.length < 1
        ) setIsValid(false)
        else setIsValid(true)
    }

    console.log(name)
    console.log(email)

    return (
        <div>
            <h2>Contact Us</h2>
            <label>
                Name
                <input type='text' placeholder="Jane Doe" onChange={(event) => {setName(event.target.value); validateForm()}}/>
            </label>
            <label>
                Email
                <input type='email' placeholder="JaneDoe@gmail.com"onChange={(event) => {setEmail(event.target.value); validateForm()}}/>
            </label>
            <button disabled={!isValid} onClick={() => {
                validateForm() 
                setIsSubmitted(true)
            }}>
                Submit
            </button>
            {
                isSubmitted && isSuccess && isValid && (<FormMessaging isError={false} content="Thanks for your details, we'll be in touch!" />)
            }
            {
                isSubmitted && !isSuccess && (<FormMessaging isError content="Oops, something went wrong, please try again later."/>)
            }
            {
                !isSubmitted && !isValid && (<FormMessaging isError content="Please fill in the form"/>)
            }
        </div>
    )
}

export default ContactForm