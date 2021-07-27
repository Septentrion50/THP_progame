const pagelist = (argument = "") => {
    console.log("Page List", argument);

    const preparePage = () => {
        let cleanedArgument = argument.replace(/\s+/g, "-");
        let articles = "";
        let select = document.querySelector('#gameFilter');

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
                        articles += `
                            <div class="col-4 ${article.name.replace(/\s+/g, "-")}">
                                <div class="cardGame card my-4" style="width: 20rem;">
                                    <div class="card-body">
                                        <h1>${article.name}</h1>
                                        <h2>${article.released}</h2>
                                        <a href = "#pagedetail/${article.id}">${article.id}</a>
                                    </div>
                                </div>
                            </div>`;
                        let opt = document.createElement('option');
                        opt.id = article.name.replace(/\s+/g, "-");
                        opt.innerHTML = `${article.name}`
                        allOpts.push(opt);
                    });
                    select.innerHTML = '';
                    for (let i = 0; i < allOpts.length; i ++) {
                        select.append(allOpts[i]);
                    }
                    document.querySelector(".page-list .articles").innerHTML = articles;
                });
        };

        fetchList(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`, cleanedArgument);
    };

    const showSelected = () => {
        let select = document.getElementsByTagName("option");
        for (let i = 0; i < select.length; i++) {
            let matchingArticle = document.getElementsByClassName(`${select[i].id}`)[0];
            if (select[i].selected === false) {
                matchingArticle.classList.add('d-none');
            } else if (select[i].selected === true){
                matchingArticle.classList.remove('d-none');
            }
        }
    };

    const showMore = () => {
        if (!document.querySelectorAll('.col-4')[0]) return;
        const cardList = document.querySelectorAll('.col-4');
        const listPart1 = Array.from(cardList).slice(0, 9);
        const listPart2 = Array.from(cardList).slice(9, 18);
        const listPart3 = Array.from(cardList).slice(18, 27);
        return [listPart1, listPart2, listPart3];
    };

    const revealCards = (arr) => {
        console.log('===',arr)
        arr.map(x => x.classList.remove('d-none'));
    };

    window.addEventListener('change', showSelected);

    const render = () => {
        let pageContent = document.querySelector("#pageContent");
        pageContent.innerHTML = `
            <section class="page-list">
                <div class="articles row">...loading</div>
                <div class="mt-5">
                    <button id="btn-show-more" class="btn btn-primary">Show more...</button>
                </div>
            </section>
        `;
        preparePage();
    };

    render();


    const btnElt = document.querySelector('#btn-show-more');
    let pageNumber = 0;

    btnElt.addEventListener('click', e => {
        e.preventDefault();
        if ()
        let lists = showMore();
        console.log('...',lists);
        pageNumber += 1;
        revealCards(lists[pageNumber]);
    });


};

export default pagelist;