import React from 'react';
import { IConfig } from '../../types/types';
declare type Props = {
    sdkConfig: IConfig;
    title: string;
    onPress: () => void;
    customButtonStyle?: JSON;
};
declare const ButtonComponent: React.FC<Props>;
export default ButtonComponent;
