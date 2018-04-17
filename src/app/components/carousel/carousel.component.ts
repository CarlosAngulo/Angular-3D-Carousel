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
  private player: AnimationPlayer;
  private parentNode: ElementRef;
  private centerCoords = {x:0, y:0};
  private radius = 0;
  private canvasSize = {width:0, height:0};
  private cardBaseSize = {width:0, height:0};
  private propCanvasCard = 0;
  private cardsArr = [];

  constructor( private animationBuilder: AnimationBuilder, private elementRef: ElementRef) {
  }
  
  private proportions() {
    const el = this.elementRef.nativeElement;
    this.canvasSize.width = this.elementRef.nativeElement.parentNode.clientWidth;
    this.canvasSize.height = this.canvasSize.width * 0.3;
    this.elementRef.nativeElement.parentNode.style.height =  this.canvasSize.height + 'px';
    this.radius = this.canvasSize.width * 0.395;
    this.centerCoords.x = this.canvasSize.width / 2;
    this.centerCoords.y =  this.canvasSize.height / 2;
    this.cardBaseSize.width = this.baseCard.nativeElement.clientWidth;
    this.cardBaseSize.height = this.baseCard.nativeElement.clientHeight;
    this.propCanvasCard = this.canvasSize.width / this.cardBaseSize.width;
    console.log( this.propCanvasCard, this.canvasSize.height / this.cardBaseSize.height, '<<<<')
    this.createAnimation(0);
  }

  public createAnimation(offset) {

    if(this.player) {
      this.player.destroy();
    }
    this.cardsArr = this.cards.toArray();
    this.elCards.forEach((card, key) => {
      this.cardsArr[key].position = offset + key;
      let coords = this.calculateCoords(key + offset);
      let animation = this.buildAnimation(coords);
      this.player = animation.create(card.nativeElement);
      card.nativeElement.style.zIndex = Math.round((coords.z + 1) * 100);
      this.player.play();
    }); 
  }

  public moveCarousel(event:any, position:number) {
    console.log(position);
    this.createAnimation(position);
  }

  private calculateCoords (index) {
    let x = this.radius * Math.cos((360*index/8)*Math.PI/180) + this.centerCoords.x - (this.cardBaseSize.width * 0.5);
    let y = (this.radius *  0) * Math.sin((360*index/8)*Math.PI/180) + this.centerCoords.y -(this.cardBaseSize.height * 0.5);
    let z = Math.sin((360*index/8)*Math.PI/180);
    return { x, y, z };
  }

  private buildAnimation( coords ) {
    return this.animationBuilder.build([
      animate(this.timing, style({ 
        transform: `translate(${coords.x}px, ${coords.y}px) scale(${(coords.z + 1)* this.propCanvasCard * 0.2 })`
      }))
    ]);
  }

  onClick(evt:any) {
    console.log(evt);
  }

  public onCardClick(e:any){
    this.createAnimation(e);
  }

}
