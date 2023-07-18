import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import FormInput from '../../components/FormElements/FormInput';
import FormTextArea from '../../components/FormElements/FormTextArea';
import SkillPicker from '../../components/SkillPicker';

const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .required('Required'),
  email: Yup.string()
    .trim()
    .email('Invalid email')
    .required('Required'),
  profileDescription: Yup.string()
    .trim()
    .required('Required'),
  skills: Yup.array(Yup.object({
    _id: Yup.string()
      .required(),
    name: Yup.string()
      .required()
  })).ensure()
});

function ProfileForm(props) {

  return (
    <>
      <h1 className='text-5xl ml-16 mt-16'>Edit Profile</h1>
      <div className="block max-w-4xl p-6 mt-14 rounded-2xl mb-10 ml-16 bg-gray-100 border border-gray-200 rounded-lg shadow-xl card">
        <Formik
          initialValues={props.user}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              // new object with skills being a map of each element's _id (because we add skills by _id)
              const newValues = {
                ...values,
                skills: values.skills.map(skill => skill._id)
              }

              // now we pass newValues on submit
              await props.onSubmit(newValues);
              props.onFinished();
            } catch (err) {
              console.error(err);
            }
          }}
        >{({ values, setFieldValue }) =>
          <Form className="">
            <FormInput id='username' name='username' type='text' label='Username: ' />
            <FormInput id='email' name='email' type='email' label='Email:' />
            <FormTextArea id='profileDescription' name='profileDescription' label='Enter a description:' />
            {props.user.isEmployer ? null : (
              <SkillPicker
                skills={values.skills}
                addSkill={(skill) => {
                  const newSkills = values.skills.concat(skill);
                  setFieldValue('skills', newSkills);
                }}
                removeSkill={(skill) => {
                  const newSkills = values.skills.filter(s => s._id !== skill._id);
                  setFieldValue('skills', (newSkills));
                }}
              />
            )}
            <button
              type='submit'
              className='border border-solid border-gray-300 bg-green-600 py-1 px-3 mr-2 text-white hover:bg-green-700 rounded-md'
            >
              Save Changes
            </button>
            <button
              type='button'
              onClick={props.onFinished}
              className='border border-solid border-gray-300 bg-red-500 py-1 px-3 text-white hover:bg-red-600 rounded-md'
            >
              Cancel
            </button>
          </Form>
          }
        </Formik>
      </div>
    </>
  )
}

export default ProfileForm;