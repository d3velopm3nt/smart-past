if(typeof chrome.runtime.onInstalled  == 'undefined')
console.log('chrome runtime undefined')
chrome.runtime.onInstalled.addListener(x=> {
 
    console.log("bookmark search exporter extention Installed.");
  
  
  });