import * as axios from "axios";
import { ImageInstagram } from "./ImageInstagram";

export class ImagesInstagramRecent {
    private URL = "https://api.instagram.com/v1/users/self/media/recent/?access_token=ACCESS-TOKEN";
    private axiosInstance: axios.AxiosStatic;
    private accessToken: string;
    private resolution: string;

    constructor(accessToken: string, resolution: string) {
        this.axiosInstance = axios.default;
        this.accessToken = accessToken;
        this.resolution = resolution;
    }

    public async images(): Promise<string[]> {
        const response = await this.axiosInstance.get(
            this.URL.replace("access_token=ACCESS-TOKEN", `access_token=${this.accessToken}`)
        );
        return response
                    .data
                    .data
                    .filter((json: any) => json.type === "image")
                    .map((json: any) => new ImageInstagram(
                        json.id,
                        json.link,
                        json.images
                    ))
                    .map((img: ImageInstagram) => img.src(this.resolution));
    }
}
