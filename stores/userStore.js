import { makeAutoObservable, observable, action } from "mobx";
import userService from "../services/userService";
import type { User }  from "../interfaces/userInterface";

export class UserStore {
    @observable orgs: User[] = [];
    @observable casters: User[] = [];
    @observable user: User = {
        id: '',
        name: '',
        userType: 0,
        description: '',
        profileImageUrl: '',
        bannerImageUrl: '',
        facebookUrl: '',
        twitterUrl: '',
        discordUrl: '',
        twitchUrl: '',
        websiteUrl: ''
    };


    @action
    loadUsers = (userType: number) => {
        userService.getAll(userType).then((response: any) => {
            if (userType === 1) {
                this.orgs = response.data;
            } else {
                this.casters = response.data;
            }
        })
    }

    @action
    loadUser = async (id: string) => {
        const response = await userService.get(id)
        this.user = response.data;
        console.log(this.user);
        return this.user;
    }

    @action
    setUser = (user: User) => {
        this.user = user;
    }

    @action
    createUserProfile = async (user: User) => {
        const response = await userService.create(user)
        this.user = response.data;
    }

    @action
    updateUserProfile = (user: User) => {
        userService.update(user).then(r => console.log(r));
    }

    constructor() {
        makeAutoObservable(this);
    }
}
