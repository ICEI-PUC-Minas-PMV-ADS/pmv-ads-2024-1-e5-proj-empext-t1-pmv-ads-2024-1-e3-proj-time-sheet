export function Input({ title, type }) {
  return (
    <div className="flex flex-col self-center mb-3 w-full">
      <input
        type={type} 
        placeholder={title}
        className="p-3 bg-transparent border-2 border-primary-600 rounded-2xl text-base font-medium placeholder:"
        />
    </div>
  )
}