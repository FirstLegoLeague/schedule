import {Injectable} from '@angular/core';
import {RequestService} from './request.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  constructor(private request: RequestService) {
  }

  parseTeams(data: string) : Observable<any>{
    return this.request.get('/team/batch?delimiter=,&teamsData=' + data)
  }

  parseTeams(data: string) : Observable<any>{
    return this.request.get('/tournamentData?delimiter=,&tourData=' + data)
  }

}