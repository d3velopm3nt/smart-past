import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: 'tab.component.html',
  styleUrls: ['tab.component.scss']
})
export class TabComponent implements OnInit {
  bm_urls = new Array();
  constructor(){
    alert('tab loaded');

    this.loadBookmarks();
  }
  ngOnInit(): void {
  }


  loadBookmarks(){
    debugger
    console.log('load bookmarks')
    
    chrome.bookmarks.getTree( rootNode => {
        this.fetch_bookmarks(rootNode);
        console.table(this.bm_urls);
    });
  }

  fetch_bookmarks(parentNode) {
    parentNode.forEach((bookmark:chrome.bookmarks.BookmarkTreeNode) => {
        if(! (bookmark.url === undefined || bookmark.url === null)) {
            this.bm_urls.push(bookmark);
        }
        if (bookmark.children) {
            this.fetch_bookmarks(bookmark.children);
        }
    });
}
}
