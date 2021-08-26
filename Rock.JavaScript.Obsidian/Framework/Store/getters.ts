import { IEntity, Group, Person } from "@Obsidian/ViewModels";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
    isAuthenticated(state: State): boolean;

    contextEntity(state: State): (type: string) => IEntity | null;

    personContext(state: State): Person | null;

    groupContext(state: State): Group | null;

    pageParameter(state: State): (key: string) => unknown;
};

type InternalGetters = {
    [K in keyof Getters]: ReturnType<Getters[K]>
};

export const getters: GetterTree<State, State> = {
    isAuthenticated(state: State) {
        return !!state.currentPerson;
    },

    contextEntity(state: State): (type: string) => IEntity | null {
        return (type: string) => (state.contextEntities[type] || null);
    },

    personContext(state: State, getters: InternalGetters): Person | null {
        return <Person | null><unknown>getters.contextEntity("person");
    },

    groupContext(state: State, getters: InternalGetters): Group | null {
        return <Group | null><unknown>getters.contextEntity("group");
    },

    pageParameter(state: State): (key: string) => unknown {
        return (key: string) => (state.pageParameters[key]);
    }
};
