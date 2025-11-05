import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class NavbarServiceService {
  private navActionSource = new Subject<void>();
  navAction$ = this.navActionSource.asObservable();

  private navlinkActionSource = new Subject<void>();
  navlinkAction$ = this.navlinkActionSource.asObservable();

  private currentTypeSource = new Subject<string>();
  currentType$ = this.currentTypeSource.asObservable();

  triggerNavAction() {
    this.navActionSource.next();
  }

  triggerNavlinkAction() {
    this.navlinkActionSource.next();
  }

  triggerCurrentType(val : string){
    this.currentTypeSource.next(val);
  }
}
