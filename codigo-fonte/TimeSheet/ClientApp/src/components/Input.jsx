import InputMask from 'react-input-mask'

export function Input({ title, type, mask, ...rest }) {
  return (
    <div className="flex flex-col self-center mb-3 w-full">
      {mask ? (
        <InputMask
          mask={mask}
          placeholder={title}
          value={rest.value}
          onChange={rest.onChange}
          className="p-3 bg-transparent border-2 border-primary-600 rounded-2xl text-base font-medium placeholder:"
        >
          {(inputProps) => <input {...inputProps} type={type} />}
        </InputMask>
      ) : (
        <input
          {...rest}
          type={type}
          placeholder={title}
          className="p-3 bg-transparent border-2 border-primary-600 rounded-2xl text-base font-medium placeholder:"
        />
      )}
    </div>
  )
}