import { forwardRef, ComponentPropsWithoutRef } from 'react'

interface OwnProps {
  classNames?: [string]
  id: string
  label: string
  note?: string
}

type MyInpProps = ComponentPropsWithoutRef<'input'> & OwnProps

const MyAutocomplete = forwardRef<HTMLInputElement, MyInpProps>(
  ({ classNames, id, label, note, ...props }, ref) => {
    return (
      <>
        <label className="block pb-2" htmlFor={id}>
          {label}
        </label>
        <input
          className={'my-input ' + classNames?.join(' ')}
          id={id}
          ref={ref}
          {...props}
        />
        {note && (
          <span className="block pt-1 text-xs text-gray-400">{note}</span>
        )}
      </>
    )
  },
)

export default MyAutocomplete
