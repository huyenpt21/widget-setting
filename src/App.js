import { ContextualSaveBar, Frame, Layout, Page } from "@shopify/polaris";
import WidgetAppearance from "components/widgetAppearence";
import WidgetText from "components/widgetText";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { discardChange } from "widgetSettingSlice";
import "./App.css";
import WidgetPosition from "./components/widgetPosition";

function App() {
  const dispatch = useDispatch();
  const widgetSetting = useSelector((state) => state?.widgetSetting);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isShowSaveBar, setIsShowSaveBar] = useState(false);
  const handleSubmit = useCallback(() => {
    setIsSubmit(true);
    console.log("Result", widgetSetting);
  }, [widgetSetting]);

  return (
    <Page narrowWidth>
      <Frame>
        {isShowSaveBar && (
          <ContextualSaveBar
            alignContentFlush
            message="Unsaved changes"
            saveAction={{
              onAction: handleSubmit,
            }}
            discardAction={{
              onAction: () => {
                dispatch(discardChange());
                setIsShowSaveBar(false);
                setIsSubmit(false);
              },
            }}
          />
        )}
        <div style={isShowSaveBar ? { marginTop: "48px" } : {}}>
          <Layout>
            <WidgetPosition onShowSaveBar={setIsShowSaveBar} />
            <WidgetAppearance
              isSubmit={isSubmit}
              onShowSaveBar={setIsShowSaveBar}
            />
            <WidgetText isSubmit={isSubmit} onShowSaveBar={setIsShowSaveBar} />
          </Layout>
        </div>
      </Frame>
    </Page>
  );
}

export default App;
