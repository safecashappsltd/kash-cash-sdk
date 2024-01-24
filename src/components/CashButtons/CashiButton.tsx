// src/ButtonComponent.tsx
import React from 'react'
import { IConfig } from '../../types/types'
import { Style, Type } from '../../entities/utils/errorMassages'

type Props = {
  sdkConfig: IConfig
  title: string
  onPress: () => void
  customButtonStyle?: JSON
}

const ButtonComponent: React.FC<Props> = ({
  title,
  onPress,
  customButtonStyle,
  sdkConfig
}) => {
  const { buttonStyle, buttonType } = sdkConfig
  const color = buttonStyle === Style.BRIGHT
  const type = buttonType === Type.WITHOUT_ICON

  const styles = {
    color: color ? 'white' : 'black',
    backgroundColor: color ? 'orange' : 'white',
    borderRadius: type ? '8px' : '25px',
    padding: '10px',
    fontFamily: 'Sans-Serif'
  }

  return (
    <div>
      <button style={{ ...styles, ...customButtonStyle }} onClick={onPress}>
        <h3>{title}</h3>
      </button>
    </div>
  )
}

export default ButtonComponent
