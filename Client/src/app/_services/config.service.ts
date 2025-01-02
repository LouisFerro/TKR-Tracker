import { Injectable } from '@angular/core';
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public serverUrl: string = "https://127.0.0.1:3000";

  constructor(private messageService:MessageService) { }
  log(message: string) {
    this.messageService.add(`${message}`);
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message} result: ${result}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
