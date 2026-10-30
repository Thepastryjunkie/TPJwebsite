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
  const total=o.change?o.totalCents:(o.orderTotals?.revisedTotalCents??o.totalCents),paid=o.change?o.intents.reduce((n,i)=>n+Number(i.paid_cents||0),0):(o.orderTotals?.paidTotalCents??o.intents.reduce((n,i)=>n+Number(i.paid_cents||0),0)),pending=paid<total,items=o.snapshot.items||[],quote=o.change?o.snapshot.quote:(o.orderTotals?.effectiveQuote||o.snapshot.quote);
  return '<section class="card" id="invoice"><h2>'+(o.change?'Order Change Invoice':o.contractRequired?'Custom Cake Order Invoice':'Shop Order Invoice')+'</h2><p>Order reference: <strong>'+e(o.reference || o.requestId)+'</strong></p><p><strong>Customer:</strong> '+e(o.snapshot.customer?.name)+'<br><strong>Fulfillment:</strong> '+e(format(o.fulfillmentDate))+' at '+e(window.TPJOrderTime.format(o.fulfillmentTime))+' Central<br><strong>Method:</strong> '+e(o.snapshot.fulfillment?.method)+'</p><p>Thank you for choosing The Pastry Junkie. This invoice reflects your approved order and payment schedule.</p>'+(o.snapshot.quote?window.TPJRecords.quote(quote,total):'')+(o.snapshot.quote?[]:items).map(i=>'<p><strong>'+e(i.title)+'</strong> · Quantity '+e(i.quantity)+'</p><ul>'+(i.details||[]).map(t=>'<li>'+e(t)+'</li>').join('')+'</ul>').join('')+(o.snapshot.approvedDescription?'<p style="white-space:pre-wrap">'+e(o.snapshot.approvedDescription)+'</p>':'')+'<dl class="facts"><dt>Order total</dt><dd>'+money(total)+'</dd><dt>Total paid</dt><dd>'+money(paid)+'</dd><dt>Remaining balance</dt><dd>'+money(Math.max(0,total-paid))+'</dd></dl>'+o.intents.map(i=>'<p><strong>'+e(i.phase==='initial'?(o.initialCents<o.totalCents?'Deposit':'Full payment'):'Remaining balance')+'</strong> · '+money(i.amount_cents)+' · '+e(i.status)+(i.phase==='balance'?' · Due '+e(format(o.balanceDueDate)):'')+(i.paid_at?' · Received '+e(format(i.paid_at)):'')+'</p>').join('')+(o.paymentReview?'<p class="error">A refund or dispute requires review. Contact the business for the current financial resolution.</p>':pending?'<p>Use the secure payment section on this page to pay the amount currently required.</p>':'<p><strong>Paid in full. Thank you!</strong></p>')+(!o.change?(o.orderTotals?.changes||[]).filter(c=>c.accepted&&c.status!=='VOID').map(c=>'<p><strong>Additional charge '+e(c.number)+'</strong> · '+money(c.amountCents)+' · '+e(c.paymentStatus)+' · Due '+e(format(c.dueDate))+'</p>').join(''):'')+'<p class="no-print"><button type="button" id="invoicePrint">Print / save invoice</button></p></section>';
 }
 function savedSignature(o){
  const s=o.signature,a=s.signature,b=o.snapshot.businessAcceptance;
  const picture=a?.method==='drawn'&&/^data:image\/png;base64,[A-Za-z0-9+/]+=*$/.test(a.png||'')?'<img src="'+a.png+'" width="300" style="max-width:100%;height:auto" alt="Customer signature">':'<p style="font:italic 30px Georgia,serif">'+e(s.name)+'</p>';
  return '<div class="signature"><h3>Customer signature</h3>'+picture+'<p>'+e(s.name)+' · '+e(format(s.signedAt))+'</p><p>Email verification: '+e(s.verification?.email||'Not recorded for this earlier agreement')+'</p>'+(b?'<h3>Business signature</h3><p style="font:italic 26px Georgia,serif">'+e(b.name)+'</p><p>'+e(format(b.signedAt))+'</p>':'')+'</div>';
 }
 function mount(form,api,getVerification,setVerification){
  const block=document.createElement('section');block.innerHTML='<h3>Verify your email and sign</h3><p>We’ll send a six-digit code to the email saved on this order. It expires in 10 minutes. Check Spam/Junk if the code has not arrived. Verification confirms access to that inbox.</p><button type="button" id="sendCode">Send verification code</button><label>Verification code<input id="emailCode" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}"></label><button type="button" id="verifyCode">Verify code</button><p id="codeStatus" role="status" aria-live="polite"></p><label>Signature style<select id="signatureMethod"><option value="typed">Type my signature</option><option value="drawn">Draw my signature</option></select></label><p id="typedSignature" style="font:italic 28px Georgia,serif"></p><div id="drawing" hidden><p>Draw inside the box using your finger or mouse.</p><canvas id="signatureCanvas" width="900" height="300" aria-label="Draw your signature" style="display:block;width:100%;height:150px;border:1px solid #cda7ad;border-radius:8px;background:white;touch-action:none"></canvas><button type="button" id="clearSignature">Clear signature</button></div>';
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
  const validProof=()=>{
    const v=getVerification();
    return Boolean(v && Date.parse(v.expiresAt)>Date.now());
  };
  let codeExpiresAt=null;
  const showVerified=proof=>{
    q('#emailCode').value='';
    q('#emailCode').disabled=true;
    q('#verifyCode').disabled=true;
    q('#sendCode').disabled=true;
    status.textContent='Email verified. You can now finish signing. Verification stays active until the code expires.';
    setTimeout(()=>{
      if(getVerification()?.verificationId!==proof.verificationId)return;
      setVerification(null);
      challenge=null;
      q('#emailCode').disabled=false;
      q('#verifyCode').disabled=false;
      q('#sendCode').disabled=false;
      q('#sendCode').textContent='Send a new code';
      status.textContent='Verification expired. Request a new code to finish signing.';
    },Math.max(0,Date.parse(proof.expiresAt)-Date.now()));
  };
  q('#sendCode').onclick=async()=>{
    if(busy || validProof() || q('#sendCode').disabled)return;
    busy=true;
    q('#sendCode').disabled=true;
    q('#verifyCode').disabled=true;
    status.textContent='Sending your code…';
    try{
      setVerification(null);
      const d=await api('verification-start',{});
      challenge=d.challengeId;
      codeExpiresAt=d.expiresAt;
      q('#sendCode').textContent='Resend code';
      status.textContent='Code sent to '+d.emailHint+'. Check your inbox and Spam/Junk folder. Use the latest code within 10 minutes. You can resend after one minute.';
    }catch(error){status.textContent=error.message;}
    finally{
      busy=false;
      if(!validProof())q('#verifyCode').disabled=false;
      setTimeout(()=>{
        if(!validProof())q('#sendCode').disabled=false;
      },60000);
    }
  };
  q('#verifyCode').onclick=async()=>{
    if(busy || validProof())return;
    if(!challenge){status.textContent='Request a code first. Check your Spam/Junk folder if it has not arrived.';return;}
    busy=true;
    q('#verifyCode').disabled=true;
    try{
      const d=await api('verification-check',{
        challengeId:challenge,
        code:q('#emailCode').value.trim()
      });
      const proof={...d,expiresAt:d.expiresAt || codeExpiresAt};
      setVerification(proof);
      showVerified(proof);
    }catch(error){status.textContent=error.message;}
    finally{
      busy=false;
      if(!validProof())q('#verifyCode').disabled=false;
    }
  };
  if(validProof())showVerified(getVerification());
  return {payload(){const v=getVerification();if(!validProof())throw Error('Verify your email before signing.');const method=q('#signatureMethod').value;if(method==='drawn'&&!drawn)throw Error('Draw your signature or choose the typed option.');return {verificationId:v.verificationId,verificationProof:v.verificationProof,signatureMethod:method,...(method==='drawn'?{signaturePNG:canvas.toDataURL('image/png')}:{})};}};
 }
 function navigate(o){
  const selected=new URLSearchParams(location.search).get('view');
  const target=['invoice','agreement'].includes(selected)?selected:(!o.signature?'agreement':'invoice');
  document.body.dataset.documentView=target;
  for(const section of document.querySelectorAll('#content > section'))section.hidden=target==='agreement'?section.id!=='agreement':!['invoice','paymentPanel','creditPanel','cancelPanel','changePanel'].includes(section.id);
  const button=document.getElementById('invoicePrint');if(button)button.onclick=()=>window.TPJRecordDocuments.print('invoice');
 }

 const style=document.createElement('style');style.textContent='select{font:inherit;max-width:100%;padding:9px;border:1px solid #cda7ad;border-radius:7px}#invoice{border-top:5px solid #efc9e8}#agreement{border-top:5px solid #efc9e8}@media print{body.print-invoice #content>section:not(#invoice){display:none!important}body.print-agreement #content>section:not(#agreement){display:none!important}body.print-invoice #invoice,body.print-agreement #agreement{display:block!important}body.print-agreement #acceptForm>section,body.print-agreement #acceptForm>label,body.print-agreement #acceptForm>button,body.print-agreement #acceptForm>p,body.print-agreement #acceptForm article label{display:none!important}body.print-agreement #agreement .no-print,body.print-invoice .no-print{display:none!important}body.print-invoice header{display:block}#invoice{break-inside:avoid}}';document.head.append(style);
 return {format,invoice,mount,savedSignature,navigate};
})();
