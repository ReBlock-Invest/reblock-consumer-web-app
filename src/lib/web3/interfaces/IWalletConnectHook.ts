interface IWalletConnectHook {
  connect: () => Promise<void>
  error?: Error
}

export default IWalletConnectHook