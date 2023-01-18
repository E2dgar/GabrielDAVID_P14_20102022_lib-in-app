import './index.css';
import { LinkItem } from '../../atoms/links';
import { useState } from 'react';
import { Form } from '../../form';
import Modal from 'react-modal';

Modal.setAppElement('#root');

/**
 * @component Form page component
 */
export const FormPage = () => {
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };
    return (
        <>
            <header>
                <h1>HRnet</h1>
                <LinkItem to="datatable" label="View Current Employees" />
            </header>

            <main>
                <div className="form-container">
                    <h2>Create Employee</h2>

                    <Form openModal={openModal} />
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="TestModal">
                    <h2>Employee has been successfully added</h2>
                    <button onClick={closeModal}>close</button>
                </Modal>
            </main>
        </>
    );
};
