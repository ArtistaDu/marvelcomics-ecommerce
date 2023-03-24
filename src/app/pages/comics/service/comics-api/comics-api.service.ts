import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map, BehaviorSubject } from 'rxjs';
import { ApiResponse, Comic } from 'src/app/models/comic.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ComicsApiService {
  private totalComicsResults = new BehaviorSubject<number>(0)
  private _BASE_URL = environment.apiBaseUrl
  private apiPublicKey = environment.apiKey


constructor(private httpClient: HttpClient) { }


getComics(offset: Number): Observable<Comic[]> {
  return this.httpClient.get<ApiResponse>
    (`${this._BASE_URL}/comics?orderBy=title&offset=${offset}&apikey=${this.apiPublicKey}`)
    .pipe(
      tap(data => this.totalComicsResults.next(data.data.total)),
      map((data) => data.data.results)
    )
}

getComicById(id: string) {
  return this.httpClient.get<ApiResponse>
  (`${this._BASE_URL}/comics/${id}?apikey=${this.apiPublicKey}`)
  .pipe(
    map((data) => data.data.results[0])
  )
}

getComicsByName(name: string, offset: number) {

  return this.httpClient.get<ApiResponse>
    (`${this._BASE_URL}comics?titleStartsWith=${name}&orderBy=title&offset=${offset}&apikey=${this.apiPublicKey}`)
    .pipe(
      tap(data => this.totalComicsResults.next(data.data.total)),
      map((data) => data.data.results),
    )

}

getTotalComicsResults(): Observable<number> {
  return this.totalComicsResults.asObservable()
}
}
