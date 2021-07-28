import linux from '../svg/linux.svg';
import mobile from '../svg/mobile.svg';
import ps4 from '../svg/ps4.svg';
import search from '../svg/search.svg';
import nintendo from '../svg/switch.svg';
import windows from '../svg/windows.svg';
import xbox from '../svg/xbox.svg';

class Components {

    constructor() {
        this.fileNames = {
            'linux': linux,
            'mobile': mobile,
            'ps4': ps4,
            'search': search,
            'switch': nintendo,
            'windows': windows,
            'xbox': xbox,
        }
    }

    svgComponent(file) {
        return `${this.fileNames[file]}`;
    }
}

export default Components;