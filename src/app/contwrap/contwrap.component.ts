import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import {Observable} from 'rxjs';
import {AgGridAngular} from 'ag-grid-angular';

@Component({
  selector: 'app-contwrap',
  templateUrl: './contwrap.component.html',
  styleUrls: ['./contwrap.component.css']
})
export class ContwrapComponent {
  private gridApi: any;
  private gridColumnApi: any;

  private columnDefs: ({ headerName: string; field: string; type?: undefined; width?: undefined; groupId?: undefined; children?: undefined; } | { headerName: string; field: string; type: string; width?: undefined; groupId?: undefined; children?: undefined; } | { headerName: string; field: string; type: string[]; width: number; groupId?: undefined; children?: undefined; } | { headerName: string; groupId: string; children: ({ headerName: string; field: string; type: string; columnGroupShow?: undefined; } | { headerName: string; field: string; type: string; columnGroupShow: string; })[]; field?: undefined; type?: undefined; width?: undefined; })[];
  private defaultColDef: { width: number; editable: boolean; filter: string; floatingFilter: boolean; resizable: boolean; };
  private defaultColGroupDef: { marryChildren: boolean; };
  private columnTypes: { numberColumn: { width: number; filter: string; }; medalColumn: { width: number; columnGroupShow: string; filter: boolean; }; nonEditableColumn: { editable: boolean; }; dateColumn: { filter: string; filterParams: { comparator: (filterLocalDateAtMidnight: any, cellValue: any) => 0 | 1 | -1; }; }; };
  private rowData: Object [];

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        headerName: 'Athlete',
        field: 'athlete',
      },
      {
        headerName: 'Sport',
        field: 'sport',
      },
      {
        headerName: 'Age',
        field: 'age',
        type: 'numberColumn',
      },
      {
        headerName: 'Year',
        field: 'year',
        type: 'numberColumn',
      },
      {
        headerName: 'Date',
        field: 'date',
        type: ['dateColumn', 'nonEditableColumn'],
        width: 220,
      },
      {
        headerName: 'Medals',
        groupId: 'medalsGroup',
        children: [
          {
            headerName: 'Gold',
            field: 'gold',
            type: 'medalColumn',
          },
          {
            headerName: 'Silver',
            field: 'silver',
            type: 'medalColumn',
          },
          {
            headerName: 'Bronze',
            field: 'bronze',
            type: 'medalColumn',
          },
          {
            headerName: 'Total',
            field: 'total',
            type: 'medalColumn',
            columnGroupShow: 'closed',
          },
        ],
      },
    ];
    this.defaultColDef = {
      width: 150,
      editable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      resizable: true,
    };
    this.defaultColGroupDef = { marryChildren: true };
    this.columnTypes = {
      numberColumn: {
        width: 130,
        filter: 'agNumberColumnFilter',
      },
      medalColumn: {
        width: 100,
        columnGroupShow: 'open',
        filter: false,
      },
      nonEditableColumn: { editable: false },
      dateColumn: {
        filter: 'agDateColumnFilter',
        filterParams: {
          comparator: function (filterLocalDateAtMidnight: number, cellValue: string) {
            var dateParts = cellValue.split('/');
            var day = Number(dateParts[0]);
            var month = Number(dateParts[1]) - 1;
            var year = Number(dateParts[2]);
            var cellDate = new Date(year, month, day);
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            } else if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            } else {
              return 0;
            }
          },
        },
      },
    };
  }

  onGridReady(params: { api: any; columnApi: any; }) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
