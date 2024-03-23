import { useState } from "react";

export default function useTextState(
  initialText?: string
): [string, (value: string) => void] {
  const [text, setText] = useState<string>(initialText?.trim() ?? "");

  const handleOnChange = (value: string) => {
    let trimmedValue = value.trim();
    if (trimmedValue.length === 0) return;
    setText(trimmedValue);
  };

  return [text, handleOnChange];
}
