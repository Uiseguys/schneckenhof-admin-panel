import { TestBed, inject } from '@angular/core/testing';

import { NetlifyWidgetService } from './netlify-widget.service';

describe('NetlifyWidgetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetlifyWidgetService]
    });
  });

  it('should be created', inject([NetlifyWidgetService], (service: NetlifyWidgetService) => {
    expect(service).toBeTruthy();
  }));
});
