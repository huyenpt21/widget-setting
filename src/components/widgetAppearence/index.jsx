import {
  Card,
  Checkbox,
  Collapsible,
  Grid,
  Icon,
  Layout,
  Select,
  Stack,
  Text,
  TextField,
} from "@shopify/polaris";
import { ChevronDownMinor, PaintBrushMajor } from "@shopify/polaris-icons";
import {
  optionsCanlendar,
  optionsDateFormat,
  optionsFirstDayCalendar,
  optionsLayout,
} from "constant";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWidgetAppearanceSlice } from "widgetSettingSlice";

import optionsLanguage from "./languages.json";

export default function WidgetAppearance() {
  const dispatch = useDispatch();
  const defaultValue = useSelector(
    (state) => state.widgetSetting.widgetAppearance
  );
  const [widgetAppearance, setWidgetAppearance] = useState(defaultValue);

  const handleChangeWidgetAppearance = useCallback((key, value) => {
    setWidgetAppearance((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);
  const [isOpenWidgetAppearance, setIsOpenWidgetAppearance] = useState(true);
  useEffect(() => {
    dispatch(setWidgetAppearanceSlice(widgetAppearance));
  }, [dispatch, widgetAppearance]);

  return (
    <>
      <Layout.Section oneHalf>
        <Card
          title={
            <div className="section__header">
              <Stack>
                <Icon source={PaintBrushMajor} color="critical" />
                <Text variant="headingSm" as="div" color="critical">
                  Widget appearance
                </Text>
              </Stack>
              <span
                onClick={() =>
                  setIsOpenWidgetAppearance(!isOpenWidgetAppearance)
                }
                className="cursor-pointer"
              >
                <Icon source={ChevronDownMinor} color="critical" />
              </span>
            </div>
          }
          sectioned
        >
          <Collapsible
            open={isOpenWidgetAppearance}
            id="widget-appearance-collapsible"
            transition={{
              duration: "500ms",
              timingFunction: "ease-in-out",
            }}
            expandOnPrint
          >
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <Select
                  label="Layout"
                  options={optionsLayout}
                  value={widgetAppearance?.layout}
                  onChange={(e) => handleChangeWidgetAppearance("layout", e)}
                />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <Select
                  label="Calendar Layout"
                  options={optionsCanlendar}
                  value={widgetAppearance?.calendarLayout}
                  onChange={(e) =>
                    handleChangeWidgetAppearance("calendarLayout", e)
                  }
                />
                <Checkbox
                  checked={widgetAppearance?.isAlwaysOpenCalendar}
                  onChange={(e) =>
                    handleChangeWidgetAppearance("isAlwaysOpenCalendar", e)
                  }
                  label="Always open the calendars"
                />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <Select
                  label="Calendar language"
                  options={optionsLanguage?.isoLangs}
                  value={widgetAppearance?.calendarLanguage}
                  onChange={(e) =>
                    handleChangeWidgetAppearance("calendarLanguage", e)
                  }
                />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <Select
                  label="First day of calendar"
                  options={optionsFirstDayCalendar}
                  value={widgetAppearance?.firstDayOfCalendar}
                  onChange={(e) =>
                    handleChangeWidgetAppearance("firstDayOfCalendar", e)
                  }
                />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <Select
                  label="Date format"
                  options={optionsDateFormat}
                  value={widgetAppearance?.dateFormat}
                  onChange={(e) =>
                    handleChangeWidgetAppearance("dateFormat", e)
                  }
                />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <TextField
                  suffix={
                    <div
                      className="color-picker__box"
                      style={{ backgroundColor: widgetAppearance?.themeColor }}
                    >
                      <div className="color-picker__input">
                        <TextField
                          type="color"
                          onChange={(e) =>
                            handleChangeWidgetAppearance("themeColor", e)
                          }
                        />
                      </div>
                    </div>
                  }
                  label="Theme color"
                  value={widgetAppearance?.themeColor}
                  onChange={(e) => {
                    handleChangeWidgetAppearance("themeColor", e);
                  }}
                  name="theme-color"
                />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <TextField
                  label="Title color"
                  value={widgetAppearance?.titleColor}
                  onChange={(e) => {
                    handleChangeWidgetAppearance("titleColor", e);
                  }}
                  suffix={
                    <div
                      className="color-picker__box"
                      style={{ backgroundColor: widgetAppearance?.titleColor }}
                    >
                      <div className="color-picker__input">
                        <TextField
                          type="color"
                          onChange={(e) => {
                            handleChangeWidgetAppearance("titleColor", e);
                          }}
                        />
                      </div>
                    </div>
                  }
                />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <TextField
                  label="Required message text color"
                  value={widgetAppearance?.requiredMessageColor}
                  onChange={(e) => {
                    handleChangeWidgetAppearance("requireMessColor", e);
                  }}
                  suffix={
                    <div
                      className="color-picker__box"
                      style={{
                        backgroundColor: widgetAppearance?.requiredMessageColor,
                      }}
                    >
                      <div className="color-picker__input">
                        <TextField
                          type="color"
                          onChange={(e) => {
                            handleChangeWidgetAppearance(
                              "requiredMessageColor",
                              e
                            );
                          }}
                        />
                      </div>
                    </div>
                  }
                />
              </Grid.Cell>
            </Grid>
          </Collapsible>
        </Card>
      </Layout.Section>
    </>
  );
}
