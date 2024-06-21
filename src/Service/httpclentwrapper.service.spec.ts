import { TestBed } from '@angular/core/testing';

import { HttpclentwrapperService } from './httpclentwrapper.service';

describe('HttpclentwrapperService', () => {
  let service: HttpclentwrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpclentwrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
