import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-person-export',
  templateUrl: './person-export.component.html',
  styleUrls: ['./person-export.component.scss']
})
export class PersonExportComponent implements OnInit {
  @Input() grid: Object;
  public objectKeys = Object.keys;
  constructor() { }

  ngOnInit() {
  }

  print(){
    window.print();
  }

}
