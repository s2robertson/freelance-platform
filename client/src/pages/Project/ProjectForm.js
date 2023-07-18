import { useMemo } from 'react';
import { Formik, Form } from "formik";
import * as Yup from 'yup';

import FormInput from "../../components/FormElements/FormInput";
import FormTextArea from "../../components/FormElements/FormTextArea";
import FormCheckbox from '../../components/FormElements/FormCheckbox';
import SkillPicker from "../../components/SkillPicker";

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required('Required'),
  description: Yup.string()
    .trim()
    .required('Required'),
  dueDate: Yup.date(),
  budget: Yup.number()
    .round()
    .positive('Buget must be > $0'),
  servicesNeeded: Yup.array(Yup.object({
    _id: Yup.string()
      .required(),
    name: Yup.string()
      .required()
  })).ensure(),
  seekingFreelancers: Yup.bool()
});

function ProjectForm(props) {
  const initialValues = useMemo(() => ({
    name: props.project.name || '',
    description: props.project.description || '',
    dueDate: props.project.dueDate || '',
    budget: props.project.budget || '',
    servicesNeeded: props.project.servicesNeeded || [],
    seekingFreelancers: props.project.seekingFreelancers ?? true
  }), [props.project]);
  return (
    <div className="block ml-16 max-w-4xl justify-center p-8 my-10 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const submitValues = {
            ...values,
            servicesNeeded: values.servicesNeeded.map(service => service._id)
          }
          // console.log('About to submit values: ', submitValues);
          await props.onSubmit(submitValues);
          props.onFinished();
        }}
      >
        {({ values, setFieldValue }) =>
          <Form>
            <FormInput id='name' name='name' type='text' label='Project name:' />
            <FormTextArea id='description' name='description' label='Enter a description:' />
            <FormInput id='dueDate' name='dueDate' type='date' label='Due date:' />
            <FormInput id='budget' name='budget' type='number' label='Budget ($):' />
            <FormCheckbox id='seekingFreelancers' name='seekingFreelancers' className="ml-1"> Seeking freelancers?</FormCheckbox>
            <hr className='mb-4'></hr>
            <SkillPicker
              skills={values.servicesNeeded}
              addSkill={(skill) => {
                const newSkills = values.servicesNeeded.concat(skill);
                setFieldValue('servicesNeeded', newSkills)
              }}
              removeSkill={(skill) => {
                console.log(`About to remove ${JSON.stringify(skill)}`);
                const newSkills = values.servicesNeeded.filter(s => s._id !== skill._id);
                console.log(`newSkills = ${JSON.stringify(newSkills)}`);
                setFieldValue('servicesNeeded', newSkills);
              }}
            />

            <button
              type="submit"
              className="border border-solid border-gray-300 bg-green-600 py-1 px-3 my-3 text-white hover:bg-green-700 rounded-md w-32 mr-1"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={props.onFinished}
              className="border border-solid border-gray-300 bg-red-500 py-1 px-3 my-3 text-white hover:bg-red-600 rounded-md"
            >
              Cancel
            </button>
          </Form>
        }
      </Formik>
    </div>
  )
}

export default ProjectForm;