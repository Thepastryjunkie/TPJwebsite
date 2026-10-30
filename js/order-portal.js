/* TPJ PRIVATE CUSTOMER ORDER PAGE */
(() => {
 'use strict';
 const API='https://tpj-orders-api.business-c3f.workers.dev';
 const $=id=>document.getElementById(id);
 const e=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const money=n=>'$'+(Number(n||0)/100).toFixed(2);
 const match=location.hash.slice(1).match(/^([A-Za-z0-9_-]{16,80})\.([a-f0-9]{64})$/);
 let offer=null,card=null,attempt=null,renderID=0,pollTimer;
 let verification=null;
 const fmt=v=>window.TPJSigningUI.format(v);
 if(!match){$('status').textContent='Open the complete private order link from your email, including everything after #.';$('status').className='error';return;}
 const [,id,token]=match;
 async function api(action='',body){
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),25000);
  try{
   const r=await fetch(API+'/api/workflow/offers/'+encodeURIComponent(id)+(action?'/'+action:''),{
    method:body?'POST':'GET',headers:{Authorization:'Bearer '+token,...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{}),cache:'no-store',signal:controller.signal
   });
   let data;try{data=await r.json();}catch{throw Error('The order service did not return a readable result. Please retry.');}
   if(!r.ok||!data.ok){const error=Error(data.error||data.message||'This action was not confirmed.');error.retryable=data.retryable!==false;throw error;}return data;
  }finally{clearTimeout(timer);}
 }
 async function load(){
  clearTimeout(pollTimer);
  try{const data=await api();offer=data.offer;await render();$('status').textContent='';}
  catch(error){$('status').textContent=error.message;$('status').className='error';}
 }
 async function sdk(environment){
  if(window.Square)return;
  await new Promise((resolve,reject)=>{
   const script=document.createElement('script'),timer=setTimeout(()=>{script.remove();reject(Error('The secure card form took too long to load. Refresh and try again.'));},20000);
   script.src=environment==='sandbox'?'https://sandbox.web.squarecdn.com/v1/square.js':'https://web.squarecdn.com/v1/square.js';
   script.onload=()=>{clearTimeout(timer);resolve();};script.onerror=()=>{clearTimeout(timer);script.remove();reject(Error('The secure card form could not load. Check your connection or browser extensions.'));};document.head.append(script);
  });if(!window.Square)throw Error('The secure card form did not initialize.');
 }
 async function render(){
  const current=++renderID;if(card){await card.destroy();card=null;}
  const o=offer,s=o.snapshot,initial=o.intents.find(i=>i.phase==='initial'),balance=o.intents.find(i=>i.phase==='balance');
  const ready=initial?.status==='PAID'?balance:initial;
  let html=(o.environment==='sandbox'?'<p class="banner">SANDBOX TEST — no real charge or booking. Use Square test cards only.</p>':'');
  const state=o.status==='CLOSED'?'Order closed':o.paymentReview?'Payment review required':initial?.status==='PAID'?(o.environment==='sandbox'?'Simulated order confirmed':'Order confirmed'):o.signature?'Agreement saved — payment required':'Review your approved order';
  html+='<section class="card"><h2>'+e(state)+'</h2><p><strong>'+e(o.reference || o.requestId)+'</strong></p><dl class="facts"><dt>Customer</dt><dd>'+e(s.customer.name)+'</dd><dt>Approved total</dt><dd>'+money(o.totalCents)+'</dd><dt>Fulfillment</dt><dd>'+e(fmt(o.fulfillmentDate+'T'+o.fulfillmentTime))+' Central</dd><dt>Method</dt><dd>'+e(s.fulfillment.method||'As agreed')+'</dd><dt>Rush fee included</dt><dd>'+money(o.rushFeeCents)+'</dd><dt>Initial payment</dt><dd>'+money(o.initialCents)+'</dd>'+(o.balanceDueDate?'<dt>Balance due</dt><dd>'+e(fmt(o.balanceDueDate))+'</dd>':'')+'</dl>';
  if(s.fulfillment.method==='delivery')html+='<p><strong>Delivery address:</strong> '+e(Object.values(s.fulfillment.address||{}).filter(Boolean).join(', '))+'</p>';
  if(s.items.length)html+='<h3>Approved selections</h3>'+s.items.map(i=>'<p><strong>'+e(i.title)+'</strong> · Quantity '+e(i.quantity)+'</p><ul>'+(i.details||[]).map(d=>'<li>'+e(d)+'</li>').join('')+'</ul>').join('');
  if(Object.keys(s.inquirySummary||{}).length)html+='<h3>Cake inquiry details</h3><dl class="facts">'+Object.entries(s.inquirySummary).map(([k,v])=>'<dt>'+e(k)+'</dt><dd>'+e(v)+'</dd>').join('')+'</dl>';
  if(s.approvedDescription)html+='<h3>Final approved details</h3><p class="preserve">'+e(s.approvedDescription)+'</p><p class="muted">These final approved details control any changes agreed after the original inquiry.</p>';
  if(s.customerNotes)html+='<p><strong>Your notes:</strong> '+e(s.customerNotes)+'</p>';
  html+='<p class="muted">Initial payment must be completed before '+e(fmt(o.expiresAt))+' to secure this approval. An expired, unpaid approval requires a new review.</p><div class="actions no-print"><button id="refresh" class="secondary" type="button">Refresh status</button><button id="print" class="secondary" type="button">Print/save agreement</button></div></section>';
  html+=window.TPJSigningUI.invoice(o);
  html+='<section id="paymentPanel" class="card no-print"><h2>Payment status</h2>'+o.intents.map(i=>'<p><strong>'+e(i.phase==='initial'?'Initial payment':'Remaining balance')+':</strong> '+money(i.amount_cents)+' · '+e(i.status)+'</p>').join('');
  if(o.paymentReview)html+='<p class="error">The business must review this payment with Square before any further payment or handoff. Contact baked@thepastryjunkie.com.</p>';
  else if(o.status==='CLOSED')html+='<p>This order is closed. No new payment can be made.</p>';
  else if(o.expired)html+='<p>This unpaid approval expired. Contact the business to review and reissue it.</p>';
  else if(!o.signature)html+='<p>Review and accept the agreement below before paying.</p>';
  else if(!ready)html+='<p><strong>All required payments have been verified.</strong></p>';
  else if(!o.canPay)html+='<p>Payments are currently unavailable for this link. Contact the business.</p>';
  else if(ready.status==='PROCESSING'&&!attempt)html+='<p>A payment attempt is processing. Refresh its status or contact the business before trying a different payment. Do not pay again through another link.</p>';
  else if(ready.status==='REVIEW')html+='<p>Contact the business to review this payment.</p>';
  else html+='<p>Pay '+money(ready.amount_cents)+(ready.phase==='balance'?' remaining balance':' to confirm this order')+'. No card will be stored for automatic future charges.</p>'+(o.environment==='sandbox'?'<p class="muted">Test card: 4111 1111 1111 1111 · CVV 111 · future expiration · ZIP 11111.</p>':'')+'<div id="card-container"></div><button id="pay" type="button" disabled>Loading secure card form…</button><p id="paymentMessage" role="status" aria-live="polite"></p>';
  html+='</section>';
  html+='<section id="agreement" class="card"><h2>'+e(o.terms.title)+'</h2><p>Terms version: '+e(o.terms.version)+'</p>';
  if(!o.signature)html+='<form id="acceptForm">';
  html+=o.terms.sections.map((section,i)=>'<article class="term"><h3>'+(i+1)+'. '+e(section.title)+'</h3><p>'+e(section.text)+'</p>'+(o.contractRequired?(o.signature?'<p><strong>Initials:</strong> '+e(o.signature.initials[i])+'</p>':'<label>Initials for section '+(i+1)+'<br><input class="initial" name="initial'+i+'" required maxlength="6" pattern="[A-Za-z]{1,6}" autocomplete="off" aria-label="Initials for '+e(section.title)+'"></label>'):'')+'</article>').join('');
  if(o.terms.addendum)html+='<article class="term"><h3>Contract clarifications</h3><p>'+e(o.terms.addendum)+'</p></article>';
  if(o.signature)html+=window.TPJSigningUI.savedSignature(o)+'<div class="signature"><strong>Accepted and electronically signed by:</strong> '+e(o.signature.name)+'<br><strong>Signed:</strong> '+e(fmt(o.signature.signedAt))+'<br><strong>Terms version:</strong> '+e(o.signature.termsVersion)+'<br><strong>Footprint reference:</strong> '+e(o.footprint || 'Earlier agreement')+'</div><details class="no-print"><summary>Technical signing details</summary><p>Terms SHA-256: '+e(o.signature.termsHash)+'</p></details>';
  else html+='<label>Full legal name<br><input name="signer" required minlength="2" maxlength="150" autocomplete="name"></label><label><input name="agree" type="checkbox" required> I reviewed and agree to the approved order, payment schedule, all terms and any contract clarifications above.</label><label><input name="electronic" type="checkbox" required> I consent to electronic records and signatures and intend my typed name to be my electronic signature. I can print or save a copy of this agreement.</label><label><input name="authorized" type="checkbox" required> I am the customer or am authorized to accept this agreement on the customer’s behalf.</label><p><a href="privacy.html" target="_blank" rel="noopener noreferrer">Read the privacy notice</a></p><button type="submit"'+(o.expired||o.status==='CLOSED'?' disabled':'')+'>'+(o.contractRequired?'Sign cake contract':'Accept Shop terms')+'</button><p id="acceptMessage" role="status" aria-live="polite"></p></form>';
  html+='</section>';
  if(o.credits.length)html+='<section class="card"><h2>Store credit</h2>'+o.credits.map(c=>'<p><strong>'+e(c.code)+'</strong> · Remaining '+money(c.remaining_cents)+(c.expires_on?' · Expires '+e(c.expires_on):'')+'</p><p>'+e(c.conditions)+'</p>').join('')+'<p>Contact the business before ordering to arrange its use. Credit is not automatically applied to a payment.</p></section>';
  html+='<section id="cancelPanel" class="card no-print"><h2>Cancellation requests</h2>'+(o.cancellation?'<p>Your request was received '+e(o.cancellation.received_at)+'. The business will confirm the outcome in writing. No refund or credit has been promised.</p>':o.status==='CLOSED'?'<p>This order has been closed.</p>':'<p>Submitting a request does not guarantee a refund or store credit. Review your accepted cancellation terms.</p><form id="cancelForm"><label>Reason<textarea name="reason" required minlength="3" maxlength="2000"></textarea></label><button type="submit" class="secondary">Request cancellation</button><p id="cancelMessage" role="status" aria-live="polite"></p></form>')+'</section>';
  $('content').innerHTML=html;
  window.TPJSigningUI.navigate();
  $('refresh').onclick=load;$('print').onclick=()=>window.print();
  const accept=$('acceptForm');
  const signingUI=accept?window.TPJSigningUI.mount(accept,api,()=>verification,v=>verification=v):null;
  if(accept)accept.onsubmit=async event=>{
   event.preventDefault();if(!accept.reportValidity())return;let signing;try{signing=signingUI.payload();}catch(error){$('acceptMessage').textContent=error.message;return;}const button=accept.querySelector('button');button.disabled=true;
   try{const data=await api('accept',{...signing,termsHash:o.termsHash,name:accept.elements.signer.value,agree:accept.elements.agree.checked,electronicConsent:accept.elements.electronic.checked,authorized:accept.elements.authorized.checked,initials:o.contractRequired?o.terms.sections.map((_,i)=>accept.elements['initial'+i].value.trim()):[]});offer=data.offer;await render();window.scrollTo({top:0,behavior:'smooth'});}
   catch(error){if($('acceptMessage')){$('acceptMessage').textContent=error.message;$('acceptMessage').className='error';}button.disabled=false;}
  };
  const cancel=$('cancelForm');if(cancel)cancel.onsubmit=async event=>{event.preventDefault();if(!cancel.reportValidity())return;const button=cancel.querySelector('button');button.disabled=true;try{await api('cancel',{reason:cancel.elements.reason.value});await load();}catch(error){$('cancelMessage').textContent=error.message;button.disabled=false;}};
  if($('pay')){
   try{
    await sdk(o.environment);if(current!==renderID)return;
    const payments=window.Square.payments(o.applicationId,o.locationId);card=await payments.card();await card.attach('#card-container');if(current!==renderID)return;
    const button=$('pay');button.disabled=false;button.textContent=attempt?'Retry same payment':'Pay '+money(ready.amount_cents);
    button.onclick=async()=>{
     if(button.disabled)return;button.disabled=true;$('paymentMessage').textContent='Verifying payment…';
     try{
      if(!attempt){const names=(o.signature?.name||s.customer.name).trim().split(/\s+/);const result=await card.tokenize({amount:(ready.amount_cents/100).toFixed(2),currencyCode:'USD',intent:'CHARGE',customerInitiated:true,sellerKeyedIn:false,billingContact:{givenName:names[0],familyName:names.slice(1).join(' ')||names[0],email:s.customer.email,countryCode:'US'}});if(result.status!=='OK'||!result.token)throw Error('Check the card fields and try again.');attempt={phase:ready.phase,attemptKey:crypto.randomUUID(),sourceId:result.token};}
      const data=await api('pay',attempt);if(data.paid!==true)throw Error('The payment was not verified. Retry this same attempt.');attempt=null;offer=data.offer;await render();window.scrollTo({top:0,behavior:'smooth'});
     }catch(error){if(error.retryable===false)attempt=null;if($('paymentMessage')){$('paymentMessage').textContent=error.message;$('paymentMessage').className='error';button.textContent=attempt?'Retry same payment':'Pay '+money(ready.amount_cents);button.disabled=false;}}
    };
   }catch(error){if(current===renderID&&$('paymentMessage')){$('paymentMessage').textContent=error.message;$('paymentMessage').className='error';}}
  }
  if(o.intents.some(i=>i.status==='PROCESSING')&&!attempt)pollTimer=setTimeout(load,10000);
 }
 load();
})();
