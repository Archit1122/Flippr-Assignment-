import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  filteredList: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
    ) {
   }
  title = 'my-app';
  list: any = [];
  showList: boolean = false;
  selectedInitialYear:number= 1900;
  selectedLastYear:number = 2023;
  selectedCategory: string= 'chemistry';
  categoryList:any= [];
  yearList: any= [];
  ngOnInit() {
    console.log(this.selectedInitialYear,this.selectedLastYear);
    this.http.get('https://api.nobelprize.org/v1/prize.json').subscribe(
    data => [
      console.log(data),
      this.list = data,
      this.filteredList ={...this.list},
      this.list.prizes.forEach((element: { category: any; }) => {
        if(element?.category){
          if (this.categoryList.indexOf(element.category) === -1) {
            this.categoryList.push(element.category)
          } 
        }
      }),
      this.initiateDropDownData()
      ])
  }
  initiateDropDownData()
  {
    for (let i = this.selectedInitialYear;i<=this.selectedLastYear;i++)
      {
        this.yearList.push(i);
      }
  }

  resetFilter()
  {
    this.selectedInitialYear=1900;
    this.selectedLastYear=2023;
    this.filteredList = {...this.list};
  }
  filter(){
    this.filteredList = {...this.list},
    this.filteredList.prizes = this.filteredList.prizes.filter((element: { category: string,year:string,laureates:any }) =>  element.category === this.selectedCategory && +(element.year)>= this.selectedInitialYear && +(element.year)<= this.selectedLastYear);
  }
}
