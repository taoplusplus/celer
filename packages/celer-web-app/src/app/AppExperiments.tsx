import axios from "axios";
import queryString from "query-string";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppExperimentsContext } from "core/context";
import { EmptyObject, MapOf } from "data/util";

const CONFIG_URL = "https://celer.itntpiston.app/experiments.json";

export const AppExperimentsProvider: React.FC<EmptyObject> = ({children}) => {
	const [liveExpError, setLiveExpError] = useState(false);
	const [liveExperiments, setLiveExperiments] = useState<MapOf<boolean>|null>(null);
	const [overrides, setOverrides] = useState<MapOf<boolean>|null>(null);
	const {search} = useLocation();
	const mountedRef = useRef(true);
	useEffect(()=>{
		const loadLiveExperiments = async () => {
			try{
				const { data } = await axios.get(CONFIG_URL);
				if(mountedRef.current){
					setLiveExperiments(data);
					console.log("Live experiments loaded"); // eslint-disable-line no-console
				}else{
					console.warn("Component unmounted before experiments were loaded"); // eslint-disable-line no-console
				}
			}catch(e){
				console.error(e);
				console.error("Fail to load live experiments. Will use app defaults.");
				setLiveExpError(true);
			}
		};
		loadLiveExperiments();
		return ()=>{
			mountedRef.current = false;
		};
	}, []);
	useEffect(()=>{
		const parsedQueryString = queryString.parse(search);
		const overrides: MapOf<boolean> = {};
		for(const key in parsedQueryString){
			if (key.startsWith("Exp.")){
				const experiment = key.substring(4);
				overrides[experiment] = parsedQueryString[key] !== "false";
				console.log(`Using override ${experiment} = ${overrides[experiment]}`); // eslint-disable-line no-console
			}
		}
		setOverrides(overrides);
	}, [search]);

	const ready = overrides !== null && (liveExpError || liveExperiments !== null);

	const isExperimentEnabled = useCallback((name: string, defaultValue: boolean)=>{
		if(!ready){
			throw new Error("Cannot useAppExperiment before experiments are loaded");
		}
		if(name in overrides){
			return overrides[name] === true;
		}
		if(!liveExperiments){
			return defaultValue;
		}
		if(name in liveExperiments){
			return liveExperiments[name] === true;
		}
		return defaultValue;
	}, [liveExperiments, overrides, ready, liveExpError]);

	if(!ready){
		return <div>Loading Experiments...</div>; // temporary
	}
	return (
		<AppExperimentsContext.Provider value={isExperimentEnabled}>
			{children}
		</AppExperimentsContext.Provider>
	);
};
