const buttonBack = document.querySelector(".button-back");
const buttonNext = document.querySelector(".button-next");
const resultsContainer = document.querySelector(".results-container");


const apiUrl =
 "https://sanobo.no/weddingblog/wp-json/wp/v2/";

 let length = 3;
 let offset = 0;

async function fetchApi(url) {
    try {
        const response = await fetch(url + `posts?per_page=
        ${length}&offset=${offset}&_embed`);
        const results = await response.json();

        console.log(results);

        resultsContainer.innerHTML = "";

        if (offset === 0) {
            buttonBack.style.display = "none";
        } else {
            buttonBack.style.display ="block";
        }
        if (results.length < 3) {
            buttonNext.style.display = "none";
        } else {
            buttonNext.style.display = "block";
        }

        for (let i = 0; i < results.length; i++) {

            const formatDate = new Date(results[i].date).toLocaleString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });

            resultsContainer.innerHTML += 
                `<div class="post"><a href="blog-post.html?id=${results[i].id}"><img src="${results[i]._embedded["wp:featuredmedia"][0].source_url}" 
                alt="${results[i]._embedded["wp:featuredmedia"][0].alt_text}" /></a>
                <a href="blog-post.html?id=${results[i].id}"><h3>${results[i].title.rendered}</h3></a>
                <p>${formatDate}</p></div>`

        }
        

    } catch (error) {
        console.log(error);
    }
}

buttonBack.addEventListener("click", () => {
    if (offset >= 3) {
        offset -= 3;
    }
    fetchApi(apiUrl);
});

buttonNext.addEventListener("click", () => {
    offset += 3;
    fetchApi(apiUrl);
});

fetchApi(apiUrl);