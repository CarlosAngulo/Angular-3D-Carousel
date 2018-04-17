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
    let positionsToMove = 0;
    switch(this.position) {
      case 0:
        positionsToMove = 2;
      break;
      case 1:
        positionsToMove = 1;
        break;
      case 4:
        positionsToMove = -1;
        break;
      case 5:
        positionsToMove = -2;
        break;
      default:
        positionsToMove = 0;
      break;
    }
    this.currentPosition.emit(positionsToMove);
  }

}
