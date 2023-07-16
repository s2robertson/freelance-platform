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
        <div>
            <Formik
                initialValues={props.user}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        await props.onSubmit(values);
                        props.onFinished();
                    } catch (err) {
                        console.error(err);
                    }
                }}
            >{({ values, setFieldValue }) => 
                <Form>
                    <FormInput id='username' name='username' type='text' label='Username:' />
                    <FormInput id='email' name='email' type='email' label='Email:' />
                    <FormTextArea id='profileDescription' name='profileDescription' label='Enter a description:' />
                    {props.user.isEmployer ? null : (
                        <SkillPicker 
                            skills={values.skills}
                            addSkill={(skill) => {
                                const newSkills = values.skills.concat(skill);
                                // console.log(`Adding: newSkills = ${JSON.stringify(newSkills)}`);
                                setFieldValue('skills', newSkills);
                            }}
                            removeSkill={(skill) => {
                                const newSkills = values.skills.filter(s => s._id !== skill._id);
                                setFieldValue('skills', newSkills);
                            }}
                        />
                    )}
                    <button
                        type='submit'
                        className='border-2 p-1'
                    >
                        Save Changes
                    </button>
                </Form>
            }
            </Formik>
        </div>
    )
}

export default ProfileForm;