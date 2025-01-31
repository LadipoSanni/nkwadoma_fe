import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface cameraState {
    stream: MediaStream | null;
}

const initialState: cameraState = {
    stream: null,
  };

  const cameraSlice = createSlice({
    name: 'camera',
  initialState,
  reducers: {
    setCameraStream: (state, action: PayloadAction<MediaStream>) => {
      state.stream = action.payload;
    },
    clearCameraStream: (state) => {
        state.stream = null;
      },
  }
});
export const { setCameraStream, clearCameraStream } = cameraSlice.actions;

export default cameraSlice.reducer;
