import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() index: string;
  @Input() position: number;
  @Output() currentPosition: EventEmitter<number> = new EventEmitter<number>();
  cardName: string;

  constructor() { }
  
  ngOnInit() {
    this.cardName = 'Title ' + this.index;
  }

  onClick(evt:any) {
    let positionsToMove = 1;
    switch(this.position) {
      case 4:
        positionsToMove = -2;
        break;
      case 0:
        positionsToMove = 2;
      break;
      case 3:
        positionsToMove = -1;
      case 1:
        break;
      default:
        positionsToMove = 0;
    }
    if(positionsToMove!=0){
      this.currentPosition.emit(positionsToMove);
    }
  }

}
