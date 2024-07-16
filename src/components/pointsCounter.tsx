import {type Count} from "../types";

interface PointsCounterProps {
  count: Count;
}

export default function PointsCounter({count}: PointsCounterProps) {
  return (
    <section className="icon-list">
      {count.correct}
      <i className="nes-pokeball" />
      {count.incorrect}
      <i className="nes-icon close is-large" />
    </section>
  );
}
