import { createContext, useReducer, FC, ReactElement } from 'react'

export interface SnapshotProviderArgs {
    snapshot?: mapboxgl.MapboxGeoJSONFeature,
    setSnapshot?: (snapshot: mapboxgl.MapboxGeoJSONFeature) => void;
    panel: boolean;
    togglePanel?: (state: boolean) => void;
}

export const SnapshotContext = createContext<SnapshotProviderArgs>({ panel: false });

export const SnapshotProvider: FC = ({ children }): ReactElement => {
    const [state, dispatch] = useReducer(snapshotReducer, { panel: false });

    const setSnapshot = (snapshot: mapboxgl.MapboxGeoJSONFeature): void => {
        dispatch({
            type: 'SET_SNAPSHOT',
            payload: snapshot
        });
    }

    return (
        <SnapshotContext.Provider value={{ ...state, setSnapshot }}>
            {children}
        </SnapshotContext.Provider>
    )
}

export interface SnapshotReducerArgs {
    type: 'SET_SNAPSHOT' | 'TOGGLE_PANEL',
    payload: mapboxgl.MapboxGeoJSONFeature | boolean;
}

const snapshotReducer = (state: SnapshotProviderArgs, { type, payload }: SnapshotReducerArgs): SnapshotProviderArgs => {
    switch (type) {
        case 'SET_SNAPSHOT':
            return { ...state, snapshot: (payload as mapboxgl.MapboxGeoJSONFeature) };
        case 'TOGGLE_PANEL':
            return { ...state, panel: (payload as boolean) };
    }
}