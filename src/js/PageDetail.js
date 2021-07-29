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
                        <div id="bigImg" class="img-lg d-flex justify-content-between align-items-center" style="background: transparent url('${response.background_image}') center center no-repeat; background-size: cover;">
                            <div class="img-lg-btn-group">
                                <a href="${response.website}" class="img-lg-btn">Check website</a>
                            </div>
                        </div>
                        <div class="article">
                            <div class="title-group d-flex justify-content-between">
                                <h1 class="h1 title">${response.name}</h1>
                            <div class="title-group-votes">${response.rating}/${response.rating_top} -  ${response.ratings_count} votes</div>
                        </div>

                        <p class="description">${response.description}</p>

                        <div class="row">
                            <div class="col-12 col-sm-6 col-md-3 release-date">${response.released}</div>
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
                        <div class="row">
                            <div class="col-12 col-sm-6"></div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-sm-6 col-md-4"></div>
                        </div>

                        <h2 class="h2">Similar games</h2>
                        <div class="row">
                            <div class="col-12 col-sm-6 col-md-4">
                                <a href="" class=""></a>
                                <h3 class="h3"></h3>
                                <ul class="platform-list">
                                    <li></li>
                                </ul>
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