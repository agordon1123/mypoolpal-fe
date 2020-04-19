import React, { createContext, useContext, useReducer } from 'react';

export const AppContext = createContext();

export function useAppState() {
    return useContext(AppContext);
}

const appStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'SET_POOLS':
            return {
                ...state,
                pools: action.payload
            }
        case 'SET_READINGS':
            return {
                ...state,
                readings: action.payload
            }
        default:
            return state;
    }
}

const initialState = {
    user: {},
    pools: [],
    readings: []
}

export const AppStateProvider = ({ children }) => {
    const appState = useReducer(appStateReducer, initialState);

    return (
        <AppContext.Provider value={appState}>{children}</AppContext.Provider>
    )
}