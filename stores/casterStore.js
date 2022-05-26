import {makeAutoObservable, observable, action, runInAction} from "mobx";
import casterService from "../services/casterService";
import type {ImageUpload} from "../dtos/imageUpload";

export interface Caster {
    id: string,
    name: string,
    description: string,
    profileImageUrl: string | null,
    bannerImageUrl: string | null,
    facebookUrl: string,
    twitterUrl: string,
    discordUrl: string,
    twitchUrl: string
}

export class CasterStore {
    @observable casters: Caster[] = [];
    @observable caster: Caster | undefined;

    @action
    loadCaster = async (id: any) => {
        const response = await casterService.get(id);
        runInAction(() => {
            this.caster = response.data;
        });
    }

    @action
    postImage = async (image: ImageUpload) => {
        await casterService.uploadImage(image).then().catch((error) => console.log( error.response.request._response ) );
    }

    constructor() {
        makeAutoObservable(this);
    }
}
