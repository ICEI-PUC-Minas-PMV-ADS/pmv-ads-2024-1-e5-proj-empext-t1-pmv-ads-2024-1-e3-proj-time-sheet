export function AdjustableModal({ children }) {
  return (
    <div className="min-h-96 bg-surface-600 rounded-t-3xl flex flex-col md:rounded-none md:w-full md:h-screen">
      {children}
    </div>
  )
}