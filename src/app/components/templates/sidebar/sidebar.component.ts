import {ChangeDetectorRef, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Output() toggle = new EventEmitter<void>();
  @Input() isCollapsed: boolean = true;


  authService = inject(AuthService);
  currentUser$ = this.authService.user$

  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.toggle.emit();
    console.log(this.currentUser$)
  }

  navigateToHome():void {
    this.toggleSidebar();
    this.router.navigate(['/classroom']);
  }

}
