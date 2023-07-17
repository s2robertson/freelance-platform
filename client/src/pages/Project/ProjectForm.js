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
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    const submitValues = {
                        ...values,
                        servicesNeeded: values.servicesNeeded.map(service => service._id),
                        budget: values.budget || null
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
                        <SkillPicker 
                            skills={values.servicesNeeded}
                            addSkill={(skill) => {
                                const newSkills = values.servicesNeeded.concat(skill);
                                setFieldValue('servicesNeeded', newSkills)
                            }}
                            removeSkill={(skill) => {
                                // console.log(`About to remove ${JSON.stringify(skill)}`);
                                const newSkills = values.servicesNeeded.filter(s => s._id !== skill._id);
                                // console.log(`newSkills = ${JSON.stringify(newSkills)}`);
                                setFieldValue('servicesNeeded', newSkills);
                            }}
                        />
                        <FormCheckbox id='seekingFreelancers' name='seekingFreelancers'>Seeking freelancers?</FormCheckbox>
                        <button
                            type="submit"
                            className="border-2 p-1"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={props.onFinished}
                            className="border-2 p-1"
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