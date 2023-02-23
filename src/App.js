import { ContextualSaveBar, Frame, Layout, Page } from "@shopify/polaris";
import WidgetAppearance from "components/widgetAppearence";
import WidgetText from "components/widgetText";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { discardChange } from "widgetSettingSlice";
import "./App.css";
import WidgetPosition from "./components/widgetPosition";

function App() {
  const dispatch = useDispatch();
  const widgetSetting = useSelector((state) => state?.widgetSetting);
  const handleSubmit = useCallback(() => {
    console.log(222, widgetSetting);
  }, [widgetSetting]);

  return (
    <Page narrowWidth>
      <Frame>
        <ContextualSaveBar
          alignContentFlush
          message="Unsaved changes"
          saveAction={{
            onAction: handleSubmit,
          }}
          discardAction={{
            onAction: () => {
              dispatch(discardChange());
            },
          }}
        />
        <div className="content">
          <Layout>
            <WidgetPosition />
            <WidgetAppearance />
            <WidgetText />
          </Layout>
        </div>
      </Frame>
    </Page>
  );
}

export default App;
