const API_URL = "http://192.168.1.132:9001/"

// todo use the api instead of a socket system for search results

function _search() {
    try {
        var search = document.getElementById("#search_bar").value;
        if (!isValidSearch(search)) {
            return;
        }
        var category = document.getElementById("#search_category").value;
        var sortBy = document.getElementById("#sort_by") ? document.getElementById("#sort_by").value : null;
        var url = `${API_URL}search/${search}?category=${category}&sortBy=${sortBy}`;
        if (category === "packs") {
            var version = document.getElementById("#packs_version").value !== "any" ? document.getElementById("#packs_version").value : null;
            var freeOnly = document.getElementById("#packs_free-only") ? document.getElementById("#packs_free-only").checked : null;
            if (version) url += `&version=${version}`;
            if (freeOnly) url += `&freeOnly=${freeOnly}`;

            console.log(url);
            $.getJSON(url, data => {
                console.log(data);
            });
        } else if (category === "all") {
            // $.get(url, function (data) {
            //     $(".result").html(data);
            //     console.log(data.length);
            //     setResults(data);
            // }).abort(error => {
            //     console.log(error);
            //     setResults(null);
            // })
            // $.get("https://www.google.com/", (data, textStatus, jqXHR) => {
            //     alert("status: " + textStatus + " data: " + data);
            // })
            console.log(url);
            var settings = {
                cache: false,
                dataType: "jsonp",
                async: true,
                crossDomain: true,
                url: url,
                method: "GET",
                headers: {
                    accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                success: function (jsonData) {
                    console.log(jsonData);
                },
                error: function (request, textStatus, errorThrown) {
                    console.log(request);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            }
            $.ajax(settings);
        }
    } catch (e) {
        console.warn(e);
    }
}

function isValidSearch(name) {
    // matches [a-zA-Z0-9\s]{3,16} and length without double " " is greated than 3
    return name.match(/[a-zA-Z0-9\s]{3,16}/g) && name.replace("  ", "").length > 3;
}

function changeCategory(category) {
    document.getElementById("#pack_options").style.display = "none";
    if (category.value === "packs") {
        // show pack options
        document.getElementById("#pack_options").style.display = "block";
    }
}

function viewpack(id) {
    location.replace('/view?pack=' + id);
}

socket.on('SEARCH_RESULTS', (results) => {
    setResults(results);
})

function setResults(results) {
    var section = document.getElementById("#results");
    if (results == null || results.length == 0) {
        section.innerHTML =
            `<div class="card">
            <div class="more">No results! <i class="fa fa-close"></i>
            <br><p>Try refining your search</div>
        </div>`
    } else {
        for (res of results) {
            console.log(res);
            // section.innerHTML +=
            // `<div class="card" onclick="viewpack('0')">
            //     <img src="/assets/images/background/dark.png">
            //     <h2 class="price highlight">${res.price}</h2>
            //     <div class="content">
            //         <h1 class="highlight">Balls pack</h1>
            //         <p>By MattMX</p>
            //         <div class="tags">
            //             <span class="tag exclusive">1.17</span>
            //             <span class="tag exclusive">Modern</span>
            //             <span class="tag exclusive">Free</span>
            //         </div>
            //     </div>
            // </div>`
        }
    }
}

window.onload = () => {
    var search = document.getElementById("#search_bar")
    if (search) search.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            _search();
        }
    })
    var inlinePackDisplays = document.getElementsByClassName("packs-inline");
    for (inlinePackDisplay of inlinePackDisplays) {
        inlinePackDisplay.addEventListener("wheel", function (e) {
            e.preventDefault();
            if (e.deltaY > 0) inlinePackDisplay.scrollLeft += 100;
            else inlinePackDisplay.scrollLeft -= 100;
        });
        i = 0;
        for (child of inlinePackDisplay.children) {
            child.style.animationDelay = "." + i * 10 + "s";
            i++;
        }
    }
}
