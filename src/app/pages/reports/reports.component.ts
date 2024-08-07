
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSelect } from '@angular/material/select';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { dsReports, Reports } from '../../Models/reports';
import { ReportsService } from '../../../Service/reports.service';
import { ProfileService } from '../../../Service/profile.service';
import { Areas } from '../../Models/areas';
import { UserDetails } from '../../Models/user-details';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { error } from 'console';


@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [MaterialModule, FormsModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  @ViewChild(MatSelect) select: MatSelect;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  salesReports: Reports[] = [];
  Dsreports:dsReports[]=[];

  
  dataSource=new MatTableDataSource<any>();
  userDetails: UserDetails = this.profileService.getUserDetailsFromlocalStorage();
  areas: Areas[] = [];
  filteredAreas: Areas[] = [];
  selectedArea: string = '';
  retailors:string=''; 
  executive:string='';
  distributor: string='';
  id:string='';
  startDate: string = ''; 
  endDate: string = '';
  searchText: string = '';
  distributorNames:any='';
  retailornames:any='';
  ExecutiveId: string | null = null;
  selectedDistributor: any;
  isExecutive:boolean=this.userDetails.id.startsWith("NEXE")?true:false;
  noDataFound: boolean = true; 
  displayedColumns = ['retailer', 'createdDate', 'productName', 'price', 'quantity', 'saleAmount'];

  constructor(private salesReportService: ReportsService, private profileService: ProfileService) {}

  ngOnInit(): void {
    const today = new Date();
    this.startDate = this.formatDate(today);
    this.endDate = this.formatDate(today);
    this.id="1";
    this.getretailorsbydistributor();
    this.getretailorsbydistributorexecutive();
   
  if(!this.isExecutive)
    this.fetchSalesReport();
  else   
    this.fetchDsReport();
    this.getdistributorbyexecutive();
    this.fetchAreas();
   
   
  }

  formatDate(date: Date): string {
    const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return localDate.toISOString().split('T')[0];
  }

  fetchSalesReport() {
    this.distributor = this.userDetails.id;
    this.salesReportService.getSalesReport(this.selectedArea, this.distributor, this.startDate, this.endDate, this.retailors)
      .subscribe((data: Reports[]) => {
        this.salesReports = data;
        this.dataSource.data = data;
        this.noDataFound = data.length === 0; 
      });
    
    }
    fetchDsReport() {
      this.executive = this.userDetails.id;
      if(this.distributor.startsWith('NEXE')){
        this.distributor = '';
      }
      this.salesReportService.getDsrReports(this.selectedArea,this.retailors,this.executive, this.distributor, this.startDate, this.endDate)
        .subscribe((data: dsReports[]) => {
          this.Dsreports = data;
          this.dataSource.data = data;
          this.noDataFound = data.length === 0; 
        });
      }


  fetchAreas() {
    this.salesReportService.getAreas()
      .subscribe((response: any) => {
        if (response && Array.isArray(response.items)) {
          this.areas = response.items;
          this.filteredAreas = this.getfilteredAreas();
          this.sortAreas();
        } else {
          console.error('Expected an object with an items array, but got:', response);
        }
      });
  }
  getdistributorbyexecutive():void{
if(this.isExecutive){
  this.salesReportService.getDistributorbyexecutive(this.executive).subscribe({
    next:(data)=>{
      this.distributorNames=data;
      this.salesReportService.saveReports(this.distributorNames);
      this.areas = Array.from(new Set(data.map((distributor: any) => distributor.area)));
    },
    error:(error)=>{
      console.error(error);
    }
  });
}
  }
  getretailorsbydistributor():void{
    this.distributor = this.userDetails.id;
      this.salesReportService.getRetailorsbyDistributor(this.distributor).subscribe({
        next:(data)=>{
          this.retailornames=data;
        }
      })
    
  }

  getretailorsbydistributorexecutive():void{
    this.executive = this.userDetails.id;
      this.salesReportService.getRetailorsbyDistributor(this.executive).subscribe({
        next:(data)=>{
          this.retailornames=data;
        }
      })
    
  }


  sortAreas() {
    this.areas.sort((a, b) => a.areaName.localeCompare(b.areaName));
  }

  getfilteredAreas(): Areas[] {
    const filtered = this.areas.filter(area =>
      this.isMatch(area.areaName.toLowerCase(), this.searchText.toLowerCase())
    );
    this.noDataFound =
      (filtered.length === 0 && this.searchText !== '') ||
      this.salesReports.length === 0; 
    return filtered;
  }

  isMatch(areaName: string, searchText: string): boolean {
    return areaName.replace(/\s/g, '').includes(searchText.replace(/\s/g, ''));
  }

  selectArea(areaId: string) {
    this.selectedArea = areaId;
    this.fetchSalesReport();
    this.fetchDsReport();
  }

  onSearchChange(event: any) {
    this.searchText = event.target.value.toLowerCase();
    this.filteredAreas = this.getfilteredAreas();
    this.noDataFound = false; 
  }

  openDropdown() {
    this.select.open();
  }

  updateStartDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.startDate = this.formatDate(event.value);
      if(!this.isExecutive)
        this.fetchSalesReport();
      else   
        this.fetchDsReport();
    }
  }

  updateEndDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.endDate = this.formatDate(event.value);
      if(!this.isExecutive)
        this.fetchSalesReport();
      else   
        this.fetchDsReport();
    }
  }
  filterDistributors(): any[] {
    return this.distributorNames;
}

  applyFilter(filterValue: string) {
    this.retailors = filterValue;
    if(this.isExecutive){
      this.fetchDsReport();
    }
    else {
      this.fetchSalesReport();
    }
  }

  getRetailordetails(distributorId){
    this.salesReportService.getRetailorsbyDistributor(distributorId).subscribe({
      next:(data)=>{
        this.retailornames=data;
      }
    })
    if(this.isExecutive){
      this.distributor = distributorId;
      this.fetchDsReport();
    }
  }
}





