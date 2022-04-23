import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SingleCoin} from "../../../api/api";
import Axios from "axios";
import {Coin, defaultCoin} from "../../shared/models/coin";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TradeService} from "../../shared/services/trade.service";
import firebase from "firebase/compat/app";
import {Trade} from "../../shared/models/trade";


@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss']
})
export class CryptoComponent implements OnInit {
  coin: Coin = defaultCoin;
  value: number = 0;
  tradeForm!: FormGroup;
  action: 'market' | 'limit' | 'date' = 'limit';
  submitted: boolean = false;

  initForm() {
    this.tradeForm = new FormGroup({
      action: new FormControl(this.action, [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      crypto: new FormControl('', [Validators.required]),
      targetPrice: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
    });
  }

  constructor(private route: ActivatedRoute, private tradeService: TradeService, private router: Router) {
    this.initForm();
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

  get form() {
    return this.tradeForm.controls;
  }

  onSubmit(type: 'buy' | 'sell') {
    this.submitted = true;

    const userID = firebase.auth().currentUser?.uid;
    const action = this.form['action'].value;

    if (!userID) {
      this.router.navigateByUrl('/login');
      return;
    }

    // Remove 'limit' & 'date' validators
    if (action === 'market') {
      this.form['date'].clearValidators();
      this.form['date'].updateValueAndValidity();
      this.form['time'].clearValidators();
      this.form['time'].updateValueAndValidity();

      this.form['targetPrice'].clearValidators();
      this.form['targetPrice'].updateValueAndValidity();
    }

    // Remove 'date' validators
    if (action === 'limit') {
      this.form['date'].clearValidators();
      this.form['date'].updateValueAndValidity();
      this.form['time'].clearValidators();
      this.form['time'].updateValueAndValidity();
    }

    // Remove 'limit' validators
    if (action === 'date') {
      this.form['targetPrice'].clearValidators();
      this.form['targetPrice'].updateValueAndValidity();
    }

    // If form invalid return
    if (this.tradeForm.invalid) {
      console.error('Form is invalid!');
      return;
    }

    const currencyAmount = this.form['currency'].value;
    const coinAmount = this.form['crypto'].value;

    const targetPrice = this.form['targetPrice'].value;
    const targetDate = this.form['date'].value;
    const targetTime = this.form['time'].value;

    if (currencyAmount <= 0 || coinAmount <= 0) {
      console.error('Currency | Crypto must be positive!')
      return;
    }

    const trade: Trade = {id: '', userID, cryptoID: this.coin.id,
      type, action,
      currencyAmount,
      coinAmount,
      date: '',
      dateLimit: {targetDate, targetTime},
      limit: {targetPrice}
    };

    this.tradeService.create(trade)
      .then(_ => {
        console.log(`Trade created successfully!`)
        this.submitted = false;
        this.initForm();
      })
      .catch(error => {
        console.error(`[ERROR] TradeService.create()`)
        this.submitted = false;
        this.initForm();
        console.log(error)
      });
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

  toggleOption() {
    this.action = this.form['action'].value;
  }
}
