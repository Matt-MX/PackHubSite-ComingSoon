function openUrl(url) {
    window.open(url, "_blank");
}
function topbar() {
    var x = document.getElementById("#header");
    if (x.className === "header") {
        x.className += " responsive";
    } else {
        x.className = "header";
    }
}
function setPage(url) {
    $("body").prepend("<div class='page-loader reverse'></div>")
    $("body").prepend("<div class='page-loader reverse'></div>")
    setTimeout(() => {
        window.location.href = url;
    }, 500)
}