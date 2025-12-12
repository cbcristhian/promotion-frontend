import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-resident-layout',
  imports: [Navbar, RouterOutlet],
  templateUrl: './resident-layout.html',
})
export class ResidentLayout {}
