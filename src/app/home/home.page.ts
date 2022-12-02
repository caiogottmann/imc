import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  weight: number = 0;
  height: number = 0;

  constructor(private toastCtrl: ToastController) {}

  onCalculate() {
    if (this.height <= 0 || this.weight <= 0) {
      return;
    }

    const imc = this.weight / (this.height * this.height);
    const classification = this.getClassificationIMC(imc);

    this.showIMC({ imc, classification });
  }

  getClassificationIMC(imc: number) {
    let message = '';
    if (imc < 18.5) message = 'Magreza';
    else if (imc >= 18.5 && imc <= 24.9) message = 'Normal';
    else if (imc >= 25 && imc <= 29.9) message = 'Sobrepeso';
    else if (imc >= 30 && imc <= 39.9) message = 'Obesidade';
    else if (imc >= 40) message = 'Obesidade Grave';
    return message;
  }

  async showIMC({
    imc,
    classification,
  }: {
    imc: number;
    classification: string;
  }) {
    const toast = await this.toastCtrl.create({
      message: `${imc.toFixed(2)} - ${classification}`,
      duration: 3000,
      color: 'secondary',
    });
    toast.present();
  }
}
