import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import * as serverData from './data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isCollapsed = true;
  public title = 'server-app';
  public minValue: number = 0;
  public selectedRam: any = [];
  public harddisktype: any = ["SAS", "SATA", "SSD"];
  public harddiskmodal: any;
  public location: any = ["AmsterdamAMS-01"];
  public locationmodal: any;
  public RamList: any = [
    {
      label: '2GB',
      value: 2
    },
    {
      label: '4GB',
      value: 4
    },
    {
      label: '8GB',
      value: 8
    },
    {
      label: '12GB',
      value: 12
    },
    {
      label: '16GB',
      value: 16
    },
    {
      label: '24GB',
      value: 24
    },
    {
      label: '32GB',
      value: 32
    },
    {
      label: '48GB',
      value: 48
    },
    {
      label: '64GB',
      value: 48
    },
    {
      label: '96GB',
      value: 48
    }
  ]
  public options: Options = {
    floor: 0,
    ceil: 500,
    showTicksValues: true,
    stepsArray: [
      {value: 0, legend: '0GB'},
      {value: 250, legend: '250GB'},
      {value: 500, legend: '500GB'},
      {value: 1, legend: '1TB'},
      {value: 2, legend: '2TB'},
      {value: 3, legend: '3TB'},
      {value: 4, legend: '4TB'},
      {value: 8, legend: '8TB'},
      {value: 12, legend: '12TB'},
      {value: 24, legend: '24TB'},
      {value: 48, legend: '48TB'},
      {value: 72, legend: '72TB'},
    ],
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '';
      }
    }
  };
  public products:  any  = (serverData  as  any).default;
  public productsCopy: any;

  ngOnInit() {
    this.productsCopy = JSON.stringify(this.products);
  }

  /***********************************************************************************
  @PURPOSE      : Get selected ram
  @PARAMETERS   : e: object of check event
                  ram: object of selected ram
  @RETURN       : N/A
  ************************************************************************************/
  selectRam(e, ram) {
    this.selectedRam = [];
    this.minValue = 0;
    this.harddiskmodal = null;
    this.locationmodal = null;
    if (e.target.checked) {
      this.selectedRam.push(ram.value);
    } else {
      let index = this.selectedRam.findIndex(x => x === ram.value);
      if (index > -1) {
        this.selectedRam.splice(index, 1);
      }
    }
  }

  /***********************************************************************************
  @PURPOSE      : Clear filter and restore values
  @PARAMETERS   : N/A
  @RETURN       : N/A
  ************************************************************************************/
  clearFilter() {
    if (Array.isArray(this.productsCopy)) {
      this.products = this.productsCopy;
    } else {
      this.products = JSON.parse(this.productsCopy);
    }
  }

  /***********************************************************************************
  @PURPOSE      : Apply filter to the list
  @PARAMETERS   : N/A
  @RETURN       : Filtered value to the table
  ************************************************************************************/
  applyFilter() {
    this.products = [];
    if (Array.isArray(this.productsCopy)) {
    this.productsCopy = this.productsCopy;
    } else {
      this.productsCopy = JSON.parse(this.productsCopy);
    }
    this.products = this.productsCopy.filter((obj) => {
      if (this.harddiskmodal) {
        return obj.hddType == this.harddiskmodal;
      }
      if (this.locationmodal) {
        return obj.location == this.locationmodal;
      }
      if (this.selectedRam.length) {
        let index = this.selectedRam.findIndex(x => x == obj.ramVal)
        if (index > -1) {
          return obj
        }
      }
      if (this.minValue > 0) {
        let value;
        if (this.minValue == 250) {
          value = 0.250;
        } else if (this.minValue == 500) {
          value = 0.500;
        } else {
          value = this.minValue;
        }
        return obj.hddVal <= value;
      }
    })
  }

}
