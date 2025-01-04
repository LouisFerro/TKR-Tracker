import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TrackerService } from './tracker.service';
import {TrackerComponent} from '../components/tracker/tracker.component';

describe('TrackerService', () => {
  let service: TrackerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule,TrackerComponent]
    }).compileComponents();

    service = TestBed.inject(TrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
