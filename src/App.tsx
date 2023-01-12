import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FormPage } from './components/pages/form';
import { useDispatch } from 'react-redux';
import { Table } from './components/pages/Table';
import { getEmployees } from './redux/reducers/employeesSlice';
import { AppDispatch } from './redux/store';

const App = () => {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmployees());
    }, []);
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<FormPage />} />
                    <Route path="/datatable" element={<Table />} />
                    {/* {<Route path="*" element={<Page404 />} /> */}
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
