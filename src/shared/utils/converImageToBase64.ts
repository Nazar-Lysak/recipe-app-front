export const convertImageToBase64 = (
  file: File,
  callback: (base64: string) => void,
): void => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    const base64data = reader.result as string;
    callback(base64data);
  };
};
