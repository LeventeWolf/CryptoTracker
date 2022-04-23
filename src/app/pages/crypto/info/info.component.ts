import {Component, Input, OnInit} from '@angular/core';
import {Coin} from "../../../shared/models/coin";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  @Input() coin!: Coin;

  constructor() { }

  ngOnInit(): void {
  }

}
