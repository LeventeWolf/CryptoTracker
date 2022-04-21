import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SingleCoin} from "../../../api/api";
import Axios from "axios";
import {Coin, defaultCoin} from "../../shared/models/coin";
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss']
})
export class CryptoComponent implements OnInit {
  coin: Coin = defaultCoin;
  value: number = 0;
  tradeForm: FormGroup;

  constructor(private route: ActivatedRoute) {
    this.tradeForm = new FormGroup({
      currency: new FormControl(''),
      crypto: new FormControl(''),
      date: new FormControl(''),
      time: new FormControl(''),
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    Axios.get(SingleCoin(id))
      .then(response => {
        this.coin = response.data
      })
      .catch(error => {
        console.error('[ERROR] Fetching single coin data')
        console.log(error);
      })
  }

  get form() {return this.tradeForm.controls;}

  onSubmit() {
    console.log('- Form submitted - ');
    const currency = this.form['currency'].value;
    const crypto = this.form['crypto'].value;
    const date = this.form['date'].value;
    const time = this.form['time'].value;

    const formValue = {
      currency,
      crypto,
      date,
      time
    }

    console.table(formValue)
  }
}
