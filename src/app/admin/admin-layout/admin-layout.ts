import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, Navbar],
  templateUrl: './admin-layout.html',
})
export class AdminLayout {}
