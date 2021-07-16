import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { TAB_ID } from './app/providers/tab-id.provider';

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  if (environment.production) {
    enableProdMode();
  }

  const { id: tabId } = [...tabs].pop();

  // provides the current Tab ID so you can send messages to the content page
  platformBrowserDynamic([{ provide: TAB_ID, useValue: tabId }])
    .bootstrapModule(AppModule)
    .catch(error => console.error(error));
});

chrome.runtime.onInstalled.addListener(function() {
 
  console.log("bookmark search exporter extention Installed.");

  var bm_urls = new Array();

  function fetch_bookmarks(parentNode) {
      parentNode.forEach(function(bookmark) {
          if(! (bookmark.url === undefined || bookmark.url === null)) {
              bm_urls.push(bookmark.url);
          }
          if (bookmark.children) {
              fetch_bookmarks(bookmark.children);
          }
      });
  }

  chrome.bookmarks.getTree(function(rootNode) {
      fetch_bookmarks(rootNode);
      console.log(JSON.stringify(bm_urls));
  });
});

