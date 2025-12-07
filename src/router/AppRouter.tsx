import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@layout/Layout';
import Home from '@pages/Home';
import Calendar from '@pages/Calendar';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>1
                <Route element={<Layout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/calendar' element={<Calendar />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}