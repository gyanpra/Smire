const Download = ({ downloadPageLink }) => {
  return (
    <div className="p-1">
      <h1 className="my-2 text-lg font-medium hover:bg-yellow-600 hover:shadow-lg hover:border-transparent rounded-xl">
        copy the link and share with your friends.
      </h1>
      <div className="flex space-x-3 hover:bg-yellow-600 hover:shadow-lg hover:border-transparent rounded-xl">
        <span className="break-all">{downloadPageLink}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="object-contain w-8 h-8 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          onClick={() => navigator.clipboard.writeText(downloadPageLink)}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Download;
