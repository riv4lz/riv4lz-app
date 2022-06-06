import ChatStore from "./chatStore";

import React, {createContext, useContext} from "react";
import {AuthStore} from "./authStore";
import {CasterStore} from "./casterStore";


type Store = {
    commentStore: ChatStore;
    authStore: AuthStore;
    casterStore: CasterStore;
}

export const store: Store = {
    commentStore: new ChatStore(),
    authStore: new AuthStore(),
    casterStore: new CasterStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}

