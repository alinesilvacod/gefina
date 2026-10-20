import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from 'react-router';

import DashboardPage from "./DashboardPage.tsx";
import InvoicePage from "./InvoicePage.tsx";

export default function App() {
    return <BrowserRouter>
        <nav>
            <Link to='/'>Painel inicial</Link>
            <Link to='/faturas'>faturas</Link>
        </nav>

        <Routes>
            <Route path='/' element={<DashboardPage />} />
            <Route path='faturas' element={<InvoicePage />} />
        </Routes>
        <DashboardPage />
        <InvoicePage />
    </BrowserRouter>
}