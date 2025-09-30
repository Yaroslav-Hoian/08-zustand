"use client";

import css from "./error.module.css";

type ErrorProps = {
  error: Error;
};

const ErrorMessage = ({ error }: ErrorProps) => {
  return (
    <p className={css.text}>
      Could not fetch the list of notes. {error.message}
    </p>
  );
};

export default ErrorMessage;
