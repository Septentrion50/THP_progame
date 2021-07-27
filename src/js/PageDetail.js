const pagedetail = (argument = "") => {
    console.log("Page Detail", argument);

    const preparePage = () => {
        let cleanedArgument = argument.replace(/\s+/g, "-");

        const fetchGame = (url, argument) => {
            let finalURL = `${url}?key=${process.env.API_KEY}`;
            if (argument){
                finalURL = `${url}${argument}?key=${process.env.API_KEY}`;
            }
            console.log('>>>', finalURL);

            fetch(`${finalURL}`)
                .then((response) => response.json())
                .then((response) => {
                    let { name, released, description } = response;

                    let articleDOM = document.querySelector(".page-detail .article");

                    articleDOM.querySelector("h1.title").innerHTML = name;
                    articleDOM.querySelector("p.release-date span").innerHTML = released;
                    articleDOM.querySelector("p.description").innerHTML = description;
                });
        };

        fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
    };

    const render = () => {
        let pageContent = document.getElementById("pageContent");
        pageContent.innerHTML = `
            <section class="page-detail">
                <div class="article">
                    <h1 class="title"></h1>
                    <p class="release-date">Release date : <span></span></p>
                    <p class="description"></p>
                </div>
            </section>`;

        preparePage();
    };

    render();
};

export default pagedetail;