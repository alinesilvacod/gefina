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
        <aside className='sidebar'>
            <header className='brand'></header>

            <nav className='menu'>
                <Link to='/'>Painel inicial</Link>
                <Link to='/faturas'>faturas</Link>
            </nav>
        </aside>
        <main className='content'>
            <Routes>
                <Route path='/' element={<DashboardPage />} />
                <Route path='faturas' element={<InvoicePage />} />
            </Routes>
        </main>
    </BrowserRouter>
}