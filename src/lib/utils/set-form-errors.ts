import { ApiEngineError } from '@/lib/api-engine/api-engine-error'
import { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form'

/**
 * Helper method to set React-Hook-Form errors
 * mapped from Api Engine response error
 * @param setError
 * @param error
 */
export function setFormErrors<TFieldValues extends FieldValues = FieldValues>(
  setError: UseFormSetError<TFieldValues>,
  error: unknown
) {
  if (error instanceof ApiEngineError) {
    if (error.errors) {
      error.getConstraints()?.forEach((constraint) => {
        setError(constraint.property as FieldPath<TFieldValues> | `root.${string}` | 'root', {
          type: 'manual',
          message: constraint.message,
        })
      })
    } else {
      setError('root.serverError', {
        type: error.statusCode.toString(),
        message: error.message,
      })
    }
  } else if (error instanceof Error) {
    console.error(error)
    setError('root.serverError', {
      type: '500',
      message: 'Internal server error',
    })
  }
}
