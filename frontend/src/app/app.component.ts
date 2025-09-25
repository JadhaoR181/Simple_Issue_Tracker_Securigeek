import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { TitleCasePipe } from '@angular/common'; // <-- import pipe

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterOutlet,
    TitleCasePipe
  ]
})
export class AppComponent {
  title = 'Securigreek | Simple Issue Tracker';
}
