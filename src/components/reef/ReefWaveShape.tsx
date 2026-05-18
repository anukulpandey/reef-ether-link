const ReefWaveShape = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 1200 280"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M0 182C96 138 192 242 288 198C384 154 480 120 576 162C672 204 768 246 864 206C960 166 1056 136 1200 182V280H0V182Z" />
    <path
      className="reef-wave-surface__shape-secondary"
      d="M0 214C86 186 172 252 258 226C344 200 430 166 516 186C602 206 688 260 774 238C860 216 946 176 1032 186C1118 196 1162 220 1200 236V280H0V214Z"
    />
  </svg>
);

export default ReefWaveShape;
