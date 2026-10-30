/* Called only by the signed Business bridge for explicitly marked Sandbox tests. */
function tpjPurgeTestRecords_(data){
 if(data.sandbox!==true||!/^TPJ-[a-f0-9-]{36}$/i.test(data.requestId))throw Error('Invalid test cleanup.');
 const ids=['offerIds','jobIds','challengeIds','fileIds'];for(const key of ids)if(!Array.isArray(data[key])||data[key].length>500||!data[key].every(x=>typeof x==='string'&&/^[A-Za-z0-9_-]{5,150}$/.test(x)))throw Error('Invalid test file identifiers.');
 const root=tpjRoot_();if(root.getSharingAccess()!==DriveApp.Access.PRIVATE)throw Error('Test storage must remain private.');
 const find=(parent,name)=>{const values=parent.getFoldersByName(name);return values.hasNext()?values.next():null;};
 const signed=find(root,'TPJ Signed Agreements');if(signed){if(signed.getSharingAccess()!==DriveApp.Access.PRIVATE)throw Error('Unexpected shared agreement storage.');for(const id of data.offerIds){const folder=find(signed,id);if(folder)folder.setTrashed(true);}}
 const ledgers=[['TPJ Mail Receipts',data.jobIds],['TPJ Verification Receipts',data.challengeIds]];
 for(const [name,values]of ledgers){const folder=find(root,name);if(folder)for(const id of values){const file=tpjFile_(folder,id+'.json');if(file)file.setTrashed(true);}}
 function inside(file){let pending=[file],seen=new Set();for(let depth=0;depth<20&&pending.length;depth++){const next=[];for(const item of pending){if(item.getId()===root.getId())return true;if(seen.has(item.getId()))continue;seen.add(item.getId());const parents=item.getParents();while(parents.hasNext())next.push(parents.next());}pending=next;}return false;}
 for(const id of data.fileIds){let file;try{file=DriveApp.getFileById(id);}catch(_){continue;}if(file.isTrashed())continue;if(!inside(file))throw Error('Refusing to remove a file outside private TPJ storage.');file.setTrashed(true);}
 return {ok:true,trashed:true};
}
