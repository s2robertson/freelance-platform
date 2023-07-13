import { useField } from 'formik';

function FormInput(props) {
    const [field, meta] = useField(props);
    return (
        <div className='mb-2'>
            <label 
                htmlFor={props.id || props.name}
                className='block w-full'
            >
                {props.label}
            </label>
            <input 
                id={props.id} 
                {...field} 
                type={props.type || 'text'} 
                className='block w-full border-solid border-2'
            />
            {meta.touched && meta.error ? (
                <p>{meta.error}</p>
            ) : null}
        </div>
    )
}

export default FormInput;