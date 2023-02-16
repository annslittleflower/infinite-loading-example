import axios from "axios";

const CLIENT_ID = '8DMbd5ry4DyizvfImybqqGQr5ybHOVJAbCJGWSHyVxRGQC1Tz8T16ElM'

interface RequestParams {
  page: number;
  perPage: number;
}

export const getData = async ({ page, perPage }: RequestParams) => {
  try {
    const response = await axios.get(
      `https://api.pexels.com/v1/curated?page=${page}&per_page=${perPage}`,
      {headers: {'Authorization': CLIENT_ID}}
    )
    const totalImages = response.data.total_results
    console.log(response.data.photos)
    return {
      images: response.data.photos,
      totalImages,
    }
  } catch (e) {
    throw (e)
  }
}
