import { Component, OnInit } from '@angular/core';
import { BotService, Bot } from './../../services/bot.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isConnected = false;

  constructor(private botService: BotService) {
    this.botService.isInChannel().subscribe((data: Bot) => {
      this.isConnected = data.isInChannel;
    });
  }

  ngOnInit() {
  }

  joinChannel(): void {
    this.botService.joinChannel();
  }

  partChannel(): void {
    this.botService.partChannel();
  }
}
