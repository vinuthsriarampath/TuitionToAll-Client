/*
 * Copyright (c) 2025 vinuth sri arampath
 *
 * This code is the intellectual property of vinuth sri arampath and is protected under copyright law.
 * Unauthorized copying, modification, distribution, or use of this code, in whole or in part,
 * without prior written permission is strictly prohibited.
 *
 * Portions of this code may be generated with AI and modified by vinuth sri arampath
 * All rights reserved.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderDevelopmentPageComponent } from './under-development-page.component';

describe('UnderDevelopmentPageComponent', () => {
  let component: UnderDevelopmentPageComponent;
  let fixture: ComponentFixture<UnderDevelopmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderDevelopmentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnderDevelopmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
