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
  users: any[] = new Array();

  user: firebase.User;

  constructor(public afAuth: AngularFireAuth, private profileService: ProfileService ) {
    afAuth.authState.subscribe( (user: firebase.User) => {
      this.user = user;
      if (this.user) {
        const cardItem = new CardItem(user.photoURL, user.displayName, user.email);
        profileService.addCard(cardItem);
      }
    });

    this.profileService.getCards().subscribe((cards: CardItem[]) => {
      this.users = cards;
      console.log(this.users);
    });
    
  }

  registerWithGithub(): void {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider()).then(console.warn);
  }

  registerWithFacebook(): void {
	this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(console.warn);
  }
  logout() {
	  this.profileService.deleteUserCard(this.user.email);
	this.afAuth.auth.signOut();
  }
}

