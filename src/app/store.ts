import { configureStore } from "@reduxjs/toolkit";
import auththenicationSlice from "../layouts/authentication/slice/authentication.slice";
import CountryReducer from "module/Master/Country/slice/Country.slice";
import clientReducer from "module/Master/Client/slice/Client.slice";
import vendorReducer from "module/Master/Vendor/slice/Vendor.slice";
import PortaluserSlice from "module/Master/PortalUser/slice/Portaluser.slice";
import SoftwareuserSlice from "module/Master/SoftwareUser/slice/Softwareuser.slice";
import TemplateSlice from "module/Master/EmailTemplate/slice/Emailtemplate.slice";
import PresceenerSlice from "module/Master/PreSceenerNew/slice/Presceener.slice";
import QuestionSlice from "module/Master/PreSceenerNew/Component/slice/Question.slice";
import TestimonialsSlice from "module/Master/Testimonials/slice/Testimonials.slice";
import PromocodesSlice from "module/Master/Promocodes/slice/Promocodes.slice";
import VendorparentSlice from "module/Master/VendorParent/slice/Vendorparent.slice";
import PollsSlice from "module/Master/Polls/slice/Polls.slice";
import Affiliate from "module/Master/Affiliate/slice/Affiliate.slice";
import Endpages from "module/Master/Endpages/slice/Endpage.slice";
export const store = configureStore({
  reducer: {
    auththenication: auththenicationSlice,
    country: CountryReducer,
    client: clientReducer,
    vendor: vendorReducer,
    puser: PortaluserSlice,
    softwareUser: SoftwareuserSlice,
    template: TemplateSlice,
    presceener: PresceenerSlice,
    question: QuestionSlice,
    testimonials: TestimonialsSlice,
    promocodes: PromocodesSlice,
    vendorparent: VendorparentSlice,
    polls: PollsSlice,
    affiliate: Affiliate,
    endpage: Endpages,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
