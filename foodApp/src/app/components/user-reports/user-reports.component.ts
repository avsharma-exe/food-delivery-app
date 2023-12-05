import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { RestaurantService } from 'src/app/utilities/restaurant/restaurant.service';
import { SessionService } from 'src/app/utilities/session.service';
import { UserService } from 'src/app/utilities/user.service';


@Component({
  selector: 'app-user-reports',
  templateUrl: './user-reports.component.html',
  styleUrls: ['./user-reports.component.scss']
})

export class UserReportsComponent implements OnInit {
  public resName: Array<any> = [];
  public resRating: Array<any> = [];
  public resCName: Array<any> = [];
  public resOrderCount: Array<any> = [];
  constructor(private _restaurantService: RestaurantService) { }
  ngOnInit(): void {

    // this._userService.getUser().subscribe((data) => {

    //   if (!this._sessionService.checkSession() || data?.role != 'user') {
    //     this.router.navigateByUrl('/');
    //   }
    // })

    this._restaurantService.getTopRestaurants().subscribe(res => {
      res.forEach(element => {
        this.resName.push(element.restaurantName);
        this.resRating.push(element.rating_avg)
      });
      this.resRating.push(5)
    });
    this._restaurantService.getHighlyOrderedRes().subscribe(res => {
      res.forEach((element: any) => {
        this.resCName.push(element._id);
        this.resOrderCount.push(element.count)
      });
    });
  }


  public ratingChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{}], yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public ratingChartLabels: Label[] = this.resName;
  public ratingChartType: ChartType = 'line';
  public ratingChartLegend = true;
  public ratingChartData: ChartDataSets[] = [
    {
      backgroundColor: '',
      data: this.resRating, label: 'Restaurant'
    }
  ];

  public randomizeRating(): void {
    this.ratingChartType = this.ratingChartType === 'bar' ? 'line' : 'bar';
  }

  public orderChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{}], yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public orderChartLabels: Label[] = this.resCName;
  public orderChartType: ChartType = 'line';
  public orderChartLegend = true;
  public orderChartData: ChartDataSets[] = [
    {
      backgroundColor: '',
      data: this.resOrderCount, label: 'Restaurant'
    }
  ];

  public randomizeOrder(): void {
    this.orderChartType = this.orderChartType === 'bar' ? 'line' : 'bar';
  }

}
