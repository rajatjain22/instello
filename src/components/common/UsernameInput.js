import { onValidUsername } from "@/helpers/all";
import { debounce } from "@/helpers/debounce";
import { useCallback, useEffect, useState } from "react";
import BtnLoading from "../Loaders/Login/BtnLoading";
import { FaCheck } from "react-icons/fa";

export default function UsernameInput({
  className,
  onChange,
  value = "",
  onError,
}) {
  const [error, setError] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [available, setAvailable] = useState(false);
  const [usernameValue, setUsernameValue] = useState(value);

  function checkUserInput(e, signal) {
    setUsernameLoading(true);

    fetch(`/api/users/username?val=${e}`, { signal })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          setAvailable(true);
        } else {
          setAvailable(false);
          setError(res.error);
          onError(res.error);
        }
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setUsernameLoading(false);
      });
  }

  const checkUsername = useCallback(debounce(checkUserInput, 400), []);

  useEffect(() => {
    let abortController = new AbortController();
    const signal = abortController.signal;
    const existUser = onValidUsername(usernameValue);
    if (existUser) {
      checkUsername(usernameValue, signal);
    } else {
      setError("Please use only . _ a-z");
      onError("Please use only . _ a-z");
    }
    return () => {
      abortController.abort();
    };
  }, [usernameValue]);

  return (
    <>
      <div className="relative">
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={usernameValue}
          className={`!pr-7 ${className} ${
            error ? "border-2 border-red-400 focus:outline-red-400" : ""
          }`}
          onChange={(e) => {
            setUsernameValue(e.target.value);
            setError("");
            onError("");
            // setAvailable(false)
            onChange(e);
          }}
        />
        {!error &&
          (usernameLoading ? (
            <BtnLoading
              className="absolute top-3 right-2"
              svgClass="w-4 h-4 fill-red"
            />
          ) : (
            usernameValue &&
            available && (
              <FaCheck className="absolute top-3 right-2 text-green-500" />
            )
          ))}
      </div>
      {error && <span className="text-[red] text-sm pl-1">{error}</span>}
    </>
  );
}
