import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADER } from '../shared/leaders';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
    getLeaders(): Promise<Leader[]> {
      return of(LEADER).pipe(delay(2000)).toPromise();
    }
  
    getLeader(id: string): Promise<Leader> {
      return of(LEADER.filter((leader) => (leader.id === id))[0]).pipe(delay(2000)).toPromise();
    }
  
    getFeaturedLeader(): Promise<Leader> {
      return of(LEADER.filter((leader) => leader.featured)[0]).pipe(delay(2000)).toPromise();
    }
    
  
}
