import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acompanamientos',
  templateUrl: './acompanamientos.page.html',
  styleUrls: ['./acompanamientos.page.scss'],
})
export class AcompanamientosPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSegmentChange(event: any) {
    const selectedValue = event.detail.value;

    switch (selectedValue) {
      case 'pizzas':
        this.router.navigate(['/menu']);
        break;
      case 'bebidas':
        this.router.navigate(['/bebidas']);
        break;
      case 'acompanamientos':
        this.router.navigate(['/acompanamientos']);
        break;
      default:
        break;
    }
  }

}
