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
    const slides = data.split("---");
    console.log(slides);
    slide_count = slides.length;
    slides.forEach((slide) => {
        const slideDiv = document.createElement("div");
        slideDiv.className = "slide";
        slideDiv.innerHTML = marked.parse(slide);
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

document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowRight" || event.key === " " || event.key === "Enter") {
        const slide_elements = document.querySelectorAll(".slide");
        if (current_slide < slide_elements.length - 1) {
            slide_elements[current_slide].style.opacity = 0;
            current_slide++;
            slide_elements[current_slide].style.opacity = 1;
        }
    } else if (event.key === "ArrowLeft" || event.key === "Backspace") {
        const slide_elements = document.querySelectorAll(".slide");
        if (current_slide > 0) {
            slide_elements[current_slide].style.opacity = 0;
            current_slide--;
            slide_elements[current_slide].style.opacity = 1;
        }
    }
    update_progress();
});
