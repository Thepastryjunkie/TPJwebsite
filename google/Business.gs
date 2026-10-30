/* Workspace send-as alias. Run tpjEmailSenderSetup once after configuring Orders. */
let tpjSenderReady_=false;
function tpjValidateSender_(){
 const from='orders@thepastryjunkie.com';
 if(!tpjSenderReady_){
  if(!GmailApp.getAliases().some(x=>x.toLowerCase()===from))throw Error('Orders is not configured as a Gmail sending alias for the account running this script. Complete the alias setup, then run tpjEmailSenderSetup.');
  tpjSenderReady_=true;
 }
 return from;
}
function tpjEmailSenderSetup(){console.log('Sender verified: '+tpjValidateSender_()+'. Customer replies go to baked@thepastryjunkie.com. No test email was sent.');}
function tpjSendMail_(mail){
 const from=tpjValidateSender_(),{to,subject,body,...options}=mail;
 GmailApp.sendEmail(to,subject,body,{...options,from,replyTo:'baked@thepastryjunkie.com'});
}
function tpjBusinessDelivery_(event){
 let envelope;try{envelope=JSON.parse(event.postData.contents);}catch(_){return null;}
 if(envelope.businessDelivery!==1)return null;
 const reply=data=>ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
 let lock;
 try{
  const secret=PropertiesService.getScriptProperties().getProperty('TPJ_BRIDGE_SECRET')||'';
  if(secret.length<40||typeof envelope.payload!=='string'||envelope.payload.length>460000||!Number.isSafeInteger(envelope.timestamp)||Math.abs(Date.now()-envelope.timestamp)>60000)throw Error('Invalid file request.');
  const expected=tpjHex_(Utilities.computeHmacSha256Signature(envelope.timestamp+'\n'+envelope.payload,secret,Utilities.Charset.UTF_8));
  const a=tpjSHA_(expected),b=tpjSHA_(String(envelope.signature||''));let mismatch=0;for(let i=0;i<a.length;i++)mismatch|=a.charCodeAt(i)^b.charCodeAt(i);if(mismatch)throw Error('Invalid file signature.');
  const d=JSON.parse(envelope.payload);
  if(d.action==='purge_test_records'){lock=LockService.getUserLock();if(!lock.tryLock(1000))throw Error('Cleanup busy. Retry the same record.');return reply(tpjPurgeTestRecords_(d));}
  if(d.action!=='fulfillment_photo'||!/^TPJ-[a-f0-9-]{36}$/i.test(d.requestId)||!/^[A-Za-z0-9_-]{16,80}$/.test(d.operationKey)||!['image/jpeg','image/png'].includes(d.mime)||typeof d.base64!=='string'||d.base64.length>450000||!/^[A-Za-z0-9+/]+=*$/.test(d.base64))throw Error('Invalid fulfillment photo.');
  const bytes=Utilities.base64Decode(d.base64),unsigned=i=>(bytes[i]+256)%256;
  if(d.mime==='image/jpeg'?(unsigned(0)!==255||unsigned(1)!==216||unsigned(2)!==255):[137,80,78,71,13,10,26,10].some((n,i)=>unsigned(i)!==n))throw Error('Invalid image content.');
  lock=LockService.getUserLock();if(!lock.tryLock(1000))throw Error('File service busy; retry the same fulfillment.');
  const folder=tpjFolder_(tpjRoot_(),'TPJ Fulfillment Records');if(folder.getSharingAccess()!==DriveApp.Access.PRIVATE)throw Error('Fulfillment folder must remain private.');
  const name=d.requestId+'-'+d.operationKey+(d.mime==='image/jpeg'?'.jpg':'.png'),hash=tpjSHA_(d.base64);
  let file=tpjFile_(folder,name);
  if(file){if(file.getDescription()!==hash)throw Error('This fulfillment reference already has a different photo.');}
  else {file=folder.createFile(Utilities.newBlob(bytes,d.mime,name));file.setDescription(hash);}
  return reply({ok:true,fileId:file.getId(),url:'https://drive.google.com/file/d/'+file.getId()+'/view'});
 }catch(_){return reply({ok:false,message:'The private file operation could not be completed. Retry the same operation or check the private storage configuration.'});}
 finally{if(lock)try{lock.releaseLock();}catch(_){} }
}
function tpjDeclinedMail_(job){
 const d=job.data||{},h=escapeHtml_;if(!isValidEmail_(d.customer?.email))throw Error('Missing customer email.');
 const title='An update on your inquiry',message=String(d.reason||'We are unable to accept this inquiry.');
 return {to:d.customer.email,replyTo:'baked@thepastryjunkie.com',name:TPJ_CONFIG.BUSINESS_NAME,subject:title+' — '+(d.reference||d.requestId),body:message+'\nReference: '+(d.reference||d.requestId)+'\nQuestions: baked@thepastryjunkie.com | (682) 373-8842',htmlBody:tpjEmailShell_(title,message,'<p><strong>Reference:</strong> '+h(d.reference||d.requestId)+'</p><p>This inquiry has not been booked. Contact us by email if you would like to discuss another date or order.</p>',false)};
}
