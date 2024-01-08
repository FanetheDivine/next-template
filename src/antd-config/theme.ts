/**
 * 定制antd主题 https://ant.design/theme-editor-cn
 */

import { theme } from 'antd'

export const themeConfig =
{
  "token": {
    "wireframe": true,
    "colorTextBase": "#434343",
    "colorBgBase": "#f5f5f5",
    "sizeStep": 5,
    "sizeUnit": 5,
    "borderRadius": 8,
    "boxShadowSecondary": "\n      0 6px 16px 2 rgba(0, 0, 0, 0.08),\n      0 3px 6px -4px rgba(0, 0, 0, 0.12),\n      0 9px 28px 8px rgba(0, 0, 0, 0.05)\n    ",
    "colorPrimary": "#4096ff",
    "colorInfo": "#4096ff",
    "colorError": "#cf1322",
    "colorSuccess": "#52c41a",
    "colorWarning": "#faad14",
    "fontSize": 16
  },
  "components": {
    "Slider": {
      "colorPrimaryBorderHover": "rgb(105, 192, 255)",
      "trackBg": "rgb(105, 192, 255)",
      "handleColor": "rgb(105, 192, 255)",
      "trackHoverBg": "rgb(64, 169, 255)"
    }
  },
  "algorithm": [theme.compactAlgorithm]
}