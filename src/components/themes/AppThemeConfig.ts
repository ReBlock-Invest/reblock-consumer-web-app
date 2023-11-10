import { ThemeConfig } from "antd";
import Colors from "./Colors";
import FontFamilies from "./FontFamilies";

const AppThemeConfig: ThemeConfig = {
  token: {
    colorPrimary: Colors.primary,
    colorTextLightSolid: Colors.surface,
    colorBgLayout: Colors.cloud,
    colorWarning: Colors.warning,
    colorText: Colors.content,
    fontFamily: FontFamilies.primary,
  },
  components: {
    Typography: {      
      fontSizeHeading2: 42,
      colorLink: Colors.primary,
    },
    Button: {
      defaultBg: Colors.surface,
      defaultColor: Colors.primary,
      colorBorder: Colors.border,
    },
    Statistic: {
      fontFamily: FontFamilies.secondary,
    },
    Tabs: {
      titleFontSize: 16,
    }
  }
}

export default AppThemeConfig