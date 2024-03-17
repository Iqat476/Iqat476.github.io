let currentHeight;
let headElement = document.getElementById("heading");
let elementList;
let delay = 200;
let winHeight = window.innerHeight;
let winWidth = window.innerWidth;
let animationInProgress = false;
let transitionInProgess = false;
let switchDone = false;
let oldElementList;

// Variables to check if an animation has already been completed
const homeDone = {
    header: false,
    section1: false,
    section2: false
};
const aboutMeDone = {
    header: false,
    section1: false,
    section2: false
};


shiftElements(); // Automatically shift elements which need to be switched at load

// Do all the functions required when scrolling
window.addEventListener("scroll", scrollNav);
scrollNav() // Do it once initially so heading/inital content is automatically animated


// Fix contact link being towards the right on dropdown initially
fixContact('contactLink');

// Make sure the home background never gets too small
if (winHeight < 768) {
    currentHeight = 500;
}
else {
    currentHeight = 300;
}

// Same thing as above but makes sure it'll update even after resizing
window.addEventListener("resize", () => {
    winWidth = window.innerWidth;
    winHeight = window.innerHeight;
    if (winHeight < 768) {
        currentHeight = 500;
    }
    else {
        currentHeight = 300;
    }

    // Fix contact link being towards the right on dropdown
    fixContact('contactLink');

    shiftElements(); // Shift elements when needed

}, true)

// Automatically make sure the backgrounds to be animated are not the temporary filler size
animateBackground('', '');


// Prevent the 'Contact' link from floating to the right while collapsed
function fixContact(elementId) {
    let element = document.getElementById(elementId);
    if (window.innerWidth <= 576) {
        console.log(window.innerWidth);
        if (element.classList.contains("ms-auto")) {
            element.classList.remove("ms-auto");
        }
    }
    else {
        if (!element.classList.contains("ms-auto")) {
            element.classList.add("ms-auto");
        }
    }

}


// All things which occur when scrolling
function scrollNav() {
    let element = document.getElementById("navigationBar");
    let scrollDistance = window.scrollY;

    // Change color of the navbar after scrolling
    if (scrollDistance > 5 && !element.classList.contains('bg-show')) {
        element.classList.add('bg-show');
        element.classList.remove('bg-hide')
    }
    // Revert color if scrolled to the top
    else if (scrollDistance < 5 && !element.classList.contains('bg-hide')) {
        element.classList.remove('bg-show');
        element.classList.add('bg-hide');
    }

    // Animate background
    animateBackground('', '');

    // Fix contact link being towards the right on dropdown
    fixContact('contactLink');

    // Animate in the elements
    animateSection();
    let elements = document.querySelectorAll('.unhidden');

    // Remove "unhidden" class to avoid unnecessary transition speed
    setTimeout(() => {
        elements.forEach(element => {
            element.classList.remove("unhidden");
        })
    }, 3000);



}


// Staggered fade in effect
function animate(sectionId) {
    delay = 200;
    elementList = document.getElementById(sectionId).querySelectorAll('.hidden');
    animationInProgress = true;
    if (elementList.length == 0) { elementList = oldElementList } // Prevent there being no elements to add/remove classes on
    oldElementList = elementList;

    for (let i = 0; i < elementList.length; i++) {

        // Unhide every element with the "hidden" class by removing the "hidden" class and adding the "unhidden" class for smooth transitioning 
        setTimeout(() => {
            elementList[i].classList.add("unhidden");
            elementList[i].classList.remove("hidden");
            if (document.getElementById(sectionId).querySelectorAll('.hidden').length == 0) {
                animationInProgress = false;
            }
        }, delay);

        delay += 150; // Increase the delay for each element to achieve a stagger effect

        if (document.getElementById('about-me') != null && sectionId === 'section1') { delay = 100 }

    }


}


function animateSection() {
    let scrollDistance = window.scrollY;
    let documentHeight = Math.max(document.body.getBoundingClientRect().height, document.documentElement.getBoundingClientRect().height);

    if (!animationInProgress) {
        if (document.getElementById('home') != null) { // Check if it's the Home page
            switch (true) {
                case (scrollDistance < documentHeight * 0.2 && !homeDone.header || homeDone.section1 && scrollDistance < documentHeight * 0.4):
                    animate('header');
                    if (document.getElementById('header').querySelectorAll('.hidden').length != 0) { homeDone.header = true }
                    break;

                case (scrollDistance >= documentHeight * 0.05 && scrollDistance < documentHeight * 0.5 && !homeDone.section1):
                    if (document.getElementById('section1').querySelectorAll('.hidden').length != 0) { homeDone.section1 = true }
                    animate('section1');
                    break;

                case (scrollDistance >= documentHeight * 0.3 && !homeDone.section2):
                    if (document.getElementById('section2').querySelectorAll('.hidden').length != 0) { homeDone.section2 = true }
                    animate('section2');
                    break;
                default:
                    break;

            }
        }



        else if (document.getElementById('about-me') != null) { // Check if it's the About me page
            switch (true) {
                case (scrollDistance >= 0 && scrollDistance < documentHeight * 0.1 && !aboutMeDone.header):
                    aboutMeDone.header = true;
                    animate('heading');
                    break;
                case (scrollDistance >= 0 && scrollDistance < documentHeight * 0.6 && !aboutMeDone.section1):
                    aboutMeDone.section1 = true;
                    animate('section1');
                    break;
                case (scrollDistance >= documentHeight * 0.45 && !aboutMeDone.section2):
                    aboutMeDone.section2 = true;
                    animate('section2');
                    break;
                default:
                    break;
            }
        }

        else if (document.getElementById('projects') != null) { // Check if it's the About me page
            switch (true) {
                case (scrollDistance >= 0 && scrollDistance < documentHeight * 0.1 && !aboutMeDone.header):
                    aboutMeDone.header = true;
                    animate('heading');
                    break;
                case (scrollDistance >= 0 && scrollDistance < documentHeight * 0.6 && !aboutMeDone.section1):
                    aboutMeDone.section1 = true;
                    animate('batman');
                    break;
                case (scrollDistance >= documentHeight * 0.3 && !aboutMeDone.section2):
                    aboutMeDone.section2 = true;
                    animate('ninja-frog');
                    break;
                default:
                    break;
            }
        }
    }

}

function shiftElements() {
    // Shift down the elements which need to be shifted ONLY if the current page is home
    if (document.getElementById('home') != null) {

        textElement = document.getElementById('header-down');
        imageElement = document.getElementById('man-image');
        aboveElement = imageElement.cloneNode(true);
        belowElement = textElement.cloneNode(true);
        imageHeight = imageElement.clientHeight;

        if (winWidth < 1200 && !switchDone) {

            imageElement.parentNode.insertBefore(aboveElement, textElement);
            imageElement.remove();
            switchDone = true;

        }

        else if (winWidth >= 1200 && switchDone) {
            imageElement.parentNode.insertBefore(belowElement, imageElement)
            textElement.remove();
            switchDone = false;

        }

    }
}

function animateBackground(sectionId, pageId) {
    // Animate the background ONLY if the current page matches the html page
    if (document.getElementById(pageId) != null) {
        // Change the zoom level of the background while scrolling
        sectionId.style.backgroundSize = `auto ${(-scrollDistance * 0.2) + currentHeight}%`;
    }
}