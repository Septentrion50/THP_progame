import search from '../svg/search.svg';

class Components {

    constructor() {
        this.fileNames = {
            'search': search,
        }
    }

    svgComponent(file) {
        return `${this.fileNames[file]}`;
    }
}

export default Components;