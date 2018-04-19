import { Component, OnInit, ViewChild, ViewChildren, QueryList, ViewContainerRef, ElementRef, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition, AnimationBuilder, AnimationPlayer } from '@angular/animations';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.proportions();
  }

  items = [
    { title: 'Slide 1' },
    { title: 'Slide 2' },
    { title: 'Slide 3' },
    { title: 'Slide 4' },
    { title: 'Slide 5' },
    { title: 'Slide 6' },
    { title: 'Slide 7' },
    { title: 'Slide 8' },
  ]

  timing = '400ms ease-out';
  @ViewChildren('withBuilder') cards: QueryList<CardComponent>;
  @ViewChildren('withBuilder', {read: ElementRef}) elCards: QueryList<ElementRef>;
  @ViewChild('withBuilder', {read: ElementRef}) baseCard: ElementRef;
  @ViewChild('box', {read: ElementRef}) box: ElementRef;
  private player: AnimationPlayer;
  private player2: AnimationPlayer;
  private parentNode: ElementRef;
  private centerCoords = {x:0, y:0};
  private radius = 0;
  private canvasSize = {width:0, height:0};
  private cardBaseSize = {width:0, height:0};
  private propCanvasCard = 0;
  private cardsArr = [];
  private angle = 0;

  constructor( private animationBuilder: AnimationBuilder, private elementRef: ElementRef) {
  }
  
  private proportions() {
    const el = this.elementRef.nativeElement;
    this.canvasSize.width = this.elementRef.nativeElement.parentNode.clientWidth;
    this.canvasSize.height = this.canvasSize.width * 0.3;
    this.elementRef.nativeElement.parentNode.style.height =  this.canvasSize.height + 'px';
    this.radius = this.canvasSize.width * 0.395;
    this.radius = this.canvasSize.width * 0.15;
    this.centerCoords.x = this.canvasSize.width / 2;
    this.centerCoords.y =  this.canvasSize.height / 2;
    this.cardBaseSize.width = this.baseCard.nativeElement.clientWidth;
    this.cardBaseSize.height = this.baseCard.nativeElement.clientHeight;
    this.propCanvasCard = this.canvasSize.width / this.cardBaseSize.width;
    console.log( this.propCanvasCard, this.canvasSize.height / this.cardBaseSize.height, '<<<<')
    this.createAnimation(0);
  }

  public animateBox(offset) {
    if(this.player2) {
      this.player2.destroy();
    }
    let animation2 = this.animationBuilder.build([
      animate(this.timing, style({transform:`rotate(${offset*45}deg)`}))
    ])
    this.player2 = animation2.create(this.box.nativeElement);
    this.player2.play();
    let timer = setInterval(()=>{
      console.log(this.box.nativeElement.style.transform, this.player2.getPosition())
    }, 17);
    this.player2.onDone(()=>{
      clearInterval(timer);
      this.box.nativeElement.style.transform = `rotate(${offset*45}deg)`
    })
  }

  public createAnimation(offset) {
    this.animateBox(offset)
    this.angle += offset;
    console.log('offset', offset, this.angle);

    if(this.player) {
      this.player.destroy();
    }
    this.cardsArr = this.cards.toArray();
    this.elCards.forEach((card, key) => {
      let position = offset + key;
      switch(position){
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
      this.cardsArr[key].position = position;
      let coords = this.calculateCoords(this.angle + position);
      let animation = this.buildAnimation(coords);
      this.player = animation.create(card.nativeElement);
      card.nativeElement.style.zIndex = Math.round((coords.z + 1) * 100);
      this.player.play();
      this.player.onDone(()=>{
        card.nativeElement.style.transform = `translate(${coords.x}px, ${coords.y}px) scale(0.5)`;
      })
    }); 
  }

  public moveCarousel(event:any, position:number) {
    console.log(position);
    this.createAnimation(position);
  }

  private calculateCoords (index) {
    let x = this.radius * Math.cos((360*index/8)*Math.PI/180) + this.centerCoords.x - (this.cardBaseSize.width * 0.5);
    let y = (this.radius *  1) * Math.sin((360*index/8)*Math.PI/180) + this.centerCoords.y -(this.cardBaseSize.height * 0.5);
    let z = Math.sin((360*index/8)*Math.PI/180);
    return { x, y, z };
  }

  private buildAnimation( coords ) {
    return this.animationBuilder.build([
      animate(this.timing, style({ 
        //transform: `translate(${coords.x}px, ${coords.y}px) scale(${(coords.z + 1)* this.propCanvasCard * 0.2 })`
        transform: `translate(${coords.x}px, ${coords.y}px) scale(0.5)`
      }))
    ]);
  }

  public onCardClick(i:number){
    console.log(this.cardsArr[i].position);
    let positionsToMove = 0;
    switch(this.cardsArr[i].position) {
      case 8:
        positionsToMove = 2;
      break;
      case 0:
        positionsToMove = 2;
      break;
      case 1:
        positionsToMove = 1;
        break;
      case 3:
        positionsToMove = -1;
        break;
      case 4:
        positionsToMove = -2;
        break;
    }
    if(positionsToMove!=0)
      this.createAnimation(positionsToMove);
  }
}