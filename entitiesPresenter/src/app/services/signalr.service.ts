import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { ReplaySubject } from 'rxjs';
import { MapPoint } from '../models/mapPoint';
@Injectable({
    providedIn: 'root'
})
export class SignalrService {

    private connectionUrl = '/mapPointHub';
    private hubConnection: HubConnection | undefined
    private _mapPoint = new ReplaySubject<MapPoint>();
    public mapPoint = this._mapPoint.asObservable();

    constructor() { }

    public connect = () => {
        this.startConnection();
        this.addListeners();
    }

    private getConnection(): HubConnection {
        return new HubConnectionBuilder()
            .withUrl(this.connectionUrl)
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