/** Infinite marquee band. Content is duplicated by CSS for a seamless loop. */
export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">
        {doubled.map((item, i) => (
          <span className="it" key={i}>
            <span className="star">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
