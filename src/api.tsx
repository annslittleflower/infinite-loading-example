import axios from "axios";

const CLIENT_ID = 'joYXnDTY_j7B2_9cgfTvIYJY6g5bxtwD7VUqAYfD5Ck'

interface RequestParams {
  page: number;
  perPage: number;
}

export const getData = async ({ page, perPage }: RequestParams) => {
  try {
    const response = await axios.get(`https://api.unsplash.com/photos?page=${page}&per_page=${perPage}&client_id=${CLIENT_ID}`)
    const totalImages = +(response.headers["x-total"] || 0)
    return {
      images: response.data,
      totalImages,
    }
  } catch (e) {
    throw (e)
  }
}
