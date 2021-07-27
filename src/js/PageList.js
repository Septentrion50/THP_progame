const PageList = (argument = "") => {
    console.log("Page List", argument);

    const preparePage = () => {
        let cleanedArgument = argument.replace(/\s+/g, "-");
        let articles = "";

        const fetchList = (url, argument) => {
            let finalURL = url;
            if (argument) {
                finalURL = `${url}&search=${argument}&page_size=10&search_exact=true`;
            }
            fetch(`${finalURL}`)
                .then(response => response.json())
                .then(response => {
                    response.results.forEach(article => {
                        articles += `
                            <div class="cardGame">
                                <h1>${article.name}</h1>
                                <h2>${article.released}</h2>
                                <a href = "#pagedetail/${article.id}">${article.id}</a>
                            </div>`;
                    });
                    document.querySelector(".page-list .articles").innerHTML = articles;
                });
        };

        fetchList(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`, cleanedArgument);
    };

    const render = () => {
        pageContent.innerHTML = `
            <section class="page-list">
                <div class="articles">...loading</div>
            </section>
        `;
        preparePage();
    };

    render();
};

export default PageList;