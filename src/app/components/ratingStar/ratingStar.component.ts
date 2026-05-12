import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Profile } from '../../models/profile.model';
import { NgFor } from '@angular/common';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-ratingStar',
    imports: [NgFor],
    templateUrl: './ratingStar.component.html',
    styleUrls: ['./ratingStar.component.scss']
})
export class RatingStarComponent {
    @Input() profile!: Profile;
    @Input() client!: string;
    @Output() ratingChanged: EventEmitter<number> = new EventEmitter<number>();
    user!: any;
    private profileService = inject(ProfileService);
    private authService = inject(AuthService);

    rating: number = 0;
    hoverRating: number = 0;
    client_id!: string;
    user_id!: string;

    constructor(
    ) {
        this.user = this.authService.getLocalStorage();

    }

    ngOnInit() {
        this.client_id = this.profile.usuario?.uid || '';
        this.user_id = this.profile.usuario?.uid || '';
        if (this.profile && this.profile.rating) {
            this.rating = this.profile.rating;
        }
    }

    onMouseEnter(star: number) {
        this.hoverRating = star;
    }

    onMouseLeave() {
        this.hoverRating = 0;
    }

    onClick(star: number) {
        this.rating = star;
        this.ratingChanged.emit(this.rating);

        const formData = new FormData();
        formData.append('user_id', this.user.uid + '');
        formData.append('client_id', this.client_id + '');
        formData.append('rating', this.rating + '');

        this.profileService.updateProfileRating(formData).subscribe(
            response => {
                console.log('Rating updated successfully:', response);
            },
            error => {
                console.error('Error updating rating:', error);
            }
        );


    }
}
