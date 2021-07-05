import { isAddress } from '@aragon/ui'

function validatorCreator(nonRequiredFunction) {
  const validator = nonRequiredFunction
  validator.isRequired = (props, propName, componentName) => {
    const value = props[propName]
    if (value === null || value === undefined || value === '') {
      return new Error(
        `Property ${propName} is required on ${componentName}, but ${value} was given.`
      )
    }
    return nonRequiredFunction(props, propName, componentName)
  }
  return validator
}

function ethereumAddressValidator(props, propName, componentName) {
  const value = props[propName]
  if (value === null || value === undefined || value === '') {
    return null
  }
  if (!isAddress(value)) {
    const valueType = typeof value
    let nonAddress = null
    if (valueType !== 'object') {
      nonAddress = value.toString()
    }
    return new Error(
      `Invalid prop ${propName} supplied to ${componentName}. The provided value is not a valid ethereum address.${nonAddress &&
        ` You provided "${nonAddress}"`}`
    )
  }
  return null
}

export const EthereumAddressType = validatorCreator(ethereumAddressValidator)
