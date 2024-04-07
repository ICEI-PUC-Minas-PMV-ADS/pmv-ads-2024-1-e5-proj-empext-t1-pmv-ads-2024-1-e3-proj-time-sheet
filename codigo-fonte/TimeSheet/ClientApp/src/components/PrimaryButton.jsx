export function PrimaryButton({ title, bgColor, disabled, ...rest }) {
  const bgColorButton = bgColor

    return (
        <button disabled={disabled}
      {...rest}
      className={`w-full p-3 mt-7 text-white bg-${bgColorButton} rounded-2xl text-base font-bold hover:brightness-75`}>
      {title}
    </button>
  )
}