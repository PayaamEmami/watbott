import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FooterComponent],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        });
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
    });

    it('should have license text', () => {
        const footerElement: HTMLElement = fixture.nativeElement;

        expect(footerElement.textContent).toContain('Licensed under MIT License');
    });
});
