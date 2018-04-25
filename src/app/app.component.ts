import { Component, ViewChild, ViewChildren, QueryList, ElementRef, AfterContentInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ProfileService } from './shared/profile.service';
import { CardItem } from './shared/card-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  items: any[] = [
    { title: 'Slide 1' },
    { title: 'Slide 2' },
    { title: 'Slide 3' },
    { title: 'Slide 4' },
    { title: 'Slide 5' },
    { title: 'Slide 6' },
    { title: 'Slide 7' },
    { title: 'Slide 8' },
  ];

  user: firebase.User;

  constructor(public afAuth: AngularFireAuth, private profileService: ProfileService ) {
    afAuth.authState.subscribe( (user: firebase.User) => {
      this.user = user;
      if (this.user) {
        const cardItem = new CardItem(user.photoURL, user.displayName, user.email);
        profileService.addCard(cardItem);
      }
    }
    );

    //this.profileService.getCards().subscribe((cards: CardItem[]) => {this.items = cards; });
  }

  registerWithGithub(): void {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider()).then(console.warn);
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}

