import axios from "axios";
import { FunctionComponent, useState } from "react";

const EmailForm: FunctionComponent<{
  id: string;
}> = ({ id }) => {
  const [emailFrom, setEmailFrom] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [message, setMessage] = useState(null);

  const handleEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "POST",
        url: "api/files/email",
        data: {
          id,
          emailFrom,
          emailTo,
        },
      });

      setMessage(data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-2 space-y-3 hover:bg-yellow-600 hover:shadow-lg hover:border-transparent rounded-xl">
      <h3>Send it through mail</h3>
      <form
        className="flex flex-col items-center justify-center w-full p-2 space-y-3"
        onSubmit={handleEmail}
      >
        <input
          className="p-1 text-gray-800 bg-red-100 rounded-xl border-2 md:border-t-4 focus:outline-none"
          type="email"
          placeholder="Email From"
          required
          onChange={(e) => setEmailFrom(e.target.value)}
          value={emailFrom}
        />
        <input
          className="p-1 text-gray-800 bg-red-100 rounded-xl border-2 md:border-t-4 focus:outline-none"
          type="email"
          placeholder="Email To"
          required
          onChange={(e) => setEmailTo(e.target.value)}
          value={emailTo}
        />
        <button
          className="button p-2 my-5 bg-gray-900 rounded-md w-44 focus:outline-none"
          type="submit"
        >
          Email
        </button>
      </form>
      {message && <p className="font-medium text-red-500">{message}</p>}
    </div>
  );
};

export default EmailForm;
