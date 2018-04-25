import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  @Input() index: string;
  @Output() currentPosition: EventEmitter<number> = new EventEmitter<number>();
  @Input() position: number;
  @Input() username: string;
  @Input() photo: string;
  cardName: string;

  constructor() { }

  ngOnInit() {
    this.cardName = this.username ? this.username : 'Title ' + this.index;
  }

  get cardPosition() {
    return this.position;
  }

  positionChange(position) {
    this.position = position;
    let positionsToMove = 0;
    switch (position) {
      case 1:
        positionsToMove = 1;
      break;
      case 4:
        positionsToMove = -2;
        break;
      case 0:
        positionsToMove = 2;
      break;
      case 3:
        positionsToMove = -1;
        break;
    }
    if (positionsToMove !== 0) {
      this.currentPosition.emit(positionsToMove);
    }
  }

}
