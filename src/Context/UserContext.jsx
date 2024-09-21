import {createContext, useEffect, useState} from "react";

export let UserContext = createContext();

export default function UserContextProvider(props){
		// console.log(props.children);
		// console.log(props.children.props.router);
		
		const [userLogin, setuserLogin] = useState(null);
		useEffect(()=>{
			if(localStorage.getItem("userToken")){
				setuserLogin(localStorage.getItem("userToken"))
				}
		},[])

	return <>
		<UserContext.Provider value={{userLogin , setuserLogin}}>
			{props.children}
		</UserContext.Provider>

	</>
}
