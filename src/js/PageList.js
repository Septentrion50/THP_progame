const pagelist = (argument = "") => {
    console.log("Page List", argument);

    const preparePage = () => {
        let cleanedArgument = argument.replace(/\s+/g, "-");
        let articles = "";
        let select = document.querySelector('#gameFilter');

        const fetchList = (url, argument) => {
            let finalURL = url;
            if (argument) {
                finalURL = `${url}&search=${argument}&page_size=10&search_exact=true`;
            }
            fetch(`${finalURL}`)
                .then(response => response.json())
                .then(response => {
                    let allOpts = [];
                    response.results.forEach(article => {
                        articles += `
                            <div class="col-4" name="${article.name}">
                                <div class="cardGame card my-4" style="width: 20rem;">
                                    <div class="card-body">
                                        <h1>${article.name}</h1>
                                        <h2>${article.released}</h2>
                                        <a href = "#pagedetail/${article.id}">${article.id}</a>
                                    </div>
                                </div>
                            </div>`;
                        let opt = document.createElement('option');
                        opt.id = article.name;
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
        console.log(select);
        for (let i = 0; i < select.length; i++) {
            if (select[i].selected == false) {
                let matchingArticle = document.querySelector(`.col-4`).name === `${select[i].id}`;
                console.log(matchingArticle);
                matchingArticle.classList.toggle('show');
            }
        }
    }

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