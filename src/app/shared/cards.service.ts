import { Injectable } from '@angular/core';

@Injectable()

export class CardsService {
    private cards:CardsInfo[] = [
        {
            displayName: 'Carlos',
            photoUrl: 'http://lorempixel.com/400/200',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vestibulum nisl et nunc egestas, at molestie purus dictum. Fusce dapibus massa purus, id accumsan ex vehicula vel.',
            more: 'http://google.com'
        },
        {
            displayName: 'Alberto',
            photoUrl: 'http://lorempixel.com/400/200',
            description: '2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vestibulum nisl et nunc egestas, at molestie purus dictum. Fusce dapibus massa purus, id accumsan ex vehicula vel.',
            more: 'http://google.com'
        }
    ]

    constructor(){
        console.log('servicio listo');
    }

    public getCards() {
        return this.cards;
    }
}

export interface CardsInfo {
    displayName: string,
    photoUrl: string,
    description: string,
    more: string
}