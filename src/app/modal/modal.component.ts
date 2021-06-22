import {Component, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnDestroy {


  private down: any;

  @Input() draggable = true;
  @Input() resizable = true;
  @Input() backdrop = false;
  @Input() visible = true;
  @Input() global = true;
  @Input() width: any;
  @Input() closeKey = 115;
  @Input() closeOnEscape = true;
  @Input() height: number;
  @Input() positionTop = 100;
  @Input() positionLeft: number;
  @Input() contentStyle: any;
  @Input() appendTo: any = 'body';
  @Input() modalName: string;
  @Input() minWidth = 150;

  @Output() onHide: EventEmitter<any> = new EventEmitter();


  constructor(private el: ElementRef,
              private renderer: Renderer2) {
  }

  keydown(event) {
    if (event.keyCode === this.closeKey) {
      this.onClose();
    }
  }

  onClose() {
    this.onHide.emit(true);
  }

  ngOnDestroy() {
    if (this.down) {
      this.down.unsubscribe ? this.down.unsubscribe() : this.down();
    }
  }
}
