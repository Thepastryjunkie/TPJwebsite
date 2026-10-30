/* TPJ APPROVALS, PAYMENTS AND CREDIT RECORDS */
window.TPJWorkflowAdmin = (() => {
 let generation=0;
 const e=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const money=n=>typeof n==='number'?'$'+(n/100).toFixed(2):'Not set';
 function cents(v){const s=String(v).trim();if(!/^\d+(\.\d{1,2})?$/.test(s))throw Error('Enter dollar amounts with at most two decimal places.');const [a,b='']=s.split('.');const n=Number(a)*100+Number(b.padEnd(2,'0'));if(!Number.isSafeInteger(n))throw Error('Amount is too large.');return n;}
 const termsHTML=t=>'<h4>'+e(t.title)+'</h4>'+t.sections.map((s,i)=>'<h5>'+(i+1)+'. '+e(s.title)+'</h5><p style="white-space:pre-wrap">'+e(s.text)+'</p>').join('')+(t.addendum?'<h5>Contract clarifications</h5><p style="white-space:pre-wrap">'+e(t.addendum)+'</p>':'');
 function clear(){generation++;}
 async function mount({container,order,api,reload}){
  clear();const current=generation;let root=container.querySelector('[data-workflow]');if(root)root.remove();root=document.createElement('section');root.dataset.workflow='';root.style.cssText='border-top:2px solid #b51558;margin-top:24px;padding-top:18px';container.append(root);
  root.innerHTML='<h3>Approval, contract & payments</h3><p role="status">Loading workflow…</p>';
  const q=s=>root.querySelector(s);
  try{
   const [settings,data]=await Promise.all([api('/api/admin/workflow/status'),api('/api/admin/workflow/requests/'+encodeURIComponent(order.id))]);
   if(current!==generation)return;
   if(settings.missingTables?.length){root.innerHTML='<p class="error">Run the workflow SQL setup first. Missing: '+e(settings.missingTables.join(', '))+'</p>';return;}
   const cake=order.source==='cake_builder',offers=data.offers||[],active=offers.find(o=>o.status!=='CLOSED'),o=active||offers[0];
   const sourceTerms=window.TPJOrderTerms?.[order.source];
   const sandboxButton=document.getElementById('squareCheck');if(sandboxButton)sandboxButton.hidden=settings.environment!=='sandbox';
   let html='<h3>Approval, contract & payments</h3><p><strong>'+e(settings.environment.toUpperCase())+'</strong> · Payments '+(settings.paymentsEnabled?'enabled':'disabled')+' · Square location '+(settings.locationVerified?'verified':'NOT VERIFIED')+' · Webhook '+(settings.webhookConfigured?'configured':'not configured')+'</p><p>Last verified webhook: '+e(settings.lastWebhook?.processed_at||'None for this environment')+'</p><p class="muted">Sandbox approvals can be sent only to your configured test email or owner email. A manually selected internal status does not mark a payment paid.</p><p data-message role="status" aria-live="polite"></p>';
   if(!active&&offers.some(x=>x.intents.some(i=>i.paid_cents>0)))html+='<p>This request already has a recorded payment. Review its saved agreement and Square record before resolving changes. A second payment schedule cannot be issued for the same request.</p>';
   if(!active&&!offers.some(x=>x.intents.some(i=>i.paid_cents>0))){
    if(!sourceTerms)throw Error('The order-terms.js file did not load.');
    html+='<form data-issue><h4>Issue a final approval</h4><label>Approved amount BEFORE any rush fee<br><input name="base" type="number" step="0.01" min="0.01" required value="'+(typeof order.estimatedTotalCents==='number'?(order.estimatedTotalCents/100).toFixed(2):'')+'"></label><p class="muted">Include approved product costs, delivery and any applicable tax in this amount. Rush fee is added separately below. Review the estimate before issuing.</p>'+
     '<label>Approved fulfillment date<br><input name="date" type="date" required value="'+e(order.fulfillmentDate)+'"></label> <label>Central time<br><input name="time" type="time" required step="60" value="'+e(order.details?.order?.fulfillment?.time||'12:00')+'"></label>'+
     (cake?'<p><label><input name="rush" type="checkbox"> Rush order</label></p><label>Rush fee in dollars<br><input name="rushFee" type="number" step="0.01" min="0" value="0" required></label><p class="muted">Cake rush fees start at $75. Orders accepted seven days or fewer before fulfillment require full payment, including the rush fee.</p>':'<input name="rushFee" type="hidden" value="0">')+
     '<label>Your name as business signer<br><input name="businessSigner" value="Erykah Williams" required minlength="2" maxlength="150"></label><label><input name="businessConsent" type="checkbox" required> I adopt this name as my electronic signature and authorize this agreement.</label><p data-plan></p><label>Final approved design/order notes<br><textarea name="description" maxlength="10000" placeholder="Document any approved details that differ from the original inquiry."></textarea></label>'+
          '<p><label><input name="reviewed" type="checkbox" required> I confirm the final price and fulfillment details are correct and ready to send.</label></p><button class="primary" type="submit">Issue approval and queue customer email</button></form>';
   }
   if(o){
    html+='<h4>Latest approval · '+e(o.environment)+' · '+e(o.status)+'</h4><p>Approved total: <strong>'+money(o.totalCents)+'</strong><br>Initial payment: '+money(o.initialCents)+(o.balanceDueDate?'<br>Balance due: '+e(o.balanceDueDate):'')+'<br>Fulfillment: '+e(o.fulfillmentDate+' '+o.fulfillmentTime)+' Central<br>Agreement: '+(o.signature?'Accepted by '+e(o.signature.name)+' at '+e(o.signature.signedAt):'Awaiting acceptance')+'<br>Approval expires: '+e(o.expiresAt)+'</p>';
      const business=o.snapshot?.businessAcceptance,customer=o.signature;

    const signedDate=value=>value?new Date(value).toLocaleString('en-US',{
      timeZone:'America/Chicago',
      dateStyle:'long',
      timeStyle:'short'
    }):'';

    const mark=customer?.signature;

    const customerMark=customer?(
      mark?.method==='drawn' &&
      /^data:image\/png;base64,[A-Za-z0-9+/]+=*$/.test(mark.png||'')
        ? '<img src="'+mark.png+'" width="300" style="max-width:100%;height:auto" alt="Customer signature">'
        : '<p style="font:italic 26px Georgia,serif">'+e(customer.name)+'</p>'
    ):'<p>Awaiting customer signature.</p>';

    html+='<details><summary>Agreement signatures</summary><h4>Business signature</h4>'+
      (business
        ? '<p style="font:italic 26px Georgia,serif">'+e(business.name)+'</p><p>'+e(signedDate(business.signedAt))+' Central</p>'
        : '<p>No business signature was recorded for this earlier approval.</p>')+
      '<h4>Customer signature</h4>'+customerMark+
      (customer
        ? '<p>'+e(customer.name)+' · '+e(signedDate(customer.signedAt))+' Central</p>'
        : '')+
      '</details>';
    html+='<p><a href="'+e(o.orderURL)+'" target="_blank" rel="noopener noreferrer">Open private customer order page</a></p>';
    html+=o.paymentReview?'<p class="error">PAYMENT REVIEW REQUIRED — check Square before preparing or releasing this order.</p>':'';
    if(o.signingRecord){const record=o.signingRecord;html+='<details><summary>Signing evidence and archived agreement</summary><p>Verified email: '+e(o.signature?.verification?.email||'Legacy agreement')+'<br>Signed record fingerprint: '+e(record.evidence_hash)+'<br>PDF archived: '+e(record.archived_at||'Waiting for the customer email queue')+'</p>'+(record.drive_file_id?'<p><a href="https://drive.google.com/file/d/'+e(record.drive_file_id)+'/view" target="_blank" rel="noopener noreferrer">Open private signed PDF</a></p>':'')+'<button type="button" data-evidence>Download signing record</button></details>'; }
    html+=o.intents.map(i=>'<p><strong>'+e(i.phase)+'</strong>: '+money(i.amount_cents)+' · '+e(i.status)+(i.paid_at?' · Paid '+e(i.paid_at):'')+'</p>').join('');
    if(o.cancellation)html+='<p class="error">Cancellation requested '+e(o.cancellation.received_at)+': '+e(o.cancellation.reason)+'</p><p>'+(cake?'Review the signed cake cancellation terms.':'Within the Shop store-credit timing window: '+(o.cancellation.within_credit_window?'Yes':'No')+'. Store credit remains discretionary.')+'</p>';
    html+='<p><button type="button" data-remind>Send order/payment reminder</button></p><details><summary>Reconcile a Square payment</summary><p>Use this if a result was interrupted. Enter its actual Square payment ID. This checks an existing payment; it does not charge again.</p><form data-reconcile><input name="paymentId" required placeholder="Square payment ID"><button type="submit">Verify payment with Square</button></form><pre class="pre">'+e(JSON.stringify(o.attempts,null,2))+'</pre></details>';
    if(o.status!=='CLOSED')html+='<details><summary>Close this approval/order</summary><form data-close><label>Reason to include in the customer email<textarea name="reason" required minlength="3" maxlength="2000"></textarea></label><p><label><input name="ack" type="checkbox" required> I understand this closes the order but does not issue a refund or store credit. Any required refund must be handled in Square.</label></p><button type="submit">Close and notify customer</button></form></details>';
    html+='<details><summary>Issue discretionary store credit</summary><p>Issuing credit does not refund a card or automatically discount a future order. Apply the agreed discount before issuing a future quote, then record the credit used below.</p><form data-credit><label>Credit amount<br><input name="amount" type="number" min="0.01" step="0.01" required></label><label>Written conditions<textarea name="conditions" required minlength="3" maxlength="3000"></textarea></label><label>Expiration, if applicable<br><input name="expires" type="date"></label><button type="submit">Issue credit and email its conditions</button></form></details>';
    html+='<h4>Store credit records</h4>'+(o.credits.length?o.credits.map(c=>'<div class="item"><strong>'+e(c.code)+'</strong> · '+e(c.environment)+'<p>Issued '+money(c.amount_cents)+' · Remaining '+money(c.remaining_cents)+(c.expires_on?' · Expires '+e(c.expires_on):'')+'</p><p>'+e(c.conditions)+'</p><form data-use="'+e(c.id)+'"><label>Amount already applied to another order<br><input name="amount" type="number" min="0.01" step="0.01" required></label><label>Order/reference<br><input name="reference" required minlength="3" maxlength="500"></label><button type="submit">Record credit used</button></form></div>').join(''):'<p>No credit issued.</p>');
    if(offers.length>1)html+='<details><summary>Earlier approvals</summary>'+offers.slice(1).map(x=>'<p>'+e(x.environment+' · '+x.status)+' · '+money(x.totalCents)+' · <a href="'+e(x.orderURL)+'" target="_blank" rel="noopener noreferrer">View saved agreement</a></p>').join('')+'</details>';
   }
   root.innerHTML=html;
   const message=q('[data-message]');
   const busy=async(button,work)=>{const controls=[...root.querySelectorAll('button,input,textarea,select')],disabled=controls.map(x=>x.disabled);controls.forEach(x=>x.disabled=true);message.textContent='Saving…';message.className='';try{await work();if(current===generation){await reload();}}catch(err){if(current===generation){message.textContent=err.message;message.className='error';}}finally{controls.forEach((x,i)=>x.disabled=disabled[i]);}};
   const issue=q('[data-issue]');
   if(issue){
    let pending=null;const plan=q('[data-plan]');
    const preview=()=>{pending=null;try{
     const base=cents(issue.elements.base.value),fee=cents(issue.elements.rushFee.value),total=base+fee;
     const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const f=k=>parts.find(x=>x.type===k).value;const today=f('year')+'-'+f('month')+'-'+f('day');
     const days=Math.round((Date.parse(issue.elements.date.value+'T00:00:00Z')-Date.parse(today+'T00:00:00Z'))/86400000);
     if(cake&&days<=7){issue.elements.rush.checked=true;if(fee<7500){issue.elements.rushFee.value='75.00';return preview();}}
     const initial=!cake||days<=7?total:Math.ceil(total/2);
     plan.textContent='Final total including rush fee: '+money(total)+' · Initial payment: '+money(initial)+(initial<total?' · Remaining balance: '+money(total-initial)+' due seven calendar days before fulfillment.':' · Full payment required.');
    }catch{plan.textContent='Enter the final amounts and fulfillment date.';}};
    issue.oninput=preview;issue.onchange=preview;preview();
    issue.onsubmit=event=>{event.preventDefault();if(!issue.reportValidity())return;busy(issue.querySelector('button[type="submit"]'),async()=>{
     if(!pending){const fee=cents(issue.elements.rushFee.value);pending={operationKey:crypto.randomUUID(),businessSigner:issue.elements.businessSigner.value,businessConsent:issue.elements.businessConsent.checked,version:order.version,totalCents:cents(issue.elements.base.value)+fee,rushFeeCents:fee,rushOrder:cake&&issue.elements.rush.checked,fulfillmentDate:issue.elements.date.value,fulfillmentTime:issue.elements.time.value,approvedDescription:issue.elements.description.value,priceConfirmed:issue.elements.reviewed.checked,terms:{version:window.TPJOrderTerms.version,...sourceTerms}};}
     await api('/api/admin/workflow/requests/'+encodeURIComponent(order.id)+'/issue',{method:'POST',body:pending});
    });};
   }
   if(o){
    const exportButton=q('[data-evidence]');if(exportButton)exportButton.onclick=()=>{const record=o.signingRecord,blob=new Blob([JSON.stringify({evidence:JSON.parse(record.evidence_json),evidenceHash:record.evidence_hash,pdfSHA256:record.pdf_sha256,archivedAt:record.archived_at},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=o.id+'-signing-record.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
    const post=(action,body)=>api('/api/admin/workflow/offers/'+encodeURIComponent(o.id)+'/'+action,{method:'POST',body});
    q('[data-remind]').onclick=event=>busy(event.target,()=>post('remind',{operationKey:crypto.randomUUID()}));
    const reconcile=q('[data-reconcile]');reconcile.onsubmit=event=>{event.preventDefault();if(reconcile.reportValidity())busy(reconcile.querySelector('button'),()=>post('reconcile',{paymentId:reconcile.elements.paymentId.value.trim()}));};
    const close=q('[data-close]');if(close)close.onsubmit=event=>{event.preventDefault();if(close.reportValidity())busy(close.querySelector('button'),()=>post('close',{reason:close.elements.reason.value,acknowledged:close.elements.ack.checked}));};
    const credit=q('[data-credit]');let creditBody=null;credit.oninput=()=>{creditBody=null;};credit.onsubmit=event=>{event.preventDefault();if(credit.reportValidity())busy(credit.querySelector('button'),()=>{if(!creditBody)creditBody={operationKey:crypto.randomUUID(),amountCents:cents(credit.elements.amount.value),conditions:credit.elements.conditions.value,expiresOn:credit.elements.expires.value};return post('credit',creditBody);});};
    root.querySelectorAll('[data-use]').forEach(form=>{let body=null;form.oninput=()=>{body=null;};form.onsubmit=event=>{event.preventDefault();if(form.reportValidity())busy(form.querySelector('button'),()=>{if(!body)body={operationKey:crypto.randomUUID(),amountCents:cents(form.elements.amount.value),reference:form.elements.reference.value};return api('/api/admin/workflow/credits/'+encodeURIComponent(form.dataset.use)+'/use',{method:'POST',body});});};});
   }
  }catch(err){if(current===generation)root.innerHTML='<h3>Approval workflow</h3><p class="error">'+e(err.message)+'</p>';}
 }
 return {mount,clear};
})();