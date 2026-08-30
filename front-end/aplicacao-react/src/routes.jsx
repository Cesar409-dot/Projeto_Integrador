import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import CadastroFilme from './pages/CadastroFilme'
import EditarFilme from './pages/EditarFilme'

const routes = createBrowserRouter([
    {
    path: '/',
    element: <Home />
    },
    {
    path: '/cadastro',
    element: <CadastroFilme />
    },
    ,
    {
    path: '/editar/:id',
    element: <EditarFilme />
    }
])

export default routes