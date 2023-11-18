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
    colorSuccessBg: Colors.successLight,
    colorSuccess: Colors.success,
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
    },
    Segmented: {
      itemColor: Colors.primary, 
      itemSelectedBg: Colors.primaryLight,
      itemSelectedColor: Colors.primary,
    },
    InputNumber: {
      fontFamily: FontFamilies.secondary,
      fontSize: 24
    }
  }
}

export default AppThemeConfig