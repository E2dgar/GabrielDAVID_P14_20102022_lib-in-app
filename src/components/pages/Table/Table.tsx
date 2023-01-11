import { Datatable } from 'react_datatable_component_openclassrooms_project';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store';
import './index.css';

export const Table = () => {
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

    const dataStatus = useAppSelector((state) => state.employees.status);
    const data = useAppSelector((state) => state.employees.data);

    if (dataStatus === 'loading') {
        return <p>Loading</p>;
    }
    if (dataStatus === 'rejected') {
        return <p>ERROR</p>;
    }
    return (
        <>
            <h1>Employees list</h1>
            <Datatable employees={data} paginate />
        </>
    );
};
