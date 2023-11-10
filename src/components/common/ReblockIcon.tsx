/**
 * DO NOT EDIT THIS FILE. THIS FILE IS AUTO-GENERATED.
 * Read "src/assets/icons/README.md" for mor detail about how to add icons.
 */
import React, { CSSProperties } from "react"
import Icon from '@ant-design/icons'

import {ReactComponent as IcBack} from 'assets/icons/ic-back.svg';
import {ReactComponent as IcBurger} from 'assets/icons/ic-burger.svg';
import {ReactComponent as IcOpenLink} from 'assets/icons/ic-open-link.svg';
import {ReactComponent as IcPlus} from 'assets/icons/ic-plus.svg';


const IconMap = {
  "back": IcBack,
  "burger": IcBurger,
  "open-link": IcOpenLink,
  "plus": IcPlus,

}

export type ReblockIconName = keyof typeof IconMap

type Props = {
  name: ReblockIconName
  color?: CSSProperties["color"]
  size?: number
  style?: CSSProperties
}

const ReblockIcon: React.FC<Props> = ({name, size = 24, color, style}) => {

  const SvgIcon = IconMap[name];

  return (
    <Icon component={SvgIcon} style={{fontSize: `${size}px`, color, ...style}} />
  )
}

export default React.memo(ReblockIcon)
