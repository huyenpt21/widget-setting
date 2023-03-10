import { ContextualSaveBar, Frame, Layout, Page } from "@shopify/polaris";
import WidgetAppearance from "components/widgetAppearence";
import WidgetText from "components/widgetText";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import WidgetPosition from "./components/widgetPosition";

function App() {
  const widgetSetting = useSelector((state) => state?.widgetSetting);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isDiscard, setIsDiscard] = useState(false);
  const [isShowSaveBar, setIsShowSaveBar] = useState(false);
  const handleSubmit = useCallback(() => {
    setIsSubmit(true);
    console.log("Result", widgetSetting);
  }, [widgetSetting]);

  const handleDiscard = useCallback(() => {
    setIsShowSaveBar(false);
    setIsSubmit(false);
    setIsDiscard(!isDiscard);
  }, [isDiscard]);

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
              onAction: handleDiscard,
            }}
          />
        )}
        <div style={isShowSaveBar ? { marginTop: "48px" } : {}}>
          <Layout>
            <WidgetPosition
              isDiscard={isDiscard}
              onShowSaveBar={setIsShowSaveBar}
            />
            <WidgetAppearance
              isSubmit={isSubmit}
              isDiscard={isDiscard}
              onShowSaveBar={setIsShowSaveBar}
            />
            <WidgetText
              isSubmit={isSubmit}
              isDiscard={isDiscard}
              onShowSaveBar={setIsShowSaveBar}
            />
          </Layout>
        </div>
      </Frame>
    </Page>
  );
}

export default App;
