import Components from './components';
import { showSelected, showMore, revealCards} from './functions';

const pagelist = (argument = "") => {

    const preparePage = () => {
        let cleanedArgument = argument.replace(/\s+/g, "-");
        let articles = "";
        let select = document.querySelector('#gameFilter');
        let currentPlatforms = {};

        const fetchList = (url, argument) => {
            let finalURL = url;
            if (argument) {
                finalURL = `${url}&search=${argument}&page_size=27`;
            } else {
                finalURL = `${url}&dates=2021-08-01,2022-08-01&page_size=27`;
            }
            fetch(`${finalURL}`)
                .then(response => response.json())
                .then(response => {
                    let allOpts = [];
                    response.results.forEach(article => {
                        article.platforms.map(x => currentPlatforms[x.platform["id"]] = x.platform["name"]);
                        let platforms = article.platforms.map(x => `<li>${new Components().svgComponent(x.platform['slug'])}</li>`);
                        articles += `
                            <div class="col-4 ${article.name.replace(/\s+/g, "-")} d-none">
                                <a href="#pagedetail/${article.id}" class="cardGame card my-4">
                                    <div class="card-img-top">
                                        <img src="${article.background_image}" class="card-img-single" alt="">
                                    </div>
                                    <div class="card-body">
                                        <h1>${article.name}</h1>
                                        <h2 class="d-none">${article.released}</h2>
                                        <ul class="platform-list">${platforms.join(' ')}</ul>
                                    </div>
                                </a>
                            </div>`;
                        let opt = document.createElement('option');
                        opt.id = article.name.replace(/\s+/g, "-");
                        opt.innerHTML = `${article.name}`
                        allOpts.push(opt);
                    });
                    select.innerHTML = '<option id="first-opt">Platform: any</option>';
                    for (let i = 0; i < allOpts.length; i ++) {
                        select.append(allOpts[i]);
                    }
                    document.querySelector(".page-list .articles").innerHTML = articles;

                    let nineFirst = document.querySelectorAll('.col-4');
                    for (let i = 0; i < 9; i++){
                        nineFirst[i].classList.remove('d-none');
                    }
                });
        };
        fetchList(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`, cleanedArgument);
        console.log(currentPlatforms);
    };

    window.addEventListener('change', showSelected);

    const render = () => {
        let pageContent = document.querySelector("#pageContent");
        pageContent.innerHTML = `
            <section class="page-list">
                <div>
                    <select name="filter" id="gameFilter">
                        <option id="first-opt">Platform: any</option>
                    </select>
                </div>
                <div class="articles row">...loading</div>
                <div class="mt-5">
                    <button id="btn-show-more" class="btn btn-primary">Show more...</button>
                </div>
            </section>
        `;
        preparePage();
    };

    render();

    let pageNumber = 1;

    let btnElt = document.querySelector('#btn-show-more');

    btnElt.addEventListener('mousedown', e => {
        e.preventDefault();
        revealCards(showMore()[pageNumber]);
        pageNumber += 1;
        if (pageNumber >= 3) {
            e.target.classList.add('d-none');
            return;
        }
    });
};

export default pagelist;