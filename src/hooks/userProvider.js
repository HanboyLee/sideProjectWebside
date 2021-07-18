import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
    const [role, setRole] = React.useState(null);
    const [userId, setUserId] = React.useState(null);
    const [userType, setUserType] = React.useState(null);
    const [account, setAccount] = React.useState(null);
    const [temptype, setTempType] = React.useState(null);
    const [auth, setAuth] = React.useState('loading');

    React.useEffect(() => {
        try {
            if (role) {
                const type = (() => {
                    if (role === 'developer' || role === 'super' || role === 'admin' || role === 'member') {
                        return role;
                    }

                    return 'nonmember';
                })();

                setUserType(type?.toLowerCase());
                setTempType(type?.toLowerCase());
            }
        } catch (error) {
            console.log(error);
        }
    }, [role]);

    // create userType compare
    return (
        <UserContext.Provider
            value={{
                role,
                setRole,
                userId,
                setUserId,
                auth,
                setAuth,
                userType,
                setUserType,
                temptype,
                setTempType,
                account,
                setAccount,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserId = () => [React.useContext(UserContext).userId, React.useContext(UserContext).setUserId];

export const useUserRole = () => [React.useContext(UserContext).role, React.useContext(UserContext).setRole];

export const useAccount = () => [React.useContext(UserContext).account, React.useContext(UserContext).setAccount];

export const useUserAuth = () => [React.useContext(UserContext).auth, React.useContext(UserContext).setAuth];

export const useUserType = () => [React.useContext(UserContext).userType, React.useContext(UserContext).setUserType];

export const useTempType = () => [React.useContext(UserContext).temptype, React.useContext(UserContext).setTempType];

//signOut
export const useSignOut = () => {
    const [, setUserId] = useUserId();
    const [, setUserRole] = useUserRole();
    const [, setAuth] = useUserAuth();
    const [, setUserType] = useUserType();
    const [, setTempType] = useTempType();
    const [, setAccount] = useAccount();
    const history = useHistory();
    const client = useApolloClient();

    const signOut = React.useCallback(() => {
        history.push('/');

        client.clearStore();
        sessionStorage.clear();

        setUserId(null);
        setUserRole(null);
        setAuth('fail');
        setUserType(null);
        setAccount(null);
        setTempType(null);
    }, [setUserId, setUserRole, setAuth, setUserType, setAccount, setTempType, client, history]);
    return signOut;
};
