import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { Company, URLS } from 'src/constants';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})

export class CompanyComponent implements OnInit {

  companyList: Array<Company> = [];

  constructor(
    private httpClient: HttpClient,
    // private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.userDetails);
    this.httpClient.get<Array<Company>>(URLS.getCompanies)
      // .pipe(map((results: Array<Company>) => {
      //   return results.filter((obj: any) => obj.id === userData.companyId
      //   )
      // }))
      .subscribe(companyList => {
        this.companyList = companyList;
      })
  }
}
