import { Component, model, signal } from '@angular/core';
import { Chat } from '../chat/chat';
import { SearchFile } from '../search-file/search-file';
import { UploadFile } from '../upload-file/upload-file';
import {Tab, Tabs, TabList, TabPanel, TabContent} from '@angular/aria/tabs';

@Component({
  selector: 'app-home',
  imports: [TabList, Tab, Tabs, TabPanel, TabContent, Chat, SearchFile, UploadFile],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  protected readonly tabs = signal([
    { value: 'upload-file', name: 'Upload File' },
    { value: 'search-file', name: 'Uploaded Files' },
    { value: 'chat', name: 'Chat' }
  ]);
  protected readonly selectedTab = model(this.tabs()[0].value);

}
