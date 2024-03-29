import {makeAutoObservable, observable, action, runInAction} from "mobx";
import authService, {loginDto} from "../services/authService";
import axios from "axios";
import 'localstorage-polyfill';
import type {User} from "../interfaces/userInterface";


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
        });
    }

    @action
    getCurrentUser = () => {
        authService.getCurrentUser().then((response: any) => {
            this.user = response.data;
        })
    }

    @action
    logout = () => {
        this.user = '';
        this.signedIn = false;
    }

}
