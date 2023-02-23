import {
  Card,
  Collapsible,
  FormLayout,
  Icon,
  Layout,
  Stack,
  Tabs,
  Text,
  TextField,
} from "@shopify/polaris";
import { ChevronDownMinor, TextMajor } from "@shopify/polaris-icons";
import { widgetTextTabs } from "constant";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWidgetPositionSlice } from "widgetSettingSlice";

export default function WidgetText({ onShowSaveBar, isDiscard, isSubmit }) {
  const dispatch = useDispatch();
  const defaultValue = useSelector((state) => state.widgetSetting.widgetText);
  const [selectedTabs, setSelected] = useState(0);
  const [widgetText, setWidgetText] = useState(defaultValue);
  const [isOpenWidgetText, setIsOpenWidgetText] = useState(true);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );
  const handleChangeWidgetText = useCallback(
    (key, value) => {
      onShowSaveBar(true);
      setWidgetText((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [onShowSaveBar]
  );

  useEffect(() => {
    setWidgetText({
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
    });
  }, [isDiscard]);

  useEffect(() => {
    dispatch(setWidgetPositionSlice(widgetText));
  }, [dispatch, widgetText]);

  const handleValidateField = useCallback(
    (fieldName) => {
      if (isSubmit && widgetText[fieldName].trim() === "") {
        switch (fieldName) {
          case "title": {
            return "Title is required";
          }
          case "deliveryDateLabel": {
            return "Delivery date label is required";
          }
          case "deliveryDateTitle": {
            return "Delivery date title is required";
          }
          case "deliveryTimeTitle": {
            return "Delivery time title is required";
          }
          case "requestMessageText": {
            return "Required message text is required";
          }
          case "storePickupLabel": {
            return "Store pickup label";
          }
          case "messageTextRequirePickupLocation": {
            return "Message text to require buyer to choose a pickup location";
          }
          case "storePickupDateTitle": {
            return "Store pickup date title";
          }
          case "storePickupTimeTitle": {
            return "Store pickup time title";
          }

          default: {
          }
        }
      }
      return false;
    },
    [widgetText, isSubmit]
  );
  return (
    <Layout.Section fullWidth>
      <Card
        title={
          <div className="section__header">
            <Stack>
              <Icon source={TextMajor} color="critical" />
              <Text variant="headingSm" as="div" color="critical">
                Widget text
              </Text>
            </Stack>
            <span
              onClick={() => setIsOpenWidgetText(!isOpenWidgetText)}
              className="cursor-pointer"
            >
              <Icon source={ChevronDownMinor} color="critical" />
            </span>
          </div>
        }
        sectioned
      >
        <Collapsible
          open={isOpenWidgetText}
          id="widget-appearance-collapsible"
          transition={{
            duration: "500ms",
            timingFunction: "ease-in-out",
          }}
          expandOnPrint
        >
          <Tabs
            tabs={widgetTextTabs}
            selected={selectedTabs}
            onSelect={handleTabChange}
            fitted
          >
            {selectedTabs === 0 && (
              <FormLayout>
                <TextField
                  label="Title"
                  value={widgetText?.title}
                  onChange={(e) => handleChangeWidgetText("title", e)}
                  error={handleValidateField("title")}
                />
                <TextField
                  label="Delivery date label"
                  value={widgetText?.deliveryDateLabel}
                  onChange={(e) =>
                    handleChangeWidgetText("deliveryDateLabel", e)
                  }
                  error={handleValidateField("deliveryDateLabel")}
                />
                <TextField
                  label="Delivery date title"
                  value={widgetText?.deliveryDateTitle}
                  onChange={(e) =>
                    handleChangeWidgetText("deliveryDateTitle", e)
                  }
                  error={handleValidateField("deliveryDateTitle")}
                />
                <TextField
                  label="Delivery time title"
                  value={widgetText?.deliveryTimeTitle}
                  onChange={(e) =>
                    handleChangeWidgetText("deliveryTimeTitle", e)
                  }
                  error={handleValidateField("deliveryTimeTitle")}
                />
                <TextField
                  label="Required message text"
                  value={widgetText?.requestMessageText}
                  onChange={(e) =>
                    handleChangeWidgetText("requestMessageText", e)
                  }
                  error={handleValidateField("requestMessageText")}
                />
              </FormLayout>
            )}
            {selectedTabs === 1 && (
              <FormLayout>
                <TextField
                  label="Store pickup label"
                  value={widgetText?.storePickupLabel}
                  onChange={(e) =>
                    handleChangeWidgetText("storePickupLabel", e)
                  }
                  error={handleValidateField("storePickupLabel")}
                />
                <TextField
                  label="Message text to require buyer to choose a pickup location"
                  value={widgetText?.messageTextRequirePickupLocation}
                  onChange={(e) =>
                    handleChangeWidgetText(
                      "messageTextRequirePickupLocation",
                      e
                    )
                  }
                  error={handleValidateField(
                    "messageTextRequirePickupLocation"
                  )}
                />
                <TextField
                  label="Store pickup date title"
                  value={widgetText?.storePickupDateTitle}
                  onChange={(e) =>
                    handleChangeWidgetText("storePickupDateTitle", e)
                  }
                  error={handleValidateField("storePickupDateTitle")}
                />
                <TextField
                  label="Store pickup time title"
                  value={widgetText?.storePickupTimeTitle}
                  onChange={(e) =>
                    handleChangeWidgetText("storePickupTimeTitle", e)
                  }
                  error={handleValidateField("storePickupTimeTitle")}
                />
                <TextField
                  label="Required message text"
                  value={widgetText?.requestMessageText}
                  onChange={(e) =>
                    handleChangeWidgetText("requestMessageText", e)
                  }
                  error={handleValidateField("requestMessageText")}
                />
              </FormLayout>
            )}
          </Tabs>
        </Collapsible>
      </Card>
    </Layout.Section>
  );
}
