/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ZenithWebSiteService } from './zenith-web-site.service';

describe('Service: ZenithWebSite', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZenithWebSiteService]
    });
  });

  it('should ...', inject([ZenithWebSiteService], (service: ZenithWebSiteService) => {
    expect(service).toBeTruthy();
  }));
});
