import pagedetail from "./PageDetail";
import pagelist from "./PageList";

const routes = (path, argument) => {
    let routes = {
        "pagelist": pagelist,
        "pagedetail": pagedetail,
    }
    if (path){
        routes[path](argument);
    }
};

export default routes;