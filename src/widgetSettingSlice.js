import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  widgetPosition: {
    isShowCalendar: false,
    isRequireDeliveryDate: false,
  },
  widgetAppearance: {
    layout: 1,
    calendarLayout: 1,
    isAlwaysOpenCalendar: false,
    calendarLanguage: "ab",
    firstDayOfCalendar: 1,
    dateFormat: 1,
    themeColor: "#000000",
    titleColor: "#000000",
    requiredMessageColor: "#000000",
  },
  widgetText: {
    title: "",
    deliveryDateLabel: "",
    deliveryDateTitle: "",
    deliveryTimeTitle: "",
    requestMessageText: "",
    storePickupLabel: "",
    messageTextRequirePickupLocation: "",
    storePickupDateTitle: "",
    storePickupTimeTitle: "",
    requireMessageText: "",
  },
};

export const widgetSettingSlice = createSlice({
  name: "widgetSetting",
  initialState: initialState,
  reducers: {
    setWidgetPositionSlice: (state, action) => {
      state.widgetPosition = action.payload;
    },
    setWidgetAppearanceSlice: (state, action) => {
      state.widgetAppearance = action.payload;
    },
    setWidgetTextSlice: (state, action) => {
      state.widgetText = action.payload.widgetText;
    },
  },
});

export const {
  setWidgetPositionSlice,
  setWidgetAppearanceSlice,
  setWidgetTextSlice,
} = widgetSettingSlice.actions;
export default widgetSettingSlice.reducer;
