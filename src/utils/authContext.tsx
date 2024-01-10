import { ReactNode, useContext, createContext, useState } from 'react';
export const INITIAL_USER = {
    id: -1,
    firstName: '',
    lastName: '',
    email: '',
    isAdmin: false,
    phone: '',
    username: '',
};
export type IContextType = {
    user: IUser;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logIn: (values: any) => void;
    logOut: () => void;
    getUser: () => IUser | undefined;
};
export type IUser = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    isAdmin: boolean;
    phone: string;
};

export const AuthContext = createContext<IContextType>({
    user: {
        id: -1,
        firstName: '',
        lastName: '',
        email: '',
        isAdmin: false,
        phone: '',
        username: '',
    },
    isLoading: false,
    setUser: () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    logIn: () => {},
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
        if (values.accessToken) localStorage.setItem('userToken', values.accessToken);
        localStorage.setItem('user', JSON.stringify(values.user));
        const userdata = values.user;
        window.document.getElementById('close_dialog')?.click();
        setUser(userdata);
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
