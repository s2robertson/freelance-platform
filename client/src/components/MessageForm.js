import { useMemo } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate();

  const [sendMessage, { error }] = useMutation(SEND_MESSAGE);

  const initialValues = useMemo(() => ({
    receiver: props.receiver,
    subject: props.subject || '',
    text: props.text || ''
  }), [props.receiver, props.subject, props.text]);

  return (
    <div className="block -ml-1 text-left max-w-4xl justify-center p-8 my-5 bg-gray-50 border border-gray-300 rounded-lg shadow-xl">
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
              navigate(0);
            }
          } catch (err) {
            console.error(err);
          }
        }}
      >
        <Form>
          <p>To: {stringifyReceiver(props.receiver)}</p>
          <FormInput id='subject' name='subject' type='text' label='Subject:' />
          <FormTextArea id='text' name='text' label='Message content: ' />
          <div className="mt-2">
            <button
              type='submit'
              className="border border-solid border-gray-300 bg-blue-500 py-1 px-3 w-auto text-white hover:bg-blue-600 rounded-md"
            >
              Send Message
            </button>
            {props.onFinished ? (
              <button
                type='button'
                className="border border-solid border-gray-300 bg-red-500 py-1 px-3 w-auto text-white hover:bg-red-600 rounded-md"
                onClick={props.onFinished}
              >
                Cancel
              </button>
            ) : null}
          </div>
          {error ? (
            <p className="error">Sending message failed</p>
          ) : null}
        </Form>
      </Formik>
    </div>
  )
}

export default MessageForm;