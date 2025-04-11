var C=Object.defineProperty;var $=(r,e,t)=>e in r?C(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var f=(r,e,t)=>$(r,typeof e!="symbol"?e+"":e,t);import{a as h,b as k}from"./assets/vendor-Djd-MixJ.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();const v=document.querySelector(".categories-container"),R=v.querySelectorAll(".category"),F=v.querySelector(".category--active"),I=v.querySelector(".switcher");function _(r){I.style.width=`${r.offsetWidth}px`,I.style.left=`${r.offsetLeft}px`}function M(r,e,t){e&&_(e),r.forEach(a=>{const s=a.querySelector(".category__link");s.addEventListener("click",n=>{var d;n.preventDefault(),(d=t.querySelector(".category--active"))==null||d.classList.remove("category--active"),a.classList.add("category--active"),_(a);const i=s.getAttribute("href");setTimeout(()=>{window.location.href=i},300)})})}M(R,F,v);class o extends Error{constructor(e,t){super(e),this.name=this.constructor.name,this.statusCode=t}}const l=class l{static async fetchFilters(e,t,a){try{const s={filter:e,page:t,limit:a},n=await h.get(l.FILTERS_URL,{params:s});if(n.status===200)return n.data}catch(s){if(s.response)switch(s.response.status){case 404:throw new o("Not found.",404);case 500:throw new o("Server error.",500);default:throw new o("An unknown error occurred.",s.response.status)}else throw s.request?new o("No response from the server.",0):new o("An unexpected error occurred.",0)}}static async fetchExercises(e,t,a,s,n,i){try{const d={bodypart:e,muscles:t,equipment:a,keyword:s,page:n,limit:i},L=await h.get(l.EXERCISES_URL,{params:d});if(L.status===200)return L.data}catch(d){if(d.response)switch(d.response.status){case 404:throw new o("Not found.",404);case 500:throw new o("Server error.",500);default:throw new o("An unknown error occurred.",d.response.status)}else throw d.request?new o("No response from the server.",0):new o("An unexpected error occurred.",0)}}static async fetchExerciseByID(e){try{const t=await h.get(`${l.EXERCISES_URL}/${e}`);if(t.status===200)return t.data}catch(t){if(t.response)switch(t.response.status){case 400:throw new o("Bad request (invalid request body).",400);case 404:throw new o("Not found.",404);case 500:throw new o("Server error.",500);default:throw new o("An unknown error occurred.",t.response.status)}else throw t.request?new o("No response from the server.",0):new o("An unexpected error occurred.",0)}}static async submitExerciseRating(e,t,a,s){try{const n={rate:t,email:a,review:s},i=await h.patch(`${l.EXERCISES_URL}/${e}/rating`,n);if(i.status===200)return i.data}catch(n){if(n.response)switch(n.response.status){case 409:throw new o("Such email already exists",409);case 400:throw new o("Bad request (invalid request body).",400);case 404:throw new o("Such exercise not found.",404);case 500:throw new o("Server error",500);default:throw new o("An unknown error occurred.",n.response.status)}else throw n.request?new o("No response from the server.",0):new o("An unexpected error occurred.",0)}}static async fetchQuote(){try{const e=await h.get(l.QUOTE_URL);if(e.status===200)return e.data}catch(e){if(e.response)switch(e.response.status){case 404:throw new o("Not found.",404);case 500:throw new o("Server error.",500);default:throw new o("An unknown error occurred.",e.response.status)}else throw e.request?new o("No response from the server.",0):new o("An unexpected error occurred.",0)}}static async addSubscription(e){try{const t={email:e},a=await h.post(l.SUBSCRIBE_URL,t);if(a.status===201)return a.data}catch(t){if(t.response)switch(t.response.status){case 409:throw new o("Subscription already exists",409);case 400:throw new o("Bad request (invalid request body).",400);case 404:throw new o("Not found.",404);case 500:throw new o("Server error",500);default:throw new o("An unknown error occurred.",t.response.status)}else throw t.request?new o("No response from the server.",0):new o("An unexpected error occurred.",0)}}};f(l,"EXERCISES_URL","https://your-energy.b.goit.study/api/exercises"),f(l,"FILTERS_URL","https://your-energy.b.goit.study/api/filters"),f(l,"QUOTE_URL","https://your-energy.b.goit.study/api/quote"),f(l,"SUBSCRIBE_URL","https://your-energy.b.goit.study/api/subscription");let g=l;const c=class c{static getCurrentDate(){const e=new Date,t=String(e.getDate()).padStart(2,"0"),a=String(e.getMonth()+1).padStart(2,"0"),s=e.getFullYear();return`${t}.${a}.${s}`}static storeDailyQuote(e){const t={date:c.getCurrentDate(),quote:e};try{localStorage.setItem(c.QUOTE_KEY,JSON.stringify(t))}catch{throw new Error("Failed to save quote to localStorage")}}static async loadDailyQuote(){try{const e=localStorage.getItem(c.QUOTE_KEY);if(e){const{date:a,quote:s}=JSON.parse(e);if(a===c.getCurrentDate())return s}const t=await g.fetchQuote();return c.storeDailyQuote(t),t}catch{throw new Error("Failed to load quote")}}static clearDailyQuote(){try{localStorage.removeItem(c.QUOTE_KEY)}catch{throw new Error("Failed to clear quote in localStorage")}}static storeFavorites(e){try{localStorage.setItem(c.FAVORITES_KEY,JSON.stringify(e))}catch{throw new Error("Failed to save favorites to localStorage")}}static loadFavorites(){try{const e=localStorage.getItem(c.FAVORITES_KEY);return e?JSON.parse(e):[]}catch{throw new Error("Failed to load favorites")}}static clearFavorites(){try{localStorage.removeItem(c.FAVORITES_KEY)}catch{throw new Error("Failed to clear favorites in localStorage")}}};f(c,"QUOTE_KEY","quoteOfTheDay"),f(c,"FAVORITES_KEY","favorites");let E=c;class w{static exercisesTitleFilter(e){return` / <span class="exercises-title-filter">${e}</span>`}static filterTypeHtml(e,t){return`<li><a href="#" class='exercises-filter-type ${t?"active":""}' name='filter-type' data-filter-type='${e}'>${e}</a></li>`}static exerciseFilterHtml(e){return`<li class="exercises-filter-card" name='filter-item' data-filter='${e.name}' style="background-image: url('${e.imgURL}')">
                <h3 class="exercises-filter-card-name">${e.name}</h3>
                <p class="exercises-filter-card-type">${e.filter}</p>
            </li>`}static exerciseHtml(e){return`
      <li class="exer-list__card">
        <div class="exer-card__header">
          <div class="exer-card__tag-box">
            <div class="exer-card__tag">WORKOUT</div>
            <div class="exer-card__post-tag">
            ${e.rating.toFixed(1)}
            </div>
                <svg width="16" height="16">
                  <use xlink:href="../assets/img/sprite.svg#rating-star-orange"></use>
                </svg>
            
          </div>
          <button data-exercise-id='${e._id}' id='exercise-start' class="exer-card__start-btn">
            Start
            <svg width="16" height="16">
              <use xlink:href="../assets/img/sprite.svg#arrow-right"></use>
            </svg>
          </button>
        </div>
        <div class="exer-card__name">
          <svg width="24" height="24" class="exer-card__name__icon">
            <use xlink:href="../assets/img/sprite.svg#icon-running-man-black-bg"></use>
          </svg>
          <p class="exer-card__name__text">${e.name}</p>
        </div>
        <div class="exer-card__stats">
          <div class="exer-card__stats__param cal">
            Burned calories: <span>${e.burnedCalories}</span>
          </div>
          <div class="exer-card__stats__param part">
            Body part: <span>${e.bodyPart}</span>
          </div>
          <div class="exer-card__stats__param target">
            Target: <span>${e.target}</span>
          </div>
        </div>
      </li>
    `}static pageNumberButtonHtml(e,t){return t?`<li><span class="exercises-page-button disabled">${e}</span></li>`:`<li><a href='#' class='exercises-page-button' name='page-number-button' data-page-number='${e}'>${e}</a></li>`}}function O(r,e,t){const a={Target:r.target,"Body part":r.bodyPart,Equipment:r.equipment,Popular:r.popularity,"Burned Calories":`${r.burnedCalories} / ${r.time} min`};k.create(`
        <div class="modal-container">
            <button class="modal-close-button" type="button">
              <svg class="modal-close-button-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M11 1L1 11M1 1L11 11" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
             </svg>
            </button>
            <img class="modal-exercise-image" src="${r.gifUrl}" width="295" height="258">

            <div class="modal-exercise-details-layout">
              <p class="modal-exercise-title">${r.name}</p>

              <div class="modal-exercise-rating-layout">
                  <p class="modal-exercise-rating">${r.rating.toString()}</p>
                  ${D(r.rating)}
              </div>

              <div class="model-exercise-info-layout">
                  ${U(a)}
              </div>

              <p class="modal-exercise-description">${r.description}</p>

              <button class="modal-exercise-add-to-favorites-button">
                ${q(e)}
              </button>
            </div>
        </div>
    `,{onShow:i=>{i.element().querySelector(".modal-close-button").onclick=i.close}}).show();const n=document.querySelector(".modal-exercise-add-to-favorites-button");n.addEventListener("click",i=>{e=!e,n.innerHTML=q(e),t.onFavoritesClick(e)})}function D(r){const e=[];for(let t=1;t<=5;t++){const a=t<=r?"rating-star-orange":"rating-star-gray";e.push(`
        <div class="rating-icon-wrapper">
          <svg class="rating-icon" width="14" height="13">
            <use href="./assets/img/sprite.svg#${a}" />
          </svg>
        </div>
      `)}return e.join("")}function U(r){const e=[];for(const t in r){const a=r[t];e.push(`<div class="modal-exercise-info-item">
            <p class="name">${t}</p>
            <p class="value">${a}</p>
      </div>`)}return e.join("")}function q(r){return r?`
        Remove from favorites
        <svg class="favorite-button-icon" width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.3333 4.99996V4.33329C12.3333 3.39987 12.3333 2.93316 12.1517 2.57664C11.9919 2.26304 11.7369 2.00807 11.4233 1.84828C11.0668 1.66663 10.6001 1.66663 9.66667 1.66663H8.33333C7.39991 1.66663 6.9332 1.66663 6.57668 1.84828C6.26308 2.00807 6.00811 2.26304 5.84832 2.57664C5.66667 2.93316 5.66667 3.39987 5.66667 4.33329V4.99996M7.33333 9.58329V13.75M10.6667 9.58329V13.75M1.5 4.99996H16.5M14.8333 4.99996V14.3333C14.8333 15.7334 14.8333 16.4335 14.5608 16.9683C14.3212 17.4387 13.9387 17.8211 13.4683 18.0608C12.9335 18.3333 12.2335 18.3333 10.8333 18.3333H7.16667C5.76654 18.3333 5.06647 18.3333 4.53169 18.0608C4.06129 17.8211 3.67883 17.4387 3.43915 16.9683C3.16667 16.4335 3.16667 15.7334 3.16667 14.3333V4.99996" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `:`
        Add to favorites
        <svg class="favorite-button-icon" width="18" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.3666 2.84172C16.941 2.41589 16.4356 2.0781 15.8794 1.84763C15.3232 1.61716 14.727 1.49854 14.1249 1.49854C13.5229 1.49854 12.9267 1.61716 12.3705 1.84763C11.8143 2.0781 11.3089 2.41589 10.8833 2.84172L9.99994 3.72506L9.1166 2.84172C8.25686 1.98198 7.0908 1.49898 5.87494 1.49898C4.65907 1.49898 3.49301 1.98198 2.63327 2.84172C1.77353 3.70147 1.29053 4.86753 1.29053 6.08339C1.29053 7.29925 1.77353 8.46531 2.63327 9.32506L3.5166 10.2084L9.99994 16.6917L16.4833 10.2084L17.3666 9.32506C17.7924 8.89943 18.1302 8.39407 18.3607 7.83785C18.5912 7.28164 18.7098 6.68546 18.7098 6.08339C18.7098 5.48132 18.5912 4.88514 18.3607 4.32893C18.1302 3.77271 17.7924 3.26735 17.3666 2.84172Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `}const p=Object.freeze({MUSCLES:"Muscles",BODY_PARTS:"Body parts",EQUIPMENT:"Equipment"});let y=1,m=p.MUSCLES,u,x;const A=12,N=10;async function H(){P(),j(),await S(),await Q()}async function Q(){const r=await E.loadDailyQuote();document.getElementById("quote-author").innerText=r.author,document.getElementById("quote-body").innerText=r.quote}async function P(){let r="";for(let e in p)r+=w.filterTypeHtml(p[e],p[e]==m);document.getElementById("filter-types").innerHTML=r,K()}async function S(){const r=await g.fetchFilters(m,y,A);let e="";for(let t of r.results)e+=w.exerciseFilterHtml(t);document.getElementById("exercises").style.display="none",document.getElementById("filters").style.display="flex",document.getElementById("label-search").style.display="none",document.getElementById("filters").innerHTML=e,T(r.totalPages),Y(),B(r.results.length)}function T(r){let e="";for(let t=1;t<=r;t++)e+=w.pageNumberButtonHtml(t,t==y);document.getElementById("pages").innerHTML=e,V()}async function b(){const r=m==p.MUSCLES?u:"",e=m==p.BODY_PARTS?u:"",t=m==p.EQUIPMENT?u:"",a=await g.fetchExercises(e,r,t,x,y,N);let s="";for(let n of a.results)s+=w.exerciseHtml(n);document.getElementById("filters").style.display="none",document.getElementById("label-search").style.display="block",document.getElementById("exercises").style.display="flex",document.getElementById("exercises").innerHTML=s,J(),T(a.totalPages),B(a.results.length)}function B(r){document.getElementById("noitems").style.display=r==0?"block":"none",document.querySelector(".exercises-layout").style.flexDirection=r==0?"row":"column"}function K(){document.querySelectorAll('a[name="filter-type"]').forEach(r=>{r.addEventListener("click",async function(e){e.preventDefault(),(m!=this.dataset.filterType||u)&&(m=this.dataset.filterType,y=1,u=null,x="",document.getElementById("search").value="",document.querySelectorAll(".exercises-filter-type").forEach(t=>{t.classList.remove("active")}),this.classList.add("active"),document.getElementById("exercises-title").innerHTML="Exercises",await S())})})}function Y(){document.querySelectorAll('li[name="filter-item"]').forEach(r=>{r.addEventListener("click",async function(e){e.preventDefault(),u=this.dataset.filter,y=1,document.getElementById("exercises-title").innerHTML+=w.exercisesTitleFilter(u),await b()})})}function V(){document.querySelectorAll('a[name="page-number-button"]').forEach(r=>{r.addEventListener("click",function(e){e.preventDefault(),y=this.dataset.pageNumber,u?b():S()})})}function j(){document.getElementById("search").addEventListener("keyup",function(r){r.preventDefault(),x=this.value.trim(),b()})}function J(){document.getElementById("exercise-start").addEventListener("click",async function(r){r.preventDefault();const e=await g.fetchExerciseByID(this.dataset.exerciseId);debugger;O(e,!1,function(){alert("added to favorites")})})}const X=document.querySelector(".js-hero__tags-list"),W=["Sport","Healthy","Workout","Diet"];function z(){W.forEach(r=>{const e=document.createElement("li");e.classList.add("hero__tags-item","js-hero__tags-item"),e.innerText=`#${r}`,X.append(e)})}z();document.addEventListener("DOMContentLoaded",function(){H()});
//# sourceMappingURL=index.js.map
