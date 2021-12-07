import { Component, OnInit } from '@angular/core';
import { gql, Apollo } from 'apollo-angular'
import { Box } from '../models/box';

const GetBoxes = gql`query{
  boxes(free: false, purchasable: true, openable: true) {
    edges {
      node {
        id
        name
        iconUrl
        cost
      }
    }
  }
}`;

@Component({
  selector: 'app-box-list',
  templateUrl: './box-list.component.html',
  styleUrls: ['./box-list.component.scss']
})

export class BoxListComponent implements OnInit {
  allBoxes:Box[] = [];

  constructor(private apollo:Apollo){}

  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: GetBoxes
    }).valueChanges
    .subscribe(({data}) => {
      this.allBoxes = data.boxes.edges.map((edge: { node: any; }) => edge.node);
    })
  }
}
