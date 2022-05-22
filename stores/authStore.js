import {makeAutoObservable, observable, action} from "mobx";
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
    attemptLogin = async (data: loginDto) => {
        console.log(data);
        await axios.post("http://10.0.2.2:5000/api/Auth/Login", data).then(function (response) {
            console.log("AXOIS DIRECT RESPONSE " + response.status);
            console.log("AXOIS DIRECT RESPONSE " + response.data.email);
            this.user = response.data;
            localStorage.setItem("token", this.user.token);
            console.log("attemptLogin " + this.user.token);
        });
        console.log("user within fucntion = " + this.user);
    }

    @action
    attemptLogin2 = async (data: loginDto) => {
        const response = await authService.attemptLogin(data);
        this.user = response.data;
        if(this.user) {
            this.signedIn = true;
        }
        console.log(this.user);
    }

    @action
    attemptLogin3 = async (data: loginDto) => {
        const response = await axios.post("http://10.0.2.2:5000/api/Auth/Login", data);
        this.user = response.data;
        console.log(this.user);
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
