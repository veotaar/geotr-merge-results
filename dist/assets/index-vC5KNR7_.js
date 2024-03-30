(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();document.querySelector("#app").innerHTML=`
<main>
  <h1>Geoguessr Türkiye • Günlük Challenge Sonuç Birleştirici</h1>
  <div class="form">
    <form id="form" method="post">
      <div class="form-group" data-group="1">
        <label for="gun1">1. gün:</label>
        <input type="text" id="gun1" name="gun1" />
        <div class="button-group">
          <button type="button" data-type="paste">Yapıştır</button>
          <button type="button" data-type="clear">Temizle</button>
        </div>
      </div>

      <div class="form-group" data-group="2">
        <label for="gun2">2. gün:</label>
        <input type="text" id="gun2" name="gun2" />
        <div class="button-group">
          <button type="button" data-type="paste">Yapıştır</button>
          <button type="button" data-type="clear">Temizle</button>
        </div>
      </div>

      <div class="form-group" data-group="3">
        <label for="gun3">3. gün:</label>
        <input type="text" id="gun3" name="gun3" />
        <div class="button-group">
          <button type="button" data-type="paste">Yapıştır</button>
          <button type="button" data-type="clear">Temizle</button>
        </div>
      </div>

      <div class="form-group" data-group="4">
        <label for="gun4">4. gün:</label>
        <input type="text" id="gun4" name="gun4" />
        <div class="button-group">
          <button type="button" data-type="paste">Yapıştır</button>
          <button type="button" data-type="clear">Temizle</button>
        </div>
      </div>

      <div class="form-group" data-group="5">
        <label for="gun5">5. gün:</label>
        <input type="text" id="gun5" name="gun5" />
        <div class="button-group">
          <button type="button" data-type="paste">Yapıştır</button>
          <button type="button" data-type="clear">Temizle</button>
        </div>
      </div>

      <div class="form-group" data-group="6">
        <label for="gun6">6. gün:</label>
        <input type="text" id="gun6" name="gun6" />
        <div class="button-group">
          <button type="button" data-type="paste">Yapıştır</button>
          <button type="button" data-type="clear">Temizle</button>
        </div>
      </div>

      <div class="form-group" data-group="7">
        <label for="gun7">7. gün:</label>
        <input type="text" id="gun7" name="gun7" />
        <div class="button-group">
          <button type="button" data-type="paste">Yapıştır</button>
          <button type="button" data-type="clear">Temizle</button>
        </div>
      </div>

      <div class="form-group" data-group="update">
        <button type="submit" data-type="update">
          Sonuç Tablosu Oluştur
        </button>
      </div>
    </form>
  </div>
  <div class="table" id="table"></div>
</main>
`;const c=document.querySelector("#form"),s=document.querySelector(".table"),f=e=>{const t=[];for(const o of e)for(const r of o){const n=t.findIndex(a=>a.userId===r.userId);n!==-1?(t[n].score+=r.score,t[n].playerName=r.playerName):t.push({...r})}return t.sort((o,r)=>r.score-o.score)},y=e=>{try{const t=JSON.parse(e);if(t&&typeof t=="object")return t}catch{}return!1},v=(e,t)=>{const o=document.createElement("table"),r=document.createElement("thead"),n=document.createElement("tr"),a=document.createElement("th");a.textContent=" ",n.appendChild(a),Object.keys(e[0]).forEach(function(u){if(u!==t){const l=document.createElement("th");l.textContent=u,u==="playerName"&&(l.textContent="Oyuncu"),u==="score"&&(l.textContent="Skor"),n.appendChild(l)}}),r.appendChild(n),o.appendChild(r);const d=document.createElement("tbody");return e.forEach(function(u,l){const i=document.createElement("tr"),p=document.createElement("td");p.textContent=l+1,i.appendChild(p),Object.entries(u).forEach(function([m,g]){if(m!==t){const b=document.createElement("td");b.textContent=g,i.appendChild(b)}}),d.appendChild(i)}),o.appendChild(d),o},h=async e=>{e.preventDefault();const t=new FormData(e.currentTarget),o=Object.fromEntries(t.entries()),r=Object.values(o).map(u=>y(u)).filter(u=>u!=="").filter(u=>u);if(!r.length)return;const n=f(r),a=v(n,"userId"),d=document.createElement("h2");d.innerText="Sonuçlar",s.innerHTML="",s.appendChild(d),s.appendChild(a)},C=async e=>{const t=document.querySelector(`[data-group="${e}"] input`);try{const o=await navigator.clipboard.readText();t.value=o,localStorage.setItem(`${e}`,t.value)}catch(o){console.error("Cannot read clipboard",o)}},x=e=>{const t=e.target.closest("[data-group]").dataset.group,o=e.target;localStorage.setItem(`${t}`,o.value)},E=e=>{const t=document.querySelector(`[data-group="${e}"] input`);t.value="",localStorage.removeItem(`${e}`)},S=async e=>{if(!(e.target instanceof HTMLButtonElement))return;const t=e.target.dataset.type;if(t==="update")return;const o=e.target.closest("[data-group]").dataset.group;if(t==="paste"){await C(o);return}t==="clear"&&E(o)};(()=>{for(let e=1;e<=7;e++){const t=document.querySelector(`[data-group="${e}"] input`),o=localStorage.getItem(`${e}`);o&&(t.value=o)}})();c.addEventListener("submit",h);c.addEventListener("click",S);c.addEventListener("input",x);c.requestSubmit();
