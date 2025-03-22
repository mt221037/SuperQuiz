import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AlertController, IonicModule } from '@ionic/angular'; // Importiere IonicModule
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Question } from 'src/app/services/Question';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule] // Füge IonicModule hier hinzu
})
export class QuizPage implements OnInit {
  questions: Question[] = [];
  currentQuestionIndex = 0;
  score = 0;

  constructor(private dataService: DataService, private alertController: AlertController, private toastController: ToastController) {}

  ngOnInit() {
    // Fragen mischen
    this.questions = [...this.dataService.currentQuiz.questions].sort(() => Math.random() - 0.5);
  }

  async answerQuestion(answerIndex: number) {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correct;

    // Show toast message
    const toast = await this.toastController.create({
      message: isCorrect ? 'Richtig!' : 'Falsch!',
      duration: 1500,
      position: 'bottom',
      color: isCorrect ? 'success' : 'danger',
    });
    await toast.present();

    if (isCorrect) {
      this.score++;
    }

    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      // Ergebnis anzeigen
      const alert = await this.alertController.create({
        header: 'Quiz beendet!',
        message: `Dein Ergebnis: ${this.score}/${this.questions.length}`,
        buttons: ['OK'],
      });
      await alert.present();
      this.resetQuiz();
    }
  }

  resetQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.questions = [...this.dataService.currentQuiz.questions].sort(() => Math.random() - 0.5);
  }

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
}
