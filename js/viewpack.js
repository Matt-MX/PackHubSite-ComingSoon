var LOADED = false;

window.addEventListener("load", (e) => {
    loadBar();
    showSlides(slideIndex);
    var params = new URLSearchParams(window.location.search);
    if (params.has('pack')) {
        socket.emit('GET_PACK', params.get("pack"));
    }
})

socket.on('PACK_DATA', (pack) => {
    console.log(pack);
    LOADED = true;

});

setTimeout(() => {
    if (!LOADED) {
        console.log("not loaded");
    }
}, 15000);

let slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    try {
        let i;
        let slides = document.getElementsByClassName("_preview");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    } catch (err) {
    }
}