const resultsContainer = document.querySelector(".blog-posts");
const buttonMore = document.querySelector("button");

buttonMore.style.display = "none";

const apiUrl =
 "https://sanobo.no/weddingblog/wp-json/wp/v2/posts?per_page=15&_embed";

async function fetchApi(url) {
    try {
        const response = await fetch(url);
        const results = await response.json();

        console.log(results);

        resultsContainer.innerHTML = "";
        buttonMore.style.display = "block";

        for (let i = 0; i < 10; i++) {

            const formatDate = new Date(results[i].date).toLocaleString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });

            resultsContainer.innerHTML += 
                `<div class="post">
                <div><a href="blog-post.html?id=${results[i].id}"><img src="${results[i]._embedded["wp:featuredmedia"][0].source_url}" 
                alt="${results[i]._embedded["wp:featuredmedia"][0].alt_text}" /></a></div>
                <div class="text"><h2>${results[i].title.rendered}</h2>
                <p>${formatDate}</p>
                <p>${results[i].excerpt.rendered} <a href="blog-post.html?id=${results[i].id}">Read more</a></p></div></div>`
        }
        
    } catch (error) {
        console.log(error);
    }
}

buttonMore.addEventListener("click", () => {
    async function fetchApi(url) {
        try {
            const response = await fetch(url);
            const results = await response.json();
    
            console.log(results);
    
            resultsContainer.innerHTML = "";
    
            for (let i = 0; i < results.length; i++) {
    
                const formatDate = new Date(results[i].date).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                });

                buttonMore.style.display = "none";

                resultsContainer.innerHTML += 
                    `<div class="post">
                    <div><a href="blog-post.html?id=${results[i].id}"><img src="${results[i]._embedded["wp:featuredmedia"][0].source_url}" 
                    alt="${results[i]._embedded["wp:featuredmedia"][0].alt_text}" /></a></div>
                    <div class="text"><h2>${results[i].title.rendered}</h2>
                    <p>${formatDate}</p>
                    <p>${results[i].excerpt.rendered} <a href="blog-post.html?id=${results[i].id}">Read more</a></p></div></div>`
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    fetchApi(apiUrl);
});

fetchApi(apiUrl);