import { configureStore } from "@reduxjs/toolkit";
import auththenicationSlice from "../layouts/authentication/slice/authentication.slice";
import CountryReducer from "module/Master/Country/slice/Country.slice";
import clientReducer from "module/Master/Client/slice/Client.slice";
import vendorReducer from "module/Master/Vendor/slice/Vendor.slice";
import PortaluserSlice from "module/Master/PortalUser/slice/Portaluser.slice";
import SoftwareuserSlice from "module/Master/SoftwareUser/slice/Softwareuser.slice";
import Emailtemplate from "module/Master/EmailTemplate/slice/Emailtemplate.slice";
import PresceenerSlice from "module/Master/PreSceenerNew/slice/Presceener.slice";
export const store = configureStore({
  reducer: {
    auththenication: auththenicationSlice,
    country: CountryReducer,
    client: clientReducer,
    vendor: vendorReducer,
    portaluser: PortaluserSlice,
    softwareUser: SoftwareuserSlice,
    template: Emailtemplate,
    prescreener: PresceenerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
