export class FirebaseAuthError extends Error {
  /**
   * The error code for this error.
   */
  readonly code: string
  /**
   * Custom data for this error.
   */
  customData?: Record<string, unknown> | undefined
  /** The custom name for all FirebaseErrors. */
  readonly name = FirebaseAuthError.name
  constructor(
    /** The error code for this error. */
    code: string,
    /** Error message */
    message: string,
    /** Custom data for this error. */
    customData?: Record<string, unknown>
  ) {
    const formattedMessage = FirebaseAuthError.formatCodeErrorMessage(code)

    super(formattedMessage)

    this.code = code
    this.customData = customData

    Object.setPrototypeOf(this, FirebaseAuthError.prototype)
  }

  private static formatCodeErrorMessage(code: string): string {
    switch (code) {
      case 'auth/wrong-password':
      default:
        return 'Incorrect login details'
    }
  }
}
