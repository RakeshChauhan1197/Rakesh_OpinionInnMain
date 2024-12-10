import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "app/axiosInstanse";
import { IQuestion } from "./Question.type";

interface QuestionState {
  data: IQuestion[];
  loading: boolean;
  message: string;
  error: string | null;
}

const initialState: QuestionState = {
  data: [],
  loading: false,
  message: "",
  error: null,
};

export const getQuestionsById = createAsyncThunk<IQuestion[], { PSID: number }>(
  "prescreener/getQuestionsById",
  async ({ PSID }) => {
    const response = await axiosInstance.get(`api/PreScreener/GetById?PSID=${PSID}`);
    return response.data;
  }
);

export const getQuestions = createAsyncThunk<IQuestion[], { PSID: number }>(
  "prescreener/getQuestionsText",
  async ({ PSID }) => {
    const response = await axiosInstance.get(`api/PreScreener/GetQuestionText?PSID=${PSID}`);
    return response.data;
  }
);

export const addQuestion = createAsyncThunk("question/addQuestion", async (question: IQuestion) => {
  const response = await axiosInstance.post("api/countryMaster", question);
  return response.data;
});

export const updateQuestion = createAsyncThunk(
  "question/updateQuestion",
  async (question: IQuestion) => {
    const response = await axiosInstance.put(`api/countryMaster/${question.QID}`, question);
    return response.data;
  }
);

export const deleteQuestion = createAsyncThunk("question/deleteQuestion", async (id: number) => {
  const response = await axiosInstance.delete(`api/countryMaster/${id}`);
  return response.data;
});

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getQuestionsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuestionsById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getQuestionsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((question) => question.QID !== action.payload);
        state.error = null;
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default questionSlice.reducer;
