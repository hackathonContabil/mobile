import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { Input } from 'native-base'
import { Error } from '../error/styles';

const ControlledInput = ({ control, name, error, ...rest }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
      />

      {
        error && <Error>{error.message}</Error>
      }
    </>
  )
}

export default ControlledInput