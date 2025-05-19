export default function StartBtn(props: { disabled: boolean }) {
  return (
    <button disabled={props.disabled} type="submit" className="rounded-md cursor-pointer bg-theme whitespace-nowrap py-4 px-8 font-bold uppercase">
      Let's Go
    </button>
  );
}
