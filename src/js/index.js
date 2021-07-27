import '../sass/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import bootstrap from 'bootstrap';
import Home from './Home';
import PageDetail from './PageDetail';
import PageList from './PageList';
import routes from './routes';

let pageArgument;

const setRoute = () => {
    let path = window.location.hash.substring(1).split("/");
    pageArgument = path[1] || "";

    var pageContent = document.getElementById("pageContent");
    routes[path[0]](pageArgument);
    return true;
};

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());