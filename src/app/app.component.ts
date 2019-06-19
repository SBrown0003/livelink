import 'rxjs-compat';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import { Person } from './person';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'live-link';

  dtOptions: any = {};
  persons: Person[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private http: Http, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let campID = '';
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'colvis',
        'copy',
        'print',
        'csv'
      ],
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal( {
            header: function ( row ) {
              let data = row.data();
              return 'Details for ' + data[0] + ' ' + data[1];
            }
          } ),
          renderer: $.fn.dataTable.Responsive.renderer.tableAll( {
            tableClass: 'table'
          } )
        }
      }
    };
    this.route.queryParamMap.subscribe((queryParam: any) => {
      if (!!queryParam && !!queryParam.params) {
        campID = queryParam.params.campid;
        console.log(JSON.stringify(campID));
      }
      this.http.get(`data/data.json?campid=${campID}`)
      // this.http.get(`http://vtools.lndo.site/api/registration?campaign_id=23830`)
      // this.http.get(`data/data.json`)
        .map(this.extractData)
        .subscribe(persons => {
          this.persons = persons;
          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
          if (typeof campID !== 'undefined') {
            this.dtTrigger.complete();
          }
        });
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data.list || [];
  }
}
