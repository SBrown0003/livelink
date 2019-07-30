import 'rxjs-compat';
import { Component, OnDestroy, OnInit,TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { RequestOptions,Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Person } from './person';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-root',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [ NgbModalConfig, NgbModal]
  })
export class AppComponent {

  users$: any[] = [];
  //dtOptions: DataTables.Settings = {};
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();
  persons: Person[] = [];

  closeResult: string;
  userDetail: any;

  @ViewChild('editModal', { static: false, }) editModal : TemplateRef<any>; // Note: TemplateRef
  constructor(private http: HttpClient,private route: ActivatedRoute, private modalService: NgbModal) {
  }
  

}