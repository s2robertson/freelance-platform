import { useMemo } from "react";
import { useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import * as Yup from 'yup';

import { SEND_MESSAGE } from "../utils/mutations";
import FormInput from "./FormElements/FormInput";
import FormTextArea from "./FormElements/FormTextArea";

const validationSchema = Yup.object({
    receiver: Yup.array(Yup.object({
        _id: Yup.string()
            .required(),
        username: Yup.string()
            .required()
    })).min(1, 'Missing receiver(s)'),
    subject: Yup.string()
        .trim()
        .required('Required'),
    text: Yup.string()
        .trim()
        .required('Required')
})

function MessageForm(props) {
    const [sendMessage, { error }] = useMutation(SEND_MESSAGE);

    const initialValues = useMemo(() => ({
        receiver: props.receiver,
        subject: '',
        text: ''
    }), [props.receiver]);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                try {
                    await sendMessage({
                        variables: {
                            ...values,
                            receiverIds: values.receiver.map(({ _id }) => _id)
                        }
                    });
                } catch (err) {
                    console.error(err);
                }
            }}
        >
            <Form>
                <p>To: {props.receiver.username}</p>
                <FormInput id='subject' name='subject' type='text' label='Subject:' />
                <FormTextArea id='text' name='text' label='Message content:' />
                <button 
                    type='submit'
                    className='border-solid border-2 p-1'
                >
                    Send Message
                </button>
                {error ? (
                    <p>Sending message failed</p>
                ) : null}
            </Form>
        </Formik>
    )
}

export default MessageForm;