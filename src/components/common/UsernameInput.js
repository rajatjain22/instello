"use client";

import { onValidUsername } from "@/helpers/all";
import { debounce } from "@/helpers/debounce";
import { useCallback, useEffect, useState } from "react";
import BtnLoading from "../Loaders/Login/BtnLoading";

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

  const checkUserInput = (e, signal) => {
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
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setUsernameLoading(false);
      });
  };

  const checkUsername = useCallback(debounce(checkUserInput, 400), []);

  useEffect(() => {
    let abortController = new AbortController();
    const signal = abortController.signal;
    const existUser = onValidUsername(usernameValue);
    if (usernameValue) {
      if (existUser) {
        checkUsername(usernameValue, signal);
      } else {
        setError("Please use only . _ a-z");
        onError("Please use only . _ a-z");
      }
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
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="absolute top-3 right-2 text-green-500"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
              </svg>
            )
          ))}
      </div>
      {error && <span className="text-[red] text-sm pl-1">{error}</span>}
    </>
  );
}
