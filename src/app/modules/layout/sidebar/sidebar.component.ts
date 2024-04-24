import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  user: any = 'User';
  constructor(private authService: AuthService) {}

  ngOnInit() {
    let data = this.authService.getUser();
    this.user = `${data.name} ${data.lastname}`;
  }
}
