import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private onOff: boolean = false;

  private subject = new Subject<any>();

  sendMess(url: string) {
    if(url === '/dashboard'){
      this.onOff = true;
      this.subject.next(this.onOff)
    } else {
      this.onOff = false;
      this.subject.next(this.onOff)
    }
  }

  onGet():Observable<any> {
    return this.subject.asObservable();
  }

  constructor() { }
}
