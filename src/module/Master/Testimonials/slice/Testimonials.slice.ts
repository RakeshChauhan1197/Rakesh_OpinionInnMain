import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "app/axiosInstanse"; // Ensure the path is correct
import { Itestimonials } from "./Testimonials.type";

interface TestimonialsState {
  data: Itestimonials[];
  loading: boolean;
  message: string;
  error: string | null;
}

const initialState: TestimonialsState = {
  data: [],
  loading: false,
  message: "",
  error: null,
};

// Corrected typo in the action name
export const getTestimonials = createAsyncThunk("testimonials/getTestimonials", async () => {
  const response = await axiosInstance.get("api/AdminTestimonials");
  return response.data as Itestimonials[];
});

// Add blockTestimonials async thunk for blocking testimonials
export const approveandrejectTestimonials = createAsyncThunk(
  "testimonials/blockTestimonials",
  async (tid: number) => {
    const response = await axiosInstance.post(`/api/AdminTestimonials?tid=${tid}`);
    return { message: response.data.message }; // Return the message as an object
  }
);

export const testimonialsSlice = createSlice({
  name: "testimonials", // Update the slice name to match the domain
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling getTestimonials actions
      .addCase(getTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handling blockTestimonials actions
      .addCase(approveandrejectTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = ""; // Reset message on pending
      })
      .addCase(approveandrejectTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(approveandrejectTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default testimonialsSlice.reducer;
