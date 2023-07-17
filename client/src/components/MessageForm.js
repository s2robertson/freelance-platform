import { useMemo } from "react";
import { useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import * as Yup from 'yup';

import { SEND_MESSAGE } from "../utils/mutations";
import FormInput from "./FormElements/FormInput";
import FormTextArea from "./FormElements/FormTextArea";
import stringifyReceiver from "../pages/Messages/stringifyReceiver";

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
        subject: props.subject || '',
        text: props.text || ''
    }), [props.receiver, props.subject, props.text]);

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
                    if (props.onFinished) {
                        props.onFinished();
                    }
                } catch (err) {
                    console.error(err);
                }
            }}
        >
            <Form>
                <p>To: {stringifyReceiver(props.receiver)}</p>
                <FormInput id='subject' name='subject' type='text' label='Subject:' />
                <FormTextArea id='text' name='text' label='Message content:' />
                <button 
                    type='submit'
                    className='border-2 p-1'
                >
                    Send Message
                </button>
                {props.onFinished ? (
                    <button
                        type='button'
                        className='border-2 p-1'
                        onClick={props.onFinished}
                    >
                        Cancel
                    </button>
                ) : null}
                {error ? (
                    <p>Sending message failed</p>
                ) : null}
            </Form>
        </Formik>
    )
}

export default MessageForm;