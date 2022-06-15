//todo change to web fetch to the api

// socket.on('RECENT_PACKS', (packs) => {
//     var recent = document.getElementById("#packs-recent");
//     addInline(recent, packs);
//     recent.innerHTML +=
//     `<div class="card" onclick="page('search')">
//         <div class="more">Search<br><i class="fas fa-search"></i></div>
//     </div>`
// });
// socket.on('POPULAR_PACKS', (packs) => {
//     var popular = document.getElementById("#packs-popular");
//     //addInline(popular, packs);
//     popular.innerHTML +=
//     `<div class="card" onclick="page('search')">
//         <div class="more">Search<br><i class="fas fa-search"></i></div>
//     </div>`
// });
// socket.on('EXCLUSIVE_PACKS', (packs) => {
//     var popular = document.getElementById("#packs-exclusive");
//     //addBlock(popular, packs);
//     popular.innerHTML +=
//     `<div class="card" onclick="page('search')">
//         <div class="more">Search<br><i class="fas fa-search"></i></div>
//     </div>`
// })
document.addEventListener("load", () => {
    $.get("")
});

function addInline(section, packs) {
    section.innerHTML = "";
    for (pack of packs) {
        if (pack.tags) var tags = JSON.parse(pack.tags);
        if (pack.previews) var previews = JSON.parse(pack.previews);
        section.innerHTML +=
            `   <div class="card" onclick="viewpack(${pack.id})">
                    <img src="${previews && previews.length > 0 ? "/assets/images/banners/banner_2.png" : previews[0]}">
                    <div class="content">
                        <h3 class="highlight">${pack.name}</h3>
                        <p>By ${pack.maker}</p>
                        <div class="tags">`
        for (tag of tags) {
            section.innerHTML += `<span class="tag">${tag}</span>`;
        }
        section.innerHTML +=
                            `
                        </div>
                    </div>
                </div>`;
    }
}
function addBlock(section, packs) {
    section.innerHTML = "";
    for (pack of packs) {
        if (pack.tags) var tags = JSON.parse(pack.tags);
        if (pack.previews) var previews = JSON.parse(pack.previews);
        section.innerHTML +=
            `   <div class="card" onclick="viewpack(${pack.id})">
                    <img src="${previews && previews.length > 0 ? "/assets/images/banners/banner_2.png" : previews[0]}">
                    <h2 class="price highlight">${pack.price == null || price <= 0 ? "FREE" : "£" + pack.price}</h2>
                    <div class="content">
                        <h3 class="highlight">${pack.name}</h3>
                        <p>By ${pack.maker}</p>
                        <div class="tags">`
        for (tag of tags) {
            section.innerHTML += `<span class="tag">${tag}</span>`;
        }
        section.innerHTML +=
                            `
                        </div>
                    </div>
                </div>`;
    }
}

socket.emit("GET_POPULAR");
socket.emit("GET_RECENT");
socket.emit("GET_EXCLUSIVE");