 /* Private customer signing controls and invoice presentation. */
window.TPJSigningUI=(()=>{
 const e=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const money=x=>'$'+(Number(x||0)/100).toFixed(2);
 function format(value){
  if(!value)return '';
  const dateOnly=/^\d{4}-\d{2}-\d{2}$/.test(value),local=/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value);
  if(local)return format(value.slice(0,10))+' at '+new Date('2000-01-01T'+value.slice(11)+':00Z').toLocaleTimeString('en-US',{timeZone:'UTC',hour:'numeric',minute:'2-digit'});
  const d=new Date(dateOnly?value+'T12:00:00Z':value);if(!Number.isFinite(d.getTime()))return value;
  return new Intl.DateTimeFormat('en-US',{timeZone:dateOnly?'UTC':'America/Chicago',month:'long',day:'numeric',year:'numeric',...(!dateOnly?{hour:'numeric',minute:'2-digit',timeZoneName:'short'}:{})}).format(d);
 }
 function invoice(o){
  const paid=o.intents.reduce((n,i)=>n+Number(i.paid_cents||0),0),pending=o.intents.find(i=>i.status!=='PAID'),items=o.snapshot.items||[];
  return '<section class="card" id="invoice"><h2>'+(o.contractRequired?'Custom Cake Order Invoice':'Shop Order Invoice')+'</h2><p>Order reference: <strong>'+e(o.requestId)+'</strong></p><p>Thank you for choosing The Pastry Junkie. This invoice reflects your approved order and payment schedule.</p>'+items.map(i=>'<p><strong>'+e(i.title)+'</strong> · Quantity '+e(i.quantity)+'</p><ul>'+(i.details||[]).map(t=>'<li>'+e(t)+'</li>').join('')+'</ul>').join('')+(o.snapshot.approvedDescription?'<p style="white-space:pre-wrap">'+e(o.snapshot.approvedDescription)+'</p>':'')+'<dl class="facts"><dt>Order total</dt><dd>'+money(o.totalCents)+'</dd><dt>Total paid</dt><dd>'+money(paid)+'</dd><dt>Remaining balance</dt><dd>'+money(Math.max(0,o.totalCents-paid))+'</dd></dl>'+o.intents.map(i=>'<p><strong>'+e(i.phase==='initial'?(o.initialCents<o.totalCents?'Deposit':'Full payment'):'Remaining balance')+'</strong> · '+money(i.amount_cents)+' · '+e(i.status)+(i.phase==='balance'?' · Due '+e(format(o.balanceDueDate)):'')+(i.paid_at?' · Received '+e(format(i.paid_at)):'')+'</p>').join('')+(o.paymentReview?'<p class="error">A refund or dispute requires review. Contact the business for the current financial resolution.</p>':pending?'<p>Use the secure payment section on this page to pay the amount currently required.</p>':'<p><strong>Paid in full. Thank you!</strong></p>')+'<p class="no-print"><a href="?view=agreement#'+e(o.id)+'.'+e(location.hash.split('.').at(-1))+'">View agreement</a> · <button type="button" id="invoicePrint">Print / save invoice</button></p></section>';
 }
 function savedSignature(o){
  const s=o.signature,a=s.signature,b=o.snapshot.businessAcceptance;
  const picture=a?.method==='drawn'&&/^data:image\/png;base64,[A-Za-z0-9+/]+=*$/.test(a.png||'')?'<img src="'+a.png+'" width="300" style="max-width:100%;height:auto" alt="Customer signature">':'<p style="font:italic 30px Georgia,serif">'+e(s.name)+'</p>';
  return '<div class="signature"><h3>Customer signature</h3>'+picture+'<p>'+e(s.name)+' · '+e(format(s.signedAt))+'</p><p>Email verification: '+e(s.verification?.email||'Not recorded for this earlier agreement')+'</p>'+(b?'<h3>Business signature</h3><p style="font:italic 26px Georgia,serif">'+e(b.name)+'</p><p>'+e(format(b.signedAt))+'</p>':'')+'</div>';
 }
 function mount(form,api,getVerification,setVerification){
  const block=document.createElement('section');block.innerHTML='<h3>Verify your email and sign</h3><p>We’ll send a six-digit code to the email saved on this order. It expires in 10 minutes. Verification confirms access to that inbox.</p><button type="button" id="sendCode">Send verification code</button><label>Verification code<input id="emailCode" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}"></label><button type="button" id="verifyCode">Verify code</button><p id="codeStatus" role="status" aria-live="polite"></p><label>Signature style<select id="signatureMethod"><option value="typed">Type my signature</option><option value="drawn">Draw my signature</option></select></label><p id="typedSignature" style="font:italic 28px Georgia,serif"></p><div id="drawing" hidden><p>Draw inside the box using your finger or mouse.</p><canvas id="signatureCanvas" width="900" height="300" aria-label="Draw your signature" style="display:block;width:100%;height:150px;border:1px solid #cda7ad;border-radius:8px;background:white;touch-action:none"></canvas><button type="button" id="clearSignature">Clear signature</button></div>';
  const submit=form.querySelector('button[type=submit]');form.insertBefore(block,submit);
  const q=s=>block.querySelector(s),status=q('#codeStatus'),canvas=q('#signatureCanvas'),ctx=canvas.getContext('2d');let challenge=null,busy=false,down=false,drawn=false;
  ctx.lineWidth=4;ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle='#1c1614';
  const point=ev=>{const r=canvas.getBoundingClientRect();return {x:(ev.clientX-r.left)*900/r.width,y:(ev.clientY-r.top)*300/r.height};};
  canvas.onpointerdown=ev=>{ev.preventDefault();down=true;drawn=true;canvas.setPointerCapture(ev.pointerId);const p=point(ev);ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x+.1,p.y+.1);ctx.stroke();};
  canvas.onpointermove=ev=>{if(!down)return;ev.preventDefault();const p=point(ev);ctx.lineTo(p.x,p.y);ctx.stroke();};
  canvas.onpointerup=canvas.onpointercancel=()=>down=false;
  q('#clearSignature').onclick=()=>{ctx.clearRect(0,0,900,300);drawn=false;};
  const signer=form.elements.signer;signer.addEventListener('input',()=>q('#typedSignature').textContent=signer.value);
  q('#signatureMethod').onchange=()=>{const draw=q('#signatureMethod').value==='drawn';q('#drawing').hidden=!draw;q('#typedSignature').hidden=draw;};
  q('#sendCode').onclick=async()=>{if(busy)return;busy=true;q('#sendCode').disabled=true;status.textContent='Sending your code…';try{setVerification(null);const d=await api('verification-start',{});challenge=d.challengeId;status.textContent='Code sent to '+d.emailHint+'. Use the latest code within 10 minutes.';}catch(error){status.textContent=error.message;}finally{busy=false;setTimeout(()=>{q('#sendCode').disabled=false;},60000);}};
  q('#verifyCode').onclick=async()=>{if(busy)return;if(!challenge){status.textContent='Request a code first. If you refreshed the page, request a new one.';return;}busy=true;q('#verifyCode').disabled=true;try{const d=await api('verification-check',{challengeId:challenge,code:q('#emailCode').value.trim()});setVerification(d);status.textContent='Email verified. Review the agreement and finish signing before the code expires.';q('#emailCode').value='';}catch(error){status.textContent=error.message;}finally{busy=false;q('#verifyCode').disabled=false;}};
  return {payload(){const v=getVerification();if(!v)throw Error('Verify your email before signing.');const method=q('#signatureMethod').value;if(method==='drawn'&&!drawn)throw Error('Draw your signature or choose the typed option.');return {verificationId:v.verificationId,verificationProof:v.verificationProof,signatureMethod:method,...(method==='drawn'?{signaturePNG:canvas.toDataURL('image/png')}:{})};}};
 }
 function navigate(){
  const target=new URLSearchParams(location.search).get('view');if(['invoice','agreement'].includes(target))document.getElementById(target)?.scrollIntoView();
  const button=document.getElementById('invoicePrint');if(button)button.onclick=()=>{document.body.classList.add('print-invoice');window.print();document.body.classList.remove('print-invoice');};
 }
 const style=document.createElement('style');style.textContent='select{font:inherit;max-width:100%;padding:9px;border:1px solid #cda7ad;border-radius:7px}#invoice{border-top:5px solid #efc9e8}#agreement{border-top:5px solid #efc9e8}@media print{body.print-invoice #content>section:not(#invoice){display:none!important}body.print-invoice header{display:block}#invoice{break-inside:avoid}}';document.head.append(style);
 return {format,invoice,mount,savedSignature,navigate};
})();