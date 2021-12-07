import { Injectable, Renderer2 } from '@angular/core';
import { MapPoint } from '../models/mapPoint';

@Injectable({
    providedIn: 'root'
})
export class MapPointCreatorService {

    public buildMapPoint(mapPoint: MapPoint, renderer: Renderer2): HTMLDivElement {
        const [divPointWrapper, divPoint, pointLabel] = this.createHtmlElementsForNewMapPoint(renderer);
        this.setNewMapPointPositionXY(mapPoint, renderer, divPointWrapper);
        this.setNewMapPointLabel(mapPoint.name, pointLabel);
        this.buildMapPointElement(renderer, divPointWrapper, divPoint, pointLabel)
        return divPointWrapper;
    }
    
    private createHtmlElementsForNewMapPoint(renderer : Renderer2):[HTMLDivElement,HTMLDivElement,HTMLLabelElement]{
        const divPointWrapper: HTMLDivElement = renderer.createElement('div');
        const divPoint: HTMLDivElement = renderer.createElement('div');
        renderer.addClass(divPoint, 'circle');
        const pointLabel: HTMLLabelElement = renderer.createElement('label');
        return [divPointWrapper, divPoint, pointLabel];
    }

    private setNewMapPointPositionXY(mapPoint: MapPoint, renderer: Renderer2, divPointWrapper: HTMLDivElement){
        renderer.setStyle(divPointWrapper, 'left', mapPoint.x + 'px');
        renderer.setStyle(divPointWrapper, 'top', mapPoint.y + 'px');
        renderer.setStyle(divPointWrapper, 'position', 'absolute');
    }

    private setNewMapPointLabel(label: string, pointLable : HTMLLabelElement){
        pointLable.innerText = label;
    }

    private buildMapPointElement(renderer: Renderer2, divPointWrapper: HTMLDivElement, divPoint: HTMLDivElement, pointLabel: HTMLLabelElement) {
        renderer.appendChild(divPointWrapper, divPoint);
        renderer.appendChild(divPointWrapper, pointLabel);
    }
}