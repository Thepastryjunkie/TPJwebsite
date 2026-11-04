/* Compact owner actions. Deletion requires explicit confirmation and admin authorization. */
window.TPJOrderTools=(()=>{
 const h=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let bulkBusy=false;
 const labels={new:'New',pending:'Pending',confirmed:'Confirmed',fulfilled:'Fulfilled',canceled:'Canceled'};
 const actions='<option value="">Actions</option><option value="read">Mark read</option><option value="unread">Mark unread</option><option value="archive">Archive</option><option value="restore">Restore</option><option value="purge">Delete</option>';
 const path=id=>'/api/admin/business/orders/'+encodeURIComponent(id);
 function mount(host,packet,api,reload){
  const r=packet.order,m=packet.management||{},bar=document.createElement('div');bar.className='order-actionbar';bar.innerHTML='<label class="sr-only" for="orderStage">Order stage</label><select id="orderStage" aria-label="Order stage"><option value="">Automatic</option>'+Object.entries(labels).map(([k,v])=>'<option value="'+k+'" '+(m.manualStage===k?'selected':'')+'>'+v+'</option>').join('')+'</select><select data-action aria-label="Order actions">'+actions+'</select><span data-status role="status"></span>';
  host.querySelector('h2')?.insertAdjacentElement('afterend',bar)||host.prepend(bar);
  async function run(control,action,extra={}){if(action==='purge'&&!window.confirm('Permanently delete '+(r.reference||r.id)+'?')){control.value='';return;}control.disabled=true;try{const response=await api(path(r.id)+(action==='purge'?'/purge':'/manage'),{method:'POST',body:{version:r.version,action,...extra,...(action==='purge'?{confirmed:true}:{})}});await reload({id:r.id,action,stage:extra.stage,deleted:response.deleted});}catch(e){bar.querySelector('[data-status]').textContent=e.message;control.disabled=false;}}
  bar.querySelector('#orderStage').onchange=e=>run(e.target,'stage',{stage:e.target.value||null});bar.querySelector('[data-action]').onchange=e=>{if(e.target.value)run(e.target,e.target.value);};
 }
 function bulk(host,rows,api,reload){
  const bar=document.createElement('div');bar.className='bulk-actionbar';bar.dataset.bulkTools='';bar.innerHTML='<label><input type="checkbox" data-all aria-label="Select all visible orders"> All</label><select data-action aria-label="Selected order actions">'+actions+'</select><span data-count></span><span data-status role="status"></span>';host.prepend(bar);
  const boxes=()=>[...host.querySelectorAll('input[data-select-order]')],status=bar.querySelector('[data-status]'),select=bar.querySelector('[data-action]');
  const update=()=>{const n=boxes().filter(x=>x.checked).length;bar.querySelector('[data-count]').textContent=n?n+' selected':'';select.disabled=!n;bar.querySelector('[data-all]').indeterminate=n>0&&n<boxes().length;};
  bar.querySelector('[data-all]').onchange=e=>{boxes().forEach(x=>x.checked=e.target.checked);update();};boxes().forEach(x=>x.addEventListener('change',update));update();
  select.onchange=async()=>{const action=select.value;if(!action)return;const selected=boxes().filter(x=>x.checked).map(x=>rows.find(r=>r.id===x.dataset.selectOrder)).filter(Boolean);if(!selected.length)return;if(action==='purge'&&!window.confirm('Permanently delete '+selected.length+' selected order'+(selected.length===1?'?':'s?'))){select.value='';return;}
   bulkBusy=true;bar.querySelectorAll('input,select').forEach(x=>x.disabled=true);let done=0;const errors=[];
   try{for(const row of selected){try{status.textContent=(done+errors.length+1)+' / '+selected.length;await api(path(row.id)+(action==='purge'?'/purge':'/manage'),{method:'POST',body:{version:row.version,action,...(action==='purge'?{confirmed:true}:{})}});done++;}catch(e){errors.push((row.reference||row.id)+': '+e.message);}}await reload({deletedIds:action==='purge'?selected.filter(r=>!errors.some(e=>e.startsWith((r.reference||r.id)+':'))).map(r=>r.id):[]});const summary=document.createElement('p');summary.setAttribute('role','status');summary.textContent=done+' updated.'+(errors.length?' '+errors.join(' / '):'');host.prepend(summary);}finally{bulkBusy=false;}
  };
 }
 return {mount,bulk,busy:()=>bulkBusy};
})();
