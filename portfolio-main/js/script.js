/* ===== Helper: smooth active links + sticky header ===== */
const header = document.getElementById('header');
const links = document.querySelectorAll('.nav-links a');

function setActive(hash){
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === hash));
}
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

/* Smooth scroll + active state */
links.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const id = a.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActive(id);
    navLinks.classList.remove('open');
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
  });
});

/* ===== Mobile Menu ===== */
// const burger = document.getElementById('burger');
// const navLinks = document.getElementById('navLinks');
// burger.addEventListener('click', () => {
//   burger.classList.toggle('active');
//   navLinks.classList.toggle('open');
//   burger.setAttribute('aria-expanded', burger.classList.contains('active'));
// });

/* ===== Typing Effect ===== */
const roles = [
  "Full Stack Developer",
  "Front-end Enthusiast",
  "Problem Solver",
  "Lifelong Learner"
];
const typeTarget = document.getElementById('typeTarget');
let idx = 0, char = 0, deleting = false;
function typeLoop(){
  const word = roles[idx % roles.length];
  typeTarget.textContent = word.slice(0, char);
  if(!deleting && char <= word.length){ char++; }
  if(deleting && char >= 0){ char--; }
  if(char === word.length + 10){ deleting = true; }
  if(char === 0 && deleting){ deleting = false; idx++; }
  const speed = deleting ? 40 : 80;
  setTimeout(typeLoop, speed);
}
typeLoop();

/* ===== Reveal on Scroll ===== */
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('show');
      observer.unobserve(e.target);
    }
  });
},{ threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

/* ===== Lightweight tilt on hover ===== */
document.querySelectorAll('.tilt').forEach(card=>{
  let rect;
  function handle(e){
    rect = rect || card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateZ(0)`;
  }
  card.addEventListener('mousemove', handle);
  card.addEventListener('mouseleave', ()=>{ card.style.transform = ''; rect = null; });
});

/* ===== Footer year ===== */
document.getElementById('yr').textContent = new Date().getFullYear();

/* ===== Simple Form feedback (Formspree still handles send) ===== */
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
if(form){
  form.addEventListener('submit', () => {
    formMsg.textContent = 'Sending...';
    setTimeout(()=>{ formMsg.textContent = 'Thanks! I will get back to you shortly.'; }, 800);
  });
}
