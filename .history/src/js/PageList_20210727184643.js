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
        let cardElt = document.querySelectorAll('.col')
    };

    window.addEventListener('change', showSelected)

    const render = () => {
        let pageContent = document.querySelector("#pageContent");
        pageContent.innerHTML = `
            <section class="page-list">
                <div class="articles row">...loading</div>
            </section>
        `;
        preparePage();
    };

    render();


};

export default pagelist;