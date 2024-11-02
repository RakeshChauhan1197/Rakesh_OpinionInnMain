import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "app/axiosInstanse";
import { IClient } from "./Client.type";

interface ClientState {
  data: IClient[];
  loading: boolean;
  message: string;
  error: string | null;
}

const initialState: ClientState = {
  data: [],
  loading: false,
  message: "",
  error: null,
};

export const fetchClients = createAsyncThunk("clients/fetchClients", async () => {
  const response = await axiosInstance.get<IClient[]>("api/ClientMaster");
  console.log("Axios response:", response);
  return response.data;
});

export const addClient = createAsyncThunk("clients/addClient", async (newClient: IClient) => {
  const response = await axiosInstance.post("api/ClientMaster", newClient);
  return response.data;
});

export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async (updatedClient: IClient) => {
    const response = await axiosInstance.put(
      `api/ClientMaster/${updatedClient.cid}`,
      updatedClient
    );
    return response.data;
  }
);

export const deleteClient = createAsyncThunk("clients/deleteClient", async (clientId: number) => {
  const response = await axiosInstance.delete(`api/ClientMaster/${clientId}`);
  return { id: clientId, message: response.data.message };
});

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch clients";
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.message = action.payload.message || "Client added successfully";
        state.error = null;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        const updateClient = action.payload;
        const index = state.data.findIndex((client) => client.cid === updateClient.cid);
        if (index !== -1) {
          state.data[index] = updateClient;
        }
        state.message = updateClient.message || "Client updated successfully";
        state.error = null;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        const { id, message } = action.payload;
        state.data = state.data.filter((client) => client.cid !== id);
        state.message = message || "Client deleted successfully";
        state.error = null;
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete client";
      });
  },
});

export default clientSlice.reducer;
