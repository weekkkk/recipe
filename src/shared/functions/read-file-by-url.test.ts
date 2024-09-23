import { jest, describe, it, expect } from "@jest/globals";
import { readFileByUrl } from "./read-file-by-url";
import axios, { AxiosResponse } from "axios";

describe("readFileByUrl", () => {
  const fileUrl = "test-file.txt";
  const fileText = "test file text";
  const res: Promise<Pick<AxiosResponse<Blob>, "data">> = Promise.resolve({
    data: new File([fileText], fileUrl, { type: "text/plain" }),
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("должен генерировать ошибку при передаче пустой строки", async () => {
    await expect(readFileByUrl("")).rejects.toBeInstanceOf(Error);
  });

  it("должен генерировать ошибку при передаче некорректного url", async () => {
    await expect(readFileByUrl("dasladsjh.js")).rejects.toBeInstanceOf(Error);
  });

  it("должен возвращать строку при передаче корректного url", async () => {
    const mockAxiosGet = jest.spyOn(axios, "get");
    mockAxiosGet.mockReturnValue(res);
    const fileStr = await readFileByUrl(fileUrl);
    expect(fileStr).toBe(fileText);
  });

  it("должен вызывать axios.get только один раз", async () => {
    const mockAxiosGet = jest.spyOn(axios, "get");
    mockAxiosGet.mockReturnValue(res);
    await readFileByUrl(fileUrl);
    expect(mockAxiosGet).toBeCalledTimes(1);
  });
});
