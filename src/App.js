//Router
import { BrowserRouter as Router } from 'react-router-dom';

import { BrandingWatermarkSharp, CardTravelSharp, HomeWorkSharp, LocationCitySharp } from '@material-ui/icons';

//components
import { Dashborder, Product, About, Template } from './pages';
import { Navbar } from './components';

function App() {
    console.log('test04');
    return (
        <Router>
            <Navbar routes={meberRouter} />
        </Router>
    );
}

export default App;

const meberRouter = [
    {
        id: 1,
        title: '首頁',
        to: '/',
        path: '/',
        exact: true,
        Component: Dashborder,
        Icon: BrandingWatermarkSharp,
    },
    {
        id: 2,
        title: '產品',
        to: '/product',
        path: '/product',
        exact: true,
        Icon: CardTravelSharp,
        Component: Product,
    },
    {
        id: 3,
        title: '展示',
        to: '/template',
        path: '/template',
        exact: true,
        Icon: HomeWorkSharp,
        Component: Template,
    },
    {
        id: 4,
        title: '聯繫我們',
        to: '/about',
        path: '/about',
        exact: true,
        Icon: LocationCitySharp,
        Component: About,
    },
];
