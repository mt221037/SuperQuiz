import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonBackButton, IonIcon, IonList, IonItem, IonLabel, IonItemSliding, IonItemOption, IonItemOptions } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.page.html',
  styleUrls: ['./question-list.page.scss'],
  standalone: true,
  imports: [IonItemOptions, IonItemOption, IonItemSliding, IonLabel, IonItem, IonList, IonIcon, IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class QuestionListPage implements OnInit {
  public data = inject(DataService);
  private router = inject(Router);

  constructor() { }

  ngOnInit() {
  }
show(qid: string) {
   this.router.navigate(['/question', qid]);
  }

  delete(qid: string) {
   // this.data.deleteQuestion(qid);
  }
}
