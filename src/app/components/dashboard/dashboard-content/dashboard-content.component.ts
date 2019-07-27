import { Component, OnInit } from '@angular/core';
import { BotService, Bot } from './../../../services/bot.service';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css']
})
export class DashboardContentComponent implements OnInit {
  isConnected = false;

  constructor(private botService: BotService) { }

  ngOnInit() {
    this.botService.isInChannel().subscribe((data: Bot) => {
      this.isConnected = data.isInChannel;
    });
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
