import { TestBed } from '@angular/core/testing';

import { NgxDhis2CustomFormsEntryService } from './ngx-dhis2-custom-forms-entry.service';

describe('NgxDhis2CustomFormsEntryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxDhis2CustomFormsEntryService = TestBed.get(NgxDhis2CustomFormsEntryService);
    expect(service).toBeTruthy();
  });
});
