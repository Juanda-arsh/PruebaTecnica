export function LoadingButton({ loading, children, ...props }) {
  return (
    <button {...props} disabled={loading || props.disabled}>
      {loading ? <span className="loader" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}
