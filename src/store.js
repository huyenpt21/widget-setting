import { configureStore } from "@reduxjs/toolkit";
import widgetSettingSlice from "widgetSettingSlice";

export const store = configureStore({
  reducer: {
    widgetSetting: widgetSettingSlice,
  },
});
