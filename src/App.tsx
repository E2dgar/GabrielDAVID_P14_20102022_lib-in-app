import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FormPage } from './components/pages/form';

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<FormPage />} />
                    {/* <Route path="/datatable" element={<Table />} /> */}
                    {/* {<Route path="*" element={<Page404 />} /> */}
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
