import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map, BehaviorSubject, skip } from 'rxjs';
import { ApiResponse, Comic } from 'src/app/models/comic.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComicsApiService {
  private totalComicsResults = new BehaviorSubject<number>(0)
  private _BASE_URL = environment.apiBaseUrl
  private apiPublicKey = environment.apiKey
  private comics = new BehaviorSubject<Comic[] | undefined>(undefined);



  constructor(private httpClient: HttpClient) { }


  fetchComics(offset: Number) {
    this.httpClient.get<ApiResponse>
      (`${this._BASE_URL}/comics?orderBy=title&offset=${offset}&apikey=${this.apiPublicKey}`)
      .pipe(
        tap(data => this.totalComicsResults.next(data.data.total)),
        map((data) => {
          const comics = data.data.results;
          return comics.map(comic => ({
            ...comic,
            rare: false
          }));
        }),
        map(comics => this.applyRarity(comics))
      )
      .subscribe(comics => this.comics.next(comics)
      );
  }

  applyRarity(comics: Comic[]) {
    const numRareComics = Math.round(comics.length * 0.1);
    for (let i = 0; i < numRareComics; i++) {
      const randomIndex = Math.floor(Math.random() * comics.length);
      comics[randomIndex].rare = true;
    }
    return comics
  }

  getComics(): Observable<Comic[] | undefined> {
    return this.comics.asObservable()
  }

  getComicById(id: string) {
    return this.httpClient.get<ApiResponse>
      (`${this._BASE_URL}/comics/${id}?apikey=${this.apiPublicKey}`)
      .pipe(
        map((data) => data.data.results[0])
      )
  }

  getComicsByName(name: string, offset: number) {

    this.httpClient.get<ApiResponse>
      (`${this._BASE_URL}comics?titleStartsWith=${name}&orderBy=title&offset=${offset}&apikey=${this.apiPublicKey}`)
      .pipe(
        tap(data => this.totalComicsResults.next(data.data.total)),
        map((data) => data.data.results),
      ).subscribe(comics => this.comics.next(comics))

  }

  getTotalComicsResults(): Observable<number> {
    return this.totalComicsResults.asObservable()
  }

}
