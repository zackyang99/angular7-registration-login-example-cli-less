import { UserProfileComponent } from './user-profile/user-profile.component';
import { NgModule} from '@angular/core';
import { SharedModule } from '@app/shared.module';
import { CardComponent } from './card.component';
import { UserProfileService } from './user-profile/user-profile.service';

@NgModule({
    imports: [SharedModule],
    declarations: [
        UserProfileComponent,
        CardComponent
    ],
    exports: [
        UserProfileComponent,
        CardComponent
    ],
    providers: [
        UserProfileService
    ]
})
export class FeaturesModule{}