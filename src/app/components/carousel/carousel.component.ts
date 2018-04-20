import { Component, OnInit, ViewChild, ViewChildren, QueryList, ViewContainerRef, ElementRef, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition, AnimationBuilder, AnimationPlayer } from '@angular/animations';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements AfterViewInit {

  items = [
    { title: 'Slide 1' },
    { title: 'Slide 2' },
    { title: 'Slide 3' },
    { title: 'Slide 4' },
    { title: 'Slide 5' },
    { title: 'Slide 6' },
    { title: 'Slide 7' },
    { title: 'Slide 8' },
  ];

  offsets = [-2, -1, 1, 2];

  timing = '400ms ease-out';
  @ViewChildren('withBuilder') cards: QueryList<CardComponent>;
  @ViewChildren('withBuilder', {read: ElementRef}) elCards: QueryList<ElementRef>;
  @ViewChild('withBuilder', {read: ElementRef}) baseCard: ElementRef;
  @ViewChild('box', {read: ElementRef}) box: ElementRef;
  private player: AnimationPlayer;
  private player2: AnimationPlayer;
  private parentNode: ElementRef;
  private centerCoords = {x: 0, y: 0};
  private radius = 0;
  private canvasSize = {width: 0, height: 0};
  private cardBaseSize = {width: 0, height: 0};
  private propCanvasCard = 0;
  private cardsArr = [];
  private angle = 0;
  private boxAngle = 0;

  constructor( private animationBuilder: AnimationBuilder, private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.cardsArr = this.cards.toArray();
    this.proportions();
  }

  private proportions() {
    const el = this.elementRef.nativeElement;
    this.canvasSize.width = this.elementRef.nativeElement.parentNode.clientWidth;
    this.canvasSize.height = this.canvasSize.width * 0.3;
    // this.canvasSize.height = this.canvasSize.width * 0.5;
    this.elementRef.nativeElement.parentNode.style.height =  this.canvasSize.height + 'px';
    this.radius = this.canvasSize.width * 0.395;
    // this.radius = this.canvasSize.width * 0.20;
    this.centerCoords.x = this.canvasSize.width / 2;
    this.centerCoords.y =  this.canvasSize.height / 2;
    this.cardBaseSize.width = this.baseCard.nativeElement.clientWidth;
    this.cardBaseSize.height = this.baseCard.nativeElement.clientHeight;
    this.propCanvasCard = this.canvasSize.width / this.cardBaseSize.width;
    console.log( this.propCanvasCard, this.canvasSize.height / this.cardBaseSize.height, '<<<<');
    this.createAnimation(0);
  }

  public animateBox(offset) {
    this.createAnimation(offset);
    this.boxAngle += offset;
    if (this.player2) {
      this.player2.destroy();
    }
    const animation2 = this.animationBuilder.build([
      animate(this.timing, style({transform: `rotate(${this.boxAngle * 45}deg)`}))
    ]);
    this.player2 = animation2.create(this.box.nativeElement);
    this.player2.play();
    const timer = setInterval(() => {
      console.log(this.box.nativeElement.style.transform, this.player2.getPosition());
    }, 17);
    this.player2.onDone(() => {
      clearInterval(timer);
      this.box.nativeElement.style.transform = `rotate(${this.boxAngle * 45}deg)`;
    });
  }

  public createAnimation(offset) {
    console.log('offset:', offset, 'angle: ', this.angle);
    if (this.player) {
      this.player.destroy();
    }
    this.elCards.forEach((card, key) => {
      let position = offset + this.cardsArr[key].cardPosition;
      switch (position) {
        case -1:
          position = 7;
        break;
        case -2:
          position = 6;
        break;
        case 8:
          position = 0;
        break;
        case 9:
          position = 1;
        break;
      }
      console.log('card: ', offset, key, position);
      this.cardsArr[key].positionChange(position);
      const coords = this.calculateCoords(this.angle + position);
      const animation = this.buildAnimation(coords);
      this.player = animation.create(card.nativeElement);
      card.nativeElement.style.zIndex = Math.round((coords.z + 1) * 100);
      this.player.play();
      this.player.onDone(() => {
        card.nativeElement.style.transform =
          `translate(${coords.x}px, ${coords.y}px) scale(${(coords.z + 1) * this.propCanvasCard * 0.2 })`;
      });
    });
  }

  public moveCarousel(event: any, position: number) {
    console.log(position);
    this.createAnimation(position);
  }

  private calculateCoords (index) {
    const x = this.radius * Math.cos((360 * index / 8) * Math.PI / 180) + this.centerCoords.x - (this.cardBaseSize.width * 0.5);
    const y = (this.radius *  0) * Math.sin((360 * index / 8) * Math.PI / 180) + this.centerCoords.y - (this.cardBaseSize.height * 0.5);
    const z = Math.sin((360 * index / 8) * Math.PI / 180);
    return { x, y, z };
  }

  private buildAnimation( coords ) {
    if (coords.z < 0) {
      coords.z = 0;
    }
    return this.animationBuilder.build([
      animate(this.timing, style({
        transform: `translate(${coords.x}px, ${coords.y}px) scale(${(coords.z + 1) * this.propCanvasCard * 0.2 })`
        // transform: `translate(${coords.x}px, ${coords.y}px) scale(0.5)`
      }))
    ]);
  }

  public onCardClick(i: number) {
    console.log(this.cardsArr[i].position);
    let positionsToMove = 0;
    switch (this.cardsArr[i].position) {
      case 0:
        positionsToMove = 2;
        this.timing = '700ms ease-out';
      break;
      case 1:
        positionsToMove = 1;
        this.timing = '350ms ease-out';
        break;
      case 3:
        positionsToMove = -1;
        this.timing = '350ms ease-out';
        break;
      case 4:
        positionsToMove = -2;
        this.timing = '700ms ease-out';
        break;
    }
    if (positionsToMove !== 0) {
      this.createAnimation(positionsToMove);
    }
  }
}
