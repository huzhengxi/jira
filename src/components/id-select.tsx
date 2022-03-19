/**
 * Created by jason on 2022/3/19.
 */
import {Raw} from '../types';
import React from 'react';
import {Select} from 'antd';

type  SelectProps = React.ComponentProps<typeof Select>

interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string, id: number }[];
}

/**
 * value 可以传入多种类型的值
 * onChange
 * @param props
 * @constructor
 */
export const IdSelect = (props: IdSelectProps) => {
  const {value, onChange, defaultOptionName, options, ...restProps} = props;
  return (
    <Select
      value={toNumber(value)}
      onChange={value => onChange(toNumber(value) || undefined)}
      {...restProps}>
      {
        !!defaultOptionName && <Select.Option value={0}>{defaultOptionName}</Select.Option>
      }
      {
        options?.map(option => (
          <Select.Option key={option.id} value={option.id}>
            {option.name}
          </Select.Option>
        ))
      }

    </Select>
  );
};


const toNumber = (value: unknown) => (isNaN(Number(value))) ? 0 : Number(value);
