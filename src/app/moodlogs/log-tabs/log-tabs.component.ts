import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page';
import { TabView } from 'tns-core-modules/ui/tab-view/tab-view';

@Component({
  selector: 'ns-log-tabs',
  templateUrl: './log-tabs.component.html',
  styleUrls: ['./log-tabs.component.css'],
  moduleId: module.id,
})

export class LogTabsComponent implements OnInit {


  constructor(private router: RouterExtensions,
              private active: ActivatedRoute,
              private page: Page) { }

  ngOnInit() {

    this.router.navigate([{outlets: {
    calendar: ['calendar'] ,
    today: ['today'],
    articles: ['articles'],
    settings: ['settings'],
  }}],
    {
      relativeTo: this.active
    });
    this.page.actionBarHidden = true;
  }

}
