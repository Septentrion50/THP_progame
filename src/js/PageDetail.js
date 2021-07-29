import { fetchGameSeries } from './functions';


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

                    let articleDOM = document.querySelector(".page-detail");

                    articleDOM.innerHTML = `
                        <div id="bigImg" class="img-lg mb-5" style="background-image: url('${response.background_image}');">
                            <a href="${response.website}" class="btn-default img-lg-btn">Check website<i class="triangle"></i></a>
                        </div>

                        <div class="article">
                            <div class="title-group">
                                <h1 class="h1 title">${response.name}</h1>
                                <div class="title-group-votes">
                                    ${response.rating}/${response.rating_top} -  ${response.ratings_count} votes
                                </div>
                            </div>

                            ${response.description}

                            <div class="row mb-5">
                                <div class="col-12 col-sm-6 col-md-3 release-date">
                                    ${response.released ? response.released : ''}
                                </div>
                            </div>

                            <h2 class="h2">BUY</h2>
                            <div id="stores" class="mb-5">
                            </div>

                            <h2 class="h2">Trailer</h2>
                            <video id="trailer" class="w-100 mb-5" poster="" controls>
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
                            <div class="row mb-5">
                                <div class="col-12 col-sm-6"></div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-sm-6 col-md-4"></div>
                            </div>

                            <h2 class="h2">Similar games</h2>
                            <div class="row">
                                <div class="col-12 col-sm-6 col-md-4">
                                <div class="cardGame card my-4">
                                    <div class="card-img-top">
                                        <img src="${response.background_image}" class="card-img-single" alt="">
                                    </div>
                                    <div class="card-body">
                                        <h1>${response.name}</h1>
                                        <h2 class="d-none">${response.released}</h2>
                                        <ul class="platform-list"></ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
            });
        };

        fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
    };

    const render = () => {
        let pageContent = document.getElementById("pageContent");
        pageContent.innerHTML = `
            <section class="page-detail"></section>`;

        preparePage();
    };

    render();
};

export default pagedetail;