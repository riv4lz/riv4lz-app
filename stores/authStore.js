import {makeAutoObservable, observable, action, runInAction} from "mobx";
import authService, {loginDto} from "../services/authService";
import axios from "axios";
import 'localstorage-polyfill';
import type {User} from "../dtos/userDTO";


export class AuthStore{
    constructor() {
        makeAutoObservable(this);
    }

    @observable user: User | undefined;
    @observable signedIn: boolean | false;

    @action
    attemptLogin= async (data: loginDto) => {
        const response = await authService.attemptLogin(data);
        runInAction(() => {
            this.user = response.data;
            if(this.user) {
                this.signedIn = true;
            }
            console.log(this.user);
        });
    }

    @action
    getCurrentUser = () => {
        authService.getCurrentUser().then((response: any) => {
            console.log("getCurrentuser" + response);
            this.user = response.data;
        })
    }

    @action
    logout = () => {
        this.user = '';
        this.signedIn = false;
    }

}
