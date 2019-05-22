import { NgModule } from '@angular/core';
import { FeaturesModule } from '@app/features/features.module';

@NgModule({
    imports: [
        FeaturesModule
    ],
    exports: [FeaturesModule]
})
export class HomeModule {}