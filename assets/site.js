const script=document.querySelector('script[data-title-zh]');
const nodes=[...document.querySelectorAll('[data-en]')];
nodes.forEach(n=>n.dataset.zh=n.innerHTML);
const button=document.getElementById('lang');
let english=false;
try{english=localStorage.getItem('haijin-language')==='en'}catch(e){}
const query=new URLSearchParams(location.search).get('lang');
if(query==='en'||query==='zh')english=query==='en';
function renderLanguage(){
 nodes.forEach(n=>n.innerHTML=english?n.dataset.en:n.dataset.zh);
 document.documentElement.lang=english?'en':'zh-CN';
 button.textContent=english?'中文':'EN';
 button.setAttribute('aria-label',english?'切换到中文':'Switch to English');
 document.title=(english?script.dataset.titleEn:script.dataset.titleZh)+' | '+(english?'GOLDEN SEA SHIPPING':'连云港海金船务有限公司');
 document.querySelectorAll('a[href]').forEach(a=>{const u=new URL(a.href);if(u.origin===location.origin&&u.pathname.endsWith('.html')){u.searchParams.set('lang',english?'en':'zh');a.setAttribute('href',u.pathname.split('/').pop()+u.search+u.hash)}});
}
button.addEventListener('click',()=>{english=!english;try{localStorage.setItem('haijin-language',english?'en':'zh')}catch(e){}const u=new URL(location.href);u.searchParams.set('lang',english?'en':'zh');history.replaceState(null,'',u);renderLanguage()});
renderLanguage();
document.getElementById('year').textContent=new Date().getFullYear();
const legacy=['about','services','credentials','careers','contact'];
if((location.pathname.endsWith('/')||location.pathname.endsWith('/index.html'))&&legacy.includes(location.hash.slice(1)))location.replace(location.hash.slice(1)+'.html?lang='+(english?'en':'zh'));
