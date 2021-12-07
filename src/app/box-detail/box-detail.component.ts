import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Box } from '../models/box';

const getBox = gql`
  query GetBox($id: ID!) {
    box(id: $id) {
      id,
      name,
      iconUrl,
      cost
    }
  }
`;

const OPEN_BOX = gql`
  mutation OpenBox($input: OpenBoxInput!) {
    openBox(input: $input) {
      boxOpenings {
        id
        itemVariant {
          id
          name
          value
        }
      }
    }
  }
`;

@Component({
  selector: 'app-box-detail',
  templateUrl: './box-detail.component.html',
  styleUrls: ['./box-detail.component.scss']
})
export class BoxDetailComponent implements OnInit {
  box: Box | null = null
  openedBox: any
  openedErrors: any

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.apollo.query({
      query: getBox,
      variables: { id }
    }).subscribe(({ data }: any) => {
      this.box = data.box
      if (this.box) {
        this.openBox(this.box?.id, 1)
      }
    })
  }

  openBox(boxId: string, amount: number): void {
    this.apollo.mutate({
      mutation: OPEN_BOX,
      variables: {
        input: {
          boxId,
          amount
        }
      }
    }).subscribe(({ data }: any) => {
      console.log('opened box', data)
      this.openedBox = data.openBox.boxOpenings[0]
    }, (error) => {
      this.openedErrors = error
      console.log('error opening box', error)
    })
  }

  closeBox(): void {
    this.router.navigate(['/'])
  }
}
