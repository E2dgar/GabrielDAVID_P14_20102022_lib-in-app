import './index.css';
import { FC } from 'react';

type Props = {
    id: string;
    type: string;
    label: string;
    myRef: React.RefObject<HTMLInputElement>;
};

export const Input: FC<Props> = ({ id, type, label, myRef }) => {
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
