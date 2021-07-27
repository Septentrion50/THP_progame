import PageDetail from "./PageDetail";
import PageList from "./PageList";

const routes = (path, argument) => {
    let routes = {
        "pagelist": PageList(argument),
        "pagedetail": PageDetail(argument),
    }
    return routes[path];
};

export default routes;