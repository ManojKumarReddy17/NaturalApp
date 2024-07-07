import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { RetailorDetailsService } from '../../../Service/retailor-details.service';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RetailorDetails } from '../../Models/retailor-details';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { GpsService } from '../../../Service/gps.service';
import { ProfileService } from '../../../Service/profile.service'; 
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [MaterialModule, RouterModule, RouterOutlet, MatDatepickerModule, MatNativeDateModule, FormsModule, DatePipe, MatAutocompleteModule],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  id: any;
  retailorList: RetailorDetails[] = [];
  filteredRetailorList: RetailorDetails[] = [];
  filteredRetailorListByArea: RetailorDetails[] = [];
  noDataFound: boolean;
  DSRCount: number;
  areas: string[] = [];
  filteredAreas: string[] = [];

  constructor(
    private retailorDetailService: RetailorDetailsService,
    private activeRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private gpsservice: GpsService,
    private profileService: ProfileService 
  ) { }

  ngOnInit(): void {
    const userDetails = this.profileService.getUserDetailsFromlocalStorage();
    if (userDetails) {
      this.id = userDetails.id;
      this.loadRetailorList();
    } else {
      console.error('User details not available');
    }

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const latitude = position.coords.latitude.toString();
          const longitude = position.coords.longitude.toString();
          this.gpsservice.startPostingPosition(latitude, longitude);
        },
        (error) => {
          console.error('Error watching position:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  loadRetailorList() {
    if (this.id && this.id.startsWith('NDIS')) {
      this.loadRetailorListByDistributorId();
    } else if (this.id && this.id.startsWith('NEXE')) {
      this.loadRetailorListByExecutiveId();
    } else {
      console.error('Invalid or missing user id');
    }
  }

  loadRetailorListByDistributorId() {
    this.retailorDetailService.getRetailorsListByDistributorId(this.id).subscribe({
      next: (data: RetailorDetails[] | RetailorDetails) => {
        if (Array.isArray(data)) {
          this.retailorList = data;
          this.retailorDetailService.saveRetailorDetails(this.retailorList);

          this.DSRCount = this.retailorList.length;
          this.sortRetailorListByDate();
          this.filteredRetailorList = this.retailorList.slice();
          this.extractUniqueAreas();
          this.applyFilter('');
        }
      },
      error: (error) => {
        console.error('Error fetching retailer details by user ID:', error);
      }
    });
  }

  loadRetailorListByExecutiveId() {
    this.retailorDetailService.getRetailorsListByExecutiveId(this.id).subscribe({
      next: (data: RetailorDetails[] | RetailorDetails) => {
        if (Array.isArray(data)) {
          this.retailorList = data;
          this.retailorDetailService.saveRetailorDetails(this.retailorList);

          this.DSRCount = this.retailorList.length;
          this.sortRetailorListByDate();
          this.filteredRetailorList = this.retailorList.slice();
          this.extractUniqueAreas();
          this.applyFilter('');
        }
      },
      error: (error) => {
        console.error('Error fetching retailer details by user ID:', error);
      }
    });
  }

  sortRetailorListByDate() {
    this.retailorList.sort((a, b) => {
      const dateA = new Date(a.createdDate).getTime();
      const dateB = new Date(b.createdDate).getTime();
      return dateB - dateA;
    });
  }
  
  extractUniqueAreas() {
    const allAreas = this.retailorList.map(retailor => retailor.area);
    this.areas = Array.from(new Set(allAreas));
    this.filteredAreas = this.areas.slice();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    if (filterValue) {
      this.filteredRetailorList = this.retailorList.filter(retailor =>
        retailor.retailor.toLowerCase().includes(filterValue)
      );
    } else {
      this.filteredRetailorList = this.retailorList.slice();
    }
    this.noDataFound = this.filteredRetailorList.length === 0;
  }

  applyFilterByArea(area: string) {
    area = area.trim().toLowerCase();
    this.filteredAreas = this.areas.filter(a => a.toLowerCase().includes(area));
    if (area) {
      this.filteredRetailorListByArea = this.retailorList.filter(retailor =>
        retailor.area.toLowerCase().includes(area)
      );
    } else {
      this.filteredRetailorListByArea = this.retailorList.slice();
    }
    this.applyCombinedFilter();
  }

  applyCombinedFilter() {
    if (this.filteredRetailorListByArea.length > 0) {
      this.filteredRetailorList = this.retailorList.filter(retailor =>
        this.filteredRetailorListByArea.includes(retailor)
      );
    } else {
      this.filteredRetailorList = [];
    }
    this.noDataFound = this.filteredRetailorList.length === 0;
  }

  onDateChanged(event: MatDatepickerInputEvent<Date>) {
    const selectedDateStr = this.datePipe.transform(event.value, 'MM-dd-yyyy');
    if (!selectedDateStr) {
      this.loadRetailorList();
      return;
    }
    this.retailorDetailService.getRetailorsListByDate(this.id, selectedDateStr).subscribe({
      next: (retailorListDetails: RetailorDetails[] | RetailorDetails) => {
        if (Array.isArray(retailorListDetails)) {
          this.retailorList = retailorListDetails;
          this.retailorDetailService.saveRetailorDetails(this.retailorList);

          this.sortRetailorListByDate();
          this.filteredRetailorList = this.retailorList.slice();
          this.applyFilter('');
        }
      },
      error: (error) => {
        console.error('Error fetching retailor list by date:', error);
      }
    });
  }

  onInfoButtonClick(retailorDetail: RetailorDetails) {
    this.retailorDetailService.setdetails(retailorDetail);
  }
}

