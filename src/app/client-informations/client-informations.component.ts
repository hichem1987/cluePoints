import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ClientAccountsServiceService} from '../client-accounts-service.service';
import {UIChart} from 'primeng/chart';

@Component({
  selector: 'app-client-informations',
  templateUrl: './client-informations.component.html',
  styleUrls: ['./client-informations.component.scss']
})
export class ClientInformationsComponent implements OnInit {
  @Input() client;
  @ViewChild('chart', {static: false}) chart: UIChart;
  @ViewChild('modal', {read: ElementRef, static: false}) modal: ElementRef;
  isReady: boolean;
  accountDetailModalOpen: boolean;
  totalRecords = 0;
  cols: any[];
  accountData = [];
  accountDataOriginal = [];
  chartDataBarAll = {datasets: []};
  data: any;
  blue = '#005b97';
  red = '#C44097';
  chartOptions: any = {
    title: {
      display: false,
    },
    legend: {
      position: 'bottom',
    },
    responsive: false,
    maintainAspectRatio: false,
  };
  barOptions: any = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            autoSkip: false
          }
        }
      ]
    },
    legend: {
      display: false,
    },
    responsive: false,
    maintainAspectRatio: false,
  };
  chartData: any = {
    labels: ['>= 0', '< 0'],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: []
      }
    ]
  };
  chartDataBar: any = {
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: []
      }
    ]
  };

  constructor(
    private renderer: Renderer2,
    private clientAccountsServiceSvc: ClientAccountsServiceService) {
  }

  ngOnInit() {
    this.clientAccountsServiceSvc.loadAccounts(this.client.id).subscribe((res) => {
      this.accountData = Object.assign(this.accountData, res);
      this.accountDataOriginal = JSON.parse(JSON.stringify(this.accountData));
      this.totalRecords = this.accountDataOriginal.length;
      const chart = {
        labels: [],
        datasets: [
          {
            borderColor: '#bbbab8',
            borderWidth: 1,
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: [],
          }
        ]
      };
      const bar = {
        labels: [],
        datasets: [
          {
            borderColor: '#bbbab8',
            borderWidth: 1,
            data: [],
            label: [],
            backgroundColor: [],
            hoverBackgroundColor: [],
          }
        ]
      };
      let MoreThanZero = 0;
      let LessThanZero = 0;
      if (this.accountData.length > 0) {
        this.accountData.forEach(current => {
          current.balance >= 0 ? MoreThanZero++ : LessThanZero++;
          bar.labels.push('Account N ' + current.number);
          bar.datasets[0].data.push(current.balance);
          bar.datasets[0].backgroundColor.push(
            this.getRandomColor()
          );
          bar.datasets[0].hoverBackgroundColor.push('#49494e');
        });
        this.chartDataBar = bar;
        chart.labels.push('>= 0', '< 0');
        chart.datasets[0].data.push(MoreThanZero, LessThanZero);
        chart.datasets[0].backgroundColor.push(
          this.red, this.blue
        );
        chart.datasets[0].hoverBackgroundColor.push('#49494e');
      }

      this.chartData = chart;
      this.chartDataBarAll = this.deepClone(this.chartDataBar);
      this.isReady = true;
    }, error => {
      console.log('error', error);
    });
    // modal table data
    this.cols = [
      {field: 'id', header: 'Account Id'},
      {field: 'number', header: 'Account Number'},
      {field: 'card_type', header: 'Type'},
      {field: 'balance', header: 'Balance'},
      {field: 'created', header: 'created'}
    ];
  }

  selectData(event) {
    this.filterBarsByBalance(event);
    setTimeout(() => {
      this.chart.refresh();
    }, 100);
  }

  filterBarsByBalance(filter) {
    const allData = JSON.parse(JSON.stringify(this.chartDataBarAll));
    switch (filter) {
      case '>= 0':
        for (let i = 0; i < allData.datasets[0].data.length; i++) {
          if (allData.datasets[0].data[i] < 0) {
            allData.datasets[0].data.splice(i, 1);
            allData.labels.splice(i, 1);
            i--;
          }
        }
        this.chartDataBar = allData;
        break;
      case '< 0':
        for (let i = 0; i < allData.datasets[0].data.length; i++) {
          if (allData.datasets[0].data[i] >= 0) {
            allData.datasets[0].data.splice(i, 1);
            allData.labels.splice(i, 1);
            i--;
          }
        }
        this.chartDataBar = allData;
        break;
    }
  }

  filterBarsByAccountType(filter) {
    const bar = {
      labels: [],
      datasets: [
        {
          borderColor: '#bbbab8',
          borderWidth: 1,
          data: [],
          label: [],
          backgroundColor: [],
          hoverBackgroundColor: [],
        }
      ]
    };

    const accountDataOriginal = JSON.parse(JSON.stringify(this.accountDataOriginal));
    if (accountDataOriginal.length > 0) {
      for (let i = 0; i < accountDataOriginal.length; i++) {
        if (filter === 'Master Card' &&
          (accountDataOriginal[i].card_type === 'MasterCard' || accountDataOriginal[i].card_type === 'Master Card')) {
          bar.labels.push('Account N ' + accountDataOriginal[i].number);
          bar.datasets[0].data.push(accountDataOriginal[i].balance);
          bar.datasets[0].backgroundColor.push(
            this.chartDataBarAll.datasets[0].backgroundColor[i]
          );
          bar.datasets[0].hoverBackgroundColor.push('#49494e');
          bar.datasets[0].data.push(accountDataOriginal[i].balance);
        } else {
          if (accountDataOriginal[i].card_type === filter) {
            bar.labels.push('Account N ' + accountDataOriginal[i].number);
            bar.datasets[0].data.push(accountDataOriginal[i].balance);
            bar.datasets[0].backgroundColor.push(
              this.chartDataBarAll.datasets[0].backgroundColor[i]
            );
            bar.datasets[0].hoverBackgroundColor.push('#49494e');
            bar.datasets[0].data.push(accountDataOriginal[i].balance);
          } else {
            continue;
          }
        }

      }
    }

    // }
    this.chartDataBar = bar;
    setTimeout(() => {
      this.chart.refresh();
    }, 100);
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  reset() {
    // get default data
    this.accountData = JSON.parse(JSON.stringify(this.accountDataOriginal));
    // reset radioboxes
    const elementRadio = document.getElementsByName('accountType-' + this.client.id) as any as HTMLInputElement[];
    elementRadio.forEach((element) => {
      element.checked = false;
    });
    // reset graphs
    const bar = {
      labels: [],
      datasets: [
        {
          borderColor: '#bbbab8',
          borderWidth: 1,
          data: [],
          label: [],
          backgroundColor: [],
          hoverBackgroundColor: [],
        }
      ]
    };
    if (this.accountData.length > 0) {
      this.accountData.forEach((current, key) => {
        bar.labels.push('Account N ' + current.number);
        bar.datasets[0].data.push(current.balance);
        bar.datasets[0].backgroundColor.push(
          this.chartDataBarAll.datasets[0].backgroundColor[key]
        );
        bar.datasets[0].hoverBackgroundColor.push('#49494e');
      });
      this.chartDataBar = bar;
    }

  }

  // modal open
  openModal() {
    this.accountDetailModalOpen = true;
    this.renderer.addClass(document.body, 'dark-overlay');
  }

  // modal close
  setClosedModal() {
    this.accountDetailModalOpen = false;
    this.renderer.removeClass(document.body, 'dark-overlay');
  }

  // function used for deep cloning with recursive
  deepClone(obj, hash = new WeakMap()) {
    // Do not try to clone primitives or functions
    let result;
    if (Object(obj) !== obj || obj instanceof Function) {
      return obj;
    }
    if (hash.has(obj)) {
      return hash.get(obj);
    } // Cyclic reference
    try { // Try to run constructor (without arguments, as we don't know them)
      result = new obj.constructor();
    } catch (e) { // Constructor failed, create object without running the constructor
      result = Object.create(Object.getPrototypeOf(obj));
    }
    // Optional: support for some standard constructors (extend as desired)
    if (obj instanceof Map) {
      Array.from(obj, ([key, val]) => result.set(this.deepClone(key, hash),
        this.deepClone(val, hash)));
    } else if (obj instanceof Set) {
      Array.from(obj, (key) => result.add(this.deepClone(key, hash)));
    }
    // Register in hash
    hash.set(obj, result);
    // Clone and assign enumerable own properties recursively
    return Object.assign(result, ...Object.keys(obj).map(
      key => ({[key]: this.deepClone(obj[key], hash)})));
  }
}
