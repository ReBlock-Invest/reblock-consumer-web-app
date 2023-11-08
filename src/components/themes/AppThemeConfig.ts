import { ThemeConfig } from "antd";
import Colors from "./Colors";

const AppThemeConfig: ThemeConfig = {
  token: {
    colorPrimary: Colors.primary,
    colorTextLightSolid: Colors.surface,
    colorBgLayout: Colors.cloud,
    colorWarning: Colors.warning,
    colorText: Colors.content,
    fontFamily: "Plus Jakarta Sans",
  },
  components: {
    Typography: {      
      fontSizeHeading2: 42,
    },
    Button: {
      defaultBg: Colors.surface,
      defaultColor: Colors.primary,
    }
  }
}

export default AppThemeConfig