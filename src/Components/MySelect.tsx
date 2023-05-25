import { forwardRef, ComponentPropsWithoutRef } from 'react'

interface OwnProps {
  label?: string
  children: React.ReactNode
}

type MySelectProps = ComponentPropsWithoutRef<'select'> & OwnProps

const MySelect = forwardRef<HTMLSelectElement, MySelectProps>(
  ({ label, children, ...props }, ref) => {
    return (
      <>
        {label && <label>{label}</label>}
        <select className="my-select" ref={ref} {...props}>
          {children}
        </select>
      </>
    )
  },
)

export default MySelect
