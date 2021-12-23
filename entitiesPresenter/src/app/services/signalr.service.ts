import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MapPoint } from '../models/mapPoint';
@Injectable({
    providedIn: 'root'
})
export class SignalrService {

    constructor() {
         
    }

    private hubConnection: HubConnection | undefined
    private _mapPoint = new ReplaySubject<MapPoint>();
    public mapPoint = this._mapPoint.asObservable();

    public connect = () => {
        this.startConnection();
        this.addListeners();
    }

    private getConnection(): HubConnection {
        return new HubConnectionBuilder()
            .withUrl(environment.connectionUrl)
            .withAutomaticReconnect()
            .build();
    }

    private startConnection() {
        this.hubConnection = this.getConnection();

        this.hubConnection.start()
            .then(() => console.log('connection started'))
            .catch((err) => console.log('error while establishing signalr connection: ' + err))
    }

    private addListeners() {
        this.hubConnection?.on("MessageReceived", (data: MapPoint) => {
            console.log(data)
            this._mapPoint.next(data);
        })
    }
}