import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { HomeHeaderComponent } from './home-header.component';

describe('HomeHeaderComponent', () => {
    let component: HomeHeaderComponent;
    let fixture: ComponentFixture<HomeHeaderComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HomeHeaderComponent],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        });
        fixture = TestBed.createComponent(HomeHeaderComponent);
        component = fixture.componentInstance;
    });

    it('should have title', () => {
        const headerElement: HTMLElement = fixture.nativeElement;

        expect(headerElement.textContent).toContain('WatBott');
    });
});
