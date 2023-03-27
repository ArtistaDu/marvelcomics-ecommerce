import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComicsApiService } from './comics-api.service';
import { ApiResponse, Comic } from 'src/app/models/comic.model';

describe('ComicsApiService', () => {
  let service: ComicsApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ComicsApiService]
    });
    service = TestBed.inject(ComicsApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchComics', () => {
    it('should fetch comics and set the total comics results', () => {
      const mockApiResponse: ApiResponse = {
        code: 200,
        status: 'Ok',
        data: {
          offset: 0,
          limit: 20,
          total: 100,
          count: 20,
          results: [{
            title: 'Mock Comic',
            id: '123',
            description: 'Mock description',
            prices: [{
              type: 'printPrice',
              price: '1.99'
            }],
            thumbnail: {
              path: 'mock-path',
              extension: 'mock-ext'
            },
            creators: {
              items: [{
                name: 'Mock Creator',
                role: 'writer'
              }]
            },
            urls: [{
              type: 'detail',
              url: 'mock-url'
            }],
            dates: [{
              type: 'onsaleDate',
              date: '2023-03-27T00:00:00-0400'
            }],
            rare: false
          }]
        }
      };
      service.fetchComics(0);
      const req = httpMock.expectOne(`${service['_BASE_URL']}/comics?orderBy=title&offset=0&apikey=${service['apiPublicKey']}`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockApiResponse);
      expect(service['totalComicsResults'].value).toEqual(100);
      expect(service['comics'].value).toEqual(mockApiResponse.data.results);
    });
  });

  it('should mark 10% of comics as rare', () => {
    const mockComics: Comic[] = [];
    for (let i = 0; i <= 100; i++) {
      mockComics.push({
        title: `Mock Comic ${i}`,
        id: i.toString(),
        description: `Mock description ${i}`,
        prices: [{
          type: 'printPrice',
          price: '1.99'
        }],
        thumbnail: {
          path: 'mock-path',
          extension: 'mock-ext'
        },
        creators: {
          items: [{
            name: 'Mock Creator',
            role: 'writer'
          }]
        },
        urls: [{
          type: 'detail',
          url: 'mock-url'
        }],
        dates: [{
          type: 'onsaleDate',
          date: '2023-03-27T00:00:00-0400'
        }],
        rare: false
      });
    }
    const comicsWithRarity = service.applyRarity(mockComics);
    const rareComics = comicsWithRarity.filter(c => c.rare);
    const numRareComics = Math.round(mockComics.length * 0.1);
    expect(rareComics.length).toEqual(numRareComics);
  });

})
