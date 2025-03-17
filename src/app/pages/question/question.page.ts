import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonList, IonBackButton, IonButtons, IonInput } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/services/Question';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
  standalone: true,
  imports: [IonInput, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class QuestionPage implements OnInit {


  public data: DataService = inject(DataService);
  private route = inject(ActivatedRoute);
  public question!: Question; //! heisst dass es das machen soll weil ich weiss es gibt es

  constructor() { }

  ngOnInit() {
    let questionId = this.route.snapshot.paramMap.get('id'); //mit snapshot bekommt man den aktuellen wert der route //id muss der gleiche wert sein wie in routes
  if(!questionId) questionId = '0';
    if (questionId=='0')
    this.question = this.data.getNewQuestion();
  else
  this.question = this.data.getQuestion(questionId) || this.data.getNewQuestion();
console.log(this.question);
  }
ionViewWillLeave(){
  if (this.question.title.length>3 && this.question.id === '0'){
    this.data.addQuestion(this.question);
  }
  }
}
