import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADER } from '../shared/leaders';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { map,catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
    getLeaders(): Observable<Leader[]> {
      return this.http.get<Leader[]>(baseURL +'leadership').pipe(catchError(this.processHTTPMsgService.handleError));
      // return of(LEADER).pipe(delay(2000)).toPromise();
    }
  
    getLeader(id: string): Observable<Leader> {
      return this.http.get<Leader>(baseURL +'leadership/'+id).pipe(catchError(this.processHTTPMsgService.handleError));
      // return of(LEADER.filter((leader) => (leader.id === id))[0]).pipe(delay(2000)).toPromise();
    }
  
    getFeaturedLeader(): Observable<Leader> {
      return this.http.get<Leader>(baseURL +'leadership?featured=true').pipe(map(leaders=>leaders[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
      // return of(LEADER.filter((leader) => leader.featured)[0]).pipe(delay(2000)).toPromise();
    }
    
  
}
