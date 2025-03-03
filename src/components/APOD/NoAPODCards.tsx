const NoAPODCards: React.FC = () => (
  <div className="w-full flex flex-col items-center justify-center pt-16 gap-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-20 h-20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
      />
    </svg>
    <h3 className="text-xl font-medium">No Images Found</h3>
    <p className="text-center">
      No astronomy pictures found for the selected date range.
    </p>
  </div>
);

export default NoAPODCards;
