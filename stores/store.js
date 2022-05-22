import CommentStore from "./commentStore";

import React, {createContext, useContext} from "react";
import {AuthStore} from "./authStore";
import {CasterStore} from "./casterStore";


type Store = {
    commentStore: CommentStore;
    authStore: AuthStore;
    casterStore: CasterStore;
}

export const store: Store = {
    commentStore: new CommentStore(),
    authStore: new AuthStore(),
    casterStore: new CasterStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}

