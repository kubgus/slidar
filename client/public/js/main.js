// Initiate socket connection
const socket = io();

let current_slide = 0;
let slide_count = 0;
let seconds_passed = 0;

const update_progress = () => {
    document.getElementById("progress").style.width = (current_slide / (slide_count - 1)) * 100 + "%";
};
update_progress();

socket.on("slides", (data) => {
    console.log(data);
    const html = marked.parse(data);
    const slides = html.split("<hr>");
    console.log(slides);
    slide_count = slides.length;
    slides.forEach((slide) => {
        const slideDiv = document.createElement("div");
        slideDiv.className = "slide";
        slideDiv.innerHTML = slide;
        document.getElementById("presentation").appendChild(slideDiv);
    });
    hljs.highlightAll();
    const slide_elements = document.querySelectorAll(".slide");
    slide_elements.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.opacity = 0;
        }
    });
});

socket.on("expected_minutes", (data) => {
    setInterval(() => {
        const timeline = document.getElementById("timeline");
        const expected_seconds = data * 60;
        seconds_passed++;
        timeline.style.width = (seconds_passed / expected_seconds) * 100 + "%";
    }, 1000);
});

setInterval(() => {
    document.getElementById("time").innerHTML = new Date().toLocaleTimeString();
}, 1000);

const next_slide = () => {
    const slide_elements = document.querySelectorAll(".slide");
    if (current_slide < slide_elements.length - 1) {
        slide_elements[current_slide].style.opacity = 0;
        current_slide++;
        slide_elements[current_slide].style.opacity = 1;
    }
};

const previous_slide = () => {
    const slide_elements = document.querySelectorAll(".slide");
    if (current_slide > 0) {
        slide_elements[current_slide].style.opacity = 0;
        current_slide--;
        slide_elements[current_slide].style.opacity = 1;
    }
}

document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowRight" || event.key === " " || event.key === "Enter") {
        next_slide();
    } else if (event.key === "ArrowLeft" || event.key === "Backspace") {
        previous_slide();
    }
    update_progress();
    document.getElementById("index").innerHTML = current_slide + 1;
});

document.addEventListener("click", (event) => {
    if (event.clientX < window.innerWidth / 2) {
        previous_slide();
    } else {
        next_slide();
    }
    update_progress();
    document.getElementById("index").innerHTML = current_slide + 1;
});
