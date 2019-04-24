import { UserExpertiseModel } from './user-expertise.model';

export class UserProfileModel {
    country: string;
    city: string;
    expertises: UserExpertiseModel[];
}