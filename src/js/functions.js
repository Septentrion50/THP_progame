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
        if (!document.querySelectorAll('.col-4')[0]){
            console.log("Oups");
            return;
        } else {
            const cardList = document.querySelectorAll('.col-4');
            const listPart1 = Array.from(cardList).slice(0, 9);
            const listPart2 = Array.from(cardList).slice(9, 18);
            const listPart3 = Array.from(cardList).slice(18, 27);
            return [listPart1, listPart2, listPart3];
        }
    };

    const revealCards = (arr) => {
        arr.map(x => x.classList.remove('d-none'));
    };

export { showSelected, showMore, revealCards};