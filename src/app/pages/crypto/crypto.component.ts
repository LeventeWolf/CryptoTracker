import {Component, Input, OnInit} from '@angular/core';
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
  type: 'limit' | 'market' = 'limit';

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

  onSubmit(action?: string | undefined) {
    console.log('- Form submitted - ');
    const currency = this.form['currency'].value;
    const crypto = this.form['crypto'].value;
    const date = this.form['date'].value;
    const time = this.form['time'].value;

    console.log(action)
    console.table({currency, crypto, date, time})
  }

  swapType() {
    if (this.type === 'limit') {
      this.type = 'market';
    } else {
      this.type = 'limit';
    }
  }

  updateCrypto() {
    const currency = parseInt(this.form['currency'].value);

    if (!currency) {
      this.form['crypto'].setValue('');
      return;
    }

    const current_price = this.coin.market_data.current_price.usd;
    this.form['crypto'].setValue(currency / current_price);
  }

  updateCurrency() {
    const crypto = parseInt(this.form['crypto'].value);

    if (!crypto) {
      this.form['currency'].setValue('');
      return;
    }

    const current_price = this.coin.market_data.current_price.usd;
    this.form['currency'].setValue(current_price * crypto);
  }

  decrease(inputForm: string) {
    const value = parseInt(this.form[inputForm].value);

    if (!value) {
      this.form[inputForm].setValue(0);
    } else if (value < 0) {
      this.form[inputForm].setValue(0);
    } else {
      this.form[inputForm].setValue(value - 1);
    }

    if (inputForm === 'crypto') {
      this.updateCurrency();
    } else {
      this.updateCrypto();
    }
  }

  increase(inputForm: string) {
    const value = parseInt(this.form[inputForm].value);

    if (!value) {
      this.form[inputForm].setValue(1);
    } else {
      this.form[inputForm].setValue(value + 1);
    }

    if (inputForm === 'crypto') {
      this.updateCurrency();
    } else {
      this.updateCrypto();
    }
  }
}
