import './index.css';
import { LinkItem } from '../../atoms/links';
import { FC } from 'react';
import { Form } from '../../form';

export const FormPage: FC = () => {
    return (
        <>
            <header>
                <h1>HRnet</h1>
                <LinkItem to="datatable" label="View Current Employees" />
            </header>

            <main>
                <div className="form-container">
                    <h2>Create Employee</h2>

                    <Form />
                </div>
            </main>
        </>
    );
};
