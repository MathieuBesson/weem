
import { useSelector } from "react-redux";
import Cookie from 'universal-cookie'

export const useGetAuthToken = () => {
    const cookieToken = (new Cookie()).get('token'); 
    const stateToken = useSelector(state => state.user.token);

    const isNotEmptyValue = (value) => {
        return value !== "" && value !== undefined && value !== null && value !== {}
    }

    return { 
        haveStateToken: isNotEmptyValue(stateToken),
        haveCookieToken: isNotEmptyValue(cookieToken),
        cookieToken: cookieToken,
        stateToken: cookieToken,
    };
};