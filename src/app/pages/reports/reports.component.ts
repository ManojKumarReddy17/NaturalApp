import { Component, OnInit, ViewChild } from '@angular/core';
import { Reports } from '../../Models/reports';
import { ReportsService } from '../../../Service/reports.service';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { Areas } from '../../Models/areas';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'] 
})
export class ReportsComponent implements OnInit {
  @ViewChild(MatSelect) select: MatSelect;

  salesReports: Reports[] = [];
  areas: Areas[] = [];
  filteredAreas:Areas[]=[];
  selectedArea: string = ''; 
  endDate: string = '2024-07-11';
  startDate:string='2024-02-24';
  searchText: string = '';
  noDataFound: boolean = true; 

  constructor(private salesReportService: ReportsService) {}

  ngOnInit(): void {
    this.fetchSalesReport();
    this.fetchAreas();
  }

  fetchSalesReport() {
    this.salesReportService.getSalesReport(this.selectedArea, this.endDate,this.startDate)
      .subscribe((data: any[]) => {
        this.salesReports = data;
        this.salesReportService.saveReports(this.salesReports);
        this.noDataFound = data.length === 0; 
      });
  }

  fetchAreas() {
    this.salesReportService.getAreas()
      .subscribe((data: Areas[]) => {
        this.areas = data;
        this.filteredAreas=this.getfilteredAreas();
        this.salesReportService.saveAreas(this.areas);
        this.sortAreas();
      });
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
    this.searchText = ''; 
    this.fetchSalesReport();
  }

  onSearchChange(event: any) {
    this.searchText = event.target.value.toLowerCase();
    this.noDataFound = true; 
  }

  openDropdown() {
    this.select.open();
  }
}

