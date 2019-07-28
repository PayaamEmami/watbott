import { Component, OnInit } from '@angular/core';
import { BotService, Bot } from './../../../services/bot.service';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css']
})
export class DashboardContentComponent implements OnInit {
  isInChannel = false;

  constructor(private botService: BotService) { }

  ngOnInit() {
    this.botService.getBot().subscribe((bot: Bot) => {
      this.isInChannel = bot.isInChannel;
    });
  }

  joinChannel(): void {
    this.botService.joinChannel();
    this.isInChannel = true;
  }

  partChannel(): void {
    this.botService.partChannel();
    this.isInChannel = false;
  }
}
