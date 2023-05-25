import { forwardRef, ComponentPropsWithoutRef } from 'react'

type OwnProps = {
  label: string
  id: string
}

type MyCheckboxProps = ComponentPropsWithoutRef<'input'> & OwnProps

const MyCheckbox = forwardRef<HTMLInputElement, MyCheckboxProps>(
  ({ id, label, ...props }, ref) => {
    return (
      <>
        <input
          className="cursor-pointer"
          type="checkbox"
          id={id}
          ref={ref}
          {...props}
        />
        <label className="pl-2 cursor-pointer" htmlFor={id}>
          {label}
        </label>
      </>
    )
  },
)

export default MyCheckbox
