import { ReactNode, createContext, useContext, useReducer } from "react";

//DEFINICIONES INICIALES (tipos)

//Definicion de tipo para el estado del contexto
interface AuthState{
    isAuthenticated: boolean,
    role: string | null;
}

//Acciones disponibles para el reducer
type AuthAction = 
    | {type: 'LOGIN'; payload: {role:string}}
    | {type: `LOGOUT`};

//Contexto de autenticación con estado inicial y funciones
interface AuthContextType{
    state: AuthState,
    login: (role: string) => void,
    logout: () => void;
}

//CONTEXT

//Crear nuevo contexto de autenticación 
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//Estado inicial del contexto
const initialState: AuthState = {
    isAuthenticated: false,
    role: null
};

//Reducer para hacer cambios en el contexto
//Funcion que especifica cómo cambia el estado del contexto en base a acciones
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type){
        case 'LOGIN':
            console.log("Logueado como ", action.payload.role);
            return{
                isAuthenticated: true,
                role: action.payload.role
            };
        case 'LOGOUT':
            console.log("No logueado");
            return{
                isAuthenticated: false,
                role: null
            }
        default:
            return state;
    }
}

//Proveedor del contexto que envuelve la aplicación
interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (role: string) => {
        dispatch({type: 'LOGIN', payload: {role}});
    };

    const logout = () => {
        dispatch({type: 'LOGOUT'});
    }

    const contextValue: AuthContextType = {state, login, logout};

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

//HOOK

const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context){
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};

export{ AuthProvider, useAuth };