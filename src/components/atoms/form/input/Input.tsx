import './index.css';

export type InputProps = {
    id: string;
    type: string;
    label: string;
    myRef: React.RefObject<HTMLInputElement>;
};

/**
 * @component Component for showing an input. Return an input wrapped in a label
 * @example
 * <label>
 *   My label
 *
 *  <input type="text"/>
 * </label>
 * @param {props<InputProps>}
 * @returns {JSX.Element}
 */
export const Input = ({ id, type, label, myRef }: InputProps) => {
    return (
        <label className="form-label">
            {label}

            <input
                ref={myRef}
                id={id}
                className="form-input"
                name={id}
                type={type}
            />
        </label>
    );
};
