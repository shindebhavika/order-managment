import {atom} from 'recoil'

export const isViewingOrderAtom = atom({
    key: 'isViewingOrder', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});