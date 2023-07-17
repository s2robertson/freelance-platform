import { useField } from "formik";

function FormCheckbox({ children, ...props }) {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <div className="mb-2">
            <label className="block">
                <input type="checkbox" {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <p>{meta.error}</p>
            ) : null}
        </div>
    )
}

export default FormCheckbox;