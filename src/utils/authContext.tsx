import { ReactNode, useContext, createContext, useState, useEffect, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
export const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
};
export type IContextType = {
    user: IUser;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    logIn: (values: any) => void;
    logOut: () => void;
    getUser: () => IUser | undefined;
};
export type IUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
};

export const AuthContext = createContext<IContextType>({
    user: {
        id: '',
        name: '',
        username: '',
        email: '',
        imageUrl: '',
    },
    isLoading: false,
    setUser: function (value: SetStateAction<IUser>): void {
        throw new Error('Function not implemented.');
    },
    isAuthenticated: false,
    setIsAuthenticated: function (value: SetStateAction<boolean>): void {
        throw new Error('Function not implemented.');
    },
    logIn: function (values: any): void {
        throw new Error('Function not implemented.');
    },
    logOut: function (): void {
        throw new Error('Function not implemented.');
    },
    getUser: function (): IUser | undefined {
        throw new Error('Function not implemented.');
    },
});
const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const logIn = (values: any) => {
        console.log('call ddd');
        if (values.userToken) localStorage.setItem('userToken', values.userToken);
        localStorage.setItem('user', JSON.stringify(values));
        setUser(values);
        setIsAuthenticated(true);
    };
    const getUser = () => {
        const user = localStorage.getItem('user');
        if (user) {
            return JSON.parse(user);
        }
        return undefined;
    };

    const logOut = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        window.location.reload();
    };

    const navigate = useNavigate();
    useEffect(() => {
        if (getUser() == undefined) {
            navigate('/sign-in');
        }
    }, []);

    const value = {
        user,
        setUser,
        isLoading,
        setIsLoading,
        isAuthenticated,
        setIsAuthenticated,
        getUser,
        logOut,
        logIn,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);
