interface IWalletConnectHook {
  connect: () => void
  error?: Error
}

export default IWalletConnectHook