import ChatStore from "./chatStore";

import React, {createContext, useContext} from "react";
import {AuthStore} from "./authStore";
import {UserStore} from "./userStore";


type Store = {
    commentStore: ChatStore;
    authStore: AuthStore;
    userStore: UserStore;
}

export const store: Store = {
    commentStore: new ChatStore(),
    authStore: new AuthStore(),
    userStore: new UserStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}

