import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable,of } from 'rxjs';
import { delay, retry } from 'rxjs/operators';
import { map,catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    // return of(PROMOTIONS).pipe(delay(2000)).toPromise();
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/'+ id).pipe(catchError(this.processHTTPMsgService.handleError));
    // return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000)).toPromise();
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError)); 
    // of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000)).toPromise();
  }
  
}