const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const closeIcon = document.getElementById('close-icon');

//CHANGE NAVBAR BACKGROUND ON SCROLL
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }
    else
    {
        navbar.classList.remove('scrolled');
    }
});

//OPEN  MENU
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    navbar.classList.add('menu-open');
});

closeIcon.addEventListener('click', () => {
    navLinks.classList.remove('show');
    navbar.classList.remove('menu-open');
});

//CLOSE MENU WHEN A LINK IS CLICKED (ON MENU)
const navItems = document.querySelectorAll('.nav-links a');

 navItems.forEach(item => {
    item.addEventListener('click', () => {
    navLinks.classList.remove('show'); 
    navbar.classList.remove('menu-open');       
    });
 });

 //HIGHLIGHT ACTIVE LINK ON SCROLL
 const sections = document.querySelectorAll('section');
 
 window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`){
                    link.classList.add('active');
                }
            });
        }
    });
 });

 //SCROLL TO TOP 
 const scrollToTopButton = document.getElementById('scrollToTop');

 //SHOW/HIDE BUTTON
 window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'block';
    }
    else
    {
        scrollToTopButton.style.display = 'none';
    }
 });

 //SCROLL TO TOP WHEN CLICKED
 scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
 });

 //ABOUT SECTION
 const blocks = document.querySelectorAll('.fade-in');
 const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting){
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
 }, {threshold: 0.1});
 blocks.forEach(block => observer.observe(block));

 //SUCCESS MESSAGE
 function showSuccessMessage(event) {
    event.preventDefault();
    const form = event.target;
    const successDiv = document.getElementById("success-message");

    fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            successDiv.classList.remove("hidden");
            form.reset();

            setTimeout(() => {
                successDiv.classList.add("hidden");
            }, 5000);
        }
    }).catch(error => {
        alert("Oops! Something went wrong. Please try again later.");
    });
 }