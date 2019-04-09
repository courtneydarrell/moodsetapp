import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page';

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
    this.router.navigate([{outlets: {calendar: ['calendar'] ,
    today: ['today'],
    settings: ['settings'],
    articles: ['articles']
  }}],
    {
      relativeTo: this.active
    });
    this.page.actionBarHidden = true;
  }

}
