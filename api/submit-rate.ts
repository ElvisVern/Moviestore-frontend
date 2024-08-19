import { baseUrl } from "./base-request";
import { BaseResponse } from "./base-response";

const url = `${baseUrl}/api/movies`

interface SubmitRateRequest {
  movieId: string;
  rating: number;
}

async function submitRate({ movieId, rating }: SubmitRateRequest) {
  try {
    const response = await fetch(`${url}/${movieId}/rating`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as BaseResponse<string>;
    return data;
  } catch (error) {
    console.error('Fetching error:', error);
  }
}

export default submitRate;