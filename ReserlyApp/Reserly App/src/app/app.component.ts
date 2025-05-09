import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { StatusBar } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [RouterModule],
})
export class AppComponent {
  constructor() {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setOverlaysWebView({ overlay: false });
    }
  }
}
