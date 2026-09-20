const header=document.getElementById("header");
const menuButton=document.getElementById("menuButton");
const drawer=document.getElementById("drawer");
const closeDrawer=document.getElementById("closeDrawer");
const themeToggle=document.getElementById("themeToggle");
const year=document.getElementById("year");
const search=document.getElementById("menuSearch");
const filters=[...document.querySelectorAll("#filters button")];
const cards=[...document.querySelectorAll(".menu-card")];

function setDrawer(open){
  drawer.classList.toggle("open",open);
  drawer.setAttribute("aria-hidden",String(!open));
  menuButton.setAttribute("aria-expanded",String(open));
  document.body.classList.toggle("no-scroll",open);
}
menuButton?.addEventListener("click",()=>setDrawer(true));
closeDrawer?.addEventListener("click",()=>setDrawer(false));
drawer?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>setDrawer(false)));

function applyTheme(theme){
  document.body.classList.toggle("noir",theme==="noir");
  localStorage.setItem("dada-theme",theme);
  themeToggle?.setAttribute("aria-label",theme==="noir"?"Switch to light theme":"Switch to dark theme");
}
applyTheme(localStorage.getItem("dada-theme")==="noir"?"noir":"light");
themeToggle?.addEventListener("click",()=>{
  applyTheme(document.body.classList.contains("noir")?"light":"noir");
});

const onScroll=()=>header?.classList.toggle("scrolled",window.scrollY>12);
onScroll();
window.addEventListener("scroll",onScroll,{passive:true});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}
  });
},{threshold:.12,rootMargin:"0px 0px -35px 0px"});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

function applyFilter(){
  const active=document.querySelector("#filters button.active")?.dataset.filter||"all";
  const q=(search?.value||"").trim().toLowerCase();
  cards.forEach(card=>{
    const category=card.dataset.category||"";
    const name=(card.dataset.name||"").toLowerCase();
    const visible=(active==="all"||category===active)&&(!q||name.includes(q));
    card.classList.toggle("hidden",!visible);
  });
}
filters.forEach(button=>{
  button.addEventListener("click",()=>{
    filters.forEach(b=>b.classList.remove("active"));
    button.classList.add("active");
    applyFilter();
  });
});
search?.addEventListener("input",applyFilter);

year.textContent=new Date().getFullYear();
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener("click",event=>{
    const id=link.getAttribute("href");
    const target=id?document.querySelector(id):null;
    if(target){event.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"});}
  });
});
