import { Formik, Form } from "formik";
import * as Yup from 'yup';

import FormInput from "../../components/FormElements/FormInput";
import FormTextArea from "../../components/FormElements/FormTextArea";
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
    })).ensure()
});

function ProjectForm(props) {
    return (
        <div>
            <Formik
                initialValues={props.project}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    // todo
                    console.log(JSON.stringify(values));
                    setTimeout(() => setSubmitting(false), 2000)
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
                                console.log(`About to remove ${JSON.stringify(skill)}`);
                                const newSkills = values.servicesNeeded.filter(s => s._id !== skill._id);
                                console.log(`newSkills = ${JSON.stringify(newSkills)}`);
                                setFieldValue('servicesNeeded', newSkills);
                            }}
                        />
                    </Form>
                }
            </Formik>
        </div>
    )
}

export default ProjectForm;