import { ThemeConfig } from "antd";
import Colors from "./Colors";

const AppThemeConfig: ThemeConfig = {
  token: {
    colorPrimary: Colors.primary,
    colorTextLightSolid: Colors.surface,
    colorBgLayout: Colors.cloud,
  },
  components: {
    Typography: {
      fontFamily: "Plus Jakarta Sans",
      fontSizeHeading2: 42,
    },
    Button: {
      defaultBg: Colors.surface,
      defaultColor: Colors.primary,
    }
  }
}

export default AppThemeConfig