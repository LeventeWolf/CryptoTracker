import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Coin} from "../../../shared/models/coin";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TradeService} from "../../../shared/services/trade.service";
import firebase from "firebase/compat/app";
import {Trade} from "../../../shared/models/trade";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarSuccessComponent} from "../../shared/snackbar/snackbar-success.component";
import {SnackbarErrorComponent} from "../../shared/snackbar/snackbar-error.component";

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit, OnChanges {
  @Input() coin!: Coin;
  value: number = 0;
  tradeForm!: FormGroup;
  action: 'market' | 'limit' | 'date' = 'limit';
  submitted: boolean = false;
  loading: boolean = false;
  snackbarDuration = 3;

  constructor(private route: ActivatedRoute, private tradeService: TradeService, private router: Router, private _snackBar: MatSnackBar) {
    this.initForm();
  }

  ngOnInit(): void {
  }


  ngOnChanges(): void {
    if (this.action === 'limit') {
      this.form['targetPrice'].setValue(this.coin.market_data.current_price.usd);
    }
  }

  initForm() {
    this.submitted = false;
    this.loading = false;

    this.tradeForm = new FormGroup({
      action: new FormControl(this.action, [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      crypto: new FormControl('', [Validators.required]),
      targetPrice: new FormControl(this.coin?.market_data.current_price.usd || 0, [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
    });
  }

  get form() {
    return this.tradeForm.controls;
  }

  async onSubmit(type: 'buy' | 'sell') {
    this.submitted = true;
    this.loading = true;

    const userID = firebase.auth().currentUser?.uid;
    const action = this.form['action'].value;

    if (!userID) {
      await this.router.navigateByUrl('/login');
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
      this.loading = false;
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


    const trade: Trade = {
      id: '', userID, cryptoID: this.coin.id,
      type, action,
      currencyAmount,
      coinAmount,
      date: '',
      status: 'filled',
      coinSymbol: this.coin.symbol,
      price: this.coin.market_data.current_price.usd,
      dateLimit: {targetDate, targetTime},
      limit: {targetPrice}
    };

    this.tradeService.create(trade)
      .then(_ => {
        this.submitted = false;
        this.loading = false;
        this.initForm();
        this._snackBar.openFromComponent(SnackbarSuccessComponent, {
          duration: this.snackbarDuration * 2000,
        });
      })
      .catch(error => {
        this.submitted = false;
        this.loading = false;
        this.initForm();
        console.log(error)
        this._snackBar.openFromComponent(SnackbarErrorComponent, {
          duration: this.snackbarDuration * 2000,
        });
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

    this.initForm();
  }

}
