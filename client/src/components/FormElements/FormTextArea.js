import { useField } from "formik";

function FormTextArea(props) {
    const [field, meta] = useField(props);
    return (
        <div>
            <label 
                htmlFor={props.id || props.name}
                className='block w-full'
            >
                {props.label}
            </label>
            <textarea 
                id={props.id} 
                {...field} 
                type={props.type || 'text'} 
                rows={props.rows || 10}
                className="block w-full border-solid border-2"
            ></textarea>
            {meta.touched && meta.error ? (
                <p>{meta.error}</p>
            ) : null}
        </div>
    )
}

export default FormTextArea;