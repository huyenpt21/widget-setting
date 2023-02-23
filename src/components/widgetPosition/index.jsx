import {
  Card,
  Checkbox,
  Collapsible,
  Icon,
  Layout,
  Stack,
  Text,
} from "@shopify/polaris";
import { ChevronDownMinor, IconsMajor } from "@shopify/polaris-icons";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWidgetPositionSlice } from "widgetSettingSlice";

export default function WidgetPosition({ onShowSaveBar, isDiscard }) {
  const dispatch = useDispatch();
  const defaultValue = useSelector(
    (state) => state.widgetSetting.widgetPosition
  );
  const [widgetPosition, setWidgetPosition] = useState(defaultValue);
  const [isOpenWidgetSetting, setIsOpenWidgetSetting] = useState(true);
  const handleChangeWidgetPosition = useCallback(
    (key, value) => {
      onShowSaveBar(true);
      setWidgetPosition((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [onShowSaveBar]
  );

  useEffect(() => {
    setWidgetPosition({
      isShowCalendar: false,
      isRequireDeliveryDate: false,
    });
  }, [isDiscard]);

  useEffect(() => {
    dispatch(setWidgetPositionSlice(widgetPosition));
  }, [dispatch, widgetPosition]);

  return (
    <>
      <Layout.Section>
        <Text variant="headingLg" as="h2">
          Widget Setting
        </Text>
      </Layout.Section>
      <Layout.Section fullWidth>
        <Card
          title={
            <div className="section__header">
              <Stack>
                <Icon source={IconsMajor} color="critical" />
                <Text variant="headingSm" as="h2" color="critical">
                  Widget Position
                </Text>
              </Stack>
              <span
                onClick={() => setIsOpenWidgetSetting(!isOpenWidgetSetting)}
                className="cursor-pointer"
              >
                <Icon source={ChevronDownMinor} color="critical" />
              </span>
            </div>
          }
          sectioned
        >
          <Collapsible
            open={isOpenWidgetSetting}
            id="widget-setting-collapsible"
            transition={{
              duration: "500ms",
              timingFunction: "ease-in-out",
            }}
            expandOnPrint
          >
            <Stack vertical>
              <Checkbox
                label="Show the calendar at the product page"
                checked={widgetPosition?.isShowCalendar}
                onChange={() =>
                  handleChangeWidgetPosition(
                    "isShowCalendar",
                    !widgetPosition?.isShowCalendar
                  )
                }
              />
              <Checkbox
                label="Require the delivery date before checkout"
                checked={widgetPosition?.isRequireDeliveryDate}
                onChange={() =>
                  handleChangeWidgetPosition(
                    "isRequireDeliveryDate",
                    !widgetPosition?.isRequireDeliveryDate
                  )
                }
              />
            </Stack>
          </Collapsible>
        </Card>
      </Layout.Section>
    </>
  );
}
