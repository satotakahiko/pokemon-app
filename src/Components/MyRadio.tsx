import { forwardRef, ComponentPropsWithoutRef } from 'react'

interface OwnProps {
  id: string
  label: string
}

type MyRadioProps = ComponentPropsWithoutRef<'input'> & OwnProps

const MyRadio = forwardRef<HTMLInputElement, MyRadioProps>(
  ({ id, label, ...props }, ref) => {
    return (
      <>
        <input type="radio" id={id} className="my-radio" ref={ref} {...props} />
        <label className="pl-2" htmlFor={id}>
          {label}
        </label>
      </>
    )
  },
)

export default MyRadio
