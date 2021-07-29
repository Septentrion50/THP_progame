const pagedetail = (argument = "") => {

    const preparePage = () => {
        let cleanedArgument = argument.replace(/\s+/g, "-");

        const fetchGame = (url, argument) => {
            let finalURL = `${url}?key=${process.env.API_KEY}`;
            if (argument){
                finalURL = `${url}${argument}?key=${process.env.API_KEY}`;
            }

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
                <div class="img-lg d-flex justify-content-between align-items-center">
                    <div class="img-lg-btn-group">
                        <a href="" class="mg-lg-btn"></a>
                    </div>
                </div>
                <div class="article">
                    <div class="title-group d-flex justify-content-between">
                        <h1 class="h1 title"></h1>
                        <div class="title-group-votes">/ -  votes</div>
                    </div>
                    <p class="welcome-content">textes ici</p>

                    <p class="welcome-content"><strong></strong></p>
                    <p class="welcome-content">textes ici</p>

                    <p class="welcome-content"><strong></strong></p>
                    <p class="welcome-content">textes ici</p>

                    <div class="row">
                        <div class="col-12 col-sm-6 col-md-3">Release...</div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-sm-6">Release...</div>
                    </div>

                    <h2 class="h2">BUY</h2>
                    <div class="mb-5">
                        <a href="" class=""></a>
                        <a href="" class=""></a>
                    </div>
                    <h2 class="h2">Trailer</h2>
                    <video class="w-100 mb-5" poster="" controls>
                        <source src="" type="video/mp4">
                        <p class="welcome-content">Sorry, your browser doesn't support embedded videos.</p>
                    </video>

                    <h2 class="h2">Screenshots</h2>
                    <div class="row mb-5">
                        <div class="col-12 col-sm-6">
                            <a href="" class=""></a>
                        </div>
                    </div>

                    <h2 class="h2">Youtube</h2>
                    <div class="row">
                        <div class="col-12 col-sm-6"></div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-sm-6 col-md-4"></div>
                    </div>

                    <h2 class="h2">Simular games</h2>
                    <div class="row">
                        <div class="col-12 col-sm-6 col-md-4">
                            <a href="" class=""></a>
                            <h3 class="h3"></h3>
                            <ul class="platform-list">
                                <li></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>`;

        preparePage();
    };

    render();
};

export default pagedetail;