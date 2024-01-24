import * as React from 'react';
import { IButtonProps, IConfig } from './types/types';
import { Style, Type } from './entities/utils/errorMassages';
declare const KashCashInit: (config: IConfig) => void;
declare const KashCashPay: React.FC<IButtonProps>;
export { KashCashInit, IButtonProps, IConfig, Type, Style };
export default KashCashPay;
