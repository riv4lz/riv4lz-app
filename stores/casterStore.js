import { makeAutoObservable, observable, action } from "mobx";
import casterService from "../services/casterService";

export interface Caster {
    id: string,
    name: string,
    description: string,
    profileImage: string | null,
    bannerImage: string | null,
    facebookURL: string,
    twitterURL: string,
    discordURL: string,
    twitchURL: string
}

export interface ImageUpload {
    userId: string,
    imageUrl: string,
    imageType: number,
}

export class CasterStore {
    @observable casters: Caster[] = [];
    @observable caster: Caster | undefined;

    @action
    loadCaster = async (id: any) => {
        const response = await casterService.get(id);
        this.caster = response.data;
        console.log(this.caster);
    }

    @action
    postImage = async (image: ImageUpload) => {
        await casterService.uploadImage(image).then(console.log("IMAGE UPLOADED")).catch((error) => console.log( error.response.request._response ) );
    }

    constructor() {
        makeAutoObservable(this);
    }
}
