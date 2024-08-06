const initailState = {
    token: null,
    member: {},
    expirationDate: null,
};

const SET_TOKEN = 'SET_TOKEN';
const SET_MEMBER = 'SET_MEMBER';
const SET_EXPIRATIONDATE = 'SET_EXPIRATIONDATE';

export const setToken = data => ({ type: SET_TOKEN, data });
export const setMember = data => ({ type: SET_MEMBER, data });
export const setExpirationdate = data => ({ type: SET_EXPIRATIONDATE, data });

export default function member(state = initailState, action) {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.data,
            };
        case SET_MEMBER:
            return {
                ...state,
                member: action.data,
            };
        case SET_EXPIRATIONDATE:
            return {
                ...state,
                expirationDate: action.data,
            };
        default:
            return state;
    }
}
