/* Owner-reviewed, itemized quotes. The Worker independently validates all amounts. */
window.TPJOwnerQuote=(()=>{
 const h=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const cents=v=>{const s=String(v).trim();if(!/^\d+(\.\d{1,2})?$/.test(s))throw Error('Use amounts with at most two decimal places.');return Math.round(Number(s)*100);};
 function mount(form,order,business){
  const settings=business.config.settings,source=order.details?.order;
  let rows=(source?.items||[]).map(x=>({title:x.title,quantity:x.quantity,unitCents:x.unitCents,details:x.details||[],taxable:false}));
  if(!rows.length)rows=[{title:'Custom cake order',quantity:1,unitCents:order.estimatedTotalCents||0,details:[],taxable:false}];
  const block=document.createElement('section');block.dataset.quote='';form.querySelector('h4').after(block);
  form.elements.base.closest('label').hidden=true;
  const draw=()=>{
   block.innerHTML='<h4>Itemized quote</h4><p>Review the final charges and tax treatment for this order. Accepted quotes keep these amounts when your menu changes.</p><div data-lines>'+rows.map((r,i)=>'<fieldset data-line="'+i+'"><legend>Item '+(i+1)+'</legend><label>Item name<input data-title required maxlength="300" value="'+h(r.title)+'"></label><label>Quantity<input data-qty type="number" min="1" max="1000" step="1" required value="'+r.quantity+'"></label><label>Unit price ($)<input data-price type="number" min="0" step="0.01" required value="'+(r.unitCents/100).toFixed(2)+'"></label><label><input data-taxable type="checkbox" '+(r.taxable?'checked':'')+'> Tax applies to this item</label><button type="button" data-remove="'+i+'">Remove item</button></fieldset>').join('')+'</div><button type="button" data-add>Add quote item</button>'+
    '<label>Delivery charge ($)<input data-delivery type="number" min="0" step="0.01" required value="'+((source?.deliveryCents||0)/100).toFixed(2)+'"></label><label>Sales-tax rate (%)<input data-rate type="number" min="0" max="8.25" step="0.01" required value="'+(settings.defaultTaxBps/100).toFixed(2)+'"></label><label><input data-delivery-tax type="checkbox"> Delivery charge is taxable</label><label><input data-rush-tax type="checkbox"> Rush fee is taxable</label><p data-quote-total></p>'+
    '<details><summary>Product allergens and storage</summary><p>Use your actual recipes and ingredient packaging. These disclosures will appear on the customer order page and agreement.</p>'+business.allergens.map(a=>'<label style="display:inline-block;margin-right:14px"><input type="checkbox" data-allergen="'+h(a)+'"> '+h(a)+'</label>').join('')+'<label><input data-cold type="checkbox" '+(['jars','apples'].some(cat=>source?.items?.some(i=>i.category===cat))?'checked':'')+'> Requires refrigeration</label></details>';
   block.querySelector('[data-add]').onclick=()=>{readLines();const remembered=extras();rows.push({title:'Additional item',quantity:1,unitCents:0,details:[],taxable:false});draw();restore(remembered);form.dispatchEvent(new Event('input',{bubbles:true}));};
   block.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{if(rows.length===1)return;readLines();const remembered=extras();rows.splice(Number(b.dataset.remove),1);draw();restore(remembered);form.dispatchEvent(new Event('input',{bubbles:true}));});
  };
  const q=s=>block.querySelector(s);
  function readLines(){rows=[...block.querySelectorAll('[data-line]')].map((node,i)=>({...rows[i],title:node.querySelector('[data-title]').value,quantity:Number(node.querySelector('[data-qty]').value),unitCents:cents(node.querySelector('[data-price]').value),taxable:node.querySelector('[data-taxable]').checked}));return rows;}
  function extras(){return {delivery:q('[data-delivery]').value,rate:q('[data-rate]').value,dt:q('[data-delivery-tax]').checked,rt:q('[data-rush-tax]').checked,cold:q('[data-cold]').checked,review:form.elements.reviewed.checked,contains:[...block.querySelectorAll('[data-allergen]:checked')].map(x=>x.dataset.allergen)};}
  function restore(v){q('[data-delivery]').value=v.delivery;q('[data-rate]').value=v.rate;q('[data-delivery-tax]').checked=v.dt;q('[data-rush-tax]').checked=v.rt;q('[data-cold]').checked=v.cold;form.elements.reviewed.checked=v.review;block.querySelectorAll('[data-allergen]').forEach(x=>x.checked=v.contains.includes(x.dataset.allergen));}
  function read(){
   const lines=readLines(),extra=extras(),deliveryCents=cents(extra.delivery),taxRateBps=cents(extra.rate),rushFeeCents=cents(form.elements.rushFee.value);
   const products=lines.reduce((n,x)=>n+x.quantity*x.unitCents,0),taxable=lines.reduce((n,x)=>n+(x.taxable?x.quantity*x.unitCents:0),0)+(extra.dt?deliveryCents:0)+(extra.rt?rushFeeCents:0),tax=Math.round(taxable*taxRateBps/10000);
   form.elements.base.value=((products+deliveryCents+tax)/100).toFixed(2);
   q('[data-quote-total]').textContent='Products $'+(products/100).toFixed(2)+' · Delivery $'+(deliveryCents/100).toFixed(2)+' · Rush $'+(rushFeeCents/100).toFixed(2)+' · Tax $'+(tax/100).toFixed(2)+' · Total $'+((products+deliveryCents+rushFeeCents+tax)/100).toFixed(2);
   return {lines,deliveryCents,taxRateBps,deliveryTaxable:extra.dt,rushTaxable:extra.rt,reviewed:extra.review,disclosure:{contains:extra.contains,refrigerated:extra.cold,reviewed:extra.review}};
  }
  draw();
  const keys=[];for(const item of source?.items||[]){if(item.category==='half')keys.push('product:cakes:'+item.one,'product:cakes:'+item.two);else if(item.category==='chocolate')for(const piece of item.pieces||[])keys.push('treat:'+piece.type,'base:'+piece.base,'topping:'+piece.topping);else if(item.mix)for(const flavor of Object.keys(item.mix))keys.push('product:'+item.category+':'+flavor);else keys.push('product:'+item.category+':'+item.flavor);}
  const profiles=keys.map(k=>business.config.profiles[k]);if(profiles.length&&profiles.every(p=>p?.reviewed)){const contains=new Set(profiles.flatMap(p=>p.contains));block.querySelectorAll('[data-allergen]').forEach(input=>input.checked=contains.has(input.dataset.allergen));q('[data-cold]').checked=profiles.some(p=>p.refrigerated);}
  return {read,sync(){try{read();}catch{q('[data-quote-total]').textContent='Complete the quote amounts.';}}};
 }
 return {mount};
})();
