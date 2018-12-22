import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  lastupdates: any[] = [
    {
      id: '1',
      name: 'Example 1',
      description: 'description 1'
    },
    {
      id: '2',
      name: 'Example 2',
      description: 'description 2'
    },
    {
      id: '3',
      name: 'Example 3',
      description: 'description 3'
    },
    {
      id: '4',
      name: 'Example 4',
      description: 'description 4'
    }
  ];

  constructor() { }

  createItem(title: any, description: any) {
    const randomId = Math.random().toString(36).substr(2, 5);
    this.lastupdates.push({
      'id': randomId,
      'title': title,
      'description': description
    });
  }

  getItems() {
    return this.lastupdates;
  }

  updateItem(newValues: any) {
    const itemIndex = this.lastupdates.findIndex(item => item.id === newValues.id);
    this.lastupdates[itemIndex] = newValues;
  }
}
