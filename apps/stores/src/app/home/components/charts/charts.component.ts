import { Component, OnInit } from '@angular/core';
import {
  femaleHeightWeight,
  maleHeightWeight,
} from './data/height-weight-data';
import { AgCharts } from 'ag-charts-angular';
import { LoaderSimpleDirective } from '@stores/libs';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
  imports: [AgCharts, LoaderSimpleDirective],
})
export class ChartsComponent implements OnInit {
  public chartOptionsPie = {};
  public chartOptionsDonnut = {};
  public chartOptionsLine = {};
  public chartOptionsBuble = {};

  ngOnInit() {
    this.chartOptionsPie = {
      theme: 'ag-default',
      data: [
        { label: 'Angular', value: 25 },
        { label: 'TypeScript', value: 19 },
        { label: 'Html', value: 17 },
        { label: 'Css', value: 15 },
        { label: 'Webstorm', value: 14 },
      ],
      series: [
        {
          type: 'pie',
          angleKey: 'value',
          calloutLabelKey: 'label',
        },
      ],
      background: {
        fill: 'white',
      },
    };
    this.chartOptionsDonnut = {
      theme: 'ag-default',
      data: [
        { asset: 'Stocks', amount: 60000 },
        { asset: 'Bonds', amount: 40000 },
        { asset: 'Cash', amount: 7000 },
        { asset: 'Real Estate', amount: 5000 },
        { asset: 'Commodities', amount: 3000 },
      ],
      series: [
        {
          type: 'donut',
          angleKey: 'amount',
          calloutLabelKey: 'asset',
          innerRadiusRatio: 0.7,
        },
      ],
      background: {
        fill: 'white',
      },
    };
    this.chartOptionsLine = {
      theme: 'ag-default',

      title: {
        text: '',
      },
      subtitle: {
        text: '',
      },
      data: [
        {
          quarter: "Q1'18",
          iphone: 140,
          mac: 16,
          ipad: 14,
          wearables: 12,
          services: 20,
        },
        {
          quarter: "Q2'18",
          iphone: 124,
          mac: 20,
          ipad: 14,
          wearables: 12,
          services: 30,
        },
        {
          quarter: "Q3'18",
          iphone: 112,
          mac: 20,
          ipad: 18,
          wearables: 14,
          services: 36,
        },
        {
          quarter: "Q4'18",
          iphone: 118,
          mac: 24,
          ipad: 14,
          wearables: 14,
          services: 36,
        },
      ],
      series: [
        {
          type: 'bar',
          xKey: 'quarter',
          yKey: 'iphone',
          yName: 'iPhone',
        },
        {
          type: 'bar',
          xKey: 'quarter',
          yKey: 'mac',
          yName: 'Mac',
        },
        {
          type: 'bar',
          xKey: 'quarter',
          yKey: 'ipad',
          yName: 'iPad',
        },
        {
          type: 'bar',
          xKey: 'quarter',
          yKey: 'wearables',
          yName: 'Wearables',
        },
        {
          type: 'bar',
          xKey: 'quarter',
          yKey: 'services',
          yName: 'Services',
        },
      ],
    };
    this.chartOptionsBuble = {
      theme: 'ag-default',
      title: {
        text: '',
      },
      subtitle: {
        text: '',
      },
      series: [
        {
          type: 'bubble',
          title: 'Typescript',
          data: maleHeightWeight,
          xKey: 'height',
          xName: 'Commit',
          yKey: 'weight',
          yName: 'Update',
          sizeKey: 'age',
          sizeName: 'Version',
        },
        {
          fill: 'rgba(255,8,0,0.24)',
          stroke: 'rgba(255,74,69,0.71)',
          type: 'bubble',
          title: 'Angular',
          data: femaleHeightWeight,
          xKey: 'height',
          xName: 'Commit',
          yKey: 'weight',
          yName: 'Update',
          sizeKey: 'age',
          sizeName: 'Version',
        },
      ],
      axes: [
        {
          type: 'number',
          position: 'bottom',
          title: {
            text: 'Height',
          },
          label: {
            formatter: (params: any) => {
              return params.value;
            },
          },
        },
        {
          type: 'number',
          position: 'left',
          title: {
            text: 'Weight',
          },
          label: {
            formatter: (params: any) => {
              return params.value;
            },
          },
        },
      ],
    };
  }
}
