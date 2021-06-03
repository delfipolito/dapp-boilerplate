export const extendError = (name, { defaultMessage }) =>
  class extends Error {
    name = name
    constructor(message = defaultMessage) {
      super(message)
    }
  }

export const InvalidNetworkType = extendError('InvalidNetworkType', {
  defaultMessage: 'The network type is invalid',
})
export const InvalidURI = extendError('InvalidURI', {
  defaultMessage: 'The URI is invalid',
})
export const NoConnection = extendError('NoConnection', {
  defaultMessage: 'There is no connection',
})
