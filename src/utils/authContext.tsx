import { ReactNode, useContext, createContext, useState } from 'react';
export const INITIAL_USER = {
    id: -1,
    username: '',
    email: '',
    isAdmin: false,
    fullName: '',
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
    fullName: string;
    username: string;
    email: string;
    isAdmin: boolean;
};

export const AuthContext = createContext<IContextType>({
    user: {
        id: -1,
        fullName: '',
        username: '',
        email: '',
        isAdmin: false,
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
        console.log('hihiihi');
        console.log(values);
        if (values.accessToken) localStorage.setItem('userToken', values.accessToken);
        localStorage.setItem('user', JSON.stringify(values.user));
        const userdata = {
            id: values.user.id,
            isAdmin: values.user.isAdmin,
            fullName: values.user.lastName + ' ' + values.user.firstName,
            username: values.user.username,
            email: '',
        };
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
