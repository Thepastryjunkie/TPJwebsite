/* TPJ PUBLIC TERMS AND PRIVACY PAGES */
(() => {
 const root=document.getElementById('policyContent');
 const e=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const data=window.TPJOrderTerms;
 if(!data){root.textContent='The policy could not load. Please contact baked@thepastryjunkie.com.';return;}
 const privacy=location.pathname.endsWith('/privacy.html');
 function draw(){
  const key=privacy?'privacy':location.hash==='#cake'?'cake_builder':'shop';const item=data[key];
  document.title=item.title+' | The Pastry Junkie';
  root.innerHTML='<h1>'+e(item.title)+'</h1><p>Version '+e(data.version)+'</p>'+(!privacy?'<p>These are general terms. Your private, order-specific agreement records the final approved details and the exact terms you accept before payment.</p>':'')+item.sections.map((s,i)=>'<section><h2>'+(i+1)+'. '+e(s.title)+'</h2><p>'+e(s.text)+'</p></section>').join('')+(item.addendum?'<section><h2>Contract clarifications</h2><p>'+e(item.addendum)+'</p></section>':'');
 }
 window.addEventListener('hashchange',draw);draw();
})();
