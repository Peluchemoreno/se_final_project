import "./NothingFound.css";

export default function NothingFound() {
  return (
    <div className="nothing-found-page">
      <h2 className="nothing-found-page__message">
        Oops there&apos;s been an error. You&apos;ve reached a nonexistent page.
        😦
      </h2>
    </div>
  );
}
