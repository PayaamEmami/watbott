import { Component, OnInit } from '@angular/core';
import { BotService, Bot } from './../../../services/bot.service';

export interface CustomCommand {
  name: string;
  message: string;
  level: string;
  enabled: boolean;
}

const temp: CustomCommand[] = [
  { name: 'test', message: 'this is a test', level: 'everyone', enabled: true },
  { name: 'test', message: 'this is a test', level: 'everyone', enabled: true },
  { name: 'test', message: 'this is a test', level: 'everyone', enabled: true },
  { name: 'test', message: 'this is a test', level: 'everyone', enabled: true },
  { name: 'test', message: 'this is a test', level: 'everyone', enabled: true },
  { name: 'test', message: 'this is a test', level: 'everyone', enabled: true },
  { name: 'test', message: 'this is a test', level: 'everyone', enabled: true },
  { name: 'test', message: 'this is a test', level: 'everyone', enabled: true },
];

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css']
})
export class DashboardContentComponent implements OnInit {
  isConnected = false;
  displayedColumns: string[] = ['name', 'message', 'level', 'enabled'];
  dataSource = temp;

  constructor(private botService: BotService) {
    this.botService.isInChannel().subscribe((data: Bot) => {
      this.isConnected = data.isInChannel;
    });
  }

  ngOnInit() {
  }

  joinChannel(): void {
    this.botService.joinChannel();
    this.isConnected = true;
  }

  partChannel(): void {
    this.botService.partChannel();
    this.isConnected = false;
  }
}
