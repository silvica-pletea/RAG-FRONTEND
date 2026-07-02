import { Component, model, signal } from '@angular/core';
import { ChatContainer } from '../chat/chat-container';
import { SearchFile } from '../search-file/search-file';
import { UploadFile } from '../upload-file/upload-file';
import {Tab, Tabs, TabList, TabPanel, TabContent} from '@angular/aria/tabs';

@Component({
  selector: 'app-home',
  imports: [TabList, Tab, Tabs, TabPanel, TabContent, ChatContainer, SearchFile, UploadFile],
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
