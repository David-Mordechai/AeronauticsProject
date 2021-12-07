import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MapPoint } from 'src/app/models/mapPoint';
import { SignalrService } from 'src/app/services/signalr.service';
import { MapPointCreatorService } from 'src/app/services/mapPointCreator.service'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @ViewChild('mapDiv') mapDiv: ElementRef | undefined;
  form: any;

  constructor(
    private renderer: Renderer2, 
    private signalrService: SignalrService, 
    private mapPointCreatorService: MapPointCreatorService) {

  }

  ngOnInit() {
    this.signalrService.connect();
    this.signalrService.mapPoint.subscribe((mapPoint) => {this.showPointOnTheMap(mapPoint)})
  }

  showPointOnTheMap(mapPoint: MapPoint) {
    const mapPointElement = this.mapPointCreatorService.buildMapPoint(mapPoint, this.renderer);
    this.renderer.appendChild(this.mapDiv?.nativeElement, mapPointElement);
  }
}
