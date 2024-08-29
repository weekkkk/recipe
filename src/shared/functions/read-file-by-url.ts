import axios from "axios";

export const readFileByUrl = async (fileUrl: string) => {
  const err = new Error("Не удалось получить файл");
  if (!fileUrl) throw err;

  try {
    const res = await axios.get<File>(fileUrl, { responseType: "blob" });
    const file = res.data;
    const reader = new FileReader();
    const fileText = await new Promise<string>((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject();
      };
      reader.readAsText(file);
    });
    reader.abort();
    return fileText;
  } catch {
    throw err;
  }
};
