import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaprofileComponent } from './fichaprofile.component';

describe('FichaprofileComponent', () => {
    let component: FichaprofileComponent;
    let fixture: ComponentFixture<FichaprofileComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ FichaprofileComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FichaprofileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});