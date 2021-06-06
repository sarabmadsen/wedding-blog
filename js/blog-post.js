const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");

const url = "https://sanobo.no/weddingblog/wp-json/wp/v2/posts/" + id + "?_embed";

const resultsContainer = document.querySelector(".results-container");
const title = document.querySelector("title");
const navText = document.querySelector(".nav-text");
const h1 = document.querySelector("h1");

async function fetchPost() {
    try {
        const response = await fetch(url);
        const results = await response.json();

        console.log(results);

        const formatDate = new Date(results.date).toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        const content = results.content.rendered
            .match(/<p>(.*?)<\/p>/g);


        title.innerHTML += `${results.title.rendered} | Wedding Blog`;
        navText.innerHTML += `You are here: <a href="index.html">Home</a> - <a href="blog.html">Blog</a> - ${results.title.rendered}`
        h1.innerHTML += results.title.rendered;
        resultsContainer.innerHTML = `<div class="main-content"><img src="${results._embedded["wp:featuredmedia"][0].source_url}" 
                                    alt="${results._embedded["wp:featuredmedia"][0].alt_text}" />
                                    <div class="text"><p>${formatDate}</p>
                                    ${content}
                                    </div></div>
                                    <div class="image-gallery">${results.content.rendered}</div>`

        
        const images = document.querySelectorAll("figure img");
        const overlay = document.querySelector(".modal-overlay");
        const modal = document.querySelector(".modal");

        for(let i = 0; i < images.length; i++) {
            console.log(images[i].className);

            images[i].onclick = function() {
                event.target.classList.add("modal");
                overlay.style.display = "block";

                overlay.onclick = function() {
                    images[i].classList.remove("modal");
                    overlay.style.display = "none";
                }
            }
        }

    } catch(error) {
        console.log(error)
        resultsContainer.innerHTML = error;
    }
}

fetchPost();





