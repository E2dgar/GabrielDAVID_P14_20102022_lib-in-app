import { Datatable } from 'react_datatable_component_openclassrooms_project';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store';
import './index.css';

export const Table = () => {
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

    const dataStatus = useAppSelector((state) => state.employees.status);
    const data = useAppSelector((state) => state.employees.data);

    const headers = [
        { key: 'firstName', label: 'First name' },
        { key: 'lastName', label: 'Last name' },
        { key: 'startDate', label: 'Start Date' },
        { key: 'department', label: 'Department' },
        { key: 'dateOfBirth', label: 'Date of birth' },
        { key: 'street', label: 'Street' },
        { key: 'city', label: 'City' },
        { key: 'state', label: 'State' },
        { key: 'zipCode', label: 'Zip Code' }
    ];

    const options = [
        { value: 10, text: '10' },
        { value: 25, text: '25' },
        { value: 50, text: '50' },
        { value: 100, text: '100' }
    ];

    if (dataStatus === 'loading') {
        return <p>Loading</p>;
    }
    if (dataStatus === 'rejected') {
        return <p>ERROR</p>;
    }
    return (
        <>
            <h1>Employees list</h1>
            <Datatable
                headers={headers}
                employees={data}
                paginate={false}
                options={options}
            />
        </>
    );
};
