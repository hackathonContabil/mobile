import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { Input, Select } from 'native-base'
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

const ControlledSelectInput = ({ control, name, error, loading, data, ...rest }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownIcon={
              loading &&
              <Spinner accessibilityLabel="Loading posts" marginRight={5} />
            }
            value={value}
            onValueChange={onChange}
            {...rest}
          >
            {data.map((e, index) => {
              return <Select.Item key={index} label={e.name} value={e.id} />
            })}
          </Select>
        )}
      />

      {
        error && <Error>{error.message}</Error>
      }
    </>
  )
}

export {ControlledInput, ControlledSelectInput}